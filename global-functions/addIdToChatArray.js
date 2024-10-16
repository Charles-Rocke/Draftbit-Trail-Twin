const addIdToChatArray = (chatArray, newId) => {
  if (chatArray.length > 0 && chatArray[0].chat_ids) {
    chatArray[0].chat_ids.push(newId); // Add the new ID to the chat_ids array
  } else {
    // If chat_ids doesn't exist, create it
    chatArray[0].chat_ids = [newId];
  }

  console.log('Updated Array:', chatArray); // Log the updated array

  return chatArray; // Return the updated array
};

export default addIdToChatArray;
