import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  Backdrop,
  Box,
  CircularProgress,
  Breadcrumbs,
  Tabs,
  Tab,
  Grid,
  Typography,
  Hidden,
} from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';
import _ from 'lodash';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import * as Selectors from '../../../selectors';
import * as Actions from '../../../actions';
import Drawer from './components/LeftSidePanel'
import ControlsButtons from './components/ControlsButtons'
import Overview from './components/Overview'

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const ItemsGroupDetails = props => {
  const classes = useStyles();
  const {
    loading,
    itemsGroups,
    itemsGroup,
    match,
    openNewItemGroupDialog,
    getItemsGroupById,
  } = props;

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [value, setValue] = React.useState(0);

  const { params } = match;

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    // getItemsGroupById(params.groupId);
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [params.groupId]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleItemGroupById = id => {
    setSelectedIndex(id);
    getItemsGroupById(id);
    props.history.push({ pathname: `/inventory/items/groups/${id}` });
  };

  console.log(itemsGroup, "itemsGroup itemsGroup")

  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <Grid item md={2}>
          <nav className={classes.drawer} aria-label="inventory item">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css" />
            <Hidden xsDown implementation="css">
              <div className={classes.drawerPaper}>
                <Drawer
                  itemsGroups={itemsGroups}
                  handleItemGroupById={handleItemGroupById}
                  openNewItemGroupDialog={openNewItemGroupDialog}
                  selectedIndex={selectedIndex}
                />
              </div>
            </Hidden>
          </nav>
        </Grid>
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={12}>
              <ControlsButtons />
            </Grid>
            <Grid item xs={12}>
              <div className={classes.content}>
                <Backdrop className={classes.backdrop} open={loading}>
                  <CircularProgress color="inherit" />
                </Backdrop>

                <Box px={2}>
                  <Typography variant="h6">{itemsGroup && itemsGroup.groupName}</Typography>
                  <Breadcrumbs aria-label="breadcrumb" separator="›">
                    <Typography color="textPrimary" className={classes.link}>
                      Items Group
                    </Typography>
                    <Typography color="textPrimary" className={classes.link}>
                      <KeyboardReturn className={classes.icon} />
                      {itemsGroup && itemsGroup.groupName}
                    </Typography>
                  </Breadcrumbs>
                </Box>
                <div className={classes.paper}>
                  <AntTabs
                    value={value}
                    onChange={handleTabChange}
                    aria-label="ant example"
                  >
                    <AntTab label="Overview" />
                    <AntTab label="Transactions" />
                    <AntTab label="Related List" />
                    <AntTab label="Adjustment" />
                    <AntTab label="History" />
                  </AntTabs>
                  <Typography className={classes.padding} />
                  <Box p={1} mb={2}>
                    {value == 0 && (
                      <Overview itemsGroup={itemsGroup} />
                    )}
                    {value == 1 && <div />}
                    {value == 2 && <div />}
                  </Box>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

ItemsGroupDetails.propTypes = {
  loading: PropTypes.bool,
  getItemsGroupById: PropTypes.func,
  itemsGroup: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  itemsGroups: Selectors.makeSelectGetAllItemsGroups(),
  itemsGroup: Selectors.makeSelectGetAllItemsGroupById(),
});

function mapDispatchToProps(dispatch) {
  return {
    getItemsGroupById: data => dispatch(Actions.getItemsGroupById(data)),
    openNewItemGroupDialog: () => dispatch(Actions.openNewItemGroupDialog()),
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
)(ItemsGroupDetails);
