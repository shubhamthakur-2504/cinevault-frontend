import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, CircularProgress } from '@mui/material';
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
            setMovies(data.data.movies);
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
            const params = { [sortBy]: sortOrder };
            const { data } = await api.get('/movies/sorted', { params });
            setMovies(data.data.movies);
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
                <Grid container spacing={3}>
                    {movies.map((movie) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                            <MovieCard
                                movie={movie}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                isAdmin={user?.role === 'ADMIN'}
                            />
                        </Grid>
                    ))}
                </Grid>
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