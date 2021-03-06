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
        borderRadius: theme.shape.borderRadius * 4,
        backgroundImage: `url(${CrmDashImage2})`,
        backgroundRepeat: `no-repeat`,
        backgroundPosition: `center bottom`,
        backgroundSize: 'cover',
        "& .MuiCardActions-root": {
            justifyContent: "center",
            backgroundColor: theme.palette.common.white,
            fontSize: theme.typography.subtitle1.fontSize
        }
    },
    table: {
        "& .MuiTableFooter-root": {
            borderTop: `1px solid ${theme.palette.divider} !important`,
        },
        "& .MuiTableCell-root": {
            borderBottom: "none !important"
        },
        '& .MuiTableCell-body': {
            color: theme.palette.common.white,
            fontSize: theme.typography.fontSize
        },
    }
}));


const Widget2 = () => {
    const classes = useStyles()

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Table className={classes.table} size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell component="th" align="center">
                                    <Typography variant="h3">100</Typography>
                                    <Typography variant="h5">Contacts</Typography>
                                </TableCell>
                                <TableCell align="right">
                                    <Table size="small" align="right">
                                        <TableBody>
                                            <TableRow><TableCell align="left">20 Contacts</TableCell></TableRow>
                                            <TableRow><TableCell align="left">21 Leads</TableCell></TableRow>
                                            <TableRow><TableCell align="left">12 Opportunity</TableCell></TableRow>
                                            <TableRow><TableCell align="left">20 Subscribers</TableCell></TableRow>
                                        </TableBody>
                                    </Table>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>

                <Divider />

                <CardActions>
                    <Typography>
                        View All Contacts
                    </Typography>
                </CardActions>
            </Card>
        </div>
    )
}

export default Widget2