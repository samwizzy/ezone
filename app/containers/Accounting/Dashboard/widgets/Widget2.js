import React from "react"
import {
    makeStyles,
    Box,
    Button,
    Card, CardContent, CardActions,
    Divider,
    List,
    Paper,
    Grid,
    TableContainer,
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
    grid: {
        border: `1px solid ${theme.palette.grey[100]}`,
        '& .MuiGrid-item': {
            flex: 1,
            margin: theme.spacing(5)
        }
    },
    table: {
        "& .MuiTableFooter-root": {
            borderTop: `1px solid ${theme.palette.grey[400]} !important`
        },
        "& .MuiTableCell-root": {
            borderBottom: "none !important"
        },
        '& .MuiTableCell-body': {
            border: 0,
            color: theme.palette.text.secondary,
            fontSize: theme.typography.fontSize + 1
        },
    }
}));


const Widget2 = () => {
    const classes = useStyles()

    return (
        <div>
            <Typography gutterBottom variant="h6" component="h2">
                Total Payables
            </Typography>
            <Card>
                <CardContent>
                    <Typography variant="h6" color="textSecondary">
                        Total Unpaid Bills
                    </Typography>
                </CardContent>
                <TableContainer>
                    <Table className={classes.table}>
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
                                <TableCell align="left">NGN 100.00</TableCell>
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
                                <TableCell align="left">NGN 100.00</TableCell>
                            </TableRow>
                        </TableBody>
                        
                        <TableFooter>
                            <TableRow>
                                <TableCell align="left" colSpan={2}>
                                    <Typography variant="h6" component="h2" color="textSecondary">Total</Typography>
                                </TableCell>
                                <TableCell align="left">
                                    <Typography variant="h6" component="h2" color="textSecondary">NGN 100000.00</Typography>
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>  
                </TableContainer>
                
            </Card>
        </div>
    )
}

export default Widget2