-- SQL Schema for teams table
CREATE TABLE teams (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    team_name text NOT NULL,
    faction text NOT NULL,
    leader_name text NOT NULL,
    leader_reg_no text NOT NULL,
    leader_email text NOT NULL,
    leader_phone text NOT NULL,
    leader_department text,
    leader_year text,
    advisor_name text,
    advisor_email text,
    members jsonb NOT NULL,
    created_at timestamptz DEFAULT now(),

    -- Unique Constraints to prevent duplicates
    CONSTRAINT unique_leader_email UNIQUE (leader_email),
    CONSTRAINT unique_leader_reg_no UNIQUE (leader_reg_no)
);

-- Index for searching (Optional performance)
CREATE INDEX idx_teams_leader_email ON teams (leader_email);
CREATE INDEX idx_teams_leader_reg_no ON teams (leader_reg_no);
