import React from 'react';

const formatTime = time => {
  // Split the time into hours, minutes, and seconds
  const [hours, minutes] = time.split(':');
  let hour = parseInt(hours, 10);
  const minute = parseInt(minutes, 10);

  // Determine AM/PM
  const period = hour >= 12 ? 'PM' : 'AM';
  hour = hour % 12 || 12; // Convert hour to 12-hour format, handle 0 as 12

  // Format minutes to always be two digits
  const formattedMinutes = minute < 10 ? '0' + minute : minute;

  return `${hour}:${formattedMinutes} ${period}`;
};

export default formatTime;
