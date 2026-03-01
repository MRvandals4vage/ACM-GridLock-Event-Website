import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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

        if (teamError) throw teamError;

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
                is_leader: true
            },
            ...members.map((m: any) => ({
                team_id: teamData.id,
                name: m.name,
                reg_no: m.regNo, // Correcting camelCase from frontend if needed
                email: m.email,
                phone: m.phone,
                department: m.department,
                year: m.year,
                is_leader: false
            }))
        ];

        // 4. Insert Participants
        const { error: participantsError } = await supabase
            .from('participants')
            .insert(allParticipants);

        if (participantsError) {
            // If participant insertion fails (e.g. duplicate email), we should ideally rollback the team insert.
            // But since we aren't using a full transaction (which supabase-js doesn't support easily without RPC),
            // a simple cleanup or just reporting the error is fine for this "simple" architecture.
            // Duplicate key error code is 23505
            if (participantsError.code === '23505') {
                // Clean up the team if participants fail (since they are required)
                await supabase.from('teams').delete().eq('id', teamData.id);
                return NextResponse.json({ error: 'Duplicate participant detected (Email or Reg No already registered)' }, { status: 409 });
            }
            throw participantsError;
        }

        return NextResponse.json({ message: 'Registration Successful', team_id: teamData.id }, { status: 200 });

    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json({ error: error?.message || 'Internal Server Error', details: error }, { status: 500 });
    }
}
