import React, { ReactChild } from "react";
import titleLogoRu from "../images/titlte-logo-ru.png";
import { Grid, Stack } from "@mui/material";

const styles = {
    titleLogoRu: {
        height: '100%',
        width: '100%',
        marginTop: '1em'
    }
};

export const LoginPageContainer = ({children}: {children: ReactChild}): JSX.Element => {
    return <Grid sx={{backgroundColor: '#fff7ea'}} container direction={'row'} alignItems={'center'} height={'100vh'}>
        <Grid item xs/>
        <Grid item xs={3}>
            <Stack sx={{backgroundColor: '#fff7ea', borderRadius: 5, alignItems: 'center'}} direction={'column'}>
                <img src={titleLogoRu} style={styles.titleLogoRu} alt={'titleLogoRu'}/>
                {children}
            </Stack>
        </Grid>
        <Grid item xs />
    </Grid>;
}