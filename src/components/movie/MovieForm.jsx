import React from 'react';
import { Box, TextField, Button, Typography, Divider, Stack, CircularProgress } from '@mui/material';
import { Upload } from '@mui/icons-material';

const MovieForm = ({ formData, onChange, onSubmit, onFileChange, posterFile, loading, isEdit = false, currentPosterUrl = null, onCancel, }) => {
    return (
        <Box component="form" onSubmit={onSubmit}>
            <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={onChange}
                margin="normal"
                required
            />

            <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={onChange}
                margin="normal"
                multiline
                rows={4}
                required
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField
                    fullWidth
                    label="Rating (0-10)"
                    name="rating"
                    type="number"
                    slotProps={{ input: { min: 0, max: 10, step: 0.1 } }}
                    value={formData.rating}
                    onChange={onChange}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    label="Duration (minutes)"
                    name="duration"
                    type="number"
                    slotProps={{input:{ min: 1 }}}
                    value={formData.duration}
                    onChange={onChange}
                    margin="normal"
                    required
                />
            </Stack>

            <TextField
                fullWidth
                label="Release Date"
                name="releaseDate"
                type="date"
                value={formData.releaseDate}
                onChange={onChange}
                margin="normal"
                slotProps={{ inputLabel: { shrink: true } }}
                required
            />

            <TextField
                fullWidth
                label="Genres (comma-separated)"
                name="genre"
                value={formData.genre}
                onChange={onChange}
                margin="normal"
                placeholder="Action, Drama, Thriller"
                helperText="Enter genres separated by commas"
            />

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" gutterBottom fontWeight={600}>
                Movie Poster
            </Typography>

            {isEdit && currentPosterUrl && (
                <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                        Current Poster:
                    </Typography>
                    <Box
                        component="img"
                        src={currentPosterUrl}
                        alt="Current poster"
                        sx={{
                            maxWidth: '200px',
                            maxHeight: '300px',
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    />
                </Box>
            )}

            {!isEdit && (
                <TextField
                    fullWidth
                    label="Poster URL"
                    name="posterUrl"
                    value={formData.posterUrl || ''}
                    onChange={onChange}
                    margin="normal"
                    helperText="Provide a URL or upload a file below"
                />
            )}

            <Button
                variant="outlined"
                component="label"
                fullWidth
                startIcon={<Upload />}
                sx={{ mt: 2, mb: 1 }}
            >
                {isEdit ? 'Upload New Poster' : 'Upload Poster Image'}
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={onFileChange}
                />
            </Button>

            {posterFile && (
                <Typography variant="body2" color="success.main" sx={{ mt: 1 }}>
                    ✓ Selected: {posterFile.name}
                </Typography>
            )}

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{ mt: 4 }}
            >
                {isEdit && (
                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                >
                    {loading ? 'Processing...' : isEdit ? 'Update Movie' : 'Add Movie'}
                </Button>
            </Stack>
        </Box>
    );
};

export default MovieForm;