const formatString = input => {
  // Check if the input is an array (text[])
  if (Array.isArray(input)) {
    return input.join(' - ');
  }

  // Check if the input is a string
  if (typeof input === 'string') {
    // Split based on capital letters (assuming each word starts with a capital letter)
    const words = input.match(/[A-Z][a-z]*|[0-9]+|[a-z]+/g);

    if (words) {
      return words.join(' - ');
    } else {
      return 'Unable to format the string.';
    }
  }

  // If input is neither an array nor a string
  return 'Invalid input, expected a text[] array or a string.';
};

export default formatString;
