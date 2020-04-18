import React from 'react'
import classNames from 'classnames'
import {
    makeStyles,
    Box,
    Button,
    Card, CardContent, CardActions, CardHeader,
    Divider,
    Icon,
    List,
    Paper,
    Grid,
    Table,
    TableHead,
    TableBody,
    TableFooter,
    TableRow,
    TableCell,
    Typography
} from '@material-ui/core';
import { green, orange, red } from '@material-ui/core/colors'
import LensSharp from '@material-ui/icons/LensSharp'
import AddIcon from '@material-ui/icons/Add'

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
    card: {
        borderRadius: theme.shape.borderRadius * 2,
        "& .MuiCardHeader-root": {
            padding: theme.spacing(1),
            "& .MuiTypography-root": {
                fontSize: theme.typography.h6.fontSize
            }
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
        '& .MuiTableCell-body:last-child': {
            display: "flex",
            alignItems: "center",
        },
    },
    status: {
        width: 14,
        height: 14,
        color: theme.palette.common.black,
        '&.approved': { color: theme.palette.primary.main},
        '&.inProgress': { color: orange[500]},
        '&.expired': { color: red[500]},
        '&.done': { color: green[500]},
    }
}));


const Widget5 = () => {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h6" color="textPrimary" gutterBottom>
                        Tasks
                    </Typography>

                    <Table className={classes.table}>
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" scope="row">Name</TableCell>
                                <TableCell align="right">Created</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Call Deban Distributor</TableCell>
                                <TableCell align="right">19/04/2019</TableCell>
                                <TableCell>
                                    <LensSharp className={classNames(classes.status, {inProgress: true})} />
                                    <Typography variant="subtitle1">Ongoing</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Make new order</TableCell>
                                <TableCell align="right">13/04/2019</TableCell>
                                <TableCell>
                                    <LensSharp className={classNames(classes.status, {expired: true})} />
                                    <Typography variant="subtitle1">Due</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell component="th" scope="row">Evaluate new invoice</TableCell>
                                <TableCell align="right">21/04/2019</TableCell>
                                <TableCell>
                                    <LensSharp className={classNames(classes.status, {done: true})} />
                                    <Typography variant="subtitle1">Done</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table> 
                </CardContent> 
            </Card>
        </div>
    )
}

export default Widget5