const filterEventsWithRadius = (events, userLat, userLon, searchRadius) => {
  const R = 6371000; // Radius of the Earth in meters
  const toRad = angle => (angle * Math.PI) / 180;

  // Haversine formula to calculate the distance between two lat/lon points in meters
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  // Filter the events within the given radius
  return Object.values(events).filter(event => {
    const eventLat = event.meetup_lat;
    const eventLon = event.meetup_lon;

    // Calculate the distance between the user and the event
    const distance = haversineDistance(userLat, userLon, eventLat, eventLon);

    // Return the event if it's within the search radius
    return distance <= searchRadius;
  });
};

export default filterEventsWithRadius;
