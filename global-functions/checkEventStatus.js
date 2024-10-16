const checkEventStatus = eventStatus => {
  if (eventStatus === 'Previous') {
    return 'yes';
  } else {
    return null;
  }
};

export default checkEventStatus;
