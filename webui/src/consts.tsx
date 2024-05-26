export const WS_URL = `ws://${
  location.host.endsWith(":5173") || location.host.endsWith(":1420")
    ? "localhost:6076"
    : location.host
}`;
