import { styled } from "@mui/material/styles";
import { Table, TableCell } from "@mui/material";

export const StyledTable = styled(Table)(() => ({
    '&.MuiTable-root': {
        borderCollapse: 'separate',
        borderSpacing: '0px 8px'
    }
}));

export const StyledTableCell = styled(TableCell)(() => ({
    '&.MuiTableCell-root': {
        borderBottom: "none",
        backgroundColor: '#fff',
        '&:last-child': {
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15
        },
        '&:first-of-type': {
            borderTopLeftRadius: 15,
            borderBottomLeftRadius: 15
        },
    },
    '&.MuiTableCell-head': {
        fontWeight: 'bold',
        fontSize: '14px',
        color: '#A5A3A9',
        letterSpacing: '0.03em'
    },
}));