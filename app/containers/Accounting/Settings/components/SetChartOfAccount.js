import React,{useState,useContext} from 'react';
import NextIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';
import Radio from '@material-ui/core/Radio';
import * as Enums from '../enums';
import {
    makeStyles,
    Box,
    Button,
    Divider,
    Paper,
    Grid,
    Typography,
    FormGroup,
    FormControlLabel,
    FormControl,
  } from '@material-ui/core';
  import Logo from '../images/Logo.svg';
  import accSettingDemo2 from '../images/accSettingDemo2.svg';
  import { AccSetupContext } from './AccountSetup';

  
const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2, 2),
      color: theme.palette.text.secondary,
    },
    box: {
        textAlign: 'center',
      },
    sideDemo: {
      // backgroundImage: 'linear-gradient(13.98deg, #1A88E1 4.45%, rgba(255, 255, 255, 0) 85.58%)',
      backgroundColor: theme.palette.background.paper,
    },
    bgImage: {
      width: '100%',
      height: '493px',
      backgroundImage: `url(${accSettingDemo2})`,
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    control: {
      padding: theme.spacing(2),
    },
    content_margin: {
      marginBottom: '20px',
    },
    content_margin_button: {
        marginTop: '20px',
        marginBottom: '20px',
        marginLeft: '20px',
      },
    associate_text: {
      position:'relative',
      top: '3px'
    },
  }));


const SetChartOfAccount = () => {
    const classes = useStyles();
    const accContext = useContext(AccSetupContext);
    const [accountChart, setAccountChart] = useState('CREATE');
    return ( 
        <div className={classes.root}>
          <Grid container>
        <Grid item xs={12}>
          <Paper square elevation={0} className={classes.paper}>
            <Box p={1} mb={1} className={classes.box}>
              <Typography variant="h4" color="textPrimary">
                Welcome To&nbsp;
                <img src={Logo} height="30" />
                &nbsp;Accounting
              </Typography>
            </Box>
            <Box p={2} className={classes.box}>
              <Typography variant="h6" color="textPrimary">
                Setup Your Accounting Structure
              </Typography>
            </Box>
          </Paper>
          <Divider />
        </Grid>
        <Grid item xs={6} className={classes.sideDemo}>
          <div className={classes.bgImage} />
        </Grid>
        <Grid item xs={6}>
          <Paper square elevation={0} className={classes.paper}>
            <Grid item xs={12}>
            <Grid
                  container
                  justify="center"
                  className={classes.control}
                  spacing={0}
                >

                <Grid item xs={12}>
                    <div className={classes.content_margin}>
                    <FormControl component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={accContext.accState.accountChart}
                          onChange={e => {
                            accContext.accDispatch({type:'PAYLOAD',payload:{label:'accountChart',value:Enums.AccountChart.CREATE}}) 
                          }}
                          checked={accContext.accState.accountChart === 'CREATE'}
                          control={<Radio color="primary" />}
                          label="Create your Chart of Accounts"
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                  <div className={classes.content_margin}>
                    <FormControl component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={accContext.accState.accountChart}
                          onChange={e => {
                            accContext.accDispatch({type:'PAYLOAD',payload:{label:'accountChart',value:Enums.AccountChart.IMPORT}}) 
                          }}
                          checked={accContext.accState.accountChart === 'IMPORT'}
                          control={<Radio color="primary" />}
                          label="Import Existing Chart of Accounts"
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                    </div>
                  </Grid>

                  <Grid item xs={12}>
                  <div className={classes.content_margin}>
                    <FormControl component="fieldset">
                      <FormGroup aria-label="position" row>
                        <FormControlLabel
                          value={accContext.accState.accountChart}
                          onChange={e => {
                            accContext.accDispatch({type:'PAYLOAD',payload:{label:'accountChart',value:Enums.AccountChart.DEFAULT}}) 
                          }}
                          checked={accContext.accState.accountChart === 'DEFAULT'}
                          control={<Radio color="primary" />}
                          label="Use system generated Chart of Accounts (non accountants)"
                          labelPlacement="end"
                        />
                      </FormGroup>
                    </FormControl>
                    </div>
                  </Grid>
                  <Grid item xs={8}>
                  
                  <div className={classes.content_margin_button} align="right">

                   <Grid container> 
                  <Grid item xs={6}>
                   <div>
                   <Button
                  variant="contained"
                  onClick={e=>{
                  accContext.accDispatch({type:'NAVIGATION',page:'financialYear'})}}
                  startIcon={<BackIcon />}
                >
                  Back
                </Button>
                   </div>
                  </Grid>


                  <Grid item xs={6}>
                   <div>
                   <Button
                  variant="contained"
                  color="primary"
                  onClick={e=>{
                  accContext.accDispatch({type:'NAVIGATION',page:'busService'})}}
                  endIcon={<NextIcon />}
                >
                  Next
                </Button>
                   </div>
                  </Grid>

                
                  </Grid> 
                  </div>
                      
                  </Grid>


                </Grid>

             </Grid>
             </Paper>
             </Grid>   
        </Grid>
        </div>
     );
}
 
export default SetChartOfAccount;