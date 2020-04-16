import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { createStructuredSelector } from 'reselect';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  ClickAwayListener,
  Breadcrumbs,
  Grow,
  Popper,
  Tabs,
  Tab,
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
  Divider,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemIcon,
  Icon,
  IconButton,
  Typography,
  Hidden,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { green, orange } from '@material-ui/core/colors';
import moment from 'moment';
import _ from 'lodash';
import * as Actions from '../../../actions';
import * as AppSelectors from '../../../../App/selectors';
import * as Selectors from '../../selectors';
import GrainIcon from '@material-ui/icons/Grain';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Adjust from '@material-ui/icons/Adjust';
import EditSharp from '@material-ui/icons/EditSharp';
import LabelOutlined from '@material-ui/icons/LabelOutlined';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import Add from '@material-ui/icons/Add';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import ReactDropZone from './components/ReactDropZone';

const drawerWidth = '100%';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.common.white,
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
      // width: '20%',
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
      border: `1px solid ${theme.palette.grey[400]} !important`,
    },
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
    padding: theme.spacing(3, 0),
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    width: 14,
    height: 14,
    color: theme.palette.grey[800],
    '&.approved': { color: theme.palette.primary.main },
    '&.inProgress': { color: orange[500] },
    '&.done': { color: green[500] },
  },
  buttonGroup: {
    border: `1px solid ${theme.palette.grey[50]}`,
    textAlign: "right"
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

const ItemDetails = props => {
  const classes = useStyles();
  const { loading, items, item, match } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
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
    setSelectedIndex(id);
    getInventoryItem(id);
    props.history.push({ pathname: '/inventory/item/' + id });
  };

  const drawer = (
    <div>
      <List
        className={classes.list}
        component="nav"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            <div className={classes.flex}>
              <div>
                <Button
                  size="small"
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                  endIcon={<KeyboardArrowDown className={classes.icon} />}
                >
                  All Items
                </Button>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === 'bottom'
                            ? 'center top'
                            : 'center bottom',
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="menu-list-grow"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem onClick={handleClose}>All</MenuItem>
                            <MenuItem onClick={handleClose}>Filter 1</MenuItem>
                            <MenuItem onClick={handleClose}>Filter 2</MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
              <Button
                variant="contained"
                size="small"
                color="primary"
                startIcon={<Add />}
                onClick={() => {}}
                disableElevation
              >
                Add
              </Button>
            </div>
          </ListSubheader>
        }
      >
        {items && items.length === 0 && <Skeleton animation="wave" />}
        {filteredItems &&
          [0, 1, 2, 3].map(item => (
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
              <ListItemText primary={`Item ${item}`} />
            </ListItem>
          ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <Grid container justify="space-between">
        <Grid item md={2}>
          <nav className={classes.drawer} aria-label="inventory item">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css" />
            <Hidden xsDown implementation="css">
              <div className={classes.drawerPaper}>{drawer}</div>
            </Hidden>
          </nav>
        </Grid>

        <Grid item xs={10}>
            <Grid container>
                <Grid item xs={12}>
                    <div className={classes.buttonGroup}>
                        <ButtonGroup size="small" aria-label="small outlined button group">
                            <Button onClick={()=>{}} startIcon={<EditSharp className={classes.icon} />}>Edit</Button>
                            <Button onClick={()=>{}} startIcon={<Adjust className={classes.icon} />}>Adjust Stock</Button>
                            <Button endIcon={<KeyboardArrowDown className={classes.icon} />}> More</Button>
                        </ButtonGroup>
                    </div>
                </Grid>
                <Grid item xs={12}>          
                    <div className={classes.content}>
                        <Backdrop className={classes.backdrop} open={loading}>
                            <CircularProgress color="inherit" />
                        </Backdrop>

                        <Box px={2}>
                            <Typography variant="h6">Item title</Typography>
                            <Breadcrumbs aria-label="breadcrumb" separator="›">
                                <Typography color="textPrimary" className={classes.link}>
                                    23490856
                                </Typography>
                                <Typography color="textPrimary" className={classes.link}>
                                    <KeyboardReturn className={classes.icon} />
                                    Returnable Items
                                </Typography>
                            </Breadcrumbs>
                        </Box>
                        <div className={classes.paper}>
                    
                            <AntTabs value={value} onChange={handleTabChange} aria-label="ant example">
                                <AntTab label="Overview" />
                                <AntTab label="Transactions" />
                                <AntTab label="Related List" />
                                <AntTab label="Adjustment" />
                                <AntTab label="History" />
                            </AntTabs>
                            <Typography className={classes.padding} />
                            <Box p={1} mb={2}>
                                {value == 0 && 
                                <div>
                                    {Object.keys({id: 1, title: 'Infinix'}).length > 0 ?
                                        <Grid container>
                                            <Grid item xs={9}>
                                            <Table className={classes.table} size="small" aria-label="custom table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2}>Product Information</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow key={item.title}>
                                                        <TableCell component="th" scope="row">
                                                            Cost Price
                                                        </TableCell>
                                                        <TableCell align="right">{"NGN50,000.00"}</TableCell>
                                                    </TableRow>
                                                    <TableRow key={item.description}>
                                                        <TableCell component="th" scope="row">
                                                            Purchase Account
                                                        </TableCell>
                                                        <TableCell align="right">{"Cost of Goods Sold"}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                            <Table className={classes.table} size="small" aria-label="custom table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell colSpan={2}>Sales Information</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    <TableRow key={item.title}>
                                                        <TableCell component="th" scope="row">
                                                            Selling Price
                                                        </TableCell>
                                                        <TableCell align="right">{"NGN50,000.00"}</TableCell>
                                                    </TableRow>
                                                    <TableRow key={item.description}>
                                                        <TableCell component="th" scope="row">
                                                            Sales Account
                                                        </TableCell>
                                                        <TableCell align="right">{"Cost of Goods Sold"}</TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>

                                            <Box p={1} mt={2}>
                                                <Box my={1}>
                                                    <div className={classes.flex}>
                                                        <Typography variant="h6">Stock Locations</Typography>
                                                        <ButtonGroup size="small" aria-label="small outlined button group">
                                                            <Button variant="contained" color="primary" onClick={()=>{}} disableElevation>
                                                                Acccounting Stock
                                                            </Button>
                                                            <Button onClick={()=>{}}>Physical Stock</Button>
                                                        </ButtonGroup>
                                                    </div>
                                                </Box>
                                                <Table className={classes.table2} size="small" aria-label="custom table">
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
                                                        <TableRow>
                                                            <TableCell component="th">Optisoft Tech</TableCell>
                                                            <TableCell align="right">45.00</TableCell>
                                                            <TableCell align="right">00.00</TableCell>
                                                            <TableCell align="right">00.00</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell component="th">Marina</TableCell>
                                                            <TableCell align="right">45.00</TableCell>
                                                            <TableCell align="right">00.00</TableCell>
                                                            <TableCell align="right">00.00</TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell component="th">Holder</TableCell>
                                                            <TableCell align="right">45.00</TableCell>
                                                            <TableCell align="right">00.00</TableCell>
                                                            <TableCell align="right">00.00</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                            </Grid>
                                            <Grid item xs={3}>

                                                <div>
                                                    <ReactDropZone uploadFileAction={() => {}} task={item} />
                                                </div>

                                                <Paper square elevation={0}>
                                                    {[{name: 'Accounting Stock'}, {name: 'Physical Stock'}].map(stock => 
                                                    <Table className={classes.table} size="small" aria-label="custom table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell colSpan={2}>{stock.name}<HelpOutlineIcon /></TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            <TableRow key={item.title}>
                                                                <TableCell component="th" scope="row">
                                                                    Stock on hand
                                                                </TableCell>
                                                                <TableCell align="left">{"50.00"}</TableCell>
                                                            </TableRow>
                                                            <TableRow key={item.description}>
                                                                <TableCell component="th" scope="row">
                                                                    Committed Stock
                                                                </TableCell>
                                                                <TableCell align="left">{"50.00"}</TableCell>
                                                            </TableRow>
                                                            <TableRow key={item.description}>
                                                                <TableCell component="th" scope="row">
                                                                    Available on Sale
                                                                </TableCell>
                                                                <TableCell align="left">{"50.00"}</TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                    )}
                                                </Paper>

                                            </Grid>
                                        </Grid>
                                        :
                                        <Skeleton variant="rect" animation="wave" width="100%" height={118} />
                                    }
                                </div>
                                }
                                {value == 1 && <div />}
                                {value == 2 && <div />}
                            </Box>
                        </div>
                    </div>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

ItemDetails.propTypes = {
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
)(ItemDetails);
