import { styled } from "@mui/material/styles";
import { InputProps, TextField, TextFieldProps } from "@mui/material";
import React from "react";
import { theme } from "../../helpers/theme"

export const OvalTextField = styled((props: TextFieldProps) => (
    <TextField
        {...props}
        InputProps={{ ...props.InputProps } as Partial<InputProps>}
    />))(() => ({
        '& .MuiFilledInput-root': {
            border: '1px solid #f1f1f1',
            overflow: 'hidden',
            borderRadius: 18,
            bckgroundColor: 'white',
            fontWeight: '600',
            borderColor: '#DEDEE5',
            '&.Mui-focused': {
                backgroundColor: 'white',
                borderColor: theme.palette.secondary.main,
            },
            '&:hover': {
                backgroundColor: theme.palette.background.paper,
            }
        },
        '& .MuiOutlinedInput-root': {
            overflow: 'hidden',
            borderRadius: 18,
            fontWeight: '600',
            backgroundColor: 'white',
            '&.Mui-focused fieldset': {
                borderColor: '#dedee5',
            },
            '&:hover fieldlist': {
                borderColor: '#dedee5',
            },
            '&:hover': {
                backgroundColor: theme.palette.background.paper,
            }
        },
    }));