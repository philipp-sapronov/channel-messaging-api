export interface IMessage {
  type: string;
  payload: any;
}

export const ESTABLISH_CHANNEL = "establish-channel";
export const CHANNEL_ESTABLISHED = "channel-established";
