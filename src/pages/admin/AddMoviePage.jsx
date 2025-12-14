import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Paper } from '@mui/material';
import api from '../../api/axios';
import MovieForm from '../../components/movie/MovieForm';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import { MESSAGES } from '../../utils/constant';
import { handleApiError } from '../../utils/helpers';

const AddMoviePage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        rating: '',
        releaseDate: '',
        duration: '',
        genre: '',
        posterUrl: '',
    });
    const [posterFile, setPosterFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });

    const navigate = useNavigate();

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
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('rating', formData.rating);
            formDataToSend.append('releaseDate', formData.releaseDate);
            formDataToSend.append('duration', formData.duration);
            formDataToSend.append('genre', formData.genre);

            if (posterFile) {
                formDataToSend.append('poster', posterFile);
            } else if (formData.posterUrl) {
                formDataToSend.append('posterUrl', formData.posterUrl);
            }

            await api.post('/movies', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setSnackbar({
                open: true,
                message: MESSAGES.MOVIE_ADDED,
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

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight={600}>
                Add New Movie
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Fill in the details to add a new movie to the collection
            </Typography>

            <Paper sx={{ p: 4 }}>
                <MovieForm
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    onFileChange={handleFileChange}
                    posterFile={posterFile}
                    loading={loading}
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

export default AddMoviePage;