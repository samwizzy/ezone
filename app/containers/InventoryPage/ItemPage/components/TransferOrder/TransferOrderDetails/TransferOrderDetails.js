import React, { memo } from 'react';
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
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TableFooter,
  TextField,
  Toolbar,
  Grid,
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
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment';
import _ from 'lodash';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import LabelOutlined from '@material-ui/icons/LabelOutlined';
import DeleteSweepOutlinedIcon from '@material-ui/icons/DeleteSweepOutlined';
import Add from '@material-ui/icons/Add';
import WallpaperIcon from '@material-ui/icons/Wallpaper';
import * as Selectors from '../../../selectors';
import * as AppSelectors from '../../../../../App/selectors';
import * as Actions from '../../../actions';
import ControlledButtons from './components/ControlledButtons'
import LeftSidePanel from './components/LeftSidePanel'
import Overview from './components/Overview'

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.common.white,
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexWidth: {
    '& button:nth-child(n+1)': {
      marginLeft: theme.spacing(1),
    },
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
      fontSize: theme.typography.fontSize + 2,
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
  ribbon: {
    backgroundColor: green[500],
    color: theme.palette.common.white,
    fontSize: theme.typography.fontSize - 2,
    padding: theme.spacing(0.5, 2),
    minWidth: '120px',
    '-ms-transform': 'rotate(-45deg)',
    '-webkit-transform': 'rotate(-45deg)',
    '-moz-transform': 'rotate(-45deg)',
    transform: 'rotate(-45deg)',
    position: 'absolute',
    top: '20px',
    left: '-27px',
    textAlign: 'center',
    boxShadow: `0px 7px 8px ${theme.palette.grey[300]}`,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: `calc(100vh - 194px)`,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(5),
    position: 'relative',
    overflow: 'hidden',
  },
  icon: {
    width: 20,
    height: 20,
    color: theme.palette.grey[700],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
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

const TransferOrderDetails = props => {
  const classes = useStyles();
  const {
    loading,
    getTransferOrderById,
    openEditTransferOrderDialog,
    transferOrders,
    transferOrder,
    match,
  } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const { params } = match;

  React.useEffect(() => {
    getTransferOrderById(params.transferId);
  }, []);

  const handleItemById = id => {
    setSelectedIndex(id);
    getTransferOrderById(id);
    props.history.push({ pathname: `/inventory/transfer/${id}` });
  };

  console.log(transferOrders, 'transferOrders');
  console.log(transferOrder, 'transferOrder');

  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <Grid item md={3}>
          <nav className={classes.drawer} aria-label="inventory item">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css" />
            <Hidden xsDown implementation="css">
              <div className={classes.drawerPaper}>
                <LeftSidePanel
                  transferOrders={transferOrders}
                  handleItemById={handleItemById}
                  selectedIndex={selectedIndex}
                />
              </div>
            </Hidden>
          </nav>
        </Grid>

        <Grid item xs={9}>
          <Grid container justify="center" alignItems="center">
            <Grid item xs={12}>
              <ControlledButtons transferOrder={transferOrder} openEditTransferOrderDialog={openEditTransferOrderDialog} />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.content}>
                <Backdrop className={classes.backdrop} open={loading}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Overview transferOrder={transferOrder} />
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
  getTransferOrderById: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  transferOrders: Selectors.makeSelectGetAllTransferOrder(),
  transferOrder: Selectors.makeSelectGetTransferOrderById(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTransferOrderById: data => dispatch(Actions.getTransferOrderById(data)),
    openEditTransferOrderDialog: data => dispatch(Actions.openEditTransferOrderDialog(data)),
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
)(TransferOrderDetails);
