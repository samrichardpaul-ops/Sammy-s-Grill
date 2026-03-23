import { createClient } from '@supabase/supabase-js'

export function getServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  if (!supabaseUrl || !supabaseKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('⚠️ Supabase environment variables are missing! Backend will not work until you add them to .env.local.')
    }
    // Return a dummy client that fails gracefully or just mock it so page doesn't crash on build
    return {
      from: () => ({
        select: () => Promise.resolve({ data: [], error: { message: "Supabase not configured" } }),
        insert: () => ({ select: () => ({ single: () => Promise.resolve({ error: { message: "Supabase not configured" } }) }) }),
        update: () => ({ eq: () => Promise.resolve({ error: { message: "Supabase not configured" } }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: { message: "Supabase not configured" } }) })
      })
    } as unknown as ReturnType<typeof createClient>
  }

  return createClient(supabaseUrl, supabaseKey)
}

export function getBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  if (!supabaseUrl || !supabaseKey) return null as unknown as ReturnType<typeof createClient>
  
  return createClient(supabaseUrl, supabaseKey)
}
