-- =========================================================================
-- Nova Motion — sample data
-- Run this AFTER schema.sql. It fills the site with 20 placeholder
-- projects and 4 packages so you can see the site working immediately.
--
-- The thumbnail_url values here use placehold.co (a free placeholder image
-- service) and the video_url values use Google's public sample-video
-- bucket, purely as stand-ins. Replace every project's thumbnail and video
-- with your own from the Admin Dashboard (or directly in Supabase) —
-- see README.md → "How to add a project".
-- =========================================================================

insert into projects
  (title, slug, category, description, thumbnail_url, video_url, duration, featured, display_order)
values
  -- Business
  ('Corporate Promo', 'corporate-promo', 'business', 'A polished promo introducing a company''s mission and services.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Corporate+Promo', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '0:24', true, 1),
  ('Business Announcement', 'business-announcement', 'business', 'A clean animated announcement for a company update.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Business+Announcement', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '0:15', false, 2),
  ('Company Introduction', 'company-introduction', 'business', 'A short motion piece introducing the team and values of a brand.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Company+Introduction', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', '0:30', false, 3),
  ('Recruitment Ad', 'recruitment-ad', 'business', 'An energetic hiring announcement designed for social feeds.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Recruitment+Ad', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '0:20', false, 4),
  ('Service Promotion', 'service-promotion', 'business', 'A confident pitch highlighting a service''s key benefits.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Service+Promotion', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', '0:18', false, 5),

  -- Product & E-commerce
  ('Product Promo', 'product-promo', 'product', 'A dynamic showcase of a product''s standout features.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Product+Promo', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '0:16', true, 6),
  ('New Product', 'new-product', 'product', 'A launch-day reveal built to create excitement.', 'https://placehold.co/800x450/172A46/FFFFFF?text=New+Product', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', '0:22', false, 7),
  ('Product Sale', 'product-sale', 'product', 'A high-energy discount announcement for e-commerce.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Product+Sale', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '0:12', false, 8),
  ('Product Features', 'product-features', 'product', 'A clear breakdown of what makes a product worth buying.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Product+Features', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4', '0:28', false, 9),
  ('E-commerce Advertisement', 'ecommerce-advertisement', 'product', 'A conversion-focused ad built for paid social.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Ecommerce+Ad', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4', '0:15', false, 10),

  -- Social Media
  ('Instagram Story', 'instagram-story', 'social-media', 'A vertical story built for quick, scroll-stopping impact.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Instagram+Story', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4', '0:10', false, 11),
  ('Instagram Reel', 'instagram-reel', 'social-media', 'A fast-paced reel with punchy captions and transitions.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Instagram+Reel', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4', '0:14', false, 12),
  ('YouTube Short', 'youtube-short', 'social-media', 'A short, punchy vertical video for YouTube Shorts.', 'https://placehold.co/800x450/172A46/FFFFFF?text=YouTube+Short', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', '0:20', false, 13),
  ('Quote Motion', 'quote-motion', 'social-media', 'An animated quote card built for shareability.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Quote+Motion', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', '0:08', false, 14),
  ('Customer Testimonial', 'customer-testimonial', 'social-media', 'An animated testimonial that builds trust fast.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Customer+Testimonial', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4', '0:25', false, 15),

  -- Promotional
  ('Restaurant Promotion', 'restaurant-promotion', 'food-restaurants', 'An appetizing promo built to drive foot traffic.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Restaurant+Promotion', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4', '0:18', false, 16),
  ('Real Estate Promotion', 'real-estate-promotion', 'real-estate', 'A cinematic property showcase for listings.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Real+Estate+Promotion', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4', '0:32', false, 17),
  ('Event Announcement', 'event-announcement', 'promotional', 'A countdown-style teaser to build event hype.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Event+Announcement', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4', '0:15', false, 18),
  ('Fitness Promotion', 'fitness-promotion', 'promotional', 'A high-energy promo for a gym or fitness brand.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Fitness+Promotion', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4', '0:20', false, 19),
  ('Brand Promotional Video', 'brand-promotional-video', 'promotional', 'A flagship promotional piece tying a brand''s story together.', 'https://placehold.co/800x450/172A46/FFFFFF?text=Brand+Promotional+Video', 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4', '0:35', false, 20)
on conflict (slug) do nothing;

-- ---------------------------------------------------------------------
-- Packages
-- ---------------------------------------------------------------------
insert into packages
  (name, videos_count, price, currency, description, features, popular, display_order, active)
values
  ('Starter', 5, 30, 'USD', 'A light package to get a first batch of content moving.',
    array['5 Motion Videos', '10–20 seconds each', 'Logo', 'Brand Colors', 'Custom Text', 'Social Media Format'],
    false, 1, true),
  ('Business', 10, 55, 'USD', 'The most popular package for growing brands.',
    array['10 Motion Videos', 'Full Branding', 'Logo', 'Brand Colors', 'Images', 'Custom Text', '1 Revision', 'Social Media Formats'],
    true, 2, true),
  ('Professional', 20, 100, 'USD', 'A larger content batch with more creative control.',
    array['20 Motion Videos', 'Full Branding', 'Custom Design', 'Logo', 'Colors', 'Fonts', 'Images', 'Custom Text', '2 Revisions', 'Social Media Formats'],
    false, 3, true),
  ('Premium', 30, 200, 'USD', 'The full package for brands that need volume and priority delivery.',
    array['30 Motion Videos', 'Full Branding', 'Custom Design', 'Custom Animation', 'Multiple Formats', '2–3 Revisions', 'Priority Delivery'],
    false, 4, true);
-- Note: re-running this file will insert duplicate packages, since packages
-- have no unique name constraint. If you need to re-seed, delete the
-- existing rows in the Supabase Table Editor first.
