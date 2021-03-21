import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export function configuredStompClient(webSocketAddress) {
  return Stomp.over(() => new SockJS(webSocketAddress));
}
