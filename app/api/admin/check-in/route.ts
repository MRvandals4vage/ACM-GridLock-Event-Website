import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database connection not established' }, { status: 503 });
    }

    try {
        const body = await req.json();
        const { teamId, secret } = body;

        if (!teamId || !secret) {
            return NextResponse.json({ error: 'Missing teamId or secret' }, { status: 400 });
        }

        // 1. Verify team and secret
        const { data: team, error: teamError } = await supabase
            .from('teams')
            .select('id, attendance_secret')
            .eq('id', teamId)
            .single();

        if (teamError || !team) {
            return NextResponse.json({ error: 'Team not found' }, { status: 404 });
        }

        if (team.attendance_secret !== secret) {
            return NextResponse.json({ error: 'Invalid security clearance' }, { status: 403 });
        }

        // 2. Mark all participants as checked in
        const { error: checkInError } = await supabase
            .from('participants')
            .update({ attendance_checked_in: true })
            .eq('team_id', teamId);

        if (checkInError) throw checkInError;

        return NextResponse.json({ message: 'Squad deployment confirmed (Attendance marked)' }, { status: 200 });

    } catch (error: any) {
        console.error('Check-in Error:', error);
        return NextResponse.json({ error: 'Internal mission failure' }, { status: 500 });
    }
}
