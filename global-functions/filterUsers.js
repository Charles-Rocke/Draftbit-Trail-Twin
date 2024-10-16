const filterUsers = (
  data,
  nameFilter,
  ageFilter,
  locationFilter,
  skillLevelFilter,
  ridingStyleFilter,
  lookingForFilter
) => {
  return Object.values(data).filter(user => {
    // Convert all user fields to strings to support partial matching
    const userStringified = JSON.stringify(user).toLowerCase();

    // Check for filters and see if each is included in the corresponding user data (case-insensitive)
    const nameMatch =
      !nameFilter || userStringified.includes(nameFilter.toLowerCase());
    const ageMatch =
      !ageFilter || userStringified.includes(ageFilter.toString());
    const locationMatch =
      !locationFilter || userStringified.includes(locationFilter.toLowerCase());
    const skillLevelMatch =
      !skillLevelFilter ||
      userStringified.includes(skillLevelFilter.toLowerCase());
    const ridingStyleMatch =
      !ridingStyleFilter ||
      ridingStyleFilter.some(style =>
        userStringified.includes(style.toLowerCase())
      );
    const lookingForMatch =
      !lookingForFilter ||
      lookingForFilter.some(looking =>
        userStringified.includes(looking.toLowerCase())
      );

    // Return true if all filters match
    return (
      nameMatch &&
      ageMatch &&
      locationMatch &&
      skillLevelMatch &&
      ridingStyleMatch &&
      lookingForMatch
    );
  });
};

export default filterUsers;
