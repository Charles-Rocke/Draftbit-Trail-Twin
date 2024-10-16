async function waitMilliseconds({ milliseconds }) {
  return new Promise(res => setTimeout(res, milliseconds));
}
export default waitMilliseconds;
