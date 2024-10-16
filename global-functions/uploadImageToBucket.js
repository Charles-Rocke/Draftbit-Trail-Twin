import * as CustomGlobalFunctions from '../custom-files/CustomGlobalFunctions';
import * as base64decode from '../custom-files/base64decode';
import * as supabase from '../custom-files/supabase';

const uploadImageToBucket = async (base64Data, genImageName, bucketPath) => {
  try {
    // import global functions used in this file
    const {
      checkBase64Data,
      extractBase64Components,
      decodeBase64ToArrayBuffer,
      checkArrayBuffer,
      uploadToSupabase,
    } = CustomGlobalFunctions;
    // Check base64 data
    const base64Check = checkBase64Data(base64Data); // <== error is happening here
    if (base64Check.error) return base64Check.error;

    // Extract base64 components
    const { base64String, mimeType } = extractBase64Components(base64Data);

    // Generate image name and path
    const generatedImageName = genImageName; // generateImageName(); // Set to global variable
    // const imagePath = `safety_selfies/${imageName}`;
    console.log('IMAGE NAME: ', generatedImageName);
    // Decode base64 string to ArrayBuffer
    const arrayBuffer = decodeBase64ToArrayBuffer(base64String);
    console.log('ARRAY BUFFER:', arrayBuffer);

    // Check ArrayBuffer
    const arrayBufferCheck = checkArrayBuffer(arrayBuffer);
    if (arrayBufferCheck.error) return arrayBufferCheck.error;

    // Upload to Supabase
    const uploadResult = await uploadToSupabase(
      generatedImageName,
      arrayBuffer,
      mimeType,
      bucketPath
    );
    if (uploadResult.error) return uploadResult.error;

    // const fullImagePath = `${supabase.supabaseUrl}/storage/v1/object/public/${uploadResult.uploadData.path}`;
    // Variables.safteySelfiePath = fullImagePath;
    // return { imagePath: fullImagePath };
    // const fullImagePath = convertUserImagePathToLink(uploadResult.uploadData.path, supabase.default.supabaseUrl);
    // console.log("FULL IMAGE PATH FOR DB/upload.data.path: ", fullImagePath, uploadResult.uploadData.path);

    // // Return the full image path
    // return { imagePath: fullImagePath };
    return 'Upload to bucket success';
  } catch (error) {
    console.error('Error uploading file:', error);
    return `Error uploading file: ${error.message}`;
  }
};

export default uploadImageToBucket;
