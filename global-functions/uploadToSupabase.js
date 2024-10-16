import * as supabase from '../custom-files/supabase';

// Latest and Universal bucket upload function.
const uploadToSupabase = async (
  imageName,
  arrayBuffer,
  mimeType,
  bucketPath
) => {
  // Upload the arrayBuffer to Supabase
  console.log(imageName, arrayBuffer);
  const { data: uploadData, error: uploadError } =
    await supabase.default.storage
      .from('photos')
      .upload(`${bucketPath}/${imageName}`, arrayBuffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: mimeType,
      });

  if (uploadError) {
    console.error('Upload failed:', uploadError);
    return `Upload failed: ${uploadError.message}`;
  }
  console.log('Upload successful!', uploadData);
  return { uploadData };
};

export default uploadToSupabase;
