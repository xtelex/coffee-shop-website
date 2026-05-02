-- Step 1: Drop existing tables and policies in the correct order
DROP POLICY IF EXISTS "Users can delete their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can insert their own favorites" ON favorites;
DROP POLICY IF EXISTS "Users can view their own favorites" ON favorites;
DROP POLICY IF EXISTS "Authenticated users can delete shoes" ON shoes;
DROP POLICY IF EXISTS "Authenticated users can update shoes" ON shoes;
DROP POLICY IF EXISTS "Authenticated users can insert shoes" ON shoes;
DROP POLICY IF EXISTS "Shoes are viewable by everyone" ON shoes;

-- Drop old policies that might reference coffees
DROP POLICY IF EXISTS "Authenticated users can delete coffees" ON coffees;
DROP POLICY IF EXISTS "Authenticated users can update coffees" ON coffees;
DROP POLICY IF EXISTS "Authenticated users can insert coffees" ON coffees;
DROP POLICY IF EXISTS "Coffees are viewable by everyone" ON coffees;

-- Drop indexes
DROP INDEX IF EXISTS idx_favorites_user_id;
DROP INDEX IF EXISTS idx_favorites_shoe_id;
DROP INDEX IF EXISTS idx_shoes_created_at;
DROP INDEX IF EXISTS idx_coffees_created_at;

-- Drop tables
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS shoes CASCADE;
DROP TABLE IF EXISTS coffees CASCADE;

-- Step 2: Create shoes table
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

-- Step 3: Create favorites table (junction table for users and shoes)
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  shoe_id UUID NOT NULL REFERENCES shoes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, shoe_id)
);

-- Step 4: Create indexes for better performance
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_shoe_id ON favorites(shoe_id);
CREATE INDEX idx_shoes_created_at ON shoes(created_at);

-- Step 5: Enable Row Level Security (RLS)
ALTER TABLE shoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Step 6: Policies for shoes table
CREATE POLICY "Shoes are viewable by everyone" 
  ON shoes FOR SELECT 
  USING (true);

CREATE POLICY "Authenticated users can insert shoes" 
  ON shoes FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update shoes" 
  ON shoes FOR UPDATE 
  TO authenticated 
  USING (true);

CREATE POLICY "Authenticated users can delete shoes" 
  ON shoes FOR DELETE 
  TO authenticated 
  USING (true);

-- Step 7: Policies for favorites table
CREATE POLICY "Users can view their own favorites" 
  ON favorites FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" 
  ON favorites FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" 
  ON favorites FOR DELETE 
  USING (auth.uid() = user_id);

-- Step 8: Insert sample shoe data
INSERT INTO shoes (name, description, brand, category, colors, sizes, price, rating) VALUES
  ('Air Max 270', 'Iconic running shoes with maximum comfort and style', 'Nike', 'Running', ARRAY['Black', 'White', 'Red'], ARRAY['7', '8', '9', '10', '11'], 150.00, 4.8),
  ('Ultra Boost 21', 'Premium running shoes with responsive cushioning', 'Adidas', 'Running', ARRAY['White', 'Black', 'Blue'], ARRAY['7', '8', '9', '10', '11', '12'], 180.00, 4.7),
  ('Chuck Taylor All Star', 'Classic canvas sneakers for everyday wear', 'Converse', 'Casual', ARRAY['Black', 'White', 'Red', 'Blue'], ARRAY['6', '7', '8', '9', '10', '11'], 65.00, 4.5),
  ('Jordan 1 Retro High', 'Legendary basketball shoes with iconic design', 'Jordan', 'Basketball', ARRAY['Black/Red', 'White/Blue', 'Black/White'], ARRAY['8', '9', '10', '11', '12'], 170.00, 4.9),
  ('Classic Leather', 'Timeless leather sneakers for any occasion', 'Reebok', 'Casual', ARRAY['White', 'Black', 'Brown'], ARRAY['7', '8', '9', '10', '11'], 75.00, 4.4),
  ('Suede Classic', 'Iconic suede sneakers with vintage appeal', 'Puma', 'Sneakers', ARRAY['Black', 'Blue', 'Red', 'Green'], ARRAY['7', '8', '9', '10', '11'], 70.00, 4.6),
  ('Gel-Kayano 28', 'Advanced stability running shoes', 'Asics', 'Running', ARRAY['Blue', 'Black', 'Gray'], ARRAY['7', '8', '9', '10', '11', '12'], 160.00, 4.6),
  ('Old Skool', 'Classic skate shoes with iconic side stripe', 'Vans', 'Casual', ARRAY['Black/White', 'Navy', 'Red'], ARRAY['6', '7', '8', '9', '10', '11'], 70.00, 4.5),
  ('574 Core', 'Timeless lifestyle sneakers', 'New Balance', 'Casual', ARRAY['Gray', 'Navy', 'Burgundy'], ARRAY['7', '8', '9', '10', '11', '12'], 85.00, 4.4),
  ('Zoom Freak 3', 'High-performance basketball shoes', 'Nike', 'Basketball', ARRAY['Black', 'White', 'Multi'], ARRAY['8', '9', '10', '11', '12', '13'], 130.00, 4.7),
  ('Dame 8', 'Signature basketball shoes with responsive cushioning', 'Adidas', 'Basketball', ARRAY['Black', 'Red', 'Blue'], ARRAY['8', '9', '10', '11', '12'], 120.00, 4.6),
  ('Court Vision Low', 'Classic court-inspired sneakers', 'Nike', 'Casual', ARRAY['White', 'Black', 'White/Black'], ARRAY['7', '8', '9', '10', '11'], 75.00, 4.3);
