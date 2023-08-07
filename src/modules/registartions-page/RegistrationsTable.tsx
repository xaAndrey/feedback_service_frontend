import React, { useEffect, useState } from "react";
import { TableBody, TableHead, TableRow, TablePagination, TableContainer, Checkbox } from "@mui/material";
import { RegistrationDto, UpdateRegistrationDto } from "../../api/registrations/dto";
import { StyledTable, StyledTableCell } from "../../components/styled/StyledTable";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined"
import ArrowDropUpOutlinedIcon from "@mui/icons-material/ArrowDropUpOutlined";
import { updateRegistration } from "../../api/registrations/request";

export interface IRegistrationsTable {
    registrations: RegistrationDto[],
    handleSort: Function,
    columnToSort: string,
    sortDirection: 'asc' | 'desc'
}

const FullNameTextStyle = {
    fontWight: 'bold',
    fontSize: '18px',
    color: '#1D1929',
    letterSpacing: '0.02em'
}

export const RegistrationsTable: React.FC<IRegistrationsTable> = (props) => {
    const [page, setPage] = React.useState(0);
    const [checked, setChecked] = useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState<number>(() => {
        const saved = localStorage.getItem("rowsPerPage");
        return parseInt((saved !== null && saved !== 'NaN') ? saved : '10');
    });

    useEffect(() => {
        localStorage.setItem("rowsPerPage", rowsPerPage.toString());
    }, [rowsPerPage]);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChecked = (id: number, checked: boolean) => {
        setChecked(!checked)
        const registration: UpdateRegistrationDto = {
            isRegistered: checked
        }       
        updateRegistration(id, registration);
        window.location.reload();
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <TableContainer>
            <StyledTable>
                <colgroup>
                    <col style={{ width: '5%' }} />
                    <col style={{ width: '19%' }} />
                    <col style={{ width: '19%' }} />
                    <col style={{ width: '19%' }} />
                    <col style={{ width: '19%' }} />
                    <col style={{ width: '19%' }} />
                </colgroup>

                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onClick={() => props.handleSort('id')}>
                                <span>ID</span>
                                {
                                    props.columnToSort === 'id' ? (
                                        props.sortDirection === 'asc' ? (
                                            <ArrowDropUpOutlinedIcon />
                                        ) : (
                                            <ArrowDropDownOutlinedIcon />
                                        )
                                    ) : null}
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="left">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onClick={() => props.handleSort('fio')}>
                                <span>Фамилия Имя Отчество</span>
                                {props.columnToSort === 'fio' ? (
                                    props.sortDirection === 'asc' ? (
                                        <ArrowDropUpOutlinedIcon />
                                    ) : (
                                        <ArrowDropDownOutlinedIcon />
                                    )
                                ) : null}
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onClick={() => props.handleSort('phone')}>
                                <span>Телефон</span>
                                {props.columnToSort === 'phone' ? (
                                    props.sortDirection === 'asc' ? (
                                        <ArrowDropUpOutlinedIcon />
                                    ) : (
                                        <ArrowDropDownOutlinedIcon />
                                    )
                                ) : null}
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onClick={() => props.handleSort('doctor')}>
                                <span>Доктор/Специальность</span>
                                {props.columnToSort === 'doctor' ? (
                                    props.sortDirection === 'asc' ? (
                                        <ArrowDropUpOutlinedIcon />
                                    ) : (
                                        <ArrowDropDownOutlinedIcon />
                                    )
                                ) : null}
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onClick={() => props.handleSort('comment')}>
                                <span>Комментарий</span>
                                {props.columnToSort === 'comment' ? (
                                    props.sortDirection === 'asc' ? (
                                        <ArrowDropUpOutlinedIcon />
                                    ) : (
                                        <ArrowDropDownOutlinedIcon />
                                    )
                                ) : null}
                            </div>
                        </StyledTableCell>

                        <StyledTableCell align="center">
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                                onClick={() => props.handleSort('isRegistered')}>
                                <span>Зарегетрирован/Не зарегестрирован</span>
                                {props.columnToSort === 'isRegistered' ? (
                                    props.sortDirection === 'asc' ? (
                                        <ArrowDropUpOutlinedIcon />
                                    ) : (
                                        <ArrowDropDownOutlinedIcon />
                                    )
                                ) : null}
                            </div>
                        </StyledTableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {props?.registrations
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((registration) => <TableRow key={registration.id}>
                            <StyledTableCell align="center" sx={FullNameTextStyle}>
                                {registration.id}
                            </StyledTableCell>

                            <StyledTableCell align="center" sx={FullNameTextStyle}>
                                {registration.fio}
                            </StyledTableCell>

                            <StyledTableCell align="center" sx={FullNameTextStyle}>
                                {registration.phone}
                            </StyledTableCell>

                            <StyledTableCell align="center" sx={FullNameTextStyle}>
                                {registration.doctor}
                            </StyledTableCell>

                            <StyledTableCell align="center" sx={FullNameTextStyle}>
                                {registration.comments}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                                <Checkbox checked={registration.registered}
                                    onChange={event => handleChecked(registration.id, event.target.checked)} />
                            </StyledTableCell>
                        </TableRow>)}
                </TableBody>
            </StyledTable>
            {props.registrations !== undefined && <TablePagination
                sx={{ marginRight: 10 }}
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={props.registrations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage={'Записей на странице'}
                labelDisplayedRows={({ from, to, count }) => {
                    return `${from}–${to} из ${count !== -1 ? count : `more than ${to}`}`
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />}
        </TableContainer>
    );
}

export interface IregistrationsRow {
    registration: RegistrationDto
}

export const RegistrationRow: React.FC<IregistrationsRow> = (props) => {
    const { registration } = props;

    return <TableRow>
        <StyledTableCell align="center" sx={FullNameTextStyle}>
            {registration.id}
        </StyledTableCell>

        <StyledTableCell align="center" sx={FullNameTextStyle}>
            {registration.fio}
        </StyledTableCell>

        <StyledTableCell align="center" sx={FullNameTextStyle}>
            {registration.phone}
        </StyledTableCell>

        <StyledTableCell align="center" sx={FullNameTextStyle}>
            {registration.doctor}
        </StyledTableCell>

        <StyledTableCell align="center" sx={FullNameTextStyle}>
            {registration.comments}
        </StyledTableCell>

        <StyledTableCell align="center">
            {registration.registered}
        </StyledTableCell>
    </TableRow>
}