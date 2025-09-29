import { google } from 'googleapis';
import { NextResponse } from 'next/server';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

const keyPath = path.join(process.cwd(), 'eba-credentials.json');

const auth = new google.auth.GoogleAuth({
  // credentials: JSON.parse(process.env.EBA_CREDENTIALS!),
  keyFile:
    process.env.NODE_ENV === 'production'
      ? '/etc/secrets/eba-credentials'
      : keyPath,
  scopes: SCOPES,
});

const sheets = google.sheets({ auth, version: 'v4' });

const spreadsheetId = process.env.SPREADSHEET_ID;

const sheetTitle = process.env.SHEET_TITLE;

const values = {
  col_0: 'Least Accurate',
  col_1: 'Somewhat Accurate',
  col_2: 'Quite Accurate',
  col_3: 'Most Accurate',
};

export async function GET() {
  try {
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

export async function POST(request: Request) {
  const data = await request.json();

  // console.log('Sheet Data:', {
  //   company: data.company,
  //   email: data.email,
  //   fullName: data.fullName,
  //   phoneNumber: data.phoneNumber,
  //   matrixesCount: data.matrixes?.length || 0,
  //   radiosCount: data.radios?.length || 0,
  //   matrixes: data.matrixes,
  //   radios: data.radios,
  // });

  const { company, email, fullName, matrixes, phoneNumber, radios } = data;

  try {
    const cleanedMatrixes = matrixes.map((item: any) => {
      // Get the actual key (e.g., "matrix1", "matrix11", ...)
      const key = Object.keys(item)[0];
      const matrix = item[key];

      // Transform rows to human-readable labels
      const transformed = Object.fromEntries(
        Object.entries(matrix).map(([rowKey, colKey]) => [
          rowKey,
          values[colKey as keyof typeof values],
        ]),
      );

      return transformed;
    });

    const flattenedMatrixes = cleanedMatrixes.flatMap((obj: any) =>
      Object.values(obj),
    );
    const flattenedRadios = radios.flatMap((obj: any) => Object.values(obj));

    await sheets.spreadsheets.values.append({
      insertDataOption: 'INSERT_ROWS',
      // range: `${sheetTitle}!C2`,
      range: `${sheetTitle}!B:B`,
      requestBody: {
        values: [
          [
            null,
            email,
            new Date(),
            fullName,
            company,
            phoneNumber,
            email,
            ...flattenedMatrixes,
            ...flattenedRadios,
          ],
        ],
      },
      spreadsheetId,
      valueInputOption: 'RAW',
    });

    console.log([
      null,
      email,
      new Date(),
      fullName,
      company,
      phoneNumber,
      email,
      ...flattenedMatrixes,
      ...flattenedRadios,
    ]);

    return NextResponse.json({
      message: 'Success',
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Failed' });
  }
}
