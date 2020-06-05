import React from 'react'
import classNames from 'classnames'
import {
    makeStyles,
    Avatar,
    Box,
    Button,
    Card, CardContent, CardActions, CardHeader,
    Divider,
    Icon,
    IconButton,
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
import MoreVertIcon from '@material-ui/icons/MoreVert'

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
            padding: theme.spacing(2),
            "& .MuiTypography-root": {
                fontSize: theme.typography.subtitle1.fontSize
            }
        }
    },
    table: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        whiteSpace: "nowrap",
        "& .MuiTableFooter-root": {
            borderTop: `1px solid ${theme.palette.divider} !important`
        },
        "& .MuiTableCell-root": {
            borderBottom: "none",
            padding: theme.spacing(1),
        },
        '& .MuiTableCell-body': {
            color: theme.palette.text.secondary,
        },
    },
}));


const Widget5 = () => {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader
                    action={
                    <Button color="primary" aria-label="settings">
                        see all
                    </Button>
                    }
                    title="Leave Request for Approval"
                />
                <CardContent>
                    <Table className={classes.table}>
                        <TableBody>
                            {[0,1].map(hire => 
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        R
                                    </Avatar>
                                </TableCell>
                                <TableCell align="left">Christian Okeme</TableCell>
                                <TableCell align="right">Sick Leave</TableCell>
                            </TableRow>
                            )}
                        </TableBody>
                    </Table> 
                </CardContent> 
            </Card>
        </div>
    )
}

export default Widget5