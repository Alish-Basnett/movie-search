import React, { useState } from "react";
import {
  HeartIcon,
  ThumbDownIcon,
  PlusIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";

const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative bg-gray-900 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer min-w-[200px] min-h-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie.poster}
        alt={`${movie.title} Poster`}
        className={`w-full h-full object-cover transition-transform duration-300 ${
          isHovered ? "scale-110" : ""
        }`}
      />
      <div
        className={`absolute bottom-0 w-full p-4 bg-gradient-to-t from-black via-transparent to-transparent transition-transform duration-300 ${
          isHovered ? "translate-y-0" : "translate-y-20"
        }`}
      >
        <h3 className="text-lg font-bold text-white truncate">{movie.title}</h3>
      </div>
      {isHovered && (
        <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-center items-center p-4 transition-opacity duration-300 opacity-100">
          <div className="flex gap-4 mb-4 animate-slideUp">
            <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors">
              <HeartIcon className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors">
              <ThumbDownIcon className="w-5 h-5" />
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
          <div className="bg-gray-800 text-white p-4 rounded-lg animate-fadeIn">
            <p className="text-sm">Expand for more details...</p>
            <button className="mt-2 flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition-colors">
              <InformationCircleIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
