export const formatDate = (date) => {
    const d = new Date(date);
    if (isNaN(d)) return 'Invalid Date';
    return d.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

export const formatYear = (date) => {
    return new Date(date).getFullYear();
};

export const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

export const formatRating = (rating) => {
    return Number(rating).toFixed(1);
};

export const parseGenres = (genreString) => {
    if (Array.isArray(genreString)) return genreString;
    return genreString.split(',').map(g => g.trim()).filter(Boolean);
};

export const convertToISODate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
};

export const handleApiError = (error) => {
    if (error.response) {
        return error.response.data?.message || 'Server error occurred';
    } else if (error.request) {
        return 'No response from server';
    } else {
        return error.message || 'An error occurred';
    }
};