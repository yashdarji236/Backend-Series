import nodemailer from 'nodemailer'
import { google } from 'googleapis'
import dotenv from 'dotenv'
dotenv.config()

// Step 2: Create transporter dynamically (fresh access token every time)
const createTransporter = async () => {
  try {
    // Create fresh OAuth2 client every time (picks up latest .env values)
    const oauth2Client = new google.auth.OAuth2(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      'https://developers.google.com/oauthplayground'
    );

    // Set credentials with the current refresh token from .env
    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN
    });

    // Get fresh access token
    const { credentials } = await oauth2Client.refreshAccessToken();
    const accessToken = credentials.access_token;

    console.log('✅ Access token generated successfully');

    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,  // ✅ Fresh token every call
      },
    });
  } catch (error) {
    console.error('❌ Error creating transporter:', {
      message: error.message,
      code: error.code,
      details: error.response?.data || 'No additional details'
    });
    throw error;
  }
};

// Step 3: Send email using fresh transporter
export const Sendemail = async (to, subject, text, html) => {
  try {
    console.log(`📧 Attempting to send email to: ${to}`);
    const transporter = await createTransporter(); // ✅ Fresh each time

    const info = await transporter.sendMail({
      from: `"Your Name" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log('✅ Message sent successfully: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('❌ Error sending email:', {
      to,
      subject,
      error: error.message,
      code: error.code,
      details: error.response?.data || 'No additional details'
    });
    throw error;
  }
};