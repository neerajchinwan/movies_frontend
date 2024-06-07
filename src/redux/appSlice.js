import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies: [],
    currentMovie: null,
    openForm: false,
    openEdit: false,
    openDelete: false,
    openView: false,
    loading: false,
    error: null,
    totalMovieCount: null,
    currentPage: 1
}

const appSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {
        addForm: (state) => {
            state.openForm = !state.openForm
        },
        openDeletePopup: (state) => {
            state.openDelete = !state.openDelete
        },
        openViewPopup: (state) => {
            state.openView = !state.openView
        },
        openEditPopup: (state) => {
            state.openEdit = !state.openEdit
        },
        fetchAllMoviesStart: (state) => {
            state.loading = true;
        },
        fetchAllMoviesSuccess: (state, action) => {
            state.loading = false;
            state.movies = action.payload;
            state.error = null;
        },
        fetchAllMoviesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload
        },
        addCurrentMovie: (state, action) => {
            state.currentMovie = action.payload;
        },
        deleteMovieSuccess: (state, action) => {
            const index = state.movies.findIndex(movie => movie._id === action.payload._id);
            state.movies.splice(index, 1)
        },
        addNewMovie: (state, action) => {
            state.movies.unshift(action.payload)
        },
        updateMovie: (state, action) => {
            const index = state.movies.findIndex(movie => movie._id === action.payload._id);
            state.movies.splice(index, 1, action.payload)
        },
        movieCount: (state, action) => {
            state.totalMovieCount = action.payload
        },
        updateCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        }
    }
});

export const { 
    openViewPopup, 
    openDeletePopup, 
    addForm, 
    fetchAllMoviesStart, 
    fetchAllMoviesSuccess, 
    fetchAllMoviesFail, 
    addCurrentMovie, 
    deleteMovieSuccess,
    addNewMovie,
    openEditPopup,
    updateMovie,
    movieCount,
    updateCurrentPage
} = appSlice.actions


export default appSlice.reducer;