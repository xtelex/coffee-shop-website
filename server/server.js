import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables from the server directory
dotenv.config()

console.log('Environment check:')
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Loaded' : 'Missing')
console.log('SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY ? 'Loaded' : 'Missing')

import express from 'express'
import cors from 'cors'
import coffeeRoutes from './routes/coffeeRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/coffees', coffeeRoutes)
app.use('/api/users', userRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Coffee 3D API with Supabase is running' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
