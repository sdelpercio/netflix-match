import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setroom] = useState("");

  return (
    <div>
      <h1>Join a room</h1>
      <input
        type="text"
        placeholder="your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="room name"
        value={room}
        onChange={(e) => setroom(e.target.value)}
      />
      <Link
        onClick={(e) => (!name || !room ? e.preventDefault() : null)}
        to={`/match/${name}/${room}`}
      >
        <button type="submit">Join</button>
      </Link>
    </div>
  );
};
export default Join;
