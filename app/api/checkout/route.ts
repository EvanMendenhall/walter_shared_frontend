import { NextResponse } from 'next/server'

// Payment and fulfillment have not been approved. A separate reviewed change
// must replace this hard stop before the site can create a checkout session.
export function POST() {
  return NextResponse.json(
    { error: 'Checkout is not available yet. No charge was made.' },
    { status: 503, headers: { 'Cache-Control': 'no-store' } },
  )
}
