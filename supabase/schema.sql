-- SQL Schema for GRIDLOCK Registration
-- Tabular structure: Teams and Participants

-- 1. Create Teams table
CREATE TABLE teams (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    team_name text NOT NULL,
    faction text NOT NULL,
    advisor_name text,
    advisor_email text,
    attendance_secret text DEFAULT encode(gen_random_bytes(16), 'hex'),
    created_at timestamptz DEFAULT now(),

    CONSTRAINT unique_team_name UNIQUE (team_name)
);

-- 2. Create Participants table
CREATE TABLE participants (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    team_id uuid REFERENCES teams(id) ON DELETE CASCADE,
    name text NOT NULL,
    reg_no text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    department text,
    year text,
    fa_name text,
    fa_email text,
    is_leader boolean DEFAULT false,
    attendance_checked_in boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),

    -- Constraints to prevent duplicate registrations across the whole event
    CONSTRAINT unique_participant_email UNIQUE (email),
    CONSTRAINT unique_participant_reg_no UNIQUE (reg_no),
    CONSTRAINT unique_participant_phone UNIQUE (phone)
);

-- Indexing for performance
CREATE INDEX idx_participants_team_id ON participants(team_id);
CREATE INDEX idx_participants_email ON participants(email);
CREATE INDEX idx_participants_reg_no ON participants(reg_no);
