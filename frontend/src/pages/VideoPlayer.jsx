import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  GET_COMMENTS_URL,
  GET_VIDEO_BY_ID_URL,
  GET_VIDEOS_URL,
  CREATE_COMMENT_URL,
} from "../utils/URLs";
import { useSelector } from "react-redux";

export const VideoPlayer = () => {
  const auth = useSelector((state) => state.configs.auth);
  const [comment, setComment] = useState("");
  const { videoId } = useParams();
  const [video, setVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchVideoDetails();
    fetchComments();
    fetchRecommendedVideos();
  }, [videoId]);

  useEffect(() => {
    if (video) {
      updateViews();
    }
  }, [video]);

  const updateViews = async () => {
    try {
      const response = await fetch(`${GET_VIDEO_BY_ID_URL}/${videoId}/views`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ views: video.views + 1 }),
      });
      if (response.ok) {
        console.log("Views updated successfully");
      }
    } catch (error) {
      console.log("Error updating views:", error);
    }
  };

  const fetchVideoDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${GET_VIDEO_BY_ID_URL}/${videoId}`);
      if (!response.ok) throw new Error("Failed to fetch video details");
      const data = await response.json();
      setVideo(data);
      setLikes(data.likes);
      setDislikes(data.dislikes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(`${GET_COMMENTS_URL}/${videoId}`);
      const data = await response.json();
      setComments(data.data);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  const fetchRecommendedVideos = async () => {
    try {
      const response = await fetch(GET_VIDEOS_URL);
      const data = await response.json();
      const filteredVideos = data.filter((video) => video._id !== videoId);
      setRecommendedVideos(filteredVideos);
    } catch (error) {
      console.log("Error fetching recommended videos:", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`${GET_VIDEO_BY_ID_URL}/${videoId}/likes`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ likes: video.likes + 1 }),
      });
      if (response.ok) {
        setLikes((prev) => prev + 1);
      }
    } catch (error) {
      console.log("Error updating likes:", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(
        `${GET_VIDEO_BY_ID_URL}/${videoId}/dislikes`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ dislikes: video.dislikes + 1 }),
        }
      );
      if (response.ok) {
        setDislikes((prev) => prev + 1);
      }
    } catch (error) {
      console.log("Error updating dislikes:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(CREATE_COMMENT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          videoId,
          text: comment,
        }),
      });
      if (response.ok) {
        fetchComments();
        setComment("");
        e.target.reset();
      }
    } catch (error) {
      console.log("Error adding comment:", error);
    }
  };

  if (!video || loading)
    return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-600">{error}</div>;

  return (
    <div className="bg-[#f9f9f9] p-2 md:p-4 lg:p-5">
      <div className="max-w-[1800px] mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Main Content */}
        <div className="w-full lg:w-[70%]">
          {/* Video Player */}
          <div className="mb-4 lg:mb-5">
            <video controls className="w-full h-auto rounded-xl">
              <source src={video.videoUrl} type="video/mp4" />
            </video>
          </div>

          {/* Video Info */}
          <div className="bg-white p-3 md:p-4 lg:p-5 rounded-xl mb-4">
            <h1 className="text-lg md:text-xl font-bold mb-4">{video.title}</h1>

            {/* Channel Info and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src={video.channelId.avatarUrl}
                  alt={video.channelId.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h3 className="font-medium">{video.channelId.name}</h3>
                  <span className="text-gray-600 text-sm">
                    {video.views.toLocaleString()} views
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={handleLike}
                  disabled={!auth?.email}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <span>👍</span> {likes}
                </button>
                <button
                  onClick={handleDislike}
                  disabled={!auth?.email}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <span>👎</span> {dislikes}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  Share
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full hover:bg-gray-200">
                  Save
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="whitespace-pre-wrap">{video.description}</p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white p-3 md:p-4 lg:p-5 rounded-xl">
            <h3 className="text-lg font-bold mb-4">
              {comments.length} Comments
            </h3>

            {/* Comment Input */}
            <div className="mb-8">
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder={
                      auth?.email
                        ? "Add a comment..."
                        : "Please login to comment"
                    }
                    disabled={!auth?.email}
                    className="w-full p-3 border-b border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  {comment && (
                    <div className="flex justify-end gap-3 mt-3">
                      <button
                        onClick={() => setComment("")}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-full"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCommentSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                      >
                        Comment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{comment.userId.name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{comment.text}</p>
                    <div className="flex gap-4 mt-2">
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        👍 Like
                      </button>
                      <button className="text-sm text-gray-500 hover:text-gray-700">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Videos */}
        <div className="w-full lg:w-[30%] bg-white p-3 md:p-4 lg:p-5 rounded-xl h-fit">
          <h3 className="font-bold mb-4">Recommended Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {recommendedVideos.map((recommendedVideo) => (
              <Link
                to={`/watch/${recommendedVideo._id}`}
                key={recommendedVideo._id}
                className="flex gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-colors"
              >
                <img
                  src={recommendedVideo.thumbnail}
                  alt={recommendedVideo.title}
                  className="w-32 h-20 md:w-40 md:h-24 rounded-lg object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2">
                    {recommendedVideo.title}
                  </h4>
                  <p className="text-gray-600 text-xs mt-1">
                    {recommendedVideo.channelId.name}
                  </p>
                  <p className="text-gray-600 text-xs">
                    {recommendedVideo.views.toLocaleString()} views
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
