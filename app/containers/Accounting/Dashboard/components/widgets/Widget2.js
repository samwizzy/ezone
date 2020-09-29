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
        flexGrow: 1,
        overflowX: 'hidden',
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


const Widget2 = () => {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader
                    title="Total Payables"
                    subheader="Total Unpaid Bills"
                />

                <Table className={classes.table} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan="3" variant="head" component="th">
                                <Typography variant="subtitle1" color="primary">Current</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">10</TableCell>
                            <TableCell align="left">1 - 10 days</TableCell>
                            <TableCell align="right">NGN 100.00</TableCell>
                        </TableRow>
                    </TableBody>

                    <TableHead>
                        <TableRow>
                            <TableCell colSpan="3" variant="head" component="th">
                                <Typography variant="subtitle1" component="h2" color="primary">Overdue</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" scope="row">10</TableCell>
                            <TableCell align="left">1 - 30 days</TableCell>
                            <TableCell align="right">NGN 100.00</TableCell>
                        </TableRow>
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell align="left" colSpan={2}>
                                <Typography variant="subtitle1" component="h2" color="textSecondary">Total</Typography>
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

export default Widget2