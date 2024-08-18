import React, { useState, useEffect, useRef } from "react";
import { movies } from "../data/data";
import MovieCard from "./MovieCard";
import { ChevronDownIcon } from "@heroicons/react/solid";

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const movieTypes = ["All Types", "Movie", "Series", "Episode"];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearchTerm =
      searchTerm === "" ||
      movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = yearFilter === "" || movie.year === yearFilter;
    const matchesType =
      typeFilter === "" || movie.type.toLowerCase() === typeFilter;

    return matchesSearchTerm && matchesYear && matchesType;
  });

  const handleOptionSelect = (option) => {
    const selectedType = option === "All Types" ? "" : option.toLowerCase();
    setTypeFilter(selectedType);
    setIsDropdownOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
      <div className="mb-8 flex flex-col items-center gap-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title"
          className="w-full md:w-1/2 p-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
        />
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-1/2">
          <input
            type="text"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            placeholder="Filter by year"
            className="w-full p-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
          />
          <div className="relative w-full">
            <div
              className="flex items-center justify-between p-4 border border-gray-700 rounded-lg bg-gray-800 text-white cursor-pointer focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              ref={dropdownRef}
            >
              <span>
                {typeFilter
                  ? typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)
                  : "All Types"}
              </span>
              <ChevronDownIcon className="w-5 h-5" />
            </div>
            {isDropdownOpen && (
              <ul className="absolute mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg z-10">
                {movieTypes.map((type) => (
                  <li
                    key={type}
                    className={`p-4 text-white hover:bg-gray-700 ${
                      type.toLowerCase() === typeFilter ? "bg-gray-700" : ""
                    }`}
                    onClick={() => handleOptionSelect(type)}
                  >
                    {type}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No movies found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieSearch;
