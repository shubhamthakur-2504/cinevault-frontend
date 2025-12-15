import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Grid, Box, CircularProgress, Button } from '@mui/material';
import api from '../../api/axios';
import { useAuth } from '../../contexts/AuthContext';
import MovieCard from '../../components/movie/MovieCard';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import { PAGINATION, MESSAGES } from '../../utils/constant';
import { handleApiError } from '../../utils/helpers';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [nextCursor, setNextCursor] = useState(null);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const { user } = useAuth();
    const navigate = useNavigate();

    const fetchMovies = async (cursor = null) => {
        try {
            const params = { limit: PAGINATION.DEFAULT_LIMIT };
            if (cursor) {
                params.cursor = cursor;
            }

            const { data } = await api.get('/movies', { params });

            if (cursor) {
                setMovies((prev) => [...prev, ...data.data.movies]);
            } else {
                setMovies(data.data.movies);
            }

            setHasNextPage(data.data.hasNextPage);
            setNextCursor(data.data.nextCursor);
        } catch (error) {
            setSnackbar({
                open: true,
                message: handleApiError(error),
                severity: 'error',
            });
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    const handleLoadMore = () => {
        if (nextCursor && !loadingMore) {
            setLoadingMore(true);
            fetchMovies(nextCursor);
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

    if (loading) {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
            >
                <CircularProgress size={60} />
            </Box>
        );
    }

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
                All Movies
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Discover amazing movies from our collection
            </Typography>

            {movies.length === 0 ? (
                <Box
                    sx={{
                        textAlign: 'center',
                        py: 8,
                    }}
                >
                    <Typography variant="h6" color="text.secondary">
                        No movies available yet
                    </Typography>
                    {user?.role === 'ADMIN' && (
                        <Button
                            variant="contained"
                            sx={{ mt: 2 }}
                            onClick={() => navigate('/admin/add-movie')}
                        >
                            Add Your First Movie
                        </Button>
                    )}
                </Box>
            ) : (
                <>
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

                    {hasNextPage && (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button
                                variant="contained"
                                onClick={handleLoadMore}
                                disabled={loadingMore}
                                size="large"
                            >
                                {loadingMore ? <CircularProgress size={24} /> : 'Load More Movies'}
                            </Button>
                        </Box>
                    )}
                </>
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

export default HomePage;