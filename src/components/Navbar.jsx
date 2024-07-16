import React from "react";
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button } from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            Librería
          </Link>
        </Typography>
        <IconButton size="large" color="inherit">
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Buscar..."
          inputProps={{ "aria-label": "buscar" }}
          sx={{ marginLeft: 2, flexGrow: 1 }}
        />
        <Button
          component={Link}
          to="/agregar"
          color="inherit"
          startIcon={<AddIcon />}
        >
          Agregar
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

