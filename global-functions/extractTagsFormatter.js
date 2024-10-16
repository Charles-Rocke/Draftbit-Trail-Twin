const extractTagsFormatter = tagsArray => {
  // Ensure the input is an array
  if (!Array.isArray(tagsArray)) {
    throw new Error('Input is not a valid array');
  }

  // Join the array elements into a single string separated by tabs
  return tagsArray.join(', ');
};

export default extractTagsFormatter;
