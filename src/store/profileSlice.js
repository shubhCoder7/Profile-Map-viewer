import { createSlice } from '@reduxjs/toolkit';

const initialProfiles = [
    {
        id: 1,
        name: 'Elle Woods',
        photo: 'https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'Software Engineer with 5 years of experience in React development',
        address: '350 5th Ave, New York, NY 10118',
        coordinates: { lat: 40.748817, lng: -73.985428 }
    },
    {
        id: 2,
        name: 'Jane Smith',
        photo: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        description: 'UX Designer specializing in mobile application interfaces',
        address: '1600 Amphitheatre Parkway, Mountain View, CA',
        coordinates: { lat: 37.4224764, lng: -122.0842499 }
    },
    {
        id: 3,
        name: 'Jeon JungKook',
        photo: 'https://imgs.search.brave.com/8ntIROyI0i-IZ8JJrmv88I4u8ryLsU9DMmmGL1v0Ysk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk56UTNPRFl5/TVRRdFkySmhZeTAw/WVRBM0xXRXlNekl0/TldZNE9ERXpOMlU1/T1RFeFhrRXlYa0Zx/Y0djQC5qcGc',
        description: 'Data Scientist with expertise in machine learning algorithms',
        address: '221 Baker St, London, UK',
        coordinates: { lat: 51.5237, lng: -0.1585 }
    },
    {
        id: 4,
        name: 'Emily Davis',
        photo: 'https://imgs.search.brave.com/Yj6a_Tx5gEekwIwHC7R8xhwhxpqg5l5N3Th3pTvd4N8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzIzLzgwLzUx/LzM2MF9GXzUyMzgw/NTE3MV9mWFNGajNI/OFZ6Z2o3VlluU3ZK/aHFIaVcxaXgxWU5z/cS5qcGc',
        description: 'Marketing Manager with a passion for digital strategy',
        address: '1 Hacker Way, Menlo Park, CA',
        coordinates: { lat: 37.4845, lng: -122.1480 }
    },
];

const profileSlice = createSlice({
    name: 'profiles',
    initialState: {
        profiles: initialProfiles,
        filteredProfiles: initialProfiles,
        selectedProfile: null,
        isMapLoading: false,
        mapError: null,
        searchQuery: ''
    },
    reducers: {
        selectProfile: (state, action) => {
            if (state.selectedProfile && state.selectedProfile.id === action.payload.id) {
                return;
            }
            state.selectedProfile = action.payload;
            state.isMapLoading = true;
            state.mapError = null;

            setTimeout(() => {
                if (state.isMapLoading) {
                    state.isMapLoading = false;
                }
            }, 3000);
        },
        setMapLoaded: (state) => {
            state.isMapLoading = false;
        },
        setMapError: (state, action) => {
            state.mapError = action.payload;
            state.isMapLoading = false;
        },
        searchProfiles: (state, action) => {
            state.searchQuery = action.payload;

            if (!action.payload.trim()) {
                state.filteredProfiles = state.profiles;
                return;
            }

            const searchTermLower = action.payload.toLowerCase();
            state.filteredProfiles = state.profiles.filter(profile =>
                profile.name.toLowerCase().includes(searchTermLower) ||
                profile.description.toLowerCase().includes(searchTermLower) ||
                profile.address.toLowerCase().includes(searchTermLower)
            );
        }
    }
});

export const { selectProfile, setMapLoaded, setMapError, searchProfiles } = profileSlice.actions;
export default profileSlice.reducer; 