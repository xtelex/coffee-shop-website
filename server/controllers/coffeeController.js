import { supabase } from '../config/supabase.js'

// @desc    Get all coffees
// @route   GET /api/coffees
export const getCoffees = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('coffees')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get single coffee by ID
// @route   GET /api/coffees/:id
export const getCoffeeById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('coffees')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    
    if (data) {
      res.json(data)
    } else {
      res.status(404).json({ message: 'Coffee not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a coffee
// @route   POST /api/coffees
export const createCoffee = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('coffees')
      .insert([req.body])
      .select()
      .single()

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update a coffee
// @route   PUT /api/coffees/:id
export const updateCoffee = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('coffees')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) throw error
    
    if (data) {
      res.json(data)
    } else {
      res.status(404).json({ message: 'Coffee not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete a coffee
// @route   DELETE /api/coffees/:id
export const deleteCoffee = async (req, res) => {
  try {
    const { error } = await supabase
      .from('coffees')
      .delete()
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ message: 'Coffee removed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
