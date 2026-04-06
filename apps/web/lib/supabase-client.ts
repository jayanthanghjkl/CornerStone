import { createBrowserClient } from "@supabase/ssr";
import { env, getSupabaseAnonKey } from "./env";

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = getSupabaseAnonKey();


export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
