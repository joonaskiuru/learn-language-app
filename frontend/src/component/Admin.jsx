import React from "react";
import {useState, useEffect} from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography, Divider } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExerciseForm from "./ExerciseForm";
 
function Admin() {
    const [exercises, setExercises] = useState([]);
    const [activePage,setActivePage] = useState('Main');

    // Fetch Exercises
    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/api/` + "exercises";
        fetch(url).then((response) => response.json()).then((response) => {
            console.log(response + ": response")
            setExercises(response);
        })
    },[])

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <> 
        <Box sx={{ flexGrow: 1}}>
            <Paper sx={{ m: 2, p: 1,display: {xs: "none", sm: 'block'}}}>
                <Typography variant="h6" sx={{color: 'text.secondary'}}>Admin</Typography>
                <Typography>Manage Exercises</Typography>

            </Paper>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={4} sx={{m: 1}}>
                    <Item>
                    <Typography sx={{m: 1}} variant="h5">All Exercises</Typography>
                    <Divider/>
                    {exercises.map((x,i) => <Typography key={x + i}>{x.name}</Typography>)}
                    </Item>
                </Grid>
                <Grid item xs={12} md={5} lg={4} sx={{m: 1}}>
                    <Item>
                        <ExerciseForm/>
                    </Item>
                </Grid>
            </Grid>
        </Box>
    </>
    );
}

export default Admin;