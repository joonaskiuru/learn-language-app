import React from "react";
import {useState, useEffect} from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

 
function Info() {
    return (
    <>
    <Box sx={{ flexGrow: 1,bgcolor: "lightGrey",minHeight: '100vh', p: 1 }}>
        <Paper sx={{p:1}}>
            <Typography variant="h5">Info</Typography>
            <Divider sx={{my: 1}}/>
            <Typography variant="subtitle2" sx={{color: 'primary.dark'}}>Made By: Joonas Kiuru</Typography>
            <Typography variant="subtitle2">Learn Language - App : app for learning languages</Typography>
        </Paper>
    </Box>
    
    
    </>
    );
}

export default Info;