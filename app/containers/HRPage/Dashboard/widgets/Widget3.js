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
import CrmDashImage1 from '../../../../images/crmDash.jpg'
import CrmDashImage2 from '../../../../images/crmDash2.jpg'

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
        backgroundImage: `url(${CrmDashImage1})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center bottom`,
        backgroundSize: 'cover',
        "& .MuiCardActions-root": {
            justifyContent: "center",
            backgroundColor: theme.palette.common.white,
        }
    },
    table: {
        whiteSpace: "nowrap",
        "& .MuiTableFooter-root": {
            borderTop: `1px solid ${theme.palette.divider} !important`,
        },
        "& .MuiTableCell-root": {
            borderBottom: "none !important",
        },
        '& .MuiTableCell-body': {
            color: theme.palette.common.white,
        },
    }
}));


const Widget3 = () => {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Table className={classes.table} size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th">
                                    <Typography variant="h3">100</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Typography variant="subtitle2">Branches</Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>  
                </CardContent>

                <CardActions>
                    <Typography>
                        View All Branches
                    </Typography>
                </CardActions>
            </Card>
        </div>
    )
}

export default Widget3