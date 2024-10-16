const filterChatsByUserId = (chats, userId) => {
  // Filter the chats where the userId is present in the user_ids array
  return chats.filter(chat => chat.user_ids && chat.user_ids.includes(userId));
};

export default filterChatsByUserId;
