import { createClient } from '@supabase/supabase-js'

let supabaseInstance = null

export function getSupabase() {
  if (!supabaseInstance) {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables:')
      console.error('SUPABASE_URL:', supabaseUrl ? 'Set' : 'Missing')
      console.error('SUPABASE_SERVICE_KEY:', supabaseKey ? 'Set' : 'Missing')
      throw new Error('Missing Supabase environment variables')
    }

    supabaseInstance = createClient(supabaseUrl, supabaseKey)
  }
  
  return supabaseInstance
}

// For backwards compatibility
export const supabase = new Proxy({}, {
  get(target, prop) {
    return getSupabase()[prop]
  }
})
