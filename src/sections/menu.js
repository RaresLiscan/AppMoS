import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../img/logo-complet.png'
import {Hidden} from "@material-ui/core";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    white: {
        backgroundColor: 'white',
        color: '#001c2f'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'flex',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: window.innerWidth <= 550 ? 'center' : 'left'
    },
}));

export default function Menu() {
    const classes = useStyles();

    const openDrawer = () => {

    }

    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.white}>
                <Toolbar>
                    {/*<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => openDrawer()}>*/}
                    {/*    <MenuIcon />*/}
                    {/*</IconButton>*/}
                    <Typography variant="h6" className={classes.title}>
                    {/*<Hidden xsDown>*/}
                        <Link to={"/"} style={{display: 'flex', alignItems: 'center'}}>
                            <img src={logo} height={50} />
                        </Link>
                    {/*</Hidden>*/}
                    </Typography>
                    {/*<Button color="inherit">Login</Button>*/}
                </Toolbar>
            </AppBar>
        </div>
    );
}