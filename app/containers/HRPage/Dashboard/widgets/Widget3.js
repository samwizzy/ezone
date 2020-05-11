import React from "react"
import {
    makeStyles,
    Box,
    Button,
    Card, CardContent, CardActions, CardHeader,
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
    card: {
        borderRadius: theme.shape.borderRadius * 2,
        "& .MuiCardActions-root": {
            justifyContent: "center"
        }
    },
    table: {
        minHeight: theme.spacing(17),
        "& .MuiTableCell-root": {
            borderBottom: "none !important"
        },
        '& .MuiTableCell-body': {
            color: theme.palette.text.secondary,
            fontSize: theme.typography.fontSize + 1
        },
    }
}));


const Widget3 = () => {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardActions>
                    <Typography variant="h6" component="h1" className={classes.title} color="textPrimary">
                        Today's Schedule
                    </Typography>
                </CardActions>
                <Divider />
                <CardContent>
                <Table className={classes.table} size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">
                                <Typography variant="h6">No Schedule Found</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table> 
                </CardContent>
                
            </Card>
        </div>
    )
}

export default Widget3