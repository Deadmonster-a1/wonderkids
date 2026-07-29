-- Run this script in your Supabase SQL Editor to initialize all tables for the WonderKids website.

-- 1. Contact Submissions Table
CREATE TABLE IF NOT EXISTS public."ContactSubmission" (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL
);

-- 2. Admission Inquiries Table
CREATE TABLE IF NOT EXISTS public."AdmissionInquiry" (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  "studentName" text NOT NULL,
  "parentName" text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  "gradeApplying" text NOT NULL,
  message text
);

-- 3. FAQs Table
CREATE TABLE IF NOT EXISTS public."Faq" (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  question text NOT NULL,
  answer text NOT NULL
);

-- 4. Gallery Items Table
CREATE TABLE IF NOT EXISTS public."GalleryItem" (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  title text NOT NULL,
  category text NOT NULL,
  "imageUrl" text NOT NULL
);

-- 5. Teachers Table
CREATE TABLE IF NOT EXISTS public."Teacher" (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  title text NOT NULL,
  specialization text NOT NULL,
  experience text NOT NULL,
  bio text NOT NULL,
  "avatarUrl" text,
  "iconName" text NOT NULL DEFAULT 'User',
  "colorTheme" text NOT NULL DEFAULT 'primary'
);

-- 6. Programs Table (Optional, for Admin Dashboard)
CREATE TABLE IF NOT EXISTS public."Program" (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  description text NOT NULL
);

-- 7. Testimonials Table (Optional, for Admin Dashboard)
CREATE TABLE IF NOT EXISTS public."Testimonial" (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  name text NOT NULL,
  text text NOT NULL,
  role text NOT NULL,
  "avatarUrl" text
);

-- Set up Row Level Security (RLS) policies
-- Allow public access for reading (SELECT) to all public tables
ALTER TABLE public."Faq" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public."Faq" FOR SELECT USING (true);

ALTER TABLE public."GalleryItem" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public."GalleryItem" FOR SELECT USING (true);

ALTER TABLE public."Teacher" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public."Teacher" FOR SELECT USING (true);

ALTER TABLE public."Program" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public."Program" FOR SELECT USING (true);

ALTER TABLE public."Testimonial" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public."Testimonial" FOR SELECT USING (true);

-- Allow public access to insert forms
ALTER TABLE public."ContactSubmission" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON public."ContactSubmission" FOR INSERT WITH CHECK (true);

ALTER TABLE public."AdmissionInquiry" ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable insert for all users" ON public."AdmissionInquiry" FOR INSERT WITH CHECK (true);
