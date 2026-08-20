// api/review-action.js
// Handles the Approve / Reject links from the review-notification email.
// GET only, since these are plain links clicked from an email client.

import crypto from "crypto";
import { createClient } from "redis";

function makeToken(id, action) {
    return crypto
      .createHmac("sha256", process.env.REVIEW_APPROVAL_SECRET)
      .update(`${id}:${action}`)
      .digest("hex");
}

function page(title, message, ok) {
    return `<!DOCTYPE html>
    <html><head><meta charset="utf-8"><title>${title}</title></head>
    <body style="margin:0;background:#FAF9F6;font-family:Arial,sans-serif;color:#1C1C1C;display:flex;align-items:center;justify-content:center;min-height:100vh;">
      <div style="max-width:480px;padding:48px 40px;border:1px solid #DCD7CE;background:#fff;text-align:center;">
          <h1 style="font-family:Georgia,serif;font-weight:400;font-size:28px;margin:0 0 16px 0;color:${ok ? "#1C1C1C" : "#8a3b3b"};">${title}</h1>
              <p style="color:#595959;font-size:15px;line-height:1.6;">${message}</p>
                </div>
                </body></html>`;
}

export default async function handler(req, res) {
    const { id, action, token } = req.query;

  if (!id || !action || !token || !["approve", "reject"].includes(action)) {
        res.status(400).send(page("Invalid link", "This link is missing information or malformed.", false));
        return;
  }

  const expected = makeToken(id, action);
    let valid = false;
    try {
          const providedBuf = Buffer.from(token, "hex");
          const expectedBuf = Buffer.from(expected, "hex");
          valid = providedBuf.length === expectedBuf.length && crypto.timingSafeEqual(providedBuf, expectedBuf);
    } catch {
          valid = false;
    }

  if (!valid) {
        res.status(403).send(page("Link not valid", "This approval link could not be verified.", false));
        return;
  }

let client;
    try {
          client = createClient({ url: process.env.REDIS_URL });
          client.on("error", (err) => console.error("Redis error", err));
          await client.connect();

      const raw = await client.get(`review:${id}`);
          if (!raw) {
                  res.status(404).send(page("Review not found", "This review may have already been removed.", false));
                  return;
          }
          const review = JSON.parse(raw);

      if (review.status !== "pending") {
              res.status(200).send(page("Already handled", `This review was already marked as ${review.status}.`, true));
              return;
      }

      if (action === "approve") {
              review.status = "approved";
              await client.set(`review:${id}`, JSON.stringify(review));
              await client.lRem("reviews:pending", 0, id);
              await client.lPush("reviews:approved", id);
              res.status(200).send(page("Review approved", `${review.name}'s review is now live on the site.`, true));
      } else {
              review.status = "rejected";
              await client.set(`review:${id}`, JSON.stringify(review));
              await client.lRem("reviews:pending", 0, id);
              res.status(200).send(page("Review rejected", `${review.name}'s review will not be published.`, true));
      }
    } catch (err) {
          console.error("Review action failed", err);
          res.status(500).send(page("Something went wrong", "Please try again in a moment.", false));
    } finally {
          if (client) await client.quit();
    }
}
