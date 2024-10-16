const checkBase64Data = base64Data => {
  // Ensure base64 data is provided
  console.log('In global check for base64');
  if (!base64Data) {
    console.error('No base64 data provided');
    return { error: 'No base64 data provided' };
  }
  return { success: true };
};

export default checkBase64Data;
