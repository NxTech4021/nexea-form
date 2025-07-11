import { NextRequest, NextResponse } from 'next/server';

export default async function DELETE(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('DASDASDs', data);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Error' }, { status: 400 });
  }
}
