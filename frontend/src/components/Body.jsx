import { useEffect } from "react";
import { VideoCard } from "./videoCard";
import { GET_VIDEOS_URL } from "../utils/URLs";
import { FilterButtons } from "./FilterButtons";
import { useDispatch, useSelector } from "react-redux";
import { setVideos } from "../redux/slices/videosSlice";

export const Body = () => {
  const videos = useSelector((state) => state.videos);
  const { searchText, selectedGenre } = useSelector((state) => state.filters);

  const filteredVideos = videos.filter((video) => {
    const titleMatch = video.title
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const genreMatch = selectedGenre === "All" || video.genre === selectedGenre;
    return titleMatch && genreMatch;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(GET_VIDEOS_URL);
        const data = await response.json();
        dispatch(setVideos(data));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="flex flex-col flex-1 w-full">
      <FilterButtons />
      <div className="flex-1 p-2 sm:p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 overflow-y-auto">
        {filteredVideos.length > 0 ? (
          filteredVideos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))
        ) : (
          <div className="col-span-full text-center text-base sm:text-lg text-gray-600 mt-6 sm:mt-10">
            No videos found for your search criteria
          </div>
        )}
      </div>
    </div>
  );
};
