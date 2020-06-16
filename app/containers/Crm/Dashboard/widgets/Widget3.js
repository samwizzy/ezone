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
        border: `1px solid ${theme.palette.divider}`,
        '& .MuiGrid-item': {
            flex: 1,
            margin: theme.spacing(5)
        }
    },
    card: {
        borderRadius: theme.shape.borderRadius * 4,
        "& .MuiCardHeader-root": {
            textAlign: "center",
            padding: theme.spacing(1),
            fontSize: `${theme.typography.subtitle1.fontSize} !important`,
            borderBottom: `1px solid ${theme.palette.divider}`,
        }
    },
    table: {
        "& .MuiTableCell-root": {
            borderBottom: "none !important"
        },
        '& .MuiTableCell-body': {
            padding: theme.spacing(7, 1),
            color: theme.palette.text.secondary,
            fontSize: theme.typography.h6.fontSize
        },
    }
}));

const Widget3 = () => {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader
                    title="Today's Schedule"
                    disableTypography
                />
                <CardContent>
                    <Table className={classes.table} size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">
                                    <Typography>No Schedule Found</Typography>
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