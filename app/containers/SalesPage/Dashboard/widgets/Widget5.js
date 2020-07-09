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
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    gridroot: {
        width: 'fit-content',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
          margin: theme.spacing(1.5),
        },
        '& hr': {
          margin: theme.spacing(0, 0.5),
        },
    },
    card: {
        "& .MuiCardHeader-root": {
            padding: theme.spacing(1),
            "& .MuiTypography-root": {
                fontSize: theme.typography.h6.fontSize
            }
        }
    },
    table: {
        "& .MuiTableCell-root": {
            // borderBottom: "none !important",
        },
        '& .MuiTableCell-body': {
            color: theme.palette.text.primary,
            fontSize: theme.typography.fontSize
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
            <Card square className={classes.card}>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Typography variant="button">Quantity in hand</Typography>
                            </TableCell>
                            <TableCell align="right">
                                <Divider orientation="vertical" flexItem style={{borderBottom: '1px solid red'}} />
                                <Typography variant="h3" color="primary">0</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Card>
        </div>
    )
}

export default Widget5