import {useState} from "react";
import { styled } from '@mui/material/styles';
import { Box, Paper, Grid, Typography } from '@mui/material';
 
function Dashboard () {


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
                <Grid item xs={12} md={5} lg={3} sx={{m: 1}}>
                    <Item>

                    </Item>
                </Grid>
            </Grid>
        </Box>
    </>
);
}
 
export default Dashboard;