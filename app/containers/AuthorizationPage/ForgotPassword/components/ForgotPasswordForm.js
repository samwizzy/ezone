import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Grid,
  Link,
  Paper,
  Container,
  makeStyles,
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';
import logo from '../../../../images/logo.svg';
import banner from '../../../../images/banner.svg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    padding: '50px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    },
  },
  grid: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(5),
    overflowX: 'auto',
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
      backgroundColor: theme.palette.grey[200],
    },
    [theme.breakpoints.down('md')]: {
      // padding: theme.spacing(1, 0),
    },
  },
  image: {
    [theme.breakpoints.up('md')]: {
      width: '55%',
      height: '100vh',
      backgroundImage: `url(${banner})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center right',
      position: 'absolute',
      top: 0,
      bottom: 0,
    },
  },
  gridItem: {
    display: 'flex',
  },
  paper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(5),
    padding: theme.spacing(2),
    border: '1px solid #F1F5F8',
    backgroundColor: '#FFFFFF',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(4),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    height: 40,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#1A88E1',
  },
  submit2: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.common.white,
    color: '#F90000',
    '&:hover': {
      backgroundColor: '#F90000',
      color: theme.palette.common.white,
    },
  },
  option: {
    width: '100%',
    color: theme.palette.grey[600],
    lineHeight: '0.1',
    textAlign: 'center',
    margin: '10px 0 20px',
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
    '& span': {
      background: '#fff',
      padding: '0 10px',
    },
  },
}));

const ForgotPasswordForm = props => {
  const classes = useStyles();

  const { forgotPasswordAction } = props;
  const [values, setValues] = React.useState({
    username: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const canBeSubmitted = () => {
    const { username } = values;
    return username !== '';
  };

  return (
    <React.Fragment>
      <div className={classes.image} />

      <div className={classes.root}>
        <Grid container component={Paper} className={classes.grid}>
          <Grid item xs={false} sm={false} md={7} />
          <Grid item xs={12} sm={10} md={5} className={classes.gridItem}>
            <div className={classes.paper}>
              <Box className={classes.avatar}>
                <img src={logo} alt="" />
              </Box>
              {/* <form> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email Address"
                type="email"
                onChange={handleChange('username')}
                value={values.username ? values.username : ''}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={!canBeSubmitted()}
                onClick={() => forgotPasswordAction(values)}
              >
                Reset Password
              </Button>
              <Box mt={5}>
                <Copyright />
              </Box>
              {/* </form> */}
            </div>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

ForgotPasswordForm.propTypes = {
  loginAction: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  forgotPasswordAction: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  // loginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    forgotPasswordAction: evt => dispatch(Actions.forgotPassword(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ForgotPasswordForm);
