import { createBrowserClient } from "@supabase/ssr";
import { env, getSupabaseAnonKey } from "./env";

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = getSupabaseAnonKey();

<<<<<<< HEAD

=======
// ── Client-side (Browser) ────────────────────────────────────
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
