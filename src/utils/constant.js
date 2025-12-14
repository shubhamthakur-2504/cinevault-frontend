export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const MESSAGES = {
    LOGIN_SUCCESS: 'Login successful',
    REGISTER_SUCCESS: 'Registration successful',
    LOGOUT_SUCCESS: 'Logged out successfully',
    MOVIE_ADDED: 'Movie added to queue successfully',
    MOVIE_UPDATED: 'Movie updated successfully',
    MOVIE_DELETED: 'Movie deleted successfully',
    ERROR_GENERIC: 'Something went wrong',
    ERROR_FETCH: 'Failed to fetch data',
    SEARCH_TERM_REQUIRED: 'Please enter a search term',
    SORT_OPTION_REQUIRED: 'Please select a sort option',
};

export const PAGINATION = {
    DEFAULT_LIMIT: 12,
    MAX_LIMIT: 100,
};

export const SORT_OPTIONS = [
    { value: '', label: 'None' },
    { value: 'name', label: 'Name' },
    { value: 'rating', label: 'Rating' },
    { value: 'releaseDate', label: 'Release Date' },
    { value: 'duration', label: 'Duration' },
];

export const SORT_ORDERS = [
    { value: 'asc', label: 'Ascending' },
    { value: 'desc', label: 'Descending' },
];