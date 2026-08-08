import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    console.log(`[CONTACT FORM SUBMISSION] From: ${name} <${email}> -> To: gagancvcm28@gmail.com`)
    console.log(`[MESSAGE CONTENT]: ${message}`)

    // Create a transport using SMTP config if provided, or fallback test transport
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com'
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS

    if (smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: 465,
        secure: true,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      })

      await transporter.sendMail({
        from: `"${name} via Portfolio" <${smtpUser}>`,
        to: 'gagancvcm28@gmail.com',
        replyTo: email,
        subject: `New Portfolio Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #6b0f1a;">New Portfolio Inquiry</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <hr style="border: 1px solid #eee;" />
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; background: #fff; padding: 15px; border-radius: 6px; border: 1px solid #ddd;">${message}</p>
          </div>
        `,
      })
      console.log('Email successfully sent via Nodemailer!')
    }

    return NextResponse.json({
      success: true,
      message: 'Message delivered to gagancvcm28@gmail.com',
    })
  } catch (error: any) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'Failed to send message.', details: error.message },
      { status: 500 }
    )
  }
}
