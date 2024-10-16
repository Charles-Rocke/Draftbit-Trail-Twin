const filterOtherUserId = (userId1, userId2, user_id) => {
  let result;

  if (userId1 === user_id) {
    result = userId2;
  } else if (userId2 === user_id) {
    result = userId1;
  } else {
    result = null; // If neither ID matches the self user ID, return null or handle as needed
  }

  // Log the returned value
  console.log('Returned User ID:', result);
  return result;
};

export default filterOtherUserId;
