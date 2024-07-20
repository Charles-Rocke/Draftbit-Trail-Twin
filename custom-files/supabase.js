import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://ctiafgkrjympwdsviiew.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0aWFmZ2tyanltcHdkc3ZpaWV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI0MjgwMjYsImV4cCI6MjAyODAwNDAyNn0.Ly8zLLQw6t6HJqKLkXwraq7konBpKSrN6fg6DdMMnUw'
);

export default supabase;
