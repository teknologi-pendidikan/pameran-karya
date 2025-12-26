-- Insert some sample categories for the work submission system

INSERT INTO public.category (type, label, slug) VALUES
('academic', 'Computer Science', 'computer-science'),
('academic', 'Engineering', 'engineering'),
('academic', 'Mathematics', 'mathematics'),
('academic', 'Physics', 'physics'),
('academic', 'Chemistry', 'chemistry'),
('academic', 'Biology', 'biology'),
('academic', 'Medicine', 'medicine'),
('academic', 'Business', 'business'),
('academic', 'Economics', 'economics'),
('academic', 'Psychology', 'psychology'),
('academic', 'Education', 'education'),
('academic', 'Literature', 'literature'),
('academic', 'History', 'history'),
('academic', 'Art & Design', 'art-design'),
('academic', 'Architecture', 'architecture')
ON CONFLICT (slug) DO NOTHING;

-- Insert a sample person (you might want to link this to actual user profiles later)
INSERT INTO public.person (name, affiliation, slug, bio, tag) VALUES
('Sample Student', 'University of Example', 'sample-student', 'A sample student user for testing purposes', 'student')
ON CONFLICT (slug) DO NOTHING;
