import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
    try {
        const { count, error } = await supabase
            .from('teams')
            .select('*', { count: 'exact', head: true });

        if (error) throw error;

        const remainingSeats = Math.max(0, 100 - (count || 0));

        return NextResponse.json({
            remainingTeams: remainingSeats
        }, { status: 200 });

    } catch (error: any) {
        console.error('Remaining Seats Error:', error);
        return NextResponse.json({ error: 'Failed to fetch seats' }, { status: 500 });
    }
}
