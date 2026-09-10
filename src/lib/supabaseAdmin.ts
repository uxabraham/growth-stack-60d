import { createClient } from "@supabase/supabase-js";

// Server-only client using the secret key — full access, bypasses RLS.
// Never import this from a client component.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
);

export const MEDIA_BUCKET = "media";
