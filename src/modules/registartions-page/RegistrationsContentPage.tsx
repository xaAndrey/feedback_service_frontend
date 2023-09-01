import { Grid, Stack, Typography, Box, CircularProgress } from "@mui/material";
import { RegistrationDto } from "../../api/registrations/dto";
import React, { useState } from "react";
import { RegistrationsTable } from "./RegistrationsTable";
import {orderBy} from "lodash";

export interface IRegistrationsContentPage {
    registrations: RegistrationDto[],
    isFetching: boolean,
    setValue: Function
}

export const RegistrationsContentPage: React.FC<IRegistrationsContentPage> = ({ registrations, isFetching, setValue }) => {
    const [columnToSort, setColumnToSort] = useState('id');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>("desc");

    const invertDirection = {
        asc: "desc",
        desc: "asc"
    }

    const handleSort = (columnName: string) => {
        console.log(columnName, columnToSort, sortDirection);
        setColumnToSort(columnName);
        setSortDirection(columnToSort === columnName ? (invertDirection as any)[sortDirection] : 'asc')
    }

    return <Stack m={5}>
        <Grid item={true} xs={8}>
            <Grid container={true} width={'100%'} direction={'row'} mt={3} spacing={2}>
                <Grid item={true} xs={9}>
                    <Typography fontSize={24} color={'#1D1929'} fontWeight={700}>Регистрации на прием</Typography>
                </Grid>
            </Grid>
            <Grid container={true} width={'100%'} direction={'row'} spacing={2}>
                <Grid item={true} xs={12}>
                    {isFetching ?
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                        </Box> :
                        <>
                            {<RegistrationsTable 
                                registrations={orderBy(registrations, columnToSort, sortDirection)}
                                handleSort={handleSort}
                                columnToSort={columnToSort}
                                sortDirection={sortDirection}
                                setValue={setValue} /> 
                                }
                        </>
                    }
                </Grid>
            </Grid>
        </Grid>
    </Stack>
}