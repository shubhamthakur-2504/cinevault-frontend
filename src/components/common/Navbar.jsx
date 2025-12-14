import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Divider, Chip, Box } from '@mui/material';
import { Movie as MovieIcon, AccountCircle, Logout } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
        handleClose();
    };

    return (
        <AppBar position="sticky" elevation={2}>
            <Toolbar>
                <MovieIcon sx={{ mr: 2 }} />
                <Typography
                    variant="h6"
                    component={Link}
                    to="/"
                    sx={{
                        flexGrow: 1,
                        textDecoration: 'none',
                        color: 'inherit',
                        fontWeight: 600,
                    }}
                >
                    CineVault
                </Typography>

                {user && (
                    <>
                        <Button color="inherit" component={Link} to="/">
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/search">
                            Search
                        </Button>
                        {user.role === 'ADMIN' && (
                            <Button color="inherit" component={Link} to="/admin/add-movie">
                                Add Movie
                            </Button>
                        )}
                        <IconButton
                            color="inherit"
                            onClick={handleMenu}
                            sx={{ ml: 2 }}
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        >
                            <MenuItem disabled>
                                <Box>
                                    <Typography variant="body2" fontWeight={600}>
                                        {user.userName}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {user.email}
                                    </Typography>
                                </Box>
                            </MenuItem>
                            <MenuItem disabled sx={{ justifyContent: 'center' }}>
                                <Chip
                                    label={user.role}
                                    size="small"
                                    color="primary"
                                    variant="filled"
                                />
                            </MenuItem>
                            <Divider />
                            <MenuItem onClick={handleLogout}>
                                <Logout fontSize="small" sx={{ mr: 1 }} />
                                Logout
                            </MenuItem>
                        </Menu>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;