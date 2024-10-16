import * as CustomGlobalFunctions from '../custom-files/CustomGlobalFunctions';
import * as supabase from '../custom-files/supabase';

const convertImageNameToDbPath = (imageName, bucketPath) => {
  console.log('in correct to db path');
  const { convertUserImagePathToLink } = CustomGlobalFunctions;
  const fullImagePath = convertUserImagePathToLink(
    imageName,
    supabase.default.supabaseUrl,
    bucketPath
  );
  // Return the full image path
  return fullImagePath;
};

export default convertImageNameToDbPath;
