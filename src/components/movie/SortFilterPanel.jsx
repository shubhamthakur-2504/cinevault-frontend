import React from 'react';
import { Paper, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton, Divider } from '@mui/material';
import { Search as SearchIcon, Sort as SortIcon } from '@mui/icons-material';
import { SORT_OPTIONS, SORT_ORDERS } from '../../utils/constant';

const SortFilterPanel = ({ searchQuery, onSearchChange, onSearchSubmit, sortBy, onSortByChange, sortOrder, onSortOrderChange, onSortSubmit }) => {
    return (
        <Paper sx={{ p: 3, mb: 4 }}>
            {/* Search Section */}
            <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
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
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={<SearchIcon />}
                        onClick={onSearchSubmit}
                        sx={{ height: '56px' }}
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Sort Section */}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={5}>
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
                </Grid>

                <Grid item xs={12} sm={4}>
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
                </Grid>

                <Grid item xs={12} sm={3}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<SortIcon />}
                        onClick={onSortSubmit}
                        sx={{ height: '56px' }}
                    >
                        Apply Sort
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default SortFilterPanel;