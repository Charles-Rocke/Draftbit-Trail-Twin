const formatJSON = jsonString => {
  try {
    // Parse the JSON string into an array
    const arr = JSON.parse(jsonString);

    // Check if the parsed result is an array
    if (Array.isArray(arr)) {
      return arr.join(' - ');
    } else {
      return 'Invalid input, expected an array.';
    }
  } catch (error) {
    return 'Invalid JSON string.';
  }
};

export default formatJSON;
