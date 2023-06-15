import { AppBar, Toolbar, Typography, Box, Avatar } from '@mui/material';

const Header = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{ bgcolor: 'white', color: '#005DA9', width: '100%' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <img
              alt="Logo"
              src="https://www.fishersci.co.uk/content/dam/fishersci/en_US/images/fisher-scientific-logo-2017.svg" // replace with your logo URL
              style={{ width: 100, height: 90, marginRight: '1rem' }}
            />
          </Box>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            Thermo Fisher scientific
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      {/* Rest of your code goes here */}
    </div>
  );
};

export default Header;
