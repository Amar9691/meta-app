import Pusher from "pusher";
import ClientPusher from "pusher-js";

export const serverPusher = new Pusher({
  appId: "",
  key: "",
  secret: "",
  cluster: "ap2",
  useTLS: true,
});

export const clientPusher = new ClientPusher("", {
  cluster: "ap2",
});
