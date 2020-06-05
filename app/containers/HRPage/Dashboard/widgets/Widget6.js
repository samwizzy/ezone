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
    Menu,
    MenuItem,
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import months from '../../../../utils/months' 

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

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);
    let monthsList = [{label: "Month", value: "Month"}, ...months];

    const handleClickListItem = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Card className={classes.card}>
                <CardHeader
                    action={
                    <>    
                        <Button color="primary" aria-label="settings" onClick={handleClickListItem}>
                            {monthsList[selectedIndex].label} <ExpandMoreIcon />
                        </Button>
                        <Menu
                            id="lock-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            {monthsList.map((option, index) => (
                            <MenuItem
                                key={option.label}
                                disabled={index === 0}
                                selected={index === selectedIndex}
                                onClick={(event) => handleMenuItemClick(event, index)}
                            >
                                {option.label}
                            </MenuItem>
                            ))}
                        </Menu>
                    </>
                    }
                    title="Uploading Birthdays"
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
                                <TableCell align="right">May 17</TableCell>
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