import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Replace with actual values/environment variables
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://zfehgfkmgphqkbemrvjg.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmZWhnZmttZ3BocWtiZW1ydmpnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MjM2NDM0OSwiZXhwIjoyMDg3OTQwMzQ5fQ.NCZYDw4bkUimFBdMXMt8C8rjv9vKOXGoaTnMBBTe02E';

const GMAIL_USER = process.env.GMAIL_USER || 'acmsigchi@gmail.com';
const GMAIL_PASS = process.env.GMAIL_PASS; // 16-character App Password (DO NOT USE YOUR REGULAR PASSWORD)

if (!GMAIL_PASS) {
    console.error('ERROR: GMAIL_PASS is missing.');
    console.log('To send with Gmail SMTP, you must provide a 16-character App Password.');
    console.log('Set it using: export GMAIL_PASS=xxxx-xxxx-xxxx-xxxx');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
    },
});

async function broadcastEmails() {
    console.log('Fetching team leaders from Supabase...');
    
    const { data: leaders, error } = await supabase
        .from('participants')
        .select(`
            email,
            teams (
                team_name
            )
        `)
        .eq('is_leader', true);

    // Exclusion list to avoid double-emailingThose who already received the mail
    const alreadySent = [
        "al9176@srmist.edu.in", "rk0288@srmist.edu.in", "rk2782@srmist.edu.in", "vpreetha13@gmail.com",
        "robostein2007@gmail.com", "akash20071105.24@gmail.com", "kj5029@srmist.edu.in", "gr6925@srmist.edu.in",
        "aa1778@srmist.edu.in", "pp3282@srmist.edu.in", "subhankarbiswal57@gmail.com", "ut9262@srmist.edu.in",
        "sk2095@srmist.edu.in", "ms5430@srmist.edu.in", "ak0131@srmist.edu.in", "sm7605@srmist.edu.in",
        "rv5609@srmist.edu.in", "ps0304@srmist.edu.in", "ab0091@srmist.edu.in", "bb0759@srmist.edu.in",
        "p.sujeethreddy0410@gmail.com", "rs9340@srmist.edu.in"
    ];

    // Clean emails by removing "-DUP-XXXX" suffixes to ensure delivery
    const cleanedLeaders = leaders.map(l => ({
        ...l,
        email: l.email.split('-DUP-')[0]
    })).filter(l => !alreadySent.includes(l.email));

    if (!cleanedLeaders || cleanedLeaders.length === 0) {
        console.log('No new team leaders to email.');
        return;
    }

    console.log(`Found ${cleanedLeaders.length} team leaders. Starting broadcast via Gmail SMTP...`);

    for (const leader of cleanedLeaders) {
        const teamName = leader.teams?.team_name || 'Operative';
        const recipientEmail = leader.email;

        console.log(`Sending to squad: ${teamName} (${recipientEmail})...`);

        try {
            const mailOptions = {
                from: `"ACM SIGCHI (GRIDLOCK)" <${GMAIL_USER}>`,
                to: recipientEmail,
                subject: `FINAL CONFIRMATION: GRIDLOCK Participation for ${teamName}`,
                html: `
                    <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
                        <p>Hi ${teamName},</p>
                        <p>Thank you for registering for <strong>GRIDLOCK: Codeathon + CTF</strong>.</p>
                        <p>Please confirm your participation by replying to this mail with your team name and team member details.</p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p>
                            <strong>Date:</strong> 2nd April<br />
                            <strong>Time:</strong> 9:00 AM – 5:00 PM<br />
                            <strong>Venue:</strong> TP2 – 1320
                        </p>
                        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
                        <p><em>Fill in your details:</em></p>
                        <p>OD and refreshments will be provided.<br />
                        Looking forward to your response.</p>
                        <br />
                        <p>Best regards,<br /><strong>ACM SIGCHI SRM Team</strong></p>
                    </div>
                `,
            };

            const info = await transporter.sendMail(mailOptions);
            console.log(`Successfully sent to ${recipientEmail}. ID: ${info.messageId}`);
        } catch (err) {
            console.error(`Unexpected error for ${recipientEmail}:`, err);
        }

        // Delay to prevent Gmail/SMTP from flagging as spam (1 every 500ms)
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Broadcast complete.');
}

broadcastEmails().catch(console.error);
