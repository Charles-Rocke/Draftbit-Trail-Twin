import { Platform, Share } from 'react-native';

const openShare = text => {
  const isUrl = text.startsWith('http://') || text.startsWith('https://');
  const isIOS = Platform.OS === 'ios';

  Share.share({
    url: isIOS && isUrl ? text : undefined,
    message: !isIOS || !isUrl ? text : undefined,
  });
};

export default openShare;
