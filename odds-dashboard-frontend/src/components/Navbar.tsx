import {Link} from "react-router-dom";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Odds Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;