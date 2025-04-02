import React from "react";
import { useDispatch } from "react-redux";
import { selectProfile } from "../store/profileSlice";

const ProfileCard = ({ profile }) => {
  const dispatch = useDispatch();

  const handleShowOnMap = () => {
    dispatch(selectProfile(profile));

    // On mobile, scroll to the map section when a profile is selected
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        const mapElement = document.querySelector(".h-\\[350px\\]");
        if (mapElement) {
          const y =
            mapElement.getBoundingClientRect().top + window.pageYOffset - 20;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full group">
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={profile.photo}
          alt={profile.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-10 pb-3 px-4">
          <h2 className="text-white text-lg font-semibold">{profile.name}</h2>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col">
        <p className="text-gray-700 text-sm md:text-base flex-grow">
          {profile.description}
        </p>
        <p
          className="text-gray-500 text-xs md:text-sm mt-3 truncate"
          title={profile.address}
        >
          {profile.address}
        </p>
        <button
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center gap-2"
          onClick={handleShowOnMap}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          Show on Map
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
