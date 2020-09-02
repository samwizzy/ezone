import React, { Fragment, memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles, AppBar, Avatar, Box, Button, ButtonGroup, Card, CardHeader, CardContent, CardMedia, Chip, Divider, Icon, IconButton, Tabs, Tab, TableContainer, Table, TableRow, TableCell, TableBody, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
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
import QA from './tabs/question&answer'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  box: {
    display: "flex",
    alignItems: "center",
    border: `1px solid ${theme.palette.divider}`,
    '& div, & p': {
      margin: theme.spacing(0.5),
    },
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
  const { loading, history, course } = props;
  const [value, setValue] = React.useState('overview');

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(course, "selected course")
  if (!course) {
    return ""
  }

  return (
    <Card className={classes.root} elevation={0} square>
      <CardMedia
        className={classes.media}
        image={LmsBanner}
        title={course.thumbNail && course.thumbNail.fileName}
      />
      <CardHeader
        title={course.title}
        subheader={
          <Fragment>
            <p>{course.shortDescription}</p>
            <Typography>Category: {course.category && course.category.name}</Typography>
          </Fragment>
        }
        action={
          <div className={classes.action}>
            <Typography color="textPrimary">Published</Typography>
            <Box className={classes.box}>
              <Chip
                avatar={<VisibilityIcon />}
                label="30"
                variant="outlined"
              />
              <Divider orientation="vertical" flexItem />
              <Typography display="inline" variant="body2">{moment(course.dateCreated).format('ll')}</Typography>
            </Box>
          </div>
        }
      />

      <CardContent>
        <Grid container>
          <Grid item md={12}>
            <div className={classes.content}>
              <AntTabs
                value={value}
                onChange={handleTabChange}
                aria-label="ant example"
              >
                <AntTab label="Overview" value="overview" />
                <AntTab label="Structure" value="structure" />
                <AntTab label="Sessions" value="sessions" />
                <AntTab label="Files" value="files" />
                <AntTab label="Questions & Answers" value="questions-answers" />
              </AntTabs>
              <Typography className={classes.padding} />
              {value === 'overview' &&
                <Overview course={course} />
              }
              {value === 'structure' &&
                <Structure course={course} />
              }
              {value === 'sessions' &&
                <div>sessions</div>
              }
              {value === 'files' &&
                <div>files</div>
              }
              {value === 'questions-answers' &&
                <QA />
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
  course: Selectors.makeSelectGetCourseById(),
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
