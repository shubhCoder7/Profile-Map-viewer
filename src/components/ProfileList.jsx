import React from "react";
import { useSelector } from "react-redux";
import ProfileCard from "./ProfileCard";

const ProfileList = () => {
  const { filteredProfiles } = useSelector((state) => state.profiles);

  return (
    <>
      {filteredProfiles.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 text-center">
          <p>No profiles match your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
          {filteredProfiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProfileList;
