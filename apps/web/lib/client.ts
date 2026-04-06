import { createBrowserClient } from '@supabase/ssr'
import { env, getSupabaseAnonKey } from './env'

export function createClient() {
  return createBrowserClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabaseAnonKey()
  )
}
