/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';
import EzoneUtils from '../../../../utils/EzoneUtils';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  makeStyles,
  InputAdornment,
  Button,
  ButtonGroup,
  IconButton,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TextField,
  Typography,
} from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import DoneIcon from '@material-ui/icons/Done';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import * as Selectors from '../selectors';
import * as AccSelectors from '../../selectors';
import * as Actions from '../actions';
import { IsoCodeToFlag } from '../../components/IsoCodeFormatter'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    '& .MuiCardActions-root': {
      justifyContent: 'flex-end',
      padding: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.divider}`
    },
    "& .MuiCardHeader-root": {
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  },
  table: {
    width: '100% !important',
    whiteSpace: 'nowrap',
    margin: theme.spacing(2, 0),
    '& tr:hover': {
      cursor: 'pointer',
    },
    '& tfoot': {
      '& td': {
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2),
        fontSize: theme.typography.subtitle1.fontSize
      },
    },
    '& thead': {
      '& th': {
        padding: theme.spacing(1, 2),
      },
      '& th:nth-child(odd)': {
        backgroundColor: lighten(theme.palette.divider, 0.5),
      },
      '& th:nth-child(even)': {
        backgroundColor: lighten(theme.palette.grey[100], 0.5),
      },
    },
  },
  total: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    minWidth: 202,
    display: 'inline-flex'
  },
  flag: {
    width: 20,
    marginRight: theme.spacing(1),
  },
}));

const initialEntry = {
  accountId: 0,
  credit: 0,
  debit: 0,
  description: '',
};

const initialState = {
  attachments: [],
  currencyId: 0,
  entries: [],
  exchangeRate: 0,
  note: '',
  periodId: 0,
  reference: '',
  taxApplicable: false,
  taxRate: 0,
  taxTotal: 0,
  total: 0,
  transactionDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
};

const NewJournal = props => {
  const {
    loading,
    dialog,
    accountSetupData,
    journals,
    accountingPeriods,
    chartOfAccounts,
    currencies,
    taxes,
    createJournal,
  } = props;

  const { currency } = accountSetupData;
  const activePeriod = _.find(accountingPeriods, { activeYear: true, status: true })

  const classes = useStyles(props);
  const [values, setValues] = React.useState({ ...initialState })
  const [metrics, setMetrics] = React.useState({ taxTotal: 0 })

  const flag = src => <img className={classes.flag} src={src} />;

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setValues({ ...dialog.data });
    } else {
      setValues({ ...initialState, periodId: activePeriod && activePeriod.id });
    }
  }, [dialog.data]);

  const canBeSubmitted = () => {
    const { transactionDate, entries, periodId, currencyId, exchangeRate, reference, total, taxApplicable, taxTotal } = values;
    return (
      reference.length > 0 &&
      transactionDate && entries.length > 0 &&
      total && periodId &&
      (taxApplicable ? taxTotal : true) &&
      (currencyId ? exchangeRate : true) &&
      handleBalanceCheck()
    );
  };

  const formatNumber = (value, ccy = 'NGN') => {
    return new Intl.NumberFormat('en-NG', { maximumSignificantDigits: 3 }).format(Number(value))
  }

  const handleBalanceCheck = () => {
    const { entries } = values
    return entries.reduce((curVal, b) => curVal + Number(b.debit), 0) === entries.reduce((curVal, b) => curVal + Number(b.credit), 0)
  }

  const handleItemChange = i => event => {
    const { name, value } = event.target;
    const entries = [...values.entries];
    name === 'debit' || name === 'credit'
      ? entries[i][name] = value.replace(/[^0-9]/g, '')
      : entries[i][name] = value;
    setValues({ ...values, entries, total: entries.reduce((curVal, b) => curVal + Number(b.debit), 0) });
  };

  const handleSelectEntryChange = i => (event, object) => {
    const entries = [...values.entries];
    const { id: accountId } = object;
    entries[i] = { ...entries[i], accountId };
    setValues({ ...values, entries });
  };

  const addRow = () => {
    setValues({ ...values, entries: [...values.entries, { ...initialEntry }] });
  };

  const removeRow = i => () => {
    setValues({
      ...values,
      entries: values.entries.filter((entry, id) => id !== i),
    });
  };

  const handleMetricChange = event => {
    setMetrics({ ...metrics, [event.target.name]: event.target.value })
    setValues({ ...values, [event.target.name]: Math.ceil(metrics.taxTotal * (values.taxRate / 100)) })
  }

  const handleChange = event => {
    if (event.target.name === 'taxTotal')
      setValues({ ...values, [event.target.name]: event.target.value });
    else
      setValues({ ...values, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  }

  const handleSelectChange = name => (event, object) => {
    if (name === 'taxRate') {
      setValues({ ...values, [name]: object ? object.rate : object, taxTotal: object && Math.ceil(metrics.taxTotal * (object.rate / 100)) })
    } else {
      setValues({ ...values, [name]: object ? object.id : object });
    }
  }

  const handleDateChange = name => date => {
    setValues({
      ...values,
      [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss'),
    });
  };

  const handleImageChange = async event => {
    const { files } = event.target;
    const attachments = [];
    for (let i = 0; i < files.length; i++) {
      const fileName = EzoneUtils.formatFileName(files[i].name);
      await EzoneUtils.toBase64(files[i]).then(base64 => {
        attachments.push({ file: base64, fileName });
        setValues({ ...values, attachments });
      });
    }
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? createJournal(values) : '';
  };

  const handleFormReset = () => {
    const { periodId, ...rest } = initialState
    setValues({ ...values, ...rest })
  };

  console.log(journals, 'journals');
  console.log(accountingPeriods, 'accountingPeriods');
  console.log(chartOfAccounts, 'chartOfAccounts');
  console.log(currencies, 'currencies');
  console.log(taxes, 'taxes');
  console.log(accountSetupData, 'accountSetupData');

  console.log(values, 'values');
  console.log(dialog, 'new journal form');
  console.log(metrics, 'new journal metrics');
  return (
    <div>
      <Card elevation={0} className={classes.card}>
        <CardHeader
          titleTypographyProps={{ variant: 'h6' }}
          title={dialog.type === 'new' ? 'New Journal' : 'Update Journal'}
          subheader="Post a new entry"
          action={
            <Autocomplete
              id="period-id"
              size="small"
              options={accountingPeriods.filter(period => period.status)}
              getOptionLabel={option => `FY: ${moment(option.startDate).format('ll')} - ${moment(option.endDate).format('ll')}`}
              onChange={handleSelectChange('periodId')}
              value={values.periodId ? _.find(accountingPeriods, { id: values.periodId }) : null}
              style={{ width: 300 }}
              renderInput={params => (
                <TextField
                  {...params}
                  InputLabelProps={{
                    shrink: false,
                  }}
                  margin="dense"
                />
              )}
            />
          }
        />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  autoOk
                  id="transaction-date"
                  required
                  inputVariant="outlined"
                  format="dd/MM/yyyy"
                  margin="normal"
                  size="small"
                  style={{ width: 300 }}
                  label="Transaction Date"
                  value={values.transactionDate}
                  onChange={handleDateChange('transactionDate')}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>

              <Autocomplete
                id="journal-currency"
                size="small"
                options={currency ? currencies.filter(ccy => ccy.code !== currency.code) : currencies}
                getOptionLabel={option => `${option.name} ( ${option.symbol} )`}
                renderOption={option => (
                  <React.Fragment>
                    <span>{flag(IsoCodeToFlag(option.code))}</span> {option.name}
                  </React.Fragment>
                )}
                onChange={handleSelectChange('currencyId')}
                value={values.currencyId ? _.find(currencies, { id: values.currencyId }) : null}
                style={{ width: 300 }}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="Currency"
                    variant="outlined"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="Currencies"
                    error={values.currencyId && !Boolean(values.exchangeRate)}
                    helperText={(values.currencyId && !values.exchangeRate) ? 'Please select an exchange rate' : ''}
                  />
                )}
              />

              <FormControl component="fieldset">
                <FormControlLabel
                  control={<Checkbox checked={values.taxApplicable} onChange={handleChange} name="taxApplicable" />}
                  label="Tax Applicable"
                />
              </FormControl>

              {values.taxApplicable &&
                <Autocomplete
                  id="journal-taxes"
                  size="small"
                  options={taxes}
                  getOptionLabel={option => `${option.name} ( ${option.rate}% )`}
                  onChange={handleSelectChange('taxRate')}
                  style={{ width: 300 }}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Applicable rates"
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      placeholder="Rates"
                    />
                  )}
                />
              }

            </Grid>
            <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
              <TextField
                id="outlined-reference"
                required
                size="small"
                name="reference"
                label="Reference"
                placeholder="Reference"
                value={values.reference}
                style={{ width: 300 }}
                margin="normal"
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />

              <TextField
                id="exchange-rate"
                size="small"
                required={Boolean(values.currencyId)}
                name="exchangeRate"
                label="Exchange Rate"
                placeholder="Exchange Rate"
                value={values.exchangeRate}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {values.currencyId ? `1 ${_.find(currencies, { id: values.currencyId }).name} =` : ""}
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">NGN</InputAdornment>
                  )
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ width: 300 }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                id="journal-note"
                size="small"
                name="note"
                label="Note"
                placeholder="Note"
                value={values.note}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                margin="dense"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>


          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Account</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Debit <ArrowDownwardIcon /></TableCell>
                        <TableCell>Credit <ArrowUpwardIcon /></TableCell>
                        <TableCell align="right">
                          <Button
                            color="inherit"
                            onClick={addRow}
                            startIcon={<AddIcon />}
                          >
                            New
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {values.entries.map((row, i) => (
                        <TableRow key={i}>
                          <TableCell>
                            <Autocomplete
                              id={`entry-account-${i}`}
                              size="small"
                              options={chartOfAccounts}
                              getOptionLabel={option => option.accountName}
                              onChange={handleSelectEntryChange(i)}
                              value={
                                row.accountId
                                  ? _.find(chartOfAccounts, {
                                    id: row.accountId,
                                  })
                                  : null
                              }
                              style={{ minWidth: 250 }}
                              renderInput={params => (
                                <TextField
                                  {...params}
                                  label="Select Account"
                                  variant="outlined"
                                  placeholder="Accounts"
                                  fullWidth
                                />
                              )}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id={`entry-description-${i}`}
                              size="small"
                              variant="outlined"
                              label="Description"
                              name="description"
                              onChange={handleItemChange(i)}
                              value={row.description ? row.description : ''}
                              style={{ minWidth: 300 }}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id={`entry-debit-${i}`}
                              size="small"
                              label="Debit"
                              variant="outlined"
                              name="debit"
                              onChange={handleItemChange(i)}
                              value={row.debit ? formatNumber(row.debit) : ""}
                              disabled={Boolean(Number(row.credit))}
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              id={`entry-credit-${i}`}
                              size="small"
                              variant="outlined"
                              label="Credit"
                              name="credit"
                              onChange={handleItemChange(i)}
                              value={row.credit ? formatNumber(row.credit) : ""}
                              disabled={Boolean(Number(row.debit))}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton
                              variant="outlined"
                              color="secondary"
                              onClick={removeRow(i)}
                            >
                              <CancelIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colSpan={2} align="right">
                          <Typography>Total</Typography>
                        </TableCell>
                        <TableCell>
                          <div className={classes.total}>
                            {formatNumber(values.entries.reduce((curVal, b) => curVal + Number(b.debit), 0))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className={classes.total}>
                            {formatNumber(values.entries.reduce((curVal, b) => curVal + Number(b.credit), 0))}
                          </div>
                        </TableCell>
                        <TableCell />
                      </TableRow>
                      {values.taxApplicable &&
                        <TableRow>
                          <TableCell colSpan={2} align="right">Tax amount</TableCell>
                          <TableCell>
                            <TextField
                              id="outlined-tax-amount"
                              required
                              size="small"
                              name="taxTotal"
                              label="Tax Amount"
                              placeholder="taxTotal"
                              value={metrics.taxTotal}
                              onChange={handleMetricChange}
                              variant="outlined"
                            />
                            <FormHelperText>{values.taxTotal && `${values.taxRate}% of ${metrics.taxTotal} = ${values.taxTotal}`}</FormHelperText>
                          </TableCell>
                          <TableCell colSpan={2} />
                        </TableRow>
                      }
                    </TableFooter>
                  </Table>

                  <ButtonGroup color="primary" aria-label="outlined primary button group">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={addRow}
                      startIcon={<AddIcon />}
                    >
                      Add Row
                    </Button>

                    <Button
                      variant="outlined"
                      component="label"
                      color="secondary"
                      disableElevation
                      startIcon={<AttachFileIcon />}
                    >
                      Upload File
                      <input
                        type="file"
                        name="attachments"
                        multiple
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                      />
                    </Button>
                  </ButtonGroup>

                  <FormControl variant="outlined">
                    <FormHelperText>{values.attachments.length > 0 ? `${values.attachments.length} files selected` : ""}</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <FormHelperText>{handleBalanceCheck() ? <span><DoneIcon /> Balanced</span> : 'Entries must be balance'}</FormHelperText>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading || !canBeSubmitted()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'new' ? 'Save' : 'Update'}
          </Button>
          <Button
            onClick={handleFormReset}
            color="primary"
            variant="outlined"
            disableElevation
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

NewJournal.propTypes = {
  loading: PropTypes.bool,
  dialog: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectJournalDialog(),
  journals: Selectors.makeSelectJournalListData(),
  accountingPeriods: Selectors.makeSelectGetAccountPeriodData(),
  chartOfAccounts: Selectors.makeSelectGetChartOfAccountData(),
  currencies: Selectors.makeSelectCurrencies(),
  taxes: Selectors.makeSelectGetTaxesData(),
  accountSetupData: AccSelectors.makeSelectGetAccountingSetupData(),
});

function mapDispatchToProps(dispatch) {
  return {
    createJournal: data => dispatch(Actions.createJournal(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewJournal);
