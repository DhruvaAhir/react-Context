export const createConnection = ({ serverUrl, roomId }) => {
  if (typeof serverUrl !== "string") {
    throw Error("Expected serverUrl to be a string. Received: " + serverUrl);
  }
  if (typeof roomId !== "string") {
    throw Error("Expected roomId to be a string. Received: " + roomId);
  }
  let intervalId;
  let messsageCallback;
  return {
    connect() {
      console.log(
        '✅ Connecting to "' + roomId + '" room at ' + serverUrl + "..."
      );
      clearInterval(intervalId);
      intervalId = setInterval(() => {
        if (messsageCallback) {
          if (Math.random() > 0.5) {
            messsageCallback("hey");
          } else {
            messsageCallback("bye");
          }
        }
      }, 3000);
    },
    disconnect() {
      clearInterval(intervalId);
      messsageCallback = null;
      console.log(
        '❌ Disconnected from "' + roomId + '" room at ' + serverUrl + ""
      );
    },
    on(event, callback) {
      if (messsageCallback) {
        throw Error("Cannot add the handler twice");
      }
      if (event !== "messsage") {
        throw Error('Only "Message" event is Supported.');
      }
      console.log('🎇 Connected to "' + roomId + '" room at ' + serverUrl + "");
      messsageCallback = callback;
    },
  };
};
