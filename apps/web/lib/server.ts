import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { env, getSupabaseAnonKey } from './env'

<<<<<<< HEAD

=======
/**
 * If using Fluid compute: Don't put this client in a global variable. Always create a new client within each
 * function when using it.
 */
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL!,
    getSupabaseAnonKey(),
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
<<<<<<< HEAD
            
            
            
=======
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
>>>>>>> 84677c2b19d0b46691e6d0ded4ee12a146e6e3de
          }
        },
      },
    }
  )
}
