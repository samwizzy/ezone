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


const Widget4 = () => {
    const classes = useStyles()

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography variant="h6" color="textSecondary">
                        Account
                    </Typography>
                </CardContent>
                <TableContainer>
                    <Table className={classes.table}>
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
                                    <Typography variant="h6" component="h2" color="textSecondary">Total</Typography>
                                </TableCell>
                                <TableCell align="right">
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

export default Widget4