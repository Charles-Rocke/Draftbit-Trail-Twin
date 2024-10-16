const HandleChatNameDisplay = (userId, inputArray) => {
  if (inputArray.length === 1) {
    // If the array contains a name, return the name
    return inputArray[0];
  } else if (inputArray.length === 2) {
    // If the array contains two user IDs, return the one that does not match the given user ID
    const [id1, id2] = inputArray;
    return id1 === userId ? id2 : id1;
  } else {
    throw new Error(
      'Invalid input: array must contain either one name or two user IDs.'
    );
  }
};

export default HandleChatNameDisplay;
