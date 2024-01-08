import React from "react";
import {useState, useEffect} from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography, Divider, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExerciseForm from "./ExerciseForm";
 
function ExerciseMenu() {
    const [exercises, setExercises] = useState([]);

    // Fetch Exercises
    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/api/` + "exercises";
        fetch(url).then((response) => response.json()).then((response) => {
            setExercises(response);
        })
    },[])

    return (
        <>
            {exercises.map((X,i) => 
            <Button key={x + "_" + i}>x.name</Button>
            )}
        </>
    );
}

export default ExerciseMenu;