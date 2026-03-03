import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { resend } from '@/lib/resend';

export async function POST(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database connection not established' }, { status: 503 });
    }
    try {
        const body = await req.json();
        const {
            team_name,
            faction,
            leader_name,
            leader_reg_no,
            leader_email,
            leader_phone,
            leader_department,
            leader_year,
            advisor_name,
            advisor_email,
            members
        } = body;

        // 1. Basic Validation
        if (!team_name || !faction || !leader_name || !leader_reg_no || !leader_email || !leader_phone || !members) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(leader_email)) {
            return NextResponse.json({ error: 'Invalid leader email format' }, { status: 400 });
        }

        // RA + 12 or more digits
        const regNoRegex = /^RA\d{12,}$/;
        if (!regNoRegex.test(leader_reg_no)) {
            return NextResponse.json({ error: 'Invalid leader registration number format (RA + 12+ digits)' }, { status: 400 });
        }

        if (!Array.isArray(members)) {
            return NextResponse.json({ error: 'Invalid members data' }, { status: 400 });
        }

        // 2. Insert Team (TABULAR MODE)
        const { data: teamData, error: teamError } = await supabase
            .from('teams')
            .insert([
                {
                    team_name,
                    faction,
                    advisor_name,
                    advisor_email
                }
            ])
            .select()
            .single();

        if (teamError) {
            if (teamError.code === '23505') {
                return NextResponse.json({ error: 'MOBILIZATION DENIED: Squad name already in use.' }, { status: 409 });
            }
            throw teamError;
        }

        // 3. Prepare All Participants list (Leader + Members)
        const allParticipants = [
            {
                team_id: teamData.id,
                name: leader_name,
                reg_no: leader_reg_no,
                email: leader_email,
                phone: leader_phone,
                department: leader_department,
                year: leader_year,
                fa_name: body.leader_fa_name,  // Note: These need to be passed from frontend
                fa_email: body.leader_fa_email,
                is_leader: true
            },
            ...members.map((m: any) => ({
                team_id: teamData.id,
                name: m.name,
                reg_no: m.regNo,
                email: m.email,
                phone: m.phone,
                department: m.department,
                year: m.year,
                fa_name: m.faName,
                fa_email: m.faEmail,
                is_leader: false
            }))
        ];

        // 4. Insert Participants
        const { error: participantsError } = await supabase
            .from('participants')
            .insert(allParticipants);

        if (participantsError) {
            // If participant insertion fails (e.g. duplicate email), we should ideally rollback the team insert.
            if (participantsError.code === '23505') {
                await supabase.from('teams').delete().eq('id', teamData.id);
                return NextResponse.json({ error: 'MOBILIZATION DENIED: Operative communication, RA-ID, or Email already in use.' }, { status: 409 });
            }
            throw participantsError;
        }

        // 5. Dispatch Confirmation Email
        if (resend) {
            try {
                const qrData = `GRIDLOCK_ATTENDANCE:${teamData.id}:${teamData.attendance_secret}`;
                const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

                await resend.emails.send({
                    from: 'GRIDLOCK <onboarding@resend.dev>',
                    to: leader_email,
                    subject: `MISSION BRIEFING: Uplink Confirmation for Squad ${team_name}`,
                    html: `
                        <div style="font-family: sans-serif; background-color: #05070a; color: #fafafa; padding: 40px; border-radius: 24px; border: 1px solid #1e1e1e;">
                            <h1 style="color: #00E5FF; text-transform: uppercase; font-style: italic; letter-spacing: -1px;">Uplink Confirmed</h1>
                            <p style="color: #a1a1aa;">Operative <strong>${leader_name}</strong>, squad <strong>${team_name}</strong> is now registered for GRIDLOCK.</p>
                            
                            <div style="background-color: #0e1117; padding: 24px; border: 1px solid #2d2d2d; border-radius: 16px; margin: 32px 0; text-align: center;">
                                <h2 style="color: #00E5FF; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-top: 0; opacity: 0.6;">ATTENDANCE PIN</h2>
                                <p style="font-size: 28px; font-family: monospace; letter-spacing: 8px; margin: 12px 0; font-weight: bold; color: #ffffff;">${teamData.attendance_secret}</p>
                            </div>
                            
                            <div style="text-align: center; margin: 32px 0;">
                                <img src="${qrUrl}" alt="QR Code" style="border: 8px solid #ffffff; border-radius: 12px; width: 200px; height: 200px;" />
                                <p style="font-size: 10px; color: #52525b; margin-top: 16px; letter-spacing: 1px; text-transform: uppercase;">SECURE ACCESS BARCODE</p>
                            </div>
                            
                            <p style="font-size: 11px; color: #3f3f46; text-align: center;">Present this communique at the checkpoint for bioscan verification.</p>
                        </div>
                    `
                });
            } catch (emailError) {
                console.error('Email Dispatch Failure:', emailError);
            }
        }

        return NextResponse.json({ message: 'Registration Successful', team_id: teamData.id }, { status: 200 });

    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json({ error: error?.message || 'Internal Server Error', details: error }, { status: 500 });
    }
}
