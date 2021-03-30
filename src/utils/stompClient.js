import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function configuredStompClient(webSocketAddress) {
  const client = Stomp.over(() => new SockJS(webSocketAddress));
  client.debug = (f) => f;
  return client;
}
