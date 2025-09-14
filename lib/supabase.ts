import { createClient } from "@supabase/supabase-js";

const id = process.env.NEXT_PUBLIC_SUPABASE_ID!;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

export const supabase = createClient(url, id);
