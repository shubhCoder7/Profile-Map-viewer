# Profile Map Viewer

A modern React application that allows users to view profiles and their locations on an interactive map.

## 🌟 Features

- **Profile Display**: Browse through user profile cards with photos, names, and descriptions
- **Interactive Map**: View profile locations on an interactive map using Leaflet and OpenStreetMap
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop
- **Search Functionality**: Search through profiles by name, description, or address
- **Loading Indicators**: Visual feedback during map loading
- **Error Handling**: Graceful error handling for map loading issues

## 🛠️ Technologies Used

- **React 19**: For building the user interface
- **Redux Toolkit**: For state management
- **React Leaflet**: For interactive maps
- **Tailwind CSS v4**: For styling
- **Vite**: For fast development and building

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/shubhCoder7/Profile-Map-viewer.git
   cd Profile-Map-viewer
   ```

2. Install the dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and visit:
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
src/
├── components/       # UI components
│   ├── MapView.jsx   # Map component using Leaflet
│   ├── ProfileCard.jsx  # Profile card component
│   ├── ProfileList.jsx  # List of profile cards
│   └── SearchBar.jsx    # Search functionality
├── store/            # Redux store
│   └── profileSlice.js  # Profile state management
├── App.jsx           # Main application component
└── main.jsx          # Entry point
```

## 📱 Usage

1. Browse through the profiles on the left side of the screen
2. Click "Show on Map" on any profile to view their location
3. Use the search bar to filter profiles by name, description, or address
4. Interact with the map using the zoom controls

## 🔜 Future Enhancements

- Admin panel for managing profiles
- Detailed profile view
- User authentication
- Dark mode support
- Custom map markers
- Profile grouping and clustering on map

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
