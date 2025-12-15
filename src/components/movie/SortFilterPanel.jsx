import React from 'react';
import { Paper, TextField, Button, FormControl, InputLabel, Select, MenuItem, InputAdornment, IconButton, Divider, Box } from '@mui/material';
import { Search as SearchIcon, Sort as SortIcon } from '@mui/icons-material';
import { SORT_OPTIONS, SORT_ORDERS } from '../../utils/constant';

const SortFilterPanel = ({ searchQuery, onSearchChange, onSearchSubmit, sortBy, onSortByChange, sortOrder, onSortOrderChange, onSortSubmit }) => {
    return (
        <Paper sx={{ p: 3, mb: 4 }}>
            {/* Search Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    mb: 3,
                }}
            >
                <Box sx={{ flex: 1 }}>
                    <TextField
                        fullWidth
                        placeholder="Search movies by name or description..."
                        value={searchQuery}
                        onChange={onSearchChange}
                        onKeyDown={(e) => e.key === 'Enter' && onSearchSubmit()}
                        slotProps={{
                            inputAdornment: {
                                position: 'end',
                                children: (
                                    <IconButton onClick={onSearchSubmit} edge="end">
                                        <SearchIcon />
                                    </IconButton>
                                ),
                            },
                        }}
                    />
                </Box>
                <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={onSearchSubmit}
                    sx={{
                        height: '56px',
                        minWidth: { xs: '100%', md: '150px' }
                    }}
                >
                    Search
                </Button>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Sort Section */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: 2,
                    alignItems: 'stretch',
                }}
            >
                <Box sx={{ flex: '1 1 40%', minWidth: { xs: '100%', sm: '200px' } }}>
                    <FormControl fullWidth>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortBy}
                            label="Sort By"
                            onChange={onSortByChange}
                        >
                            {SORT_OPTIONS.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ flex: '1 1 30%', minWidth: { xs: '100%', sm: '150px' } }}>
                    <FormControl fullWidth>
                        <InputLabel>Order</InputLabel>
                        <Select
                            value={sortOrder}
                            label="Order"
                            onChange={onSortOrderChange}
                        >
                            {SORT_ORDERS.map((order) => (
                                <MenuItem key={order.value} value={order.value}>
                                    {order.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Button
                    variant="outlined"
                    startIcon={<SortIcon />}
                    onClick={onSortSubmit}
                    sx={{
                        height: '56px',
                        flex: '0 0 auto',
                        minWidth: { xs: '100%', sm: '140px' }
                    }}
                >
                    Apply Sort
                </Button>
            </Box>
        </Paper>
    );
};

export default SortFilterPanel;