import React from 'react';
import * as posthog from '../custom-files/posthog';

const eventCreated = async eventName => {
  // Type the code for the body of your function or hook here.
  // Functions can be triggered via Button/Touchable actions.
  // Hooks are run per ReactJS rules.

  /* String line breaks are accomplished with backticks ( example: `line one
line two` ) and will not work with special characters inside of quotes ( example: "line one line two" ) */
  // Directly call posthog.capture
  try {
    await posthog.default.capture(eventName);
    console.log('Event captured successfully');
  } catch (error) {
    console.error('Error capturing event:', error);
  }

  return null;
};

export default eventCreated;
