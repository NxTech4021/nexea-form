import { NextResponse } from 'next/server';
import { deleteSession } from '@/lib/session';

export async function POST() {
  try {
    await deleteSession();
    
    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error in logout API:', error);
    return NextResponse.json({
      success: false,
      message: 'Error occurred during logout',
    }, { status: 500 });
  }
}