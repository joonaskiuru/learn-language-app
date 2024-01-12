import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Box, TextField, Paper, Grid, Typography, MenuItem, Select, Button, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
 
function ExercisePoints (props) {

    const [exercisePoints,setPoints] = useState({});

    // Fetch Exercises
    useEffect(() => {
        console.log(`${import.meta.env.VITE_API_URL}/api/points/${encodeURIComponent(props.exerciseName)}/${props.user}`)
        const url = `${import.meta.env.VITE_API_URL}/api/points/${encodeURIComponent(props.exerciseName)}/${props.user}`;
        fetch(url).then((response) => response.json()).then((response) => {
            console.log(response)
            setPoints(response[0]);
        })
    },[props.open])

    return (
        <Dialog open={props.open} onClose={props.close}>
            <DialogTitle sx={{textAlign: "center",color:"primary.main"}}>Exercise Score</DialogTitle>
            <DialogContent></DialogContent>
            <Box sx={{display: "flex",flexDirection: "column", justifyContent: "center",alignItems: "center", m: 1}}>
                <Typography>Score:</Typography>
                {exercisePoints ? (
                <Typography>{exercisePoints["points"]} / {exercisePoints["max_points"]}</Typography>) : (<Typography>Loading...</Typography>)}
            </Box>
                <DialogActions>
                    <Button onClick={props.close}>Close</Button>
                </DialogActions>
        </Dialog>
    );
}
 
export default ExercisePoints;


