import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import {
  makeStyles,
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Grid,
  Link,
  Paper
} from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from '../../actions';
import * as Selectors from '../../selectors';
import logo from '../../../../images/logo.svg';
import banner from '../../../../images/banner.svg';
import LoadingIndicator from '../../../../components/LoadingIndicator';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://optisoft.ng">
        OptiSoft
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
    overflow: 'auto',
    padding: '50px',
    [theme.breakpoints.down('md')]: {
      padding: '20px',
    }
  },
  grid: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.grey[50],
    borderRadius: theme.spacing(5),
    padding: theme.spacing(3, 0),
    overflowX: 'auto',
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
      backgroundColor: theme.palette.grey[200],
    },
  },
  image: {
    [theme.breakpoints.up('md')]: {
      width: '55%',
      maxWidth: '100%',
      height: '100%',
      backgroundImage: `url(${banner})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center right',
      position: 'absolute',
      top: 0,
      bottom: 0
    }
  },
  paper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: theme.spacing(5),
    padding: theme.spacing(2),
    margin: theme.spacing(0, 4),
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
  },
  input: {
    height: 40,
    margin: 0,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
  },
  label: {
    fontSize: 10,
  },
}));

const RegistrationForm = props => {
  const { loading, signupResData, signupAction } = props;
  const classes = useStyles();

  const [values, setValues] = React.useState({
    companyName: '',
    country: '',
    email: '',
    firstname: '',
    lastname: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const canBeSubmitted = () => {
    const { companyName, country, email, password } = values;
    return (
      companyName !== '' && country !== '' && email !== '' && password !== ''
      // companyName !== null && country !== null && email !== null && password !== null
    );
  };

  console.log(signupResData, 'signupResData');

  if (signupResData.success === true) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div className={classes.image}></div>

      <div className={classes.root}>
        <Grid container component={Paper} className={classes.grid}>
          <Grid item xs={false} sm={false} md={7} />
          <Grid item xs={12} sm={10} md={5} style={{display: 'flex'}}>
            <div className={classes.paper}>
              <Box className={classes.avatar}>
                <img src={logo} alt="" />
              </Box>
              <Typography component="h6" variant="h6">
                Register
              </Typography>
              <Typography variant="body2">
                <span>Existing User?</span>&nbsp;
                <Link href="/login" variant="body2">
                  Sign In
                </Link>
              </Typography>
              {/* <form className={classes.form} noValidate> */}
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="companyName"
                label="Company Name"
                name="companyName"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange('companyName')}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange('email')}
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="country"
                label="Country"
                id="country"
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChange('country')}
              />
              <FormControlLabel
                className={classes.label}
                control={<Checkbox value="remember" color="primary" />}
                label={
                  <Typography variant="body2">
                    I agree to the <Link href="#">Terms of Service</Link> and{' '}
                    <Link href="#">Privacy Policy</Link>
                  </Typography>
                }
              />
              {!loading ? (
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  disabled={!canBeSubmitted()}
                  onClick={() => signupAction(values)}
                >
                  Sign Up
                </Button>
              ) : (
                <LoadingIndicator />
              )}
              <Box mt={2}>
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

RegistrationForm.propTypes = {
  signupAction: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  loading: PropTypes.bool,
  signupResData: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  signupResData: Selectors.makeSelectSignupResData(),
});

function mapDispatchToProps(dispatch) {
  return {
    signupAction: evt => dispatch(Actions.signupRequest(evt)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RegistrationForm);
