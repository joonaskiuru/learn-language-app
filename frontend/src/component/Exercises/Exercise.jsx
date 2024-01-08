import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Box, TextField, Paper, Grid, Typography, MenuItem, Select, Button, Divider } from '@mui/material';
 
function Exercise (props) {
    const [formData, setFormData] = useState([]);

    const [words,setWords] = useState([]);

    // Fetch Exercises
    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/api/exercises/` + props.id + "/words" ;
        fetch(url).then((response) => response.json()).then((response) => {
            setWords(response);
        })
    },[])

    // Handle change in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData,
            [name]:value,
        })
    };


    return (
    <> <Paper>{props.name}</Paper>
        {words.map((x,i) =>
            <>
            <Box display={"flex"} sx={{justifyContent: "center",alignItems: "center", m: 2}}>
            <Typography sx={{mr: 2}}>{x["original"]} = </Typography>
            <TextField
            size="small"
            id={x + "_" + i} 
            key={x + "_" + i} 
            label="Insert Answer"
            variant="outlined" 
            value={formData.x} 
            name={x + "_" + i}
            onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}
            onChange={handleChange}
            />
            </Box>
        </>
        
        )}
        <Typography>Hello</Typography>
    </>
    );
}
 
export default Exercise;