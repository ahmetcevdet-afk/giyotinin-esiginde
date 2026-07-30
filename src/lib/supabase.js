import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://efnkdxootnhyxmrzlmwq.supabase.co";
const supabaseAnonKey = "sb_publishable_01hDPG9FIq1YwiFXBDGfzQ_JZrBXGNp";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);