-- Create coffees table
CREATE TABLE coffees (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  origin TEXT NOT NULL,
  roast_level TEXT NOT NULL CHECK (roast_level IN ('Light', 'Medium', 'Medium-Dark', 'Dark')),
  flavor_notes TEXT[],
  price DECIMAL(10, 2) NOT NULL,
  model_url TEXT,
  image_url TEXT,
  rating DECIMAL(2, 1) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create favorites table (junction table for users and coffees)
CREATE TABLE favorites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  coffee_id UUID NOT NULL REFERENCES coffees(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, coffee_id)
);

-- Create indexes for better performance
CREATE INDEX idx_favorites_user_id ON favorites(user_id);
CREATE INDEX idx_favorites_coffee_id ON favorites(coffee_id);
CREATE INDEX idx_coffees_created_at ON coffees(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE coffees ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policies for coffees table
-- Anyone can read coffees
CREATE POLICY "Coffees are viewable by everyone" 
  ON coffees FOR SELECT 
  USING (true);

-- Only authenticated users can insert coffees (you can restrict this further)
CREATE POLICY "Authenticated users can insert coffees" 
  ON coffees FOR INSERT 
  TO authenticated 
  WITH CHECK (true);

-- Only authenticated users can update coffees
CREATE POLICY "Authenticated users can update coffees" 
  ON coffees FOR UPDATE 
  TO authenticated 
  USING (true);

-- Only authenticated users can delete coffees
CREATE POLICY "Authenticated users can delete coffees" 
  ON coffees FOR DELETE 
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

-- Insert some sample coffee data
INSERT INTO coffees (name, description, origin, roast_level, flavor_notes, price, rating) VALUES
  ('Ethiopian Yirgacheffe', 'Bright and floral with notes of bergamot and jasmine', 'Ethiopia', 'Light', ARRAY['Floral', 'Citrus', 'Bergamot'], 18.99, 4.8),
  ('Colombian Supremo', 'Rich and balanced with chocolate undertones', 'Colombia', 'Medium', ARRAY['Chocolate', 'Caramel', 'Nutty'], 16.99, 4.6),
  ('Sumatra Mandheling', 'Full-bodied with earthy and herbal notes', 'Indonesia', 'Dark', ARRAY['Earthy', 'Herbal', 'Spicy'], 17.99, 4.7),
  ('Costa Rican Tarrazu', 'Clean and crisp with bright acidity', 'Costa Rica', 'Medium', ARRAY['Citrus', 'Honey', 'Clean'], 19.99, 4.9),
  ('Brazilian Santos', 'Smooth and sweet with low acidity', 'Brazil', 'Medium-Dark', ARRAY['Chocolate', 'Nutty', 'Sweet'], 15.99, 4.5),
  ('Kenyan AA', 'Bold and wine-like with berry notes', 'Kenya', 'Medium', ARRAY['Berry', 'Wine', 'Citrus'], 20.99, 4.8);
