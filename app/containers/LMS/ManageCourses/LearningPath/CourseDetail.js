import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles, AppBar, Button, ButtonGroup, Card, CardHeader, CardContent, CardMedia, Icon, IconButton, Tabs, Tab, TableContainer, Table, TableRow, TableCell, TableBody, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { green, orange } from '@material-ui/core/colors'
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import moment from 'moment'
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import * as AppSelectors from '../../../App/selectors';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LmsBanner from '../../../../images/lmsBanner.jpg'
import Overview from './tabs/overview'
import Structure from './tabs/structure'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  media: {
    width: '100%',
    height: 197
  },
  icon: {
    color: theme.palette.grey[800],
  },
  action: {
    margin: theme.spacing(1.5),
    "& p": {
      color: theme.palette.text.secondary
    }
  },
  toolbar: {
    justifyContent: "space-between",
    padding: theme.spacing(1),
  }
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

const reqInitState = { title: '' }

const initialState = {
  title: '',
  shortDescription: '',
  description: '',
  category: '',
  level: '',
  requirements: [{ ...reqInitState }],
  whatYouLearns: [{ ...reqInitState }],
  price: '',
  discount: ''
}

const CourseDetail = props => {
  const classes = useStyles();
  const { loading, history } = props;
  const [value, setValue] = React.useState('overview');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card className={classes.root} elevation={0} square>
      <CardMedia
        className={classes.media}
        image={LmsBanner}
        title="Paella dish"
      />
      <CardHeader
        title="Building"
        subheader={
          <Fragment>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed lobortis tempus, eget semper sed.</p>
            <Typography>Category: Architecture</Typography>
          </Fragment>
        }
        action={
          <div className={classes.action}>
            <Typography>Published</Typography>
            <Typography><VisibilityIcon /> 30 &nbsp; 3rd Jul, 2019</Typography>
          </div>
        }
      />

      <CardContent>
        <Grid
          container
          justify='space-between'
        >
          <Grid item md={12}>
            <div className={classes.content}>
              <AntTabs
                value={value}
                onChange={handleTabChange}
                aria-label="ant example"
              >
                <AntTab label="Overview" value="overview" />
                <AntTab label="Structure" value="structure" />
              </AntTabs>
              <Typography className={classes.padding} />
              {value === 'overview' &&
                <Overview />
              }
              {value === 'structure' &&
                <Structure />
              }
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CourseDetail.propTypes = {
  loading: PropTypes.bool,
  getEmployees: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
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
)(CourseDetail);
