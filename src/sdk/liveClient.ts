import { EventEmitter } from "eventemitter3";
import WebSocket, { MessageEvent } from "isomorphic-ws";

export class LiveClient extends EventEmitter {
  public ws: WebSocket;

  constructor(
    apiKey: string,
    agentId: string,
    sampleRate: number,
    agentPromptParams: { name: string; value: string }[],
    baseEndpoint: string
  ) {
    super();

    let endpoint =
      baseEndpoint +
      "/create-web-call?api_key=" +
      apiKey +
      "&agent_id=" +
      agentId +
      "&sample_rate=" +
      sampleRate;
    for (const param of agentPromptParams) {
      endpoint += "&agent_prompt_params=" + JSON.stringify(param);
    }
    this.ws = new WebSocket(endpoint);
    this.ws.binaryType = "arraybuffer";
  }

  waitForReady() {
    return new Promise<void>((resolve, reject) => {
      const onError = (error: any) => {
        reject(error); // Reject on error
      };
      this.ws.onerror = onError;

      const onClose = () => {
        reject("websocket closed before ready.");
      };
      this.ws.onclose = onClose;

      const onMessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data as string);
          if (data.status === "ready") {
            // Remove all registered listeners for cleaner future processing.
            this.ws.removeEventListener("error", onError);
            this.ws.removeEventListener("close", onClose);
            this.ws.removeEventListener("message", onMessage);
            // Emit audio
            this.ws.onmessage = (event) => {
              const audio: ArrayBuffer = event.data as ArrayBuffer;
              this.emit("audio", new Uint8Array(audio));
            };
            this.ws.onclose = (event) => {
              this.emit("close", event);
            };
            resolve(); // Resolve when the ready message is received
          }
        } catch (error) {
          // Handle JSON parsing error
          reject("malformed ready event.");
        }
      };
      this.ws.onmessage = onMessage;
    });
  }

  send(audio: Uint8Array) {
    if (this.ws.readyState === 1) this.ws.send(audio);
  }

  close() {
    this.ws.close();
  }
}

export function convertUint8ToFloat32(array: Uint8Array): Float32Array {
  const targetArray = new Float32Array(array.byteLength / 2);

  // A DataView is used to read our 16-bit little-endian samples out of the Uint8Array buffer
  const sourceDataView = new DataView(array.buffer);

  // Loop through, get values, and divide by 32,768
  for (let i = 0; i < targetArray.length; i++) {
    targetArray[i] = sourceDataView.getInt16(i * 2, true) / Math.pow(2, 16 - 1);
  }
  return targetArray;
}

export function convertFloat32ToUint8(array: Float32Array): Uint8Array {
  const buffer = new ArrayBuffer(array.length * 2);
  const view = new DataView(buffer);

  for (let i = 0; i < array.length; i++) {
    const value = array[i] as number * 32768;
    view.setInt16(i * 2, value, true); // true for little-endian
  }

  return new Uint8Array(buffer);
}
