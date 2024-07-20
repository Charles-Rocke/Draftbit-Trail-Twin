import React from 'react';

// Runs a daily check for isPastEvent function, if true, deletes the event.
const checkAndDeletePastEvents = () => {
  const checkAndDeletePastEvents = async () => {
    const events = await fetchEvents(); // Fetch your events from Supabase
    events.forEach(event => {
      if (isPastEvent(event.date)) {
        deleteEvent(event.id);
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(
      checkAndDeletePastEvents,
      24 * 60 * 60 * 1000
    ); // Run once a day

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);
};

export default checkAndDeletePastEvents;
