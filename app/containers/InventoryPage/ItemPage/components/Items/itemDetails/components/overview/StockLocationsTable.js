import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
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
}));

const StockLocationsTable = ({ stockLocations }) => {
    const classes = useStyles()

    return (
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
                {stockLocations && stockLocations.map((stockLocation, i) => (
                    <TableRow key={i}>
                        <TableCell component="th">
                            {stockLocation.warehouseName}
                        </TableCell>
                        <TableCell align="right">
                            {stockLocation.stockOnHand}
                        </TableCell>
                        <TableCell align="right">
                            {stockLocation.committedStock}
                        </TableCell>
                        <TableCell align="right">
                            {stockLocation.availableForSale}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default StockLocationsTable