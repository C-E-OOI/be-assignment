"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.ANON_KEY;
exports.supabase = (0, supabase_js_1.createClient)("https://xqieirpnvtvmmzybsqsw.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxaWVpcnBudnR2bW16eWJzcXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUyNjIzNTIsImV4cCI6MjAzMDgzODM1Mn0.k21fUtZGjrSZjiHLrZ7rXPpm7JNh71mbFQGnU_pAc8k");
