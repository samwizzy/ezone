import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Backdrop,
    Box,
    Button,
    ButtonGroup,
    GridList,
    GridListTile,
    GridListTileBar,
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
import { green, orange } from '@material-ui/core/colors';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ReactDropZone from './../../components/ReactDropZone';

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
    content: {
        flexGrow: 1,
    },
}));


const Overview = (props) => {
    const { getStockLocations, getItemById, item } = props
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {Object.keys({ id: 1, title: 'Infinix' }).length > 0
                ? (
                    <Grid container>
                        <Grid item xs={9}>
                            <Table
                                className={classes.table}
                                size="small"
                                aria-label="custom table"
                            >
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            SKU
                                        </TableCell>
                                        <TableCell align="right">
                                            {getItemById.sku}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Unit
                                        </TableCell>
                                        <TableCell align="right">
                                            {getItemById.unit}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Manufacturer</TableCell>
                                        <TableCell align="right">
                                            {getItemById.manufacturer}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <br />
                            <Table
                                className={classes.table}
                                size="small"
                                aria-label="custom table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={2}>Product Information</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Cost Price </TableCell>
                                        <TableCell align="right">{getItemById.costPrice}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <br />
                            <Table
                                className={classes.table}
                                size="small"
                                aria-label="custom table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={2}>Sales Information</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Selling Price</TableCell>
                                        <TableCell align="right">{getItemById.sellingPrice}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <Box p={1} mt={2}>
                                <Box my={1}>
                                    <div className={classes.flex}>
                                        <Typography variant="h6">Stock Locations </Typography>
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
                                                Acccounting Stock
                                            </Button>
                                            <Button onClick={() => { }}>
                                                Physical Stock
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
                                            <TableCell rowSpan={2} align="center">WAREHOUSE NAME</TableCell>
                                            <TableCell colSpan={3} align="center">ACCOUNTING STOCK</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="center">STOCK ON HAND</TableCell>
                                            <TableCell align="center">COMMITTED STOCK</TableCell>
                                            <TableCell align="center">AVAILABLE FOR SALE</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {getStockLocations.map(getStockLocation => (
                                            <TableRow key={getStockLocation.id}>
                                                <TableCell component="th">
                                                    {getStockLocation.warehouseName}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {getStockLocation.stockOnHand}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {getStockLocation.committedStock}
                                                </TableCell>
                                                <TableCell align="right">
                                                    {getStockLocation.availableForSale}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <div>
                                <GridList cellHeight={180} className={classes.gridList}>
                                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                                        {getItemById.itemsImages && getItemById.itemsImages.length > 0 ?
                                            <ListSubheader component="div">Attachment Preview</ListSubheader> :
                                            <ListSubheader component="div">There are no Attachment</ListSubheader>
                                        }
                                    </GridListTile>
                                    {getItemById.itemsImages && getItemById.itemsImages.map((tile, index) => (
                                        <GridListTile key={index} cols={2}>
                                            <img src={tile.fileUrl} alt={tile.fileName} />
                                            <GridListTileBar title={tile.fileName} />
                                        </GridListTile>
                                    ))}
                                </GridList>

                                <ReactDropZone
                                    uploadFileAction={() => { }}
                                    task={item}
                                />
                            </div>

                            <Paper square elevation={0}>
                                {[
                                    { name: 'Accounting Stock' },
                                    { name: 'Physical Stock' },
                                ].map((stock, i) => (
                                    <Table
                                        key={i}
                                        className={classes.table}
                                        size="small"
                                        aria-label="custom table"
                                    >
                                        <TableHead>
                                            <TableRow>
                                                <TableCell colSpan={2}>
                                                    {stock.name}
                                                    <HelpOutlineIcon />
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Stock on hand
                                                </TableCell>
                                                <TableCell align="left">
                                                    {'50.00'}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Committed Stock
                                                </TableCell>
                                                <TableCell align="left">
                                                    {'50.00'}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Available on Sale
                                                </TableCell>
                                                <TableCell align="left">
                                                    {'50.00'}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                ))}
                            </Paper>
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