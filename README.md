## Splash Stock 

image management application using Next.js and Supabase.

# Policies for uploading the image to supabase storage
create policy "ALL images are publicly accessible."
on storage.objects for select
using ( bucket_id = 'images' );

create policy "Anyone can upload an image."
on storage.objects for insert
with check ( bucket_id = 'images' );

create policy "Anyone can update an image."
on storage.objects for update
with check ( bucket_id = 'images' )