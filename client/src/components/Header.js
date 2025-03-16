import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '4px',
            marginBottom: '4px',
          }}
        >
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <img
            src="https://content.app-sources.com/s/78612958735963643/uploads/Images/awdlogo-0006921.png?format=webp"
            alt=""
            style={{ height: '8vh' }}
          />
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            American Water Damage
          </Typography> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
