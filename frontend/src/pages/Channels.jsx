import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { GET_USER_CHANNELS_URL } from "../utils/URLs";

export const Channels = () => {
  const [channels, setChannels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChannels = async () => {
      const auth = JSON.parse(localStorage.getItem("auth"));
      const response = await fetch(GET_USER_CHANNELS_URL, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      const responseData = await response.json();

      setChannels(responseData);
    };
    fetchChannels();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Channels</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {channels.map((channel) => (
          <div
            key={channel._id}
            className="cursor-pointer bg-white p-4 rounded-lg shadow"
            onClick={() => navigate(`/channel/${channel._id}`)}
          >
            <img
              src={channel.avatarUrl}
              alt={channel.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="mt-2 text-xl font-semibold">{channel.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
