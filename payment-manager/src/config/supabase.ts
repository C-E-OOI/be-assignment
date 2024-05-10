import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config();


const supabaseUrl = process.env.SUPABASE_URL as string;
const supabaseAnonKey = process.env.ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);