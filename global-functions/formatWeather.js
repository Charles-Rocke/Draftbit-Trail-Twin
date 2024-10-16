const formatWeather = (data, targetDate, targetTime) => {
  // Combine the date and time into a single Date object
  const targetDateTime = new Date(`${targetDate}T${targetTime}:00`);

  // Convert the target Date object to a Unix timestamp (in seconds)
  const targetTimestamp = Math.floor(targetDateTime.getTime() / 1000);

  // Initialize variables to store the closest weather data
  let closestDiff = Infinity;
  let closestWeather = null;

  // Iterate through the hourly forecast in the JSON data
  data.hourly.forEach(hourly => {
    // Get the timestamp of the current weather data
    const weatherTimestamp = hourly.dt;

    // Calculate the difference between the target and current timestamps
    const timeDiff = Math.abs(targetTimestamp - weatherTimestamp);

    // If this is the closest timestamp, update the closestWeather
    if (timeDiff < closestDiff) {
      closestDiff = timeDiff;
      closestWeather = {
        temperature: hourly.temp,
        weather: hourly.weather[0].description,
      };
    }
  });

  return closestWeather;
};

export default formatWeather;
