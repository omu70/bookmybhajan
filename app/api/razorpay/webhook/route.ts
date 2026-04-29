import { NextResponse } from 'next/server';
import crypto from 'crypto';

/**
 * POST /api/razorpay/webhook
 * Signature: x-razorpay-signature header (HMAC-SHA256, key=RAZORPAY_WEBHOOK_SECRET)
 *
 * On payment.captured:
 *   1. mark booking as paid in DB
 *   2. trigger WhatsApp ticket via WATI/Gupshup
 *   3. send email receipt
 */
export async function POST(req: Request) {
  const signature = req.headers.get('x-razorpay-signature');
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!signature || !secret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }
  const body = await req.text();
  const expected = crypto.createHmac('sha256', secret).update(body).digest('hex');
  if (expected !== signature) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const payload = JSON.parse(body);
  if (payload.event === 'payment.captured') {
    // TODO: persist + WhatsApp dispatch (WATI / Gupshup)
    // const { order_id, payment_id, amount, contact, email } = payload.payload.payment.entity;
  }

  return NextResponse.json({ ok: true });
}
