import { SUPPORT_EMAIL } from "./send";

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#080A09;font-family:Inter,Arial,sans-serif;color:#E8ECE9">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#121815;border:1px solid #26302B;border-radius:6px">
<tr><td style="padding:28px 32px">
<div style="font-size:12px;letter-spacing:.2em;color:#D9A94A;font-weight:700">KNIGHTIDE</div>
<h1 style="margin:12px 0 16px;font-size:24px;color:#fff">${esc(title)}</h1>${body}
<hr style="border:0;border-top:1px solid #26302B;margin:28px 0 16px">
<p style="font-size:12px;color:#8A948E;margin:0">Questions? Reply to this email or contact ${esc(SUPPORT_EMAIL)}. Knightide Support will never ask for your password or full member key.</p>
</td></tr></table></td></tr></table></body></html>`;
}

const button = (href: string, label: string) =>
  `<p style="margin:20px 0"><a href="${esc(href)}" style="background:#C8FF3A;color:#080A09;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:3px;display:inline-block">${esc(label)}</a></p>`;

export function welcomeEmail(opts: { planName: string; key: string; verifyUrl: string; receiptUrl?: string | null }) {
  const html = layout(`Welcome to Knightide ${opts.planName}`, `
<p style="color:#C5CCC8;line-height:1.6">Your payment was received. Verify your email to unlock your member area.</p>
${button(opts.verifyUrl, "Verify and continue")}
<p style="color:#C5CCC8;line-height:1.6">If the button does not work, enter this one-time member key on the Knightide verification page:</p>
<p style="font-size:26px;letter-spacing:.12em;color:#C8FF3A;font-weight:700;margin:8px 0">${esc(opts.key)}</p>
<p style="font-size:13px;color:#8A948E">Keep this key private. It can be used once.${opts.receiptUrl ? ` <a href="${esc(opts.receiptUrl)}" style="color:#D9A94A">View receipt</a>.` : ""}</p>`);
  const text = `Welcome to Knightide ${opts.planName}.\n\nVerify and continue: ${opts.verifyUrl}\n\nOr enter your one-time member key: ${opts.key}\n${opts.receiptUrl ? `Receipt: ${opts.receiptUrl}\n` : ""}\nKnightide Support will never ask for your password or full key.`;
  return { subject: "Welcome to Knightide: verify your account", html, text };
}

export function verifyEmail(url: string) {
  return {
    subject: "Verify your Knightide email",
    html: layout("Verify your email", `<p style="color:#C5CCC8;line-height:1.6">Confirm this is your email address to finish setting up your account. The link works once and expires soon.</p>${button(url, "Verify email")}`),
    text: `Verify your Knightide email: ${url}`,
  };
}

export function recoveryEmail(url: string) {
  return {
    subject: "Reset your Knightide password",
    html: layout("Reset your password", `<p style="color:#C5CCC8;line-height:1.6">Use this one-time link to choose a new password. If you did not ask for this, you can ignore this email.</p>${button(url, "Choose a new password")}`),
    text: `Reset your Knightide password: ${url}`,
  };
}

export function paymentFailedEmail(portalUrl: string) {
  return {
    subject: "Action needed: your Knightide payment failed",
    html: layout("Your payment did not go through", `<p style="color:#C5CCC8;line-height:1.6">We could not take your latest Knightide payment. Update your card to keep your access.</p>${button(portalUrl, "Update payment method")}`),
    text: `Your Knightide payment failed. Update your card: ${portalUrl}`,
  };
}
