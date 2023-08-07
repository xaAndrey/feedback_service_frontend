import { styled } from "@mui/material/styles";
import { Button, ButtonProps } from "@mui/material";
import { theme } from "../../helpers/theme";

export const OvalPrimaryButton = styled(Button)<ButtonProps>(() => ({
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    padding: 12,
    borderRadius: 18,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark
    }
}));