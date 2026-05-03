-- Drop existing tables if they exist
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS shoes CASCADE;

-- Create shoes table
CREATE TABLE shoes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('Running', 'Basketball', 'Casual', 'Formal', 'Sneakers', 'Sports')),
  colors TEXT[],
  sizes TEXT[],
  price DECIMAL(10, 2) NOT NULL,
  model_url TEXT,
  image_url TEXT,
  rating DECIMAL(2, 1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table (junction table for users and shoes)
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shoe_id UUID NOT NULL REFERENCES shoes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, shoe_id)
);

-- Create indexes for better performance
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_shoe_id ON favorites(shoe_id);
CREATE INDEX idx_shoes_created_at ON shoes(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE shoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policies for shoes table
-- Anyone can read shoes
CREATE POLICY "Shoes are viewable by everyone" 
  ON shoes FOR SELECT 
  USING (true);

-- Only authenticated users can insert shoes
CREATE POLICY "Authenticated users can insert shoes" 
  ON shoes FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Only authenticated users can update shoes
CREATE POLICY "Authenticated users can update shoes" 
  ON shoes FOR UPDATE 
  TO authenticated 
  USING (true);

-- Only authenticated users can delete shoes
CREATE POLICY "Authenticated users can delete shoes" 
  ON shoes FOR DELETE 
  TO authenticated 
  USING (true);

-- Policies for favorites table
-- Users can only see their own favorites
CREATE POLICY "Users can view their own favorites" 
  ON favorites FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can only insert their own favorites
CREATE POLICY "Users can insert their own favorites" 
  ON favorites FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can only delete their own favorites
CREATE POLICY "Users can delete their own favorites" 
  ON favorites FOR DELETE 
  USING (auth.uid() = user_id);

-- Insert some sample shoe data with image URLs
INSERT INTO shoes (name, description, brand, category, colors, sizes, price, rating, image_url) VALUES
  ('Air Max 270', 'Iconic running shoes with maximum comfort and style', 'Nike', 'Running', ARRAY['Black', 'White', 'Red'], ARRAY['7', '8', '9', '10', '11'], 150.00, 4.8, '/models/shoes 1.png'),
  ('Ultra Boost 21', 'Premium running shoes with responsive cushioning', 'Adidas', 'Running', ARRAY['White', 'Black', 'Blue'], ARRAY['7', '8', '9', '10', '11', '12'], 180.00, 4.7, '/models/shoes2.png'),
  ('Chuck Taylor All Star', 'Classic canvas sneakers for everyday wear', 'Converse', 'Casual', ARRAY['Black', 'White', 'Red', 'Blue'], ARRAY['6', '7', '8', '9', '10', '11'], 65.00, 4.5, '/models/shoes3.png'),
  ('Jordan 1 Retro High', 'Legendary basketball shoes with iconic design', 'Jordan', 'Basketball', ARRAY['Black/Red', 'White/Blue', 'Black/White'], ARRAY['8', '9', '10', '11', '12'], 170.00, 4.9, '/models/shoes4.png'),
  ('Classic Leather', 'Timeless leather sneakers for any occasion', 'Reebok', 'Casual', ARRAY['White', 'Black', 'Brown'], ARRAY['7', '8', '9', '10', '11'], 75.00, 4.4, '/models/shoes5.png'),
  ('Suede Classic', 'Iconic suede sneakers with vintage appeal', 'Puma', 'Sneakers', ARRAY['Black', 'Blue', 'Red', 'Green'], ARRAY['7', '8', '9', '10', '11'], 70.00, 4.6, '/models/shoes6.png');
