import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setroom] = useState("");

  return (
    <div className="m-auto mt-20 w-80 md:w-96">
      <div className="flex flex-col items-center justify-evenly w-full h-60 shadow-xl rounded-2xl">
        <h1 className="font-bold text-2xl">Join a room</h1>
        <input
          type="text"
          placeholder="your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow-inner h-10 w-3/4 text-lg pl-2"
        />
        <input
          type="text"
          placeholder="room name"
          value={room}
          onChange={(e) => setroom(e.target.value)}
          className="shadow-inner h-10 w-3/4 text-lg pl-2"
        />
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/match/${name}/${room}/genres`}
          className="flex justify-center align-center shadow-md rounded-lg text-2xl font-extrabold w-1/2 transition duration-300 ease-in-out bg-white hover:bg-red-600 hover:text-white transform hover:-translate-y-1 hover:scale-110"
        >
          <button type="submit">Join</button>
        </Link>
      </div>
    </div>
  );
};
export default Join;
