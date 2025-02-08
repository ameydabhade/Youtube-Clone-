import { useDispatch, useSelector } from "react-redux";
import { genres } from "../utils/constants";
import { setSelectedGenre } from "../redux/slices/filtersSlice";

export const FilterButtons = () => {
  const dispatch = useDispatch();
  const selectedGenre = useSelector((state) => state.filters.selectedGenre);

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div className="flex gap-3 px-4 py-3 min-w-max md:gap-5 md:px-6">
        {genres.map((genre) => (
          <button
            key={genre}
            onClick={() => dispatch(setSelectedGenre(genre))}
            className={`whitespace-nowrap px-3 py-1 text-sm rounded-lg md:px-4 md:text-base ${
              selectedGenre === genre
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};
