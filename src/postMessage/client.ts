import { CHANNEL_ESTABLISHED, ESTABLISH_CHANNEL, IMessage } from "./defs";

export class Client extends EventTarget {
  private port: MessagePort | null = null;

  window: Window = window;

  constructor(params?: { window?: Window }) {
    super();

    if (params?.window) {
      this.window = params.window;
    }
  }

  connect(params?: { ready?: () => {} }): void {
    const onMessage = (event: MessageEvent) => {
      console.log("message >>", event.data.type);

      if (!event.source) return;

      if (event.data.type === ESTABLISH_CHANNEL && event.ports[0]) {
        this.listenToPort(event.ports[0]);

        /**
         * One time usage of window.parent.postMessage in order to establish the connection.
         */
        event.source.postMessage({ type: CHANNEL_ESTABLISHED });
        params?.ready?.();
      }
    };

    this.window.addEventListener("message", onMessage);
  }

  notify<T>(type: string, payload: T): void {
    if (!this.port) {
      console.error("port is not established");
      return;
    }

    this.port.postMessage({ type, payload });
  }

  close(): void {
    if (this.port) {
      this.port.close();
      this.port = null;
    }
  }

  private listenToPort(port: MessagePort): void {
    this.port = port;
    port.onmessage = (event) => {
      this.handleMessage(event);
    };

    port.start();
  }

  private handleMessage<T extends IMessage>(event: MessageEvent<T>): void {
    const { data } = event;
    if (!data || typeof data !== "object" || !("type" in data)) {
      console.error("unexpected message:", data);
      return;
    }

    this.dispatchEvent(new CustomEvent(data.type, { detail: data.payload }));
  }
}
