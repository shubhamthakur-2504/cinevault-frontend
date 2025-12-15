import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, Stack, Button } from '@mui/material';
import { Star, CalendarToday, AccessTime, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { formatYear, formatRating } from '../../utils/helpers';
import DeleteMovieDialog from './DeleteMovieDialog';

const MovieCard = ({ movie, onEdit, onDelete, isAdmin }) => {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        onDelete(movie._id);
        setDeleteDialogOpen(false);
    };

    return (
        <>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                }}
            >
                <CardMedia
                    component="img"
                    height="350"
                    image={movie.posterUrl}
                    alt={movie.title}
                    sx={{
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                />
                <CardContent sx={{ flexGrow: 1, pb: isAdmin ? 1 : 2 }}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            minHeight: '3.2em', 
                        }}
                    >
                        {movie.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Star sx={{ color: '#ffd700', mr: 0.5 }} fontSize="small" />
                        <Typography variant="body2" fontWeight={600}>
                            {formatRating(movie.rating)}/10
                        </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', gap: 0.5 }}>
                        <Chip
                            icon={<CalendarToday />}
                            label={formatYear(movie.releaseDate)}
                            size="small"
                            variant="outlined"
                        />
                        <Chip
                            icon={<AccessTime />}
                            label={`${movie.duration} min`}
                            size="small"
                            variant="outlined"
                        />
                    </Stack>

                    {movie.genre && movie.genre.length > 0 && (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1.5 }}>
                            {movie.genre.slice(0, 3).map((g, idx) => (
                                <Chip
                                    key={idx}
                                    label={g}
                                    size="small"
                                    variant="filled"
                                    sx={{ fontSize: '0.7rem' }}
                                />
                            ))}
                            {movie.genre.length > 3 && (
                                <Chip
                                    label={`+${movie.genre.length - 3}`}
                                    size="small"
                                    variant="filled"
                                    sx={{ fontSize: '0.7rem' }}
                                />
                            )}
                        </Box>
                    )}

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {movie.description}
                    </Typography>
                </CardContent>

                {isAdmin && (
                    <Box sx={{ p: 2, pt: 0 }}>
                        <Button
                            startIcon={<EditIcon />}
                            onClick={() => onEdit(movie)}
                            fullWidth
                            variant="outlined"
                            size="small"
                            sx={{ mb: 1 }}
                        >
                            Edit
                        </Button>
                        <Button
                            startIcon={<DeleteIcon />}
                            onClick={handleDeleteClick}
                            fullWidth
                            variant="outlined"
                            color="error"
                            size="small"
                        >
                            Delete
                        </Button>
                    </Box>
                )}
            </Card>

            <DeleteMovieDialog
                open={deleteDialogOpen}
                movieTitle={movie.title}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
            />
        </>
    );
};

export default MovieCard;