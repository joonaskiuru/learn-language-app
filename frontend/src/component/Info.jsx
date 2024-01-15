import { Box, Paper, Typography, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
 
function Info() {
    return (
    <>
    <Box sx={{ flexGrow: 1,bgcolor: "lightGrey",minHeight: '100vh', p: 1 }}>
        <Paper sx={{p:1}}>
            <Typography variant="h5">Info</Typography>
            <Divider sx={{my: 1}}/>
            <Typography variant="subtitle2" sx={{color: 'primary.dark'}}>Made By: Joonas Kiuru</Typography>
            <Typography variant="subtitle2">Learn Language - App : app for learning languages</Typography>
            <Divider sx={{my: 1}}/>
            <Typography variant="h6">Instructions</Typography>
            <Typography variant="subtitle2">Users must be logged in to access the exercises.</Typography>
            <Typography variant="subtitle2">Users can complete exercises and track their progress from the Dashboard page.</Typography>
            <Typography variant="subtitle2">Users create and delete exercises from the Admin page (provided that the user has admin privileges).</Typography>
            <Typography variant="subtitle2">The Info page is for info & instructions.</Typography>
            <Divider sx={{my: 1}}/>
            <Typography variant="subtitle2">Users can log out by pressing the button in the upper right corner.<LogoutIcon sx={{color: "error.dark"}}/></Typography>
        </Paper>
    </Box> 
    </>
    );
}

export default Info;