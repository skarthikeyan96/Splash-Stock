## Splash Stock 

Image management application using Next.js and Supabase.


## Features 

1. Magic Link Login with Email and Logout functionality. ✅
2. Ability to upload the image by the user. ✅
3. Ability to delete the image.
4. Ability to update the image.


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
