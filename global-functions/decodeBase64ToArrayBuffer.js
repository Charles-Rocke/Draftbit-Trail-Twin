import * as base64decode from '../custom-files/base64decode';

const decodeBase64ToArrayBuffer = base64String => {
  console.log(
    'TYPE OF base64decode.decode(base64String): ',
    typeof base64decode.decode(base64String)
  );
  return base64decode.decode(base64String);
};

export default decodeBase64ToArrayBuffer;
