import { supabase } from "@/lib/supabase";

export async function GET() {
  await supabase.from("logs").select("id").limit(1);
  return Response.json({ ok: true });
}
