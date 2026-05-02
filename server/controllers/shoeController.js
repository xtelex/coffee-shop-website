import { supabase } from '../config/supabase.js'

// @desc    Get all shoes
// @route   GET /api/shoes
export const getShoes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('shoes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json(data)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get single shoe by ID
// @route   GET /api/shoes/:id
export const getShoeById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('shoes')
      .select('*')
      .eq('id', req.params.id)
      .single()

    if (error) throw error
    
    if (data) {
      res.json(data)
    } else {
      res.status(404).json({ message: 'Shoe not found' })
    }
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a shoe
// @route   POST /api/shoes
export const createShoe = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('shoes')
      .insert([req.body])
      .select()
      .single()

    if (error) throw error
    res.status(201).json(data)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Update a shoe
// @route   PUT /api/shoes/:id
export const updateShoe = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('shoes')
      .update(req.body)
      .eq('id', req.params.id)
      .select()
      .single()

    if (error) throw error
    
    if (data) {
      res.json(data)
    } else {
      res.status(404).json({ message: 'Shoe not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Delete a shoe
// @route   DELETE /api/shoes/:id
export const deleteShoe = async (req, res) => {
  try {
    const { error } = await supabase
      .from('shoes')
      .delete()
      .eq('id', req.params.id)

    if (error) throw error
    res.json({ message: 'Shoe removed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
