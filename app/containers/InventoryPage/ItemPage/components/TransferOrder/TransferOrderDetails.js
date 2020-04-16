import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Backdrop, Box, Button, ButtonGroup, CircularProgress, ClickAwayListener, Breadcrumbs, Grow, Popper, Tabs, Tab, Table, TableHead, TableRow, TableCell, TableSortLabel, TableBody, TableFooter, TextField, Toolbar, Grid, Divider, Menu, MenuItem, MenuList, Paper, List, ListItem, ListSubheader, ListItemText, ListItemIcon, ListItemSecondaryAction, Icon, IconButton, Typography, Hidden } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import _ from 'lodash'
import * as Actions from '../../../actions';
import * as AppSelectors from '../../../../App/selectors';
import * as Selectors from '../../selectors';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Adjust from '@material-ui/icons/Adjust';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LabelOutlined from '@material-ui/icons/LabelOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import Add from '@material-ui/icons/Add';
import WallpaperIcon from '@material-ui/icons/Wallpaper';

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
  },
  flex: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  flexWidth: {
    "& button:nth-child(n+1)": {
      marginLeft: theme.spacing(1)
    }
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      width: drawerWidth, // works better without position:fixed
      flexShrink: 0,
      overflowY: 'auto',
      minHeight: `calc(100vh - 160px)`,
      borderRight: `1px solid ${theme.palette.grey[100]}`,
      '& .MuiListSubheader-root': {
        backgroundColor: theme.palette.common.white
      },
      "&::-webkit-scrollbar": {
        width: "6px",
        backgroundColor: "#F5F5F5"
      },
      "&::-webkit-scrollbar-track": {
        "-webkitBoxShadow": "inset 0 0 6px rgba(0,0,0,0.3)",
        borderRadius: "10px",
      },
      "&::-webkit-scrollbar-thumb": {
        borderRadius: "10px",
        "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
        backgroundColor: theme.palette.primary.main,
      }
    },
  },
  table: {
    '& .MuiTableHead-root': {
        '& .MuiTableCell-head': {
            fontWeight: theme.typography.fontWeightBold,
        },
    },
    '& .MuiTableCell-root': {
        border: 'none !important',
        fontSize: theme.typography.fontSize + 2,
        '& button:nth-child(n+2)': {
            marginLeft: theme.spacing(1),
        },
    },
    '& th.MuiTableCell-root': {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.text.secondary,
    }
  },
  table2: {
    '& .MuiTableHead-root': {
        '& .MuiTableCell-head': {
            fontWeight: theme.typography.fontWeightBold,
        },
    },
    '& .MuiTableCell-root': {
    },
    '& th.MuiTableCell-root': {
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette.text.secondary,
    }
  },
  list: {
    "& .MuiListItemIcon-root": {
      minWidth: "40px !important"
    },
  },
  ribbon: {
    backgroundColor: green[500],
    color: theme.palette.common.white,
    fontSize: theme.typography.fontSize - 2,
    padding: theme.spacing(0.5, 2),
    minWidth: "120px",
    "-ms-transform": "rotate(-45deg)", 
    "-webkit-transform": "rotate(-45deg)",
    "-moz-transform": "rotate(-45deg)",
    transform: "rotate(-45deg)",
    position: "absolute",
    top: "20px",
    left: "-27px",
    textAlign: "center",
    boxShadow: `0px 7px 8px ${theme.palette.grey[300]}`,
    right: console.log(theme, "theme")
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: `calc(100vh - 194px)`
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    position: "relative",
    overflow: 'hidden'
  },
  icon: {
    width: 20,
    height: 20,
    color: theme.palette.grey[700],
    '&.approved': { color: theme.palette.primary.main},
    '&.inProgress': { color: orange[500]},
    '&.done': { color: green[500]},
  },
  status: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(1)
  },
  marked: {
    backgroundColor: green[500],
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: green[600],
    }
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const TransferOrderDetails = props => {
  const classes = useStyles();
  const { loading, items, item, match } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const [value, setValue] = React.useState(0);
  const filteredItems = _.orderBy(items, ['dateCreated'], ['desc']);

  

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleItemById = id => {
    setSelectedIndex(id)
    getInventoryItem(id)
    props.history.push({pathname: '/inventory/item/' + id})
  }

  const drawer = (
    <div>
      <List
        className={classes.list}
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <div className={classes.flex}>
                <div>
                    <Typography variant="h6" color="textPrimary">All Transfer Order</Typography>
                </div>              
                <Button variant="contained" size="small" color="primary" startIcon={<Add/>} onClick={() => {}} disableElevation>
                  Add
                </Button>
            </div>
          </ListSubheader>
        }
      >
        {items && items.length === 0 && <Skeleton animation="wave" />}
        {filteredItems && [0,1,2,3].map(item => (
          <ListItem disableRipple button selected={selectedIndex == item.id} key={item.id} onClick={() => handleItemById(item.id)}>
            <ListItemIcon><LabelOutlined /></ListItemIcon>
            <ListItemText primary={`Item ${item}`} secondary={"Oct Apr 2020"} />
            <ListItemSecondaryAction>
              <Typography variant="subtitle1" color="textPrimary">14:00</Typography>
              <Typography variant="caption" color="primary">In Transit</Typography>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  );


  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-between'
      >  
        <Grid item md={3}>
          <nav className={classes.drawer} aria-label="inventory item">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              
            </Hidden>
            <Hidden xsDown implementation="css">
              <div
                className={classes.drawerPaper}
              >
                {drawer}
              </div>
            </Hidden>
          </nav>
        </Grid>

        <Grid item xs={9}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
              <Box mx={2}>
                <div className={classNames(classes.flexWidth)}>
                  <Button onClick={()=>{}} className={classes.marked} variant="contained" color="primary" disableElevation>Mark as Received</Button>
                  <Button variant="outlined" onClick={()=>{}}><EditOutlinedIcon className={classes.icon} /></Button>
                  <Button variant="outlined" onClick={()=>{}}><DeleteSweepOutlinedIcon className={classes.icon} /></Button>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12}>          
              <div className={classes.content}>
                <Backdrop className={classes.backdrop} open={loading}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Paper square className={classes.paper}>
                  <div className={classes.ribbon}>
                    Special Offer
                  </div>
                          
                  {Object.keys({id: 1, title: 'Infinix'}).length > 0 ?
                    <div>
                      <Table className={classes.table} size="small" aria-label="custom table">
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={2}>
                              <Typography variant="h5">TRANSFER ORDER</Typography>
                              <Typography variant="body2">Transfer order</Typography>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow key={item.title}>
                            <TableCell component="th" scope="row">
                              DATE
                            </TableCell>
                            <TableCell align="right">{"04 Apr 2020"}</TableCell>
                          </TableRow>
                          <TableRow key={item.title}>
                            <TableCell component="th" scope="row">
                              CREATED BY
                            </TableCell>
                            <TableCell align="right">{"Stolen goods"}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                      <Table className={classes.table} size="small" aria-label="custom table">
                        <TableHead>
                          <TableRow>
                            <TableCell component="th">SOURCE WAREHOUSE</TableCell>
                            <TableCell component="th" align="right">DESTINATION WAREHOUSE</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow key={item.title}>
                            <TableCell component="th" scope="row">
                              Optisoft
                            </TableCell>
                            <TableCell align="right">{"Marina"}</TableCell>
                          </TableRow>
                          <TableRow key={item.title}>
                            <TableCell component="th">
                              Nigeria
                            </TableCell>
                            <TableCell align="right">{"Nigeria"}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <Box p={1} mt={2}>
                        <Table className={classes.table2} size="small" aria-label="custom table">
                          <TableHead>
                            <TableRow>
                              <TableCell colSpan={2} component="th">ITEMS & DESCRIPTION</TableCell>
                              <TableCell component="th" align="right">QUALITY TRANSFERRED</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell align="center">
                                <WallpaperIcon/> 
                              </TableCell>
                              <TableCell>
                                <Typography variant="subtitle1">Infinix</Typography>
                                <Typography variant="caption">SKU 26392403</Typography>
                              </TableCell>
                              <TableCell align="right">1</TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </Box>
                    </div>
                    :
                    <Skeleton variant="rect" animation="wave" width="100%" height={118} />
                  }
                </Paper>
                  
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

TransferOrderDetails.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  items: Selectors.makeSelectGetAllItems(),
  item: Selectors.makeSelectItemDetails(),
});

function mapDispatchToProps(dispatch) {
  return {};
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
    withRouter,
    withConnect,
    memo,
)(TransferOrderDetails);
