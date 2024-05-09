import { createClient } from '@supabase/supabase-js'


const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.ANON_KEY as string;


export const supabase = createClient("https://xqieirpnvtvmmzybsqsw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxaWVpcnBudnR2bW16eWJzcXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyNjIzNTIsImV4cCI6MjAzMDgzODM1Mn0.k21fUtZGjrSZjiHLrZ7rXPpm7JNh71mbFQGnU_pAc8k");