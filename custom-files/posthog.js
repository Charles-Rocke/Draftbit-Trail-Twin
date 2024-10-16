// This import is required if you are defining react components in this module.
import PostHog from 'posthog-react-native';

const posthog = new PostHog('phc_MZWhGJ0d9UoaTmLRTdanpgmjUUEUmIFM2D7cs8G9Wob', {
  // usually 'https://us.i.posthog.com' or 'https://eu.i.posthog.com'
  host: 'https://us.i.posthog.com', // host is optional if you use https://us.i.posthog.com
});

export { posthog };
// Define and export your components as named exports here.

// You can use components exported from this file within a Custom Code component as
// <CustomCode.MyExampleComponent />
// export const MyExampleComponent = () => <Text>Hello world!</Text>;
