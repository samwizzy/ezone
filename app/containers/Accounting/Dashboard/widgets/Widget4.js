import React from "react"
import {
    makeStyles,
    Box,
    Button,
    Card, CardHeader,
    Table,
    TableHead,
    TableBody,
    TableFooter,
    TableRow,
    TableCell,
    Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    card: {
        overflowX: 'hidden'
    },
    table: {
        minWidth: 400,
        "& .MuiTableFooter-root": {
            borderTop: `1px solid ${theme.palette.divider} !important`
        },
        "& .MuiTableCell-root": {
            borderBottom: "none !important"
        },
        '& .MuiTableCell-body': {
            color: theme.palette.text.secondary,
            fontSize: theme.typography.fontSize
        },
    }
}));


const Widget4 = () => {
    const classes = useStyles()

    return (
        <div>
            <Card>
                <CardHeader
                    title="Account"
                />
                <Table className={classes.table} size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">Cash at Hand</TableCell>
                            <TableCell align="right">NGN 200.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" scope="row">Bank</TableCell>
                            <TableCell align="right">NGN 200.00</TableCell>
                        </TableRow>
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell align="left">
                                <Typography variant="subtitle1" color="textSecondary">Total</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Typography variant="subtitle1" color="textSecondary">NGN 100000.00</Typography>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Card>
        </div>
    )
}

export default Widget4