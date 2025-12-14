// src/pages/admin/EditMoviePage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';
import api from '../../api/axios';
import MovieForm from '../../components/movie/MovieForm';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import { MESSAGES } from '../../utils/constant';
import { handleApiError, convertToISODate } from '../../utils/helpers';

const EditMoviePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const movie = location.state?.movie;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        rating: '',
        releaseDate: '',
        duration: '',
        genre: '',
    });
    const [posterFile, setPosterFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    useEffect(() => {
        if (!movie) {
            navigate('/');
            return;
        }

        setFormData({
            title: movie.title || '',
            description: movie.description || '',
            rating: movie.rating || '',
            releaseDate: movie.releaseDate ? convertToISODate(movie.releaseDate) : '',
            duration: movie.duration || '',
            genre: movie.genre?.join(', ') || '',
        });
    }, [movie, navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setPosterFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formDataToSend = new FormData();

            // Only send changed fields
            if (formData.title !== movie.title) {
                formDataToSend.append('title', formData.title);
            }
            if (formData.description !== movie.description) {
                formDataToSend.append('description', formData.description);
            }
            if (formData.rating !== movie.rating) {
                formDataToSend.append('rating', formData.rating);
            }
            if (formData.releaseDate !== convertToISODate(movie.releaseDate)) {
                formDataToSend.append('releaseDate', formData.releaseDate);
            }
            if (formData.duration !== movie.duration) {
                formDataToSend.append('duration', formData.duration);
            }
            if (formData.genre !== movie.genre?.join(', ')) {
                formDataToSend.append('genre', formData.genre);
            }

            if (posterFile) {
                formDataToSend.append('poster', posterFile);
            }

            await api.patch(`/movies/${movie._id}`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSnackbar({
                open: true,
                message: MESSAGES.MOVIE_UPDATED,
                severity: 'success',
            });

            setTimeout(() => navigate('/'), 2000);
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

    const handleCancel = () => {
        navigate('/');
    };

    if (!movie) return null;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
                Edit Movie
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Update the movie details below
            </Typography>

            <Paper sx={{ p: 4 }}>
                <MovieForm
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onFileChange={handleFileChange}
                    posterFile={posterFile}
                    loading={loading}
                    isEdit={true}
                    currentPosterUrl={movie.posterUrl}
                    onCancel={handleCancel}
                />
            </Paper>

            <SnackbarAlert
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            />
        </Container>
    );
};

export default EditMoviePage;