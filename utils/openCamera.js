import { Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import assetToBase64 from './assetToBase64';

async function openCamera({
  mediaTypes = ImagePicker.MediaTypeOptions.Images,
  allowsEditing = false,
  cameraType = 'back',
  videoMaxDuration,
  quality = 1,
  showAlertOnPermissionError = true,
  permissionErrorMessage = 'Sorry, we need camera permissions to make this work.',
  outputBase64 = true,
}) {
  if (Platform.OS !== 'web') {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      console.error('Camera permissions were not granted.');
      if (showAlertOnPermissionError) {
        alert(permissionErrorMessage);
      }
      return;
    }
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes,
    allowsEditing,
    cameraType,
    videoMaxDuration,
    quality,
  });

  if (result.canceled) {
    console.error('Open camera action was canceled');
    return;
  }

  const assets = result.assets;

  if (!assets || assets.length === 0) {
    console.error('No assets were returned with the open camera action');
    return;
  }
  if (!outputBase64) {
    return assets[0];
  }
  return await assetToBase64(assets[0]);
}

export default openCamera;
