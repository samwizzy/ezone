import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles, AppBar, Button, ButtonGroup, Icon, IconButton, Tabs, Tab, TableContainer, Table, TableRow, TableCell, TableBody, Grid, Paper, Toolbar, Typography } from '@material-ui/core';
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
import Overview from './Overview'
import { Requirement } from './Requirement'
import { WhatYouLearn } from './WhatYouLearn'
import { Pricing } from './Pricing'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  icon: {
    color: theme.palette.grey[800],
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

const initState = {
  details: "",
  type: "REQUIREMENT"
}

const initialState = {
  title: '',
  shortDescription: '',
  categoryId: 0,
  courseDetails: [
    { details: "", type: "REQUIREMENT" },
    { details: "", type: "WHAT_WILL_LEARN" },
  ],
  courseDiscountedPrice: 0,
  coursePreview: {
    file: "",
    fileName: "",
    fileUrl: "",
    oldFile: ""
  },
  coursePrice: 0,
  fullDescription: "",
  level: "BEGINNER",
  thumbNail: {
    file: "",
    fileName: "",
    fileUrl: "",
    oldFile: ""
  },
}

const AddCourse = props => {
  const classes = useStyles();
  const { loading, history, createCourse } = props;
  const [value, setValue] = React.useState('overview');
  const [options, setOptions] = React.useState({ free: false, discount: false });
  const [form, setForm] = React.useState({ ...initialState });

  const handleChange = ({ target }) => {
    setForm({ ...form, [target.name]: target.value })
  }

  const handleCourseChange = i => ({ target }) => {
    console.log(target.name)
    console.log(target.value)
    const { courseDetails } = form
    courseDetails[i][target.name] = target.value
    setForm({ ...form, courseDetails })
  }

  const handleOptionsChange = ({ target }) => {
    console.log(target, "target")
    setOptions({ ...options, [target.name]: target.checked })
  }

  const handleSelectChange = name => (event, obj) => {
    if (name === 'level') {
      setForm({ ...form, [name]: obj.value })
    } else if (name === 'categoryId') {
      setForm({ ...form, [name]: obj.id })
    } else {
      setForm({ ...form, [name]: obj })
    }
  }

  const handleImageUpload = (name, image) => {
    setForm({ ...form, [name]: image });
  };

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const addRequirement = event => {
    setForm({ ...form, courseDetails: [...form.courseDetails, initState] });
  };

  const removeRequirement = i => event => {
    setForm({ ...form, courseDetails: form.courseDetails.filter((r, index) => i !== index) });
  };

  const addWhatYouLearn = event => {
    setForm({ ...form, courseDetails: [...form.courseDetails, { ...initState, type: 'WHAT_WILL_LEARN' }] });
  };

  const removeWhatYouLearn = i => event => {
    setForm({ ...form, courseDetails: form.courseDetails.filter((r, index) => i !== index) });
  };

  const handleSubmit = () => {
    createCourse(form)
  }

  console.log(form, "form")
  console.log(options, "options")

  return (
    <div className={classes.root}>
      <Grid
        container
        justify='space-between'
      >
        <Grid item xs={12}>
          <AppBar color="inherit" position="static" elevation={1}>
            <Toolbar variant="dense" className={classes.toolbar}>
              <Typography variant="h6">
                <IconButton onClick={() => history.goBack()}><ArrowBackIcon className={classes.icon} /></IconButton> Add New Course
              </Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item md={12}>
          <div className={classes.content}>
            <AntTabs
              value={value}
              onChange={handleTabChange}
              aria-label="ant example"
            >
              <AntTab label="Overview" value="overview" />
              <AntTab label="Requirement" value="requirement" />
              <AntTab label="What you’ll learn" value="what-you-learn" />
              <AntTab label="Pricing" value="pricing" />
            </AntTabs>
            <Typography className={classes.padding} />
            {value === 'overview' &&
              <Overview
                form={form}
                handleChange={handleChange}
                handleSelectChange={handleSelectChange}
                handleTabChange={handleTabChange}
                handleImageUpload={handleImageUpload}
              />
            }
            {value === 'requirement' &&
              <Requirement
                form={form}
                handleChange={handleChange}
                handleCourseChange={handleCourseChange}
                handleSelectChange={handleSelectChange}
                handleTabChange={handleTabChange}
                addRequirement={addRequirement}
                removeRequirement={removeRequirement}
              />
            }
            {value === 'what-you-learn' &&
              <WhatYouLearn
                form={form}
                handleChange={handleChange}
                handleCourseChange={handleCourseChange}
                handleSelectChange={handleSelectChange}
                handleTabChange={handleTabChange}
                addWhatYouLearn={addWhatYouLearn}
                removeWhatYouLearn={removeWhatYouLearn}
              />
            }
            {value === 'pricing' &&
              <Pricing
                form={form}
                options={options}
                handleOptionsChange={handleOptionsChange}
                handleChange={handleChange}
                handleTabChange={handleTabChange}
                handleSubmit={handleSubmit}
              />
            }
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

AddCourse.propTypes = {
  loading: PropTypes.bool,
  createCourse: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    createCourse: (data) => dispatch(Actions.createCourse(data))
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
)(AddCourse);
