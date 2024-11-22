import React, { useState } from "react";
import Chatroom from "./chatroom";

const Appp = () => {
  const [roomId, setRoomId] = useState("general");

  return (
    <div>
      <label>
        Choose the Chatroom:{" "}
        <select
          value={roomId}
          onChange={(e) => {
            setRoomId(e.target.value);
          }}
        >
          <optgroup>
            <option value={"genral"}>general</option>
            <option value={"travel"}>travel</option>
            <option value={"music"}>music</option>
          </optgroup>
        </select>
      </label>
      <hr />
      <Chatroom roomId={roomId} />
    </div>
  );
};

export default Appp;
