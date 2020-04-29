import React from "react"
import {
    makeStyles,
    Box,
    Button,
    Card, 
    CardContent, 
    CardActions,
    Divider,
    List,
    ListItem,
    ListItemText,
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
        "& .MuiCardActions-root": {
            justifyContent: "center",
        }
    },
    table: {
        "& .MuiTableFooter-root": {
            borderTop: `1px solid ${theme.palette.grey[400]} !important`,
        },
        "& .MuiTableCell-root": {
            borderBottom: "none !important",
        },
        '& .MuiTableCell-body': {
            color: theme.palette.text.primary,
            fontSize: theme.typography.fontSize
        },
    }
}));


const Widget4 = () => {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Table className={classes.table} size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography variant="h2" color="primary">0</Typography>
                                    <Typography variant="subtitle1">Qty</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>  
                </CardContent>

                <Divider />

                <CardActions>
                    <Typography variant="button" className={classes.title} color="textPrimary">
                        To be Shipped
                    </Typography>
                </CardActions>
            </Card>
        </div>
    )
}

export default Widget4