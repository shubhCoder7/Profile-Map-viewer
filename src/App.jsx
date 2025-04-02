import React from "react";
import { useSelector } from "react-redux";
import ProfileList from "./components/ProfileList";
import MapView from "./components/MapView";
import SearchBar from "./components/SearchBar";

function App() {
  const { selectedProfile, filteredProfiles } = useSelector(
    (state) => state.profiles
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 md:p-6 shadow-md">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">Profile Map Viewer</h1>
          <p className="mt-1 md:mt-2 text-sm md:text-base">
            View user profiles and their locations on the map
          </p>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-semibold mb-2 md:mb-0">
                User Profiles
                {filteredProfiles.length < 4 && (
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    (Showing {filteredProfiles.length} of 4)
                  </span>
                )}
              </h2>
              <div className="w-full md:w-64 lg:w-80">
                <SearchBar />
              </div>
            </div>
            <ProfileList />
          </div>

          <div className="mt-6 lg:mt-0">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">
              {selectedProfile
                ? `${selectedProfile.name}'s Location`
                : "Map View"}
            </h2>
            <div className="h-[350px] md:h-[450px] lg:h-[500px] bg-white rounded-lg shadow-md overflow-hidden">
              <MapView />
            </div>
            {selectedProfile && (
              <div className="mt-3 p-3 bg-white rounded-lg shadow-sm text-sm">
                <p className="font-medium">Address:</p>
                <p className="text-gray-600">{selectedProfile.address}</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-4 md:p-6 mt-8 md:mt-12">
        <div className="container mx-auto text-center text-sm md:text-base">
          <p>Profile Map Viewer &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
