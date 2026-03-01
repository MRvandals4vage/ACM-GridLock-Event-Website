import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
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
            return NextResponse.json({ error: 'Invalid registration number format (RA + 12+ digits)' }, { status: 400 });
        }

        if (!Array.isArray(members) || members.length < 1 || members.length > 3) {
            return NextResponse.json({ error: 'Teams must have 1-3 additional members' }, { status: 400 });
        }

        // 2. Registration Limit Check
        const { count, error: countError } = await supabase
            .from('teams')
            .select('*', { count: 'exact', head: true });

        if (countError) throw countError;
        if (count !== null && count >= 100) {
            return NextResponse.json({ error: 'Registrations Closed' }, { status: 403 });
        }

        // 3. Duplicate Checks (Handled by Postgres constraints too, but can check here for better error)
        const { data: existingTeam } = await supabase
            .from('teams')
            .select('id')
            .or(`leader_email.eq.${leader_email},leader_reg_no.eq.${leader_reg_no}`)
            .single();

        if (existingTeam) {
            return NextResponse.json({ error: 'Duplicate registration detected (Email or Reg No already exists)' }, { status: 409 });
        }

        // 4. Insert Team
        const { data, error: insertError } = await supabase
            .from('teams')
            .insert([
                {
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
                }
            ])
            .select()
            .single();

        if (insertError) {
            if (insertError.code === '23505') {
                return NextResponse.json({ error: 'Duplicate registration (Database constraint)' }, { status: 409 });
            }
            throw insertError;
        }

        return NextResponse.json({ message: 'Registration Successful', team: data }, { status: 200 });

    } catch (error: any) {
        console.error('Registration Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
