const mostRecentMessage = data => {
  if (!data || data.length === 0) return null; // Handle empty or undefined data

  // Sort the data by 'created_at' in descending order
  const sortedData = data.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // Return the first element (most recent message)
  return sortedData[0];
};

export default mostRecentMessage;
