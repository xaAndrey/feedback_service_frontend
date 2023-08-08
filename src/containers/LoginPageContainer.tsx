import React, { ReactChild } from "react";
import titleLogoRu from "../images/titlte-logo-ru-update.png";
import { Grid, Stack } from "@mui/material";

const styles = {
    titleLogoRu: {
        height: '100%',
        width: '100%',
        marginTop: '1em'
    }
};

export const LoginPageContainer = ({children}: {children: ReactChild}): JSX.Element => {
    return <Grid sx={{backgroundColor: 'white'}} container direction={'row'} alignItems={'center'} height={'100vh'}>
        <Grid item xs/>
        <Grid item xs={3}>
            <Stack sx={{backgroundColor: 'white', borderRadius: 5, alignItems: 'center'}} direction={'column'}>
                <img src={titleLogoRu} style={styles.titleLogoRu} alt={'titleLogoRu'}/>
                {children}
            </Stack>
        </Grid>
        <Grid item xs />
    </Grid>;
}