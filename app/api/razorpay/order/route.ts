import { NextResponse } from 'next/server';

/**
 * POST /api/razorpay/order
 * Body: { amount: number (INR rupees), receipt: string }
 *
 * In production: call Razorpay Orders API with Basic auth (key:secret),
 * persist order_id + amount in DB, return { id, amount, currency }.
 */
export async function POST(req: Request) {
  const { amount, receipt } = (await req.json()) as { amount: number; receipt: string };

  if (!amount || amount < 1) {
    return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
  }

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  // Without keys configured we return a deterministic mock — useful for local/dev.
  if (!keyId || !secret) {
    return NextResponse.json({
      id: `order_mock_${Date.now()}`,
      amount: amount * 100,
      currency: 'INR',
      receipt,
      status: 'mock',
    });
  }

  const auth = Buffer.from(`${keyId}:${secret}`).toString('base64');
  const res = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amount * 100,
      currency: 'INR',
      receipt,
      payment_capture: 1,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: res.status });
  }
  const data = await res.json();
  return NextResponse.json(data);
}
