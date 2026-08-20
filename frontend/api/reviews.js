// api/reviews.js
// Public review submission + approved-reviews listing.
// POST: client submits a review -> stored as "pending" in Redis, Bryan gets an approval email.
// GET: returns approved reviews for the public page to display.

import crypto from "crypto";
import { createClient } from "redis";

function makeToken(id, action) {
    return crypto
      .createHmac("sha256", process.env.REVIEW_APPROVAL_SECRET)
      .update(`${id}:${action}`)
      .digest("hex");
}

function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
}

async function getClient() {
    const client = createClient({ url: process.env.REDIS_URL });
    client.on("error", (err) => console.error("Redis error", err));
    await client.connect();
    return client;
}

function buildApprovalEmailHtml(review, approveUrl, rejectUrl) {
    const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
    return `<!DOCTYPE html>
    <html><body style="margin:0;padding:0;background:#FAF9F6;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#FAF9F6;">
          <tr><td align="center" style="padding:32px 12px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#FAF9F6;border:1px solid #DCD7CE;">
                        <tr>
                                  <td style="padding:32px 32px 8px 32px;font-family:Georgia,serif;">
                                              <div style="font-size:11px;letter-spacing:3px;color:#9E907F;text-transform:uppercase;">R² Construction — New Review Awaiting Approval</div>
                                                          <h1 style="margin:12px 0 4px 0;font-size:26px;font-weight:400;color:#1C1C1C;">${escapeHtml(review.name)}</h1>
                                                                      <div style="font-size:20px;color:#c9a227;letter-spacing:2px;">${stars}</div>
                                                                                </td>
                                                                                        </tr>
                                                                                                <tr><td style="padding:16px 32px;font-family:Arial,sans-serif;font-size:15px;color:#1C1C1C;line-height:1.7;white-space:pre-wrap;">
                                                                                                          ${escapeHtml(review.text)}
                                                                                                                  </td></tr>
                                                                                                                          <tr><td style="padding:16px 32px 32px 32px;">
                                                                                                                                    <table role="presentation" cellspacing="0" cellpadding="0">
                                                                                                                                                <tr>
                                                                                                                                                              <td style="background:#1C1C1C;padding:14px 28px;">
                                                                                                                                                                              <a href="${approveUrl}" style="color:#FAF9F6;font-family:Arial,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;">Approve &amp; Publish</a>
                                                                                                                                                                                            </td>
                                                                                                                                                                                                          <td width="12"></td>
                                                                                                                                                                                                                        <td style="border:1px solid #1C1C1C;padding:14px 28px;">
                                                                                                                                                                                                                                        <a href="${rejectUrl}" style="color:#1C1C1C;font-family:Arial,sans-serif;font-size:12px;letter-spacing:3px;text-transform:uppercase;text-decoration:none;">Reject</a>
                                                                                                                                                                                                                                                      </td>
                                                                                                                                                                                                                                                                  </tr>
                                                                                                                                                                                                                                                                            </table>
                                                                                                                                                                                                                                                                                    </td></tr>
                                                                                                                                                                                                                                                                                            <tr><td style="padding:16px 32px;background:#1C1C1C;color:#E8E4DB;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;">
                                                                                                                                                                                                                                                                                                      R² Construction · Review moderation
                                                                                                                                                                                                                                                                                                              </td></tr>
                                                                                                                                                                                                                                                                                                                    </table>
                                                                                                                                                                                                                                                                                                                        </td></tr>
                                                                                                                                                                                                                                                                                                                          </table>
                                                                                                                                                                                                                                                                                                                          </body></html>`;
}

export default async function handler(req, res) {
      if (req.method === "GET") {
              let client;
              try {
                        client = await getClient();
                        const ids = await client.lRange("reviews:approved", 0, 49);
                        const reviews = [];
                        for (const id of ids) {
                                    const raw = await client.get(`review:${id}`);
                                    if (raw) reviews.push(JSON.parse(raw));
                        }
                        return res.status(200).json({ reviews });
              } catch (err) {
                        console.error("List reviews failed", err);
                        return res.status(500).json({ error: "Could not load reviews" });
              } finally {
                        if (client) await client.quit();
              }
      }

      if (req.method === "POST") {
              const { name, rating, text } = req.body || {};
              const numRating = Number(rating);
              if (!name || !text || !Number.isInteger(numRating) || numRating < 1 || numRating > 5) {
                        return res.status(400).json({ error: "Missing or invalid fields" });
              }

              const id = crypto.randomUUID();
              const review = {
                        id,
                        name: String(name).slice(0, 100),
                        rating: numRating,
                        text: String(text).slice(0, 2000),
                        status: "pending",
                        created_at: new Date().toISOString(),
              };

              let client;
              try {
                        client = await getClient();
                        await client.set(`review:${id}`, JSON.stringify(review));
                        await client.lPush("reviews:pending", id);
              } catch (err) {
                        console.error("Store review failed", err);
                        return res.status(500).json({ error: "Could not save review" });
              } finally {
                        if (client) await client.quit();
              }

              try {
                        const base = process.env.SITE_URL;
                        const approveUrl = `${base}/api/review-action?id=${id}&action=approve&token=${makeToken(id, "approve")}`;
                        const rejectUrl = `${base}/api/review-action?id=${id}&action=reject&token=${makeToken(id, "reject")}`;
                        await fetch("https://api.resend.com/emails", {
                                    method: "POST",
                                    headers: {
                                                  Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                                                  "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                                  from: process.env.FROM_EMAIL,
                                                  to: [process.env.NOTIFY_EMAIL],
                                                  subject: `New Review from ${review.name} (${numRating}\u2605) \u2014 Approval Needed`,
                                                  html: buildApprovalEmailHtml(review, approveUrl, rejectUrl),
                                    }),
                        });
              } catch (err) {
                        console.error("Review notification email failed", err);
              }

              return res.status(201).json({ id, status: "ok" });
      }

      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).json({ error: "Method not allowed" });
}


