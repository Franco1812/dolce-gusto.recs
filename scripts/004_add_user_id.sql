-- Add user_id to list_items and reviews tables
-- Run this in your Supabase SQL Editor

-- 1. Add user_id column to list_items
ALTER TABLE list_items 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Add user_id column to reviews
ALTER TABLE reviews 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 3. Drop old unique constraints (one per capsule globally)
ALTER TABLE list_items DROP CONSTRAINT IF EXISTS list_items_capsule_id_key;
ALTER TABLE reviews DROP CONSTRAINT IF EXISTS reviews_capsule_id_key;

-- 4. Add new unique constraints (one per capsule PER USER)
ALTER TABLE list_items ADD CONSTRAINT list_items_user_capsule_unique UNIQUE(user_id, capsule_id);
ALTER TABLE reviews ADD CONSTRAINT reviews_user_capsule_unique UNIQUE(user_id, capsule_id);

-- 5. Enable Row Level Security
ALTER TABLE list_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 6. Create policies for list_items
-- Users can only see their own list items
CREATE POLICY "Users can view own list_items" ON list_items
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own list items
CREATE POLICY "Users can insert own list_items" ON list_items
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own list items
CREATE POLICY "Users can update own list_items" ON list_items
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own list items
CREATE POLICY "Users can delete own list_items" ON list_items
  FOR DELETE USING (auth.uid() = user_id);

-- 7. Create policies for reviews
-- Users can only see their own reviews
CREATE POLICY "Users can view own reviews" ON reviews
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own reviews
CREATE POLICY "Users can insert own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own reviews
CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own reviews
CREATE POLICY "Users can delete own reviews" ON reviews
  FOR DELETE USING (auth.uid() = user_id);

-- 8. Capsules table stays public (everyone can read the catalog)
-- But let's make sure it's accessible
ALTER TABLE capsules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view capsules" ON capsules
  FOR SELECT USING (true);
