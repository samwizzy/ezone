import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import {
    Box,
    GridList,
    GridListTile,
    GridListTileBar,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Tabs, Tab,
    Grid,
    Paper,
    ListSubheader,
    Typography
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ReactDropZone from './../../components/ReactDropZone';
import StockLocationsTable from './overview/StockLocationsTable'

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
                borderBottom: `1px solid ${theme.palette.divider} !important`,
            },
        },
        '& .MuiTableCell-root': {
            border: 'none !important',
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
    tabs: {
        minHeight: 36,
        '& .MuiTabs-flexContainer': {
            justifyContent: 'flex-end'
        },
        '& .Mui-selected': {
            color: theme.palette.secondary.contrastText,
            background: theme.palette.primary.main
        },
        '& .MuiTab-root': {
            minHeight: 36,
        }
    },
}));


const Overview = (props) => {
    const { stockLocations, itemById } = props
    const classes = useStyles()

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            {itemById
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
                                        <TableCell component="th" scope="row">SKU</TableCell>
                                        <TableCell align="right">{itemById.sku}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Unit</TableCell>
                                        <TableCell align="right">{itemById.unit}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell component="th" scope="row">Manufacturer</TableCell>
                                        <TableCell align="right">{itemById.manufacturer}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
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
                                        <TableCell align="right">{itemById.costPrice}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
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
                                        <TableCell align="right">{itemById.sellingPrice}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table
                                className={classes.table}
                                size="small"
                                aria-label="custom table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Item Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th">{itemById.description}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                            <Box p={1} mt={2}>
                                <Typography variant="h6" gutterBottom>Stock Locations </Typography>

                                <Paper square elevation={0}>
                                    <Tabs
                                        className={classes.tabs}
                                        value={value}
                                        indicatorColor="primary"
                                        textColor="primary"
                                        onChange={handleChange}
                                        aria-label="stocks tabs"
                                    >
                                        <Tab label="Acccounting Stock" />
                                        <Tab label="Physical Stock" />
                                    </Tabs>
                                </Paper>
                                {value === 0 && <StockLocationsTable stockLocations={stockLocations} />}
                                {value === 1 && <div />}
                            </Box>
                        </Grid>
                        <Grid item xs={3}>
                            <div>
                                <GridList cellHeight={180} className={classes.gridList}>
                                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                                        {itemById.itemsImages && itemById.itemsImages.length > 0 ?
                                            <ListSubheader component="div">Attachment Preview</ListSubheader> :
                                            <ListSubheader component="div">There are no Attachment</ListSubheader>
                                        }
                                    </GridListTile>
                                    {itemById.itemsImages && itemById.itemsImages.map((tile, index) => (
                                        <GridListTile key={index} cols={2}>
                                            <img src={tile.fileUrl} alt={tile.fileName} />
                                            <GridListTileBar title={tile.fileName} />
                                        </GridListTile>
                                    ))}
                                </GridList>

                                <ReactDropZone uploadFileAction={() => { }} />
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
                                                    {_.sumBy(stockLocations, 'stockOnHand')}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Committed Stock
                                                </TableCell>
                                                <TableCell align="left">
                                                    {_.sumBy(stockLocations, 'committedStock')}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    Available on Sale
                                                </TableCell>
                                                <TableCell align="left">
                                                    {_.sumBy(stockLocations, 'availableForSale')}
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