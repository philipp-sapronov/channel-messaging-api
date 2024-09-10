import { CHANNEL_ESTABLISHED, ESTABLISH_CHANNEL, IMessage } from "./defs";

export class Host extends EventTarget {
  private ports: Record<string, MessagePort> = {};
  private pollingIntervals: Record<string, number> = {};

  connect(params: {
    clientOrigin: string;
    clientWindow?: Window;
    pollingTimeout?: number;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
  }): void {
    const {
      clientOrigin,
      pollingTimeout = 1000,
      clientWindow,
      onSuccess,
      onError,
    } = params;

    if (clientOrigin in this.pollingIntervals) {
      console.warn(`Polling already in progress for ${clientOrigin}`);
      return;
    }

    if (clientOrigin in this.ports) {
      console.warn(`Channel already exists for origin ${clientOrigin}`);
      return;
    }

    const channel = new MessageChannel();

    const connect = () => {
      try {
        (clientWindow || window).postMessage(
          { type: ESTABLISH_CHANNEL },
          clientOrigin,
          [channel.port2]
        );
      } catch (e) {
        onError?.(e as Error);
      }
    };

    const onConnected = (event: MessageEvent) => {
      if (event.data.type !== CHANNEL_ESTABLISHED) {
        return;
      }

      this.stopPolling(clientOrigin);
      onSuccess?.();
      window.removeEventListener("message", onConnected);
    };

    window.addEventListener("message", onConnected);

    this.pollingIntervals[clientOrigin] = window.setInterval(
      connect,
      pollingTimeout
    );

    this.ports[clientOrigin] = channel.port1;
    channel.port1.onmessage = (event) => {
      this.handleMessage(event);
    };

    channel.port1.start();
  }

  notify<T>(type: string, payload: T, targetOrigin: string): void {
    const port = this.ports[targetOrigin];

    if (port) {
      port.postMessage({
        type,
        payload,
      });
    } else {
      console.error(`No port found for origin ${targetOrigin}`);
    }
  }

  close(targetOrigin: string): void {
    const port = this.ports[targetOrigin];
    if (port) {
      port.close();
      delete this.ports[targetOrigin];
    }
  }

  private handleMessage<T extends IMessage>(event: MessageEvent<T>): void {
    const { data } = event;
    if (!data || typeof data !== "object" || !("type" in data)) {
      console.error("Unexpected message:", data);
      return;
    }

    this.dispatchEvent(new CustomEvent(data.type, { detail: data.payload }));
  }

  private stopPolling(clientOrigin: string): void {
    const pollingInterval = this.pollingIntervals[clientOrigin];

    if (pollingInterval !== undefined) {
      clearInterval(pollingInterval);
      delete this.pollingIntervals[clientOrigin];
    }
  }
}
