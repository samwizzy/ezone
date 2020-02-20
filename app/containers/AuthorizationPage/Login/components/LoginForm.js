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
import classNames from 'classnames';
import {
  darken,
  fade,
  lighten,
} from '@material-ui/core/styles/colorManipulator';
import * as Selectors from '../../../App/selectors';
import LoadingIndicator from '../../../../components/LoadingIndicator';
import * as Actions from '../../../App/actions';
import logo from '../../../../images/logo.svg';
import banner from '../../../../images/banner.svg';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://optisoft.ng/">
        OptiSoft
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: '50px',
    height: '100vh',
  },
  grid: {
    height: '100%',
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(5),
    overflow: 'hidden',
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
  paper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(5),
    padding: theme.spacing(2),
    margin: theme.spacing(4),
    border: '1px solid #F1F5F8',
    backgroundColor: '#FFFFFF',
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
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
}));

const LoginForm = props => {
  const { loginAction, loading } = props;
  const classes = useStyles();

  const [values, setValues] = React.useState({
    username: '',
    password: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const canBeSubmitted = () => {
    const { username, password } = values;
    return username !== '' && password !== '';
  };

  return (
    <div>
      <div className={classes.image} />

      <div className={classes.root}>
        <Grid
          container
          component={Paper}
          className={classes.grid}
          justify="center"
        >
          <Grid item xs={0} sm={0} md={7} />
          <Grid item xs={12} sm={10} md={5} style={{ display: 'flex' }}>
            <div className={classes.paper}>
              <Box className={classes.avatar}>
                <img src={logo} alt="" />
              </Box>
              <Typography component="h1" variant="h6">
                Sign in
              </Typography>
              <Typography variant="body2">
                <span>New User?</span>&nbsp;
                <Link href="/register" variant="body2">
                  Register
                </Link>
              </Typography>
              {/* <form className={classes.form} noValidate> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                label="Email Address"
                name="username"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                autoFocus
                onChange={handleChange('username')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange('password')}
              />
              {/* <FormControlLabel
                  className={classes.label}
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
              </Grid>
              {!loading ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!canBeSubmitted()}
                  onClick={() => loginAction(values)}
                >
                  Sign In
                </Button>
              ) : (
                <LoadingIndicator />
              )}
              <Box mt={5}>
                <Copyright />
              </Box>
              {/* </form> */}
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  loginAction: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    loginAction: evt => dispatch(Actions.loginAction(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(LoginForm);
