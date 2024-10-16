const getRecentChatId = (chats, userId) => {
  // Filter the chats to only include those that contain the given userId
  const userChats = chats.filter(
    chat => chat.user_ids && chat.user_ids.includes(userId)
  );

  if (userChats.length === 0) return null; // Return null if no matching chat is found

  // Sort the filtered chats by 'created_at' in descending order (most recent first)
  const sortedChats = userChats.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // Return the ID of the most recently created chat
  return sortedChats[0].id;
};

export default getRecentChatId;
