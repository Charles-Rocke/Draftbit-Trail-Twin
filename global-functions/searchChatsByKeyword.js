const searchChatsByKeyword = (chats, keyword) => {
  if (!keyword) return []; // If no keyword is provided, return an empty array.

  // Filter chats based on the chat_name matching the keyword (case-insensitive).
  return chats.filter(
    chat =>
      chat.chat_name &&
      chat.chat_name.toLowerCase().includes(keyword.toLowerCase())
  );
};

export default searchChatsByKeyword;
