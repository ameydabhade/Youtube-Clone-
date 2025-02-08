import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export const ChannelPage = () => {
  const [videos, setVideos] = useState([]);
  const { channelId } = useParams();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.configs.auth);

  useEffect(() => {
    const fetchChannelData = async () => {
      // You'll need to implement this API endpoint
      const videosResponse = await fetch(
        `http://localhost:3000/api/videos/channel/${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      const videosResponseData = await videosResponse.json();
      setVideos(videosResponseData);
    };
    fetchChannelData();
  }, [channelId]);

  if (!videos) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Channel Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Link to={`/watch/${video._id}`} key={video._id}>
            <div
              key={video._id}
              className="cursor-pointer"
              onClick={() => navigate(`/watch/${video._id}`)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h3 className="mt-2 font-semibold">{video.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
