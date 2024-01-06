import {useState} from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography } from '@mui/material';
 
function Dashboard () {
    const [exercises, setExercises] = ([]);

    // Fetch Exercises
    useEffect(() => {
        const url = "http://mydb.tamk.fi:3306/" + "languages";
        fetch(url).then((response) => response.json()).then((response) => {
            setLanguages(response);
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
                <Typography variant="h6" sx={{color: 'text.secondary'}}>Exercises</Typography>
                <Typography>Do exercises!</Typography>
                <Box>
                    <Select sx={{ width: '40%',mx: 2}} name="category" size="small" value={filterCategory} onChange={handleChange}>
                    <MenuItem value='All'>All</MenuItem>
                        {exercises.map((x,i) => 
                            <MenuItem value={x} key={x + "_" + i}>{x.name}</MenuItem>
                        )}
                    </Select>
                </Box>
            </Paper>
            <Grid container spacing={1}>
                <Grid item xs={12} md={6} lg={4} sx={{m: 1}}>
                    <Item>
                        
                    </Item>
                </Grid>
                <Grid item xs={12} md={5} lg={4} sx={{m: 1}}>
                    <Item>

                    </Item>
                </Grid>
            </Grid>
        </Box>
    </>
);
}
 
export default Dashboard;