import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  Toolbar,
  Grid,
  Divider,
  Paper,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  Icon,
  IconButton,
  Typography,
  Hidden,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { green, orange } from '@material-ui/core/colors';
import moment from 'moment';
import _ from 'lodash';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Adjust from '@material-ui/icons/Adjust';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LabelOutlined from '@material-ui/icons/LabelOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import Add from '@material-ui/icons/Add';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import * as Selectors from '../../selectors';
import * as AppSelectors from '../../../../App/selectors';
import * as Actions from '../../actions';

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(2, 0)
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1, 0)
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      flexDirection: 'column',
      width: drawerWidth, // works better without position:fixed
      flexShrink: 0,
      overflowY: 'auto',
      height: '100vh',
      borderRight: `1px solid ${theme.palette.grey[100]}`,
      '& .MuiListSubheader-root': {
        backgroundColor: theme.palette.common.white,
      },
      '&::-webkit-scrollbar': {
        width: '6px',
        backgroundColor: '#F5F5F5',
      },
      '&::-webkit-scrollbar-track': {
        '-webkitBoxShadow': 'inset 0 0 6px rgba(0,0,0,0.3)',
        borderRadius: '10px',
      },
      '&::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)',
        backgroundColor: theme.palette.primary.main,
      },
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
    '& .MuiTableCell-root': {},
    '& th.MuiTableCell-root': {
      fontWeight: theme.typography.fontWeightMedium,
      color: theme.palette.text.secondary,
    },
  },
  list: {
    '& .MuiListItemIcon-root': {
      minWidth: '40px !important',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  tabsPaper: {
    backgroundColor: theme.palette.background.paper,
  },
  title: { flexGrow: 1 },
  icon: {
    width: 20,
    height: 20,
    color: theme.palette.grey[700],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
  buttonGroup: {
    border: `1px solid ${theme.palette.grey[50]}`,
  },
  status: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    padding: theme.spacing(1),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const InventoryAdjustmentDetails = props => {
  const classes = useStyles();
  const { loading, getInventoryAdjustByIdAction, inventoryAdjusts, inventoryAdjust, match, getAllInventoryAdjustmentsAction } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const anchorRef = React.useRef(null);

  const { params } = match;
  console.log(params, 'params');

  React.useEffect(() => {
    getAllInventoryAdjustmentsAction();
    getInventoryAdjustByIdAction(params.statusId);
  }, []);

  const filteredItems = _.orderBy(inventoryAdjusts, ['dateCreated'], ['desc']);

  const handleItemById = id => {
    setSelectedIndex(id);
    getInventoryAdjustByIdAction(id);
    props.history.push({ pathname: `/inventory/adjustments/${id}` });
  };

  console.log(inventoryAdjusts, 'inventoryAdjusts');
  console.log(inventoryAdjust, 'inventoryAdjust');
  const drawer = (
    <div>
      <List
        className={classes.list}
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <div className={classes.flex}>
              <Typography variant="h6" color="textPrimary">
                Inventory Adjustments
              </Typography>

              <Button
                variant="contained"
                size="small"
                color="primary"
                startIcon={<Add />}
                onClick={() =>
                  props.history.push({ pathname: '/inventory/adjustments/new' })
                }
                disableElevation
              >
                New
              </Button>
            </div>
          </ListSubheader>
        }
      >
        {filteredItems &&
          inventoryAdjusts.map(item => (
            <ListItem
              disableRipple
              button
              selected={selectedIndex == item.id}
              key={item.id}
              onClick={() => handleItemById(item.id)}
            >
              <ListItemIcon>
                <LabelOutlined />
              </ListItemIcon>
              <ListItemText
                primary={item.reason}
                secondary={moment(item.dateCreated).format('Do MMM YY')}
              />
              <ListItemSecondaryAction>
                <Typography variant="button" color="primary">
                  Adjusted
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <Grid item md={3}>
          <nav className={classes.drawer} aria-label="inventory item">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css" />
            <Hidden xsDown implementation="css">
              <div className={classes.drawerPaper}>{drawer}</div>
            </Hidden>
          </nav>
        </Grid>

        <Grid item xs={9}>
          <Grid container justify="center">
            <Grid item xs={12}>
              <Toolbar>
                <Typography variant="h6" color="textPrimary" className={classes.title}>
                  Adjustment Details
                </Typography>

                <ButtonGroup aria-label="small outlined button group">
                  <IconButton onClick={() => { }}>
                    <EditOutlinedIcon className={classes.icon} />
                  </IconButton>
                  <IconButton onClick={() => { }}>
                    <DeleteSweepOutlinedIcon className={classes.icon} />
                  </IconButton>
                </ButtonGroup>
              </Toolbar>
            </Grid>
            <Grid item md={11}>
              <div className={classes.content}>
                <Backdrop className={classes.backdrop} open={loading}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                {inventoryAdjust
                  ? (
                    <Fragment>
                      <Table
                        className={classes.table}
                        size="small"
                        aria-label="custom table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={2}>
                              Product Information
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Date
                            </TableCell>
                            <TableCell align="right">
                              {moment(inventoryAdjust.dateCreated).format(
                                'Do MMM YY',
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Reason
                            </TableCell>
                            <TableCell align="right">
                              {inventoryAdjust.reason}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Status
                            </TableCell>
                            <TableCell align="right">
                              <Typography
                                variant="button"
                                color="primary"
                                className={classes.status}
                              >
                                ADJUSTED
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Reference Number
                            </TableCell>
                            <TableCell align="right">{inventoryAdjust.referenceNumber}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Warehouse
                            </TableCell>
                            <TableCell align="right">{inventoryAdjust.warehouseName}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              Adjusted By
                            </TableCell>
                            <TableCell align="right">{inventoryAdjust.addedBy}</TableCell>
                          </TableRow>
                        </TableBody>
                        <TableHead>
                          <TableRow>
                            <TableCell colSpan={2}>
                              Product Description
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell colSpan={2}>
                              {inventoryAdjust.reasonDescription}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>

                      <Box p={1} mt={2}>
                        <Box my={1}>
                          <Typography variant="h6">Adjusted Items</Typography>
                        </Box>
                        <Table
                          className={classes.table2}
                          size="small"
                          aria-label="custom table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell component="th" />
                              <TableCell component="th">Item Details</TableCell>
                              <TableCell component="th">
                                Warehouse Name
                              </TableCell>
                              <TableCell component="th" align="right">
                                Quality Adjusted
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {inventoryAdjust.items.map(item => (
                              <TableRow key={item.id}>
                                <TableCell align="center">
                                  <WallpaperIcon />
                                </TableCell>
                                <TableCell>
                                  <Typography variant="subtitle1">
                                    {item.itemName}
                                  </Typography>
                                  <Typography variant="caption">
                                    {item.sku}
                                  </Typography>
                                </TableCell>
                                <TableCell>Optisoft Tech</TableCell>
                                <TableCell align="right">
                                  {item.adjustedQuantity}(pcs)
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </Box>
                    </Fragment>
                  ) : (
                    <Skeleton
                      variant="rect"
                      animation="wave"
                      width="100%"
                      height={118}
                    />
                  )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

InventoryAdjustmentDetails.propTypes = {
  loading: PropTypes.bool,
  getInventoryAdjustByIdAction: PropTypes.func,
  getAllInventoryAdjustmentsAction: PropTypes.func,
  inventoryAdjusts: PropTypes.array,
  inventoryAdjust: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  inventoryAdjusts: Selectors.makeSelectGetAllInventoryAdjustments(),
  inventoryAdjust: Selectors.makeSelectGetInventoryAdjustByIdResponse(),
});

function mapDispatchToProps(dispatch) {
  return {
    getInventoryAdjustByIdAction: evt =>
      dispatch(Actions.getInventoryAdjustById(evt)),
    getAllInventoryAdjustmentsAction: () =>
      dispatch(Actions.getAllInventoryAdjustments()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(InventoryAdjustmentDetails);
