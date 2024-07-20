import React from 'react';

// Checks is the event date is in the past.
const isPastEvent = eventDate => {
  const isPastEvent = eventDate => {
    const today = new Date();
    const eventDateObj = new Date(eventDate);
    return eventDateObj < today;
  };
};

export default isPastEvent;
