const mergeChatIds = (existingIds, chatsJson) => {
  // Extract IDs from the chats
  chatsJson.forEach(chat => {
    if (chat.id && !existingIds.includes(chat.id)) {
      existingIds.push(chat.id); // Add new IDs only if they aren't already in the existing array
      console.log(`Added new ID: ${chat.id}`); // Log each added ID
    }
  });

  console.log('Updated IDs Array:', existingIds); // Log the updated array

  return existingIds;
};

export default mergeChatIds;
