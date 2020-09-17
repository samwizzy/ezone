import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    Box,
    Button,
    ButtonGroup,
    Icon,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Grid,
    Paper,
    ListSubheader,
    Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import clsx from 'clsx';
import { green, orange } from '@material-ui/core/colors';

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    table: {
        '& .MuiTableHead-root': {
            '& .MuiTableCell-head': {
                fontWeight: theme.typography.fontWeightBold,
            },
        },
        '& .MuiTableCell-root': {
            border: 'none !important',
            fontSize: theme.typography.fontSize,
            '& button:nth-child(n+2)': {
                marginLeft: theme.spacing(1),
            },
        },
        '& th.MuiTableCell-root': {
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.text.secondary,
        },
    },
    table2: {
        '& .MuiTableHead-root': {
            '& .MuiTableCell-head': {
                fontWeight: theme.typography.fontWeightBold,
            },
        },
        '& .MuiTableCell-root': {
            border: `1px solid ${theme.palette.divider} !important`,
        },
        '& th.MuiTableCell-root': {
            fontWeight: theme.typography.fontWeightMedium,
            color: theme.palette.text.secondary,
        },
    },
    gridList: {
        width: '100%',
        height: 250,
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    icon: {
        '&.status': { color: green[500] }
    },
}));


const Overview = (props) => {
    const { itemsGroup } = props
    const classes = useStyles()

    if (!itemsGroup) {
        return null
    }

    return (
        <div className={classes.root}>
            {Object.keys(itemsGroup).length > 0
                ? (
                    <Grid container>
                        <Grid item xs={9}>
                            <Table
                                className={classes.table}
                                size="small"
                                aria-label="custom table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={2}>Group Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{itemsGroup.groupDescription}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <Box p={1} mt={2}>
                                <Box my={1}>
                                    <div className={classes.flex}>
                                        <Typography variant="h6">{itemsGroup.groupName} Items</Typography>
                                        <ButtonGroup
                                            size="small"
                                            aria-label="small outlined button group"
                                        >
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => { }}
                                                disableElevation
                                            >
                                                Items
                                            </Button>
                                            <Button onClick={() => { }}>
                                                Clear
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Box>
                                <Table
                                    className={classes.table2}
                                    size="small"
                                    aria-label="custom table"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell rowSpan={2} align="center">ITEM NAME</TableCell>
                                            <TableCell colSpan={3} align="center">{itemsGroup.groupName.toUpperCase()} ITEMS</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">STOCK ON HAND</TableCell>
                                            <TableCell align="center">COMMITTED STOCK</TableCell>
                                            <TableCell align="center">AVAILABLE FOR SALE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {itemsGroup.items && itemsGroup.items.map(item => (
                                            <TableRow key={item.id}>
                                                <TableCell component="th">
                                                    {item.itemName}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.unit}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.quantity}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Icon className={clsx(classes.icon, { status: item.status })}>check</Icon>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                    </Grid>
                )
                :
                (
                    <Skeleton
                        variant="rect"
                        animation="wave"
                        width="100%"
                        height={118}
                    />
                )}
        </div>
    )
}

export default Overview 