import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProfiles } from "../store/profileSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((state) => state.profiles);
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const inputRef = useRef(null);

  // Update search query in Redux when local state changes, with debounce
  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(searchProfiles(localSearchQuery));
    }, 300); // 300ms debounce

    return () => clearTimeout(timerId);
  }, [localSearchQuery, dispatch]);

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="search"
          value={localSearchQuery}
          onChange={handleSearchChange}
          className="block w-full p-2 pl-10 pr-8 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Search profiles..."
          aria-label="Search profiles"
        />
        {localSearchQuery && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <svg
              className="w-4 h-4 text-gray-500 hover:text-gray-900"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
