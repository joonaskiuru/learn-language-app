import { useState, useEffect } from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography, MenuItem, Select, Button, Divider  } from '@mui/material';
 
function Progress (props) {
    const [points,setPoints] = useState([]);
    const [stats,setStats] = useState({});
    const user_id = sessionStorage.getItem("user_id")

    // Fetch Exercises
    useEffect(() => {
        const url = `${import.meta.env.VITE_API_URL}/api/points/user/${user_id}`;
        fetch(url).then((response) => response.json()).then((response) => {
            setPoints(response);
        })
    },[])


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        var element = [];
        for(let i = 0; i < points.length;i++){
            for (const [key, value] of Object.entries(points[i])) {
                element.push(key,value
                )
            }
            console.log(element + ": element")
        }
        setStats(element);
    },[points])


    return (
        <Grid container spacing={1}>
        <Grid item xs={12} md={6} lg={6} sx={{m: 1}}>
            <Item>
                <Typography variant="h5">Progress</Typography>
                <Divider sx={{m: 1}}/>
                {points.map((x) => <Paper sx={{color: "white",bgcolor: "success.light",p: 1,m:1}} key={x["exercise_name"]}>
                    <Typography>{x["exercise_name"]}</Typography>
                    <Typography>Score: {x["points"]} / {x["max_points"]}</Typography>
                    </Paper>)}

            </Item>
        </Grid>
        <Grid item xs={12} md={5} lg={4} sx={{m: 1}}>
            <Item>

            </Item>
        </Grid>
    </Grid>
    );
}
 
export default Progress;