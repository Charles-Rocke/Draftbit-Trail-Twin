import * as posthog from '../custom-files/posthog';

const posthogEventCapture = (event, message) => {
  posthog.posthog.capture(`${event}`, { payload: `${message}` });
};

export default posthogEventCapture;
