// const nodemailer = require('nodemailer');
// require('dotenv').config();

// async function testEmail() {
//   const { EMAIL_FROM, EMAIL_USER, EMAIL_PASS } = process.env;

//   if (!EMAIL_FROM || !EMAIL_USER || !EMAIL_PASS) {
//     console.error('Missing required environment variables');
//     process.exit(1);
//   }

//   console.log('Testing email configuration...');
//   console.log('From:', EMAIL_FROM);
//   console.log('User:', EMAIL_USER);
//   console.log('Pass length:', EMAIL_PASS.length);

//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: EMAIL_USER,
//       pass: EMAIL_PASS,
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   try {
//     console.log('Verifying SMTP configuration...');
//     await transporter.verify();
//     console.log('✅ SMTP configuration is valid');

//     console.log('Sending test email...');
//     const info = await transporter.sendMail({
//       from: `"NEXEA Assessment" <${EMAIL_FROM}>`,
//       to: EMAIL_USER, // Send to yourself
//       subject: 'Test Email',
//       html: '<p>This is a test email to verify the email configuration.</p>',
//     });

//     console.log('✅ Test email sent successfully!');
//     console.log('Message ID:', info.messageId);
//   } catch (error) {
//     console.error('❌ Error:', error);
//     if (error.code === 'EAUTH') {
//       console.error('\nPossible solutions:');
//       console.error(
//         "1. Make sure you're using an App Password, not your regular Gmail password"
//       );
//       console.error('2. Enable 2-Step Verification in your Google Account');
//       console.error('3. Generate a new App Password');
//     }
//   }
// }

// testEmail();
