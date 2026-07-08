import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z.object({
    name: z.string().trim().min(1).max(100),
    email: z.email().trim(),
    message: z.string().trim().min(1).max(2000),
});

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json({ error: 'Please fill in a valid name, email, and message.' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.CONTACT_TO_EMAIL;

    if (!apiKey || !to) {
        console.error('Contact form: RESEND_API_KEY or CONTACT_TO_EMAIL is not set — see .env.example.');
        return NextResponse.json({ error: 'The contact form is not configured yet.' }, { status: 503 });
    }

    const { name, email, message } = parsed.data;
    const resend = new Resend(apiKey);

    // Sandbox sender — swap for a verified domain address once Stephanie has one set up in Resend.
    const { error } = await resend.emails.send({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to,
        replyTo: email,
        subject: `New message from ${name}`,
        text: `${message}\n\n— ${name} (${email})`,
    });

    if (error) {
        console.error('Resend send failed:', error);
        return NextResponse.json({ error: 'Failed to send your message. Please try again later.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
}
