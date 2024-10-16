const checkArrayBuffer = arrayBuffer => {
  // Ensure the arrayBuffer has data
  if (arrayBuffer.byteLength === 0) {
    console.error(
      'The arrayBuffer size is 0 bytes. The conversion may have failed.'
    );
    return 'File conversion failed, arrayBuffer size is 0 bytes.';
  }
  return { success: true };
};

export default checkArrayBuffer;
