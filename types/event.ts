/**
events table
----------------------------------
id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
event       TEXT        NOT NULL,
user_id     TEXT,
payload     JSONB       DEFAULT '{}',
environment TEXT        NOT NULL DEFAULT 'development',
created_at  TIMESTAMPTZ DEFAULT NOW()
**/

export interface IEvent {
  id: number;
  event: string; // 'playlist_created'
  user_id: string;
  payload: any;
  environment: string;
  created_at: Date;
}
