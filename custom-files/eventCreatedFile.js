// This import is required if you are defining react components in this module.
import React, { useEffect } from 'react';

// Add any other imports you need here. Make sure to add those imports (besides "react"
// and "react-native") to the Packages section.
// import { Text } from 'react-native';

// Define and export your components as named exports here.
import { posthog } from './posthog';
// Define the eventCreated function

export { posthog } from './posthog';
// You can use components exported from this file within a Custom Code component as
// <CustomCode.MyExampleComponent />
// export const MyExampleComponent = () => <Text>Hello world!</Text>;
