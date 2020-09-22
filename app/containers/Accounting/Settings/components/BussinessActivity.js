import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import ImportIcon from '@material-ui/icons/ArrowUpward';
import { withRouter, Link, useHistory } from "react-router-dom";
import swal from 'sweetalert';
import {
  makeStyles,
  Box,
  Button,
  TextField,
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
import * as crud from '../crud';
import MUIDataTable from 'mui-datatables';
import NextIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { fade, darken } from '@material-ui/core/styles/colorManipulator';
import { createStructuredSelector } from 'reselect';

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
  liftMargin: {
    marginTop: '-1.1em'
  },
  sideDemo: {
    backgroundColor: theme.palette.background.paper,
  },
  control: {
    padding: theme.spacing(2),
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
  content_margin_button: {
    float: 'right',
    marginTop: '20px',
    marginBottom: '20px',
  },
  content_margin_table: {
    marginTop: '20px',
    marginLeft: 'auto',
    marginBottom: '20px',
    marginRight: 'auto',
  },
  label: { marginLeft: theme.spacing(1) },
  button_margin: {
    margin: '2px'
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const BussinessActivity = props => {
  const history = useHistory();
  const classes = useStyles();
  const { form } = props
  const [chartOfAccountData, setChartOfAccountData] = useState([
    { accountCode: '10000', accountName: 'Pretty Cash', accountType: 'Cash & Cash Equivalent', balance: 0, financialposition: 'Financial Position', debitcredit: 'DR', class: 'Assets', status: 'Active' },
    { accountCode: '10100', accountName: 'Cash on Hand', accountType: 'Cash & Cash Equivalent', balance: 0, financialposition: 'Financial Position', debitcredit: 'DR', class: 'Assets', status: 'Active' },
    { accountCode: '10200', accountName: 'Bank Account - Payroll', accountType: 'Cash & Cash Equivalent', balance: 0, financialposition: 'Financial Position', debitcredit: 'DR', class: 'Assets', status: 'Active' },
    { accountCode: '10300', accountName: 'Savings Account', accountType: 'Cash & Cash Equivalent', balance: 0, financialposition: 'Financial Position', debitcredit: 'DR', class: 'Assets', status: 'Active' },
    { accountCode: '10400', accountName: 'Special Account', accountType: 'Cash & Cash Equivalent', balance: 0, financialposition: 'Financial Position', debitcredit: 'DR', class: 'Assets', status: 'Active' }
  ])

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
    },
    {
      name: 'openingBalance',
      label: 'Amount',
      options: {
        filter: true,
        sort: false,
      },
    },
  ]

  const handleImageChange = (ev) => {
    let fileNode = []
    Object.keys(ev.target.files).map(index => {
      const { name } = ev.target.files[index]
      const result = toBase64(ev.target.files[index]);
      result.then(rs => {
        const file = Object.assign({}, { fileName: name, file: rs })
        fileNode.push(file)
        let k = (`${name}`).lastIndexOf(".");
        let extension = (`${name}`).substr(k + 1);

      })
    })
  }

  return (
    <div>
      {form.accountMethod === 'DEFAULT' ?

        <div className={classes.root}>
          <Grid container>

            <Grid item xs={12}>

              <div className={classes.content_margin_table} align="right">
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
                <div><div style={{ float: 'left', margin: '10px' }}><Typography variant="h6" component="h6" color="textSecondary">Note : You can edit account after setup</Typography></div></div>
              </div>
            </Grid>


            <Grid item xs={12}>
              <div style={{ float: 'right', paddingRight: '10px', paddingTop: '3em', paddingBottom: '2em' }}>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<BackIcon />}
                      onClick={() => { }}
                    >
                      Back
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      endIcon={<NextIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                        createAccountSetup()
                      }}
                    >
                      Finish
                    </Button>
                  </Grid>
                </Grid>
              </div>

            </Grid>

          </Grid>
        </div>
        :
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>
              <div align="center">
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      color="primary"
                      component="label"
                      startIcon={<ImportIcon />}
                      className={classes.label}
                    >
                      Upload a Chart of Account
                     <input
                        name="attachments"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        multiple
                      />
                    </Button>

                  </Grid>
                  <Grid item xs={12}>
                    <div style={{ padding: '15px' }}>
                      <div style={{ position: 'relative', left: '33%' }}>
                        <Grid container spacing={3}>
                          <Grid item>
                            <div className={classes.liftMargin}>
                              <TextField
                                id="url"
                                disabled
                                label="Chart of account URL"
                                size="small"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                              />
                            </div>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              type="button"
                              disabled
                              component="label"
                            >
                              Upload from URL
                            </Button>
                          </Grid>
                        </Grid>
                      </div>
                    </div>

                  </Grid>
                </Grid>

              </div>
            </div>
          </Grid>

          <Grid item xs={12}>
            <div>
              <div className={classes.content_margin_table} align="right">

                <div>
                  <React.Fragment>
                    <div className={classes.root}>
                      <Grid container>
                        <Grid item xs={12}>
                          <MUIDataTable
                            className={classes.datatable}
                            data={[]} //chartOfAccountData2 
                            columns={columns}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </React.Fragment>
                  <div><div style={{ float: 'left', margin: '10px' }}><Typography variant="h6" component="h6" color="textSecondary">Note : You can edit account after setup</Typography></div></div>
                </div>

              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div style={{ float: 'right', paddingRight: '10px', paddingTop: '3em', paddingBottom: '2em' }}>
              <Grid container spacing={2}>
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<BackIcon />}
                    onClick={() => { }}
                  >
                    Back
                      </Button>
                </Grid>

                <Grid item>
                  <div>

                    <Button
                      variant="contained"
                      color="primary"
                      type="button"
                      endIcon={<NextIcon />}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                    >
                      Finish
                  </Button>


                  </div>
                </Grid>
              </Grid>
            </div>

          </Grid>

        </Grid>
      }
    </div>
  );





}

export default BussinessActivity;