const getDisplayPhoto = (photosArray, index) => {
  // Log the input array and index to ensure they are being passed correctly
  console.log('Photos Array:', photosArray);
  console.log('Index:', index);

  // Check if the index is within bounds of the array
  if (index >= 0 && index < photosArray.length && photosArray[index]) {
    // Log the URL before returning it
    console.log('Photo URL:', photosArray[index].url);
    return photosArray[index].url;
  } else {
    // Log a message if the index is out of bounds or invalid
    console.log('Invalid index or photo not found');
    return null;
  }
};

export default getDisplayPhoto;
