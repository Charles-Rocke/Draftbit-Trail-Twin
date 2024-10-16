const extractBase64Components = base64Data => {
  // Extract the base64 string and mime type
  const [prefix, base64String] = base64Data.split(',');
  const mimeType = prefix.match(/:(.*?);/)[1];
  console.log('MIME TYPE: ', mimeType);
  return { base64String, mimeType };
};

export default extractBase64Components;
