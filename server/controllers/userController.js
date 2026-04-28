import { supabase } from '../config/supabase.js'

// @desc    Register new user
// @route   POST /api/users/register
export const registerUser = async (req, res) => {
  try {
    const { email, password, name } = req.body

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    })

    if (error) throw error

    res.status(201).json({
      user: data.user,
      session: data.session
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Auth user & get token
// @route   POST /api/users/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    res.json({
      user: data.user,
      session: data.session
    })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

// @desc    Get user profile
// @route   GET /api/users/profile
export const getUserProfile = async (req, res) => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(req.token)

    if (error) throw error

    // Get user's favorites
    const { data: favorites, error: favError } = await supabase
      .from('favorites')
      .select('coffee_id, coffees(*)')
      .eq('user_id', user.id)

    if (favError) throw favError

    res.json({
      user,
      favorites: favorites.map(f => f.coffees)
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Add coffee to favorites
// @route   POST /api/users/favorites/:coffeeId
export const addToFavorites = async (req, res) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser(req.token)
    if (authError) throw authError

    const { data, error } = await supabase
      .from('favorites')
      .insert([
        { user_id: user.id, coffee_id: req.params.coffeeId }
      ])
      .select()

    if (error) {
      // Check if already exists
      if (error.code === '23505') {
        return res.status(400).json({ message: 'Already in favorites' })
      }
      throw error
    }

    res.json({ message: 'Added to favorites', data })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Remove coffee from favorites
// @route   DELETE /api/users/favorites/:coffeeId
export const removeFromFavorites = async (req, res) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser(req.token)
    if (authError) throw authError

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', user.id)
      .eq('coffee_id', req.params.coffeeId)

    if (error) throw error

    res.json({ message: 'Removed from favorites' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc    Get user favorites
// @route   GET /api/users/favorites
export const getFavorites = async (req, res) => {
  try {
    const { data: { user }, error: authError } = await supabase.auth.getUser(req.token)
    if (authError) throw authError

    const { data, error } = await supabase
      .from('favorites')
      .select('coffee_id, coffees(*)')
      .eq('user_id', user.id)

    if (error) throw error

    res.json(data.map(f => f.coffees))
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
