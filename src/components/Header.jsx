import { AppBar, Toolbar, Typography, Box, Link } from '@mui/material';
import Logo from '../assets/Fisher.jpg';
const Header = () => {
  return (
    <div>
      <AppBar
        position="fixed"
        style={{ width: '100%' }}
        sx={{ background: '#005DAA' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Link
              href="https://www.fishersci.co.uk/gb/en/home.html"
              underline="none">
              <img
                alt="Logo"
                src={Logo} // replace with your logo URL
                style={{
                  width: 170,
                  height: 80,
                  marginRight: 2,
                  color: '#FFF',
                }}
              />
            </Link>
          </Box>
          <Link
            href="https://www.fishersci.co.uk/gb/en/home.html"
            underline="none">
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, color: '#FFF' }}>
              Thermo Fisher Scientific
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </AppBar>
      {/* Rest of your code goes here */}
    </div>
  );
};

export default Header;
