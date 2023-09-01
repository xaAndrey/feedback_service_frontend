import React from "react";
import { AppBar, Toolbar, Stack, Button } from "@mui/material";
import logo from "../images/titlte-logo-ru-update.png";
import {routes} from "../helpers/routes";
import Divider from "@mui/material/Divider";
import { useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { theme } from "../helpers/theme";


export const Navbar = () => {
    const location = useLocation();
    const logout = useAuth();

    const exitForUser = () => {
        logout.logout();
    };

    const styles = {
        titleLogo: {
            height: '45px',
            width: '115px'
        },
        navbar: {
            background: 'white',
            padding: '8px 30px'
        },
        button: {
            color: theme.palette.primary.main,
            font: 'Nunito Sans',
            weight: '700',
            fontSize: '16px',
            lineHeight: '23.2px'
        },
        buttonActive: {
            color: theme.palette.secondary.main,
            font: 'Nunito Sans',
            weight: '700',
            fontSize: '16px',
            lineHeight: '23.2px'
        },
        buttonExit: {
            color: '#C62336',
            font: 'Nunito Sans',
            weight: '700',
            fonstSize: '16px',
            lineHeight: '23.2px'
        }
    };

    return (
        <AppBar position="static" style={styles.navbar}>
            <Toolbar>
                <Stack direction='row' spacing={4}
                divider={<Divider orientation="vertical" flexItem />}>
                    <Stack>
                        <img alt="logo" src={logo} style={styles.titleLogo}/>
                    </Stack>

                    <Stack direction="row" spacing={2}>
                        <Button href={routes.registrations} style={location.pathname === routes.registrations ? styles.buttonActive : styles.button}>ЗАПИСИ РЕГИСТРАЦИИ</Button>
                    </Stack>

                    <Stack direction='row'>
                        <Button href={routes.login} onClick={exitForUser} style={styles.buttonExit}>Выйти</Button>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};