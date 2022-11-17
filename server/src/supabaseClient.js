const { createClient } = require('@supabase/supabase-js')
require('dotenv').config();


const supabaseUrl = process.env.VITE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_APP_SUPABASE_ANON_KEY

console.log(process.env.PORT)

const supabase = createClient(supabaseUrl, supabaseAnonKey)

module.exports = {supabase}