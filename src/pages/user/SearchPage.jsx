import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress } from '@mui/material';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';
import MovieCard from '../../components/movie/MovieCard';
import SortFilterPanel from '../../components/movie/SortFilterPanel';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import { MESSAGES } from '../../utils/constant';
import { handleApiError } from '../../utils/helpers';

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const [loading, setLoading] = useState(false);
    const [currentView, setCurrentView] = useState('none'); 
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const { user } = useAuth();
    const navigate = useNavigate();

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setSnackbar({
                open: true,
                message: MESSAGES.SEARCH_TERM_REQUIRED,
                severity: 'warning',
            });
            return;
        }

        setLoading(true);
        try {
            const { data } = await api.get('/movies/search', {
                params: { q: searchQuery },
            });

            let resultMovies = data.data.movies;
            if (sortBy && resultMovies.length > 0) {
                resultMovies = sortMoviesLocally(resultMovies, sortBy, sortOrder);
            }

            setMovies(resultMovies);
            setCurrentView('search');
        } catch (error) {
            setSnackbar({
                open: true,
                message: handleApiError(error),
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSort = async () => {
        if (!sortBy) {
            setSnackbar({
                open: true,
                message: MESSAGES.SORT_OPTION_REQUIRED,
                severity: 'warning',
            });
            return;
        }

        setLoading(true);
        try {
            if (currentView === 'search' && searchQuery.trim()) {
                // Re-search and then sort
                const { data } = await api.get('/movies/search', {
                    params: { q: searchQuery },
                });
                const sortedMovies = sortMoviesLocally(data.data.movies, sortBy, sortOrder);
                setMovies(sortedMovies);
            } else {
                // No search active, get all sorted movies from API
                const params = { [sortBy]: sortOrder };
                const { data } = await api.get('/movies/sorted', { params });
                setMovies(data.data.movies);
                setCurrentView('sort');
            }
        } catch (error) {
            setSnackbar({
                open: true,
                message: handleApiError(error),
                severity: 'error',
            });
        } finally {
            setLoading(false);
        }
    };
    const sortMoviesLocally = (moviesToSort, field, order) => {
        const sorted = [...moviesToSort].sort((a, b) => {
            let aVal, bVal;

            switch (field) {
                case 'name':
                    aVal = a.title?.toLowerCase() || '';
                    bVal = b.title?.toLowerCase() || '';
                    break;
                case 'rating':
                    aVal = a.rating || 0;
                    bVal = b.rating || 0;
                    break;
                case 'releaseDate':
                    aVal = new Date(a.releaseDate).getTime();
                    bVal = new Date(b.releaseDate).getTime();
                    break;
                case 'duration':
                    aVal = a.duration || 0;
                    bVal = b.duration || 0;
                    break;
                default:
                    return 0;
            }

            if (typeof aVal === 'string') {
                return order === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            } else {
                return order === 'asc' ? aVal - bVal : bVal - aVal;
            }
        });

        return sorted;
    };

    const handleEdit = (movie) => {
        navigate('/admin/edit-movie', { state: { movie } });
    };

    const handleDelete = async (movieId) => {
        try {
            await api.delete(`/movies/${movieId}`);
            setMovies(movies.filter((m) => m._id !== movieId));
            setSnackbar({
                open: true,
                message: MESSAGES.MOVIE_DELETED,
                severity: 'success',
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: handleApiError(error),
                severity: 'error',
            });
        }
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
                Search & Sort Movies
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Find your favorite movies or sort by your preferences
            </Typography>

            <SortFilterPanel
                searchQuery={searchQuery}
                onSearchChange={(e) => setSearchQuery(e.target.value)}
                onSearchSubmit={handleSearch}
                sortBy={sortBy}
                onSortByChange={(e) => setSortBy(e.target.value)}
                sortOrder={sortOrder}
                onSortOrderChange={(e) => setSortOrder(e.target.value)}
                onSortSubmit={handleSort}
            />

            {loading ? (
                <Box display="flex" justifyContent="center" py={8}>
                    <CircularProgress size={60} />
                </Box>
            ) : movies.length === 0 ? (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                    }}
                >
                    <Typography variant="h6" color="text.secondary">
                        No movies found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        Try searching or sorting to discover movies
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(1, 1fr)',
                            sm: 'repeat(2, 1fr)',
                            md: 'repeat(3, 1fr)',
                            lg: 'repeat(4, 1fr)',
                        },
                        gap: 3,
                    }}
                >
                    {movies.map((movie) => (
                        <Box key={movie._id}>
                            <MovieCard
                                movie={movie}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isAdmin={user?.role === 'ADMIN'}
                            />
                        </Box>
                    ))}
                </Box>
            )}

            <SnackbarAlert
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Container>
    );
};

export default SearchPage;