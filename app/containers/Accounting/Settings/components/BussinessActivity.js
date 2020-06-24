import React,{useState, useContext, useEffect} from 'react';
import axios from "axios";
import {
    makeStyles,
    Box,
    Button,
    Divider,
    Paper,
    Grid,
  Menu,
  MenuItem,
  Tooltip,
    Typography,
  } from '@material-ui/core';
  import Logo from '../images/Logo.svg';
  import { Autocomplete } from '@material-ui/lab';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from 'mui-datatables';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { createStructuredSelector } from 'reselect';
import * as Endpoints from '../../../../components/Endpoints';

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
  flex: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  }, 
  table: {
    marginTop: theme.spacing(2),
    '& .MuiTableCell-body': {
      fontSize: theme.typography.fontSize - 1,
    },
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
  },
  datatable: {
    '& .MuiTableRow-root:hover': {
      cursor: 'pointer'
    },
    '& .MuiTableHead-root': {
      '& .MuiTableCell-head': {
        color: theme.palette.common.white,
      },
      '& .MuiTableCell-root:nth-child(odd)': {
        backgroundColor: theme.palette.primary.main,
      },
      '& .MuiTableCell-root:nth-child(even)': {
        backgroundColor: darken(theme.palette.primary.main, 0.1),
      },
    },
  },
  cardRoot: {
    maxWidth: '100%',
  },
  media: {
    height: 140,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const BussinessActivity = props => {
    const classes = useStyles();
    const [service,setService] = useSate('Service Company')
    const [chartOfAccountData,setChartOfAccountData] = useState([])
    const [isEmpty,setIsEmpty] = useState(true);

    useEffect(() => {
      async function getChatfromServer() {
        // You can await here
        //const response 
        //select uri
        const config = {
          headers: { Authorization: `Bearer ${props.accessToken}`,
          'Content-Type': 'application/json', }
      };
      
        await axios
        .get(`${Endpoints.GetAllChartOfAccountApi}/${props.credentials.organisation.orgId}`,
        config)
        .then((res) => {
          let chatData = res.data;
          setIsEmpty(chatData.length > 0 ?false :true);
          setchartOfAccountData(chatData)
        })
  
        .catch((err) => {
          console.log(`error ocurr ${err}`);
        });
       
        // ...
      }
      getChatfromServer();
    },[]
    )

    const businessService = [
        {
          value: 'SERVICE_COMPANY',
          label: 'Service Company',
        },
        {
          value: 'MARKETING_COMPANY',
          label: 'Marketing Company',
        }
    ]




    const columns = [
        {
          name: 'accountCode',
          label: 'Account Code',
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: 'accountName',
          label: 'Account Name',
          options: {
            filter: true,
            sort: false,
          },
        },
        {
          name: 'accountType',
          label: 'Account Type',
          options: {
            filter: true,
            sort: false,
          },
        }
       
      ];





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

        <Grid item xs={12}>
          <Paper square elevation={0} className={classes.paper}>
            <Grid item xs={12}>

            <Box p={1} className={classes.boxed}>
                <Typography
                  variant="h6"
                  className={classes.smallHeaderWithLift}
                  color="textPrimary"
                >
                  Bussiness Activity
                </Typography>
            </Box>

            <div className={classes.lightLift}>
                  <Autocomplete
                    id="bussinessService"
                    options={businessService}
                    getOptionLabel={option => option.label}
                    onChange={(event, value) =>{setService(value.value)}}
                    style={{ width: 300 }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Select Business Service"
                        variant="outlined"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'new-password', // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />
                </div>    

            </Grid>
          </Paper>
        </Grid>  

        <Grid item xs={12}>
          
          <div>
          <React.Fragment>
        <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <MUIDataTable
              className={classes.datatable}
              data={chartOfAccountData}
              columns={columns}
            />
          </Grid>
        </Grid>
      </div>
    </React.Fragment>  
          </div>

        </Grid>

        </Grid>
        </div>
       
     );
}
 
export default BussinessActivity;