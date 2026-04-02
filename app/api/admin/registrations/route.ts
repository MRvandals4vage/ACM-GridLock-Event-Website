import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database connection not established' }, { status: 503 });
    }

    try {
        const { data: registrations, error } = await supabase
            .from('teams')
            .select(`
                *,
                participants (*)
            `)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json({ registrations }, { status: 200 });

    } catch (error: any) {
        console.error('Admin Fetch Error:', error);
        return NextResponse.json({ error: 'Failed to retrieve registrations' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    if (!supabase) {
        return NextResponse.json({ error: 'Database connection not established' }, { status: 503 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const teamId = searchParams.get('teamId');

        if (!teamId) {
            return NextResponse.json({ error: 'Missing team ID' }, { status: 400 });
        }

        const { error } = await supabase
            .from('teams')
            .delete()
            .eq('id', teamId);

        if (error) throw error;
        return NextResponse.json({ message: 'Squad purged successfully' }, { status: 200 });

    } catch (error: any) {
        console.error('Admin Delete Error:', error);
        return NextResponse.json({ error: 'Failed to purge squad' }, { status: 500 });
    }
}
