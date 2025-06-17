import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function DELETE(request: Request) {}

export async function GET() {
  try {
    const keyPath = path.join(process.cwd(), 'eba-credentials.json');

    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: SCOPES,
    });

    const sheets = google.sheets({ auth, version: 'v4' });
    const spreadsheetId = process.env.SPREADSHEET_ID;
    // const range = 'Test EBA!A1';

    // const response = await sheets.spreadsheets.values.get({
    //   range,
    //   spreadsheetId,
    // });

    const response = await sheets.spreadsheets.values.update({
      range: 'Test EBA!A1',
      requestBody: {
        values: [
          ['Name', 'Email'],
          ['Afiq Danial', 'afiq@nexea.co'],
        ], // ✅ 2D array
      },
      spreadsheetId,
      valueInputOption: 'RAW',
    });

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: 'Error authenticate' });
  }
}

export async function HEAD(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
export async function OPTIONS(request: Request) {}

export async function PATCH(request: Request) {}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    return NextResponse.json({ message: 'Success' });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed' });
  }
}

export async function PUT(request: Request) {}
