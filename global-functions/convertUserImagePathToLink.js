const convertUserImagePathToLink = (imagePath, supabaseUrl, bucketPath) => {
  const userImageDbLink = `${supabaseUrl}/storage/v1/object/public/photos/${bucketPath}/${imagePath}`;
  return userImageDbLink;
};

export default convertUserImagePathToLink;
