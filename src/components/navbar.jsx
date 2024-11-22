import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
    console.log('Navbar Component Rendered')

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        <Link style={{ textDecoration: "none", color: "white" }} to={"/"}>
                            Home
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar