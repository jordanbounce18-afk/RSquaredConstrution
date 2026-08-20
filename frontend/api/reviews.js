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

