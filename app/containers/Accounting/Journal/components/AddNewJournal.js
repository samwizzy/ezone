/* eslint-disable no-nested-ternary */
import React, { memo, useEffect } from 'react';
import _ from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Autocomplete } from '@material-ui/lab';
import {
  makeStyles,
  InputAdornment,
  Button,
  IconButton,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TextField,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import AddIcon from '@material-ui/icons/Add';
import CancelIcon from '@material-ui/icons/Cancel';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import EzoneUtils from '../../../../utils/EzoneUtils';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    '& .MuiCardActions-root': {
      justifyContent: 'flex-end',
      padding: theme.spacing(2),
      borderTop: `1px solid ${theme.palette.divider}`,
    },
  },
  formTable: {
    width: 500,
    '& th.MuiTableCell-root': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& .MuiTableCell-root': {
      borderBottom: 'none !important',
    },
  },
  table: {
    whiteSpace: 'nowrap',
    marginTop: theme.spacing(2),
    '& tr:hover': {
      cursor: 'pointer',
    },
    '& tfoot': {
      '& td': {
        border: 'none !important',
        padding: theme.spacing(2, 0),
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
    journals,
    accountingPeriods,
    chartOfAccounts,
    currencies,
    createJournal,
  } = props;

  const classes = useStyles(props);
  const [values, setValues] = React.useState({ ...initialState });

  useEffect(() => {
    if (dialog.type === 'edit' && dialog.data) {
      setValues({ ...initialState });
    } else {
      setValues({ ...initialState });
    }
  }, []);

  const canBeSubmitted = () => {
    const {
      attachments,
      currencyId,
      entries,
      exchangeRate,
      note,
      periodId,
      reference,
      taxRate,
      taxtTotal,
      total,
    } = values;
    return (
      attachments.length > 0 &&
      currencyId &&
      entries.length > 0 &&
      exchangeRate.length > 0 &&
      note.length > 0
    );
  };

  const handleItemChange = i => event => {
    const { name, value } = event.target;
    const entries = [...values.entries];
    entries[i][name] = value;
    setValues({ ...values, entries });
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

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]:
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value,
    });
  };

  const handleSelectChange = name => (event, object) => {
    setValues({ ...values, [name]: object.id });
  };

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

  console.log(journals, 'journals');
  console.log(accountingPeriods, 'accountingPeriods');
  console.log(chartOfAccounts, 'chartOfAccounts');
  console.log(currencies, 'currencies');

  console.log(values, 'values');
  console.log(dialog, 'new journal form');
  return (
    <div>
      <Card elevation={0} className={classes.card}>
        <CardHeader
          title={dialog.type === 'new' ? 'New Entry' : 'Update Entry'}
        />

        <Divider />

        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Table size="small" className={classes.formTable}>
                <TableBody>
                  <TableRow>
                    <TableCell>Reference</TableCell>
                    <TableCell>
                      <TextField
                        id="outlined-reference"
                        size="small"
                        name="reference"
                        label="Reference"
                        placeholder="Reference"
                        value={values.reference}
                        style={{ width: 300 }}
                        margin="dense"
                        onChange={handleChange}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Currency</TableCell>
                    <TableCell>
                      <Autocomplete
                        id="journal-currency"
                        size="small"
                        options={currencies}
                        getOptionLabel={option => option.name}
                        onChange={handleSelectChange('currencyId')}
                        value={
                          values.currencyId
                            ? _.find(currencies, { id: values.currencyId })
                            : null
                        }
                        style={{ width: 300 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Currency"
                            variant="outlined"
                            margin="dense"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            placeholder="Currencies"
                          />
                        )}
                      />

                      <FormControl component="fieldset">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={values.taxApplicable}
                              onChange={handleChange}
                              name="taxApplicable"
                            />
                          }
                          label="Tax Applicable"
                        />
                        <FormHelperText>
                          Accepting this means you acknowledge all tax related
                          conditions
                        </FormHelperText>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Accounting Period</TableCell>
                    <TableCell>
                      <Autocomplete
                        id="period-id"
                        size="small"
                        options={accountingPeriods}
                        getOptionLabel={option => option.year}
                        onChange={handleSelectChange('periodId')}
                        value={
                          values.periodId
                            ? _.find(accountingPeriods, { id: values.periodId })
                            : null
                        }
                        style={{ width: 300 }}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label="Accounting Period"
                            variant="outlined"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="dense"
                            placeholder="Accounting Periods"
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Exchange Rate</TableCell>
                    <TableCell>
                      <TextField
                        id="exchange-rate"
                        size="small"
                        name="exchangeRate"
                        label="Exchange Rate"
                        placeholder="Exchange Rate"
                        value={values.exchangeRate}
                        onChange={handleChange}
                        variant="outlined"
                        margin="dense"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              1 Dollar (USD) =
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">NGN</InputAdornment>
                          ),
                        }}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: 300 }}
                      />
                    </TableCell>
                  </TableRow>
                  {/* <TableRow>
                    <TableCell>Tax Rate</TableCell>
                    <TableCell>
                      <TextField
                        id="tax-rate"
                        size="small"
                        name="taxRate"
                        label="Tax Rate"
                        placeholder="Tax Rate"
                        value={values.taxRate}
                        onChange={handleChange}
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: 300 }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Tax Total</TableCell>
                    <TableCell>
                      <TextField
                        id="tax-total"
                        size="small"
                        name="taxTotal"
                        label="Tax Total"
                        placeholder="Tax Total"
                        value={values.taxTotal}
                        onChange={handleChange}
                        variant="outlined"
                        margin="dense"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: 300 }}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>
                      <TextField
                        id="outlined-total"
                        size="small"
                        name="total"
                        label="Total"
                        placeholder="Total"
                        value={values.total}
                        onChange={handleChange}
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        style={{ width: 300 }}
                      />
                    </TableCell>
                  </TableRow> */}
                  <TableRow>
                    <TableCell>Transaction Date</TableCell>
                    <TableCell>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          autoOk
                          id="transaction-date"
                          inputVariant="outlined"
                          format="dd/MM/yyyy"
                          margin="dense"
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
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Note</TableCell>
                    <TableCell>
                      <TextField
                        id="journal-note"
                        size="small"
                        name="note"
                        label="Note"
                        placeholder="Note"
                        value={values.note}
                        onChange={handleChange}
                        variant="outlined"
                        margin="dense"
                        style={{ width: 300 }}
                        multiline
                        rows={3}
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Attachments</TableCell>
                    <TableCell>
                      <FormControl variant="outlined" margin="normal">
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
                            style={{ display: 'none' }}
                            onChange={handleImageChange}
                          />
                        </Button>

                        <FormHelperText>
                          {values.attachments.length > 0
                            ? `${values.attachments.length} files selected`
                            : ''}
                        </FormHelperText>
                      </FormControl>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell colSpan={2}>Account</TableCell>
                        <TableCell>Credit (Outgoing)</TableCell>
                        <TableCell>Debit (Incoming)</TableCell>
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
                              id={`entry-credit-${i}`}
                              size="small"
                              variant="outlined"
                              label="Credit"
                              name="credit"
                              onChange={handleItemChange(i)}
                              value={row.credit ? row.credit : ''}
                              disabled={Boolean(Number(row.debit))}
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
                              value={row.debit ? row.debit : ''}
                              disabled={Boolean(Number(row.credit))}
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
                        <TableCell colSpan={4}>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={addRow}
                            startIcon={<AddIcon />}
                          >
                            Add Row
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading || !canBeSubmitted()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'new' ? 'Save' : 'Update'}
          </Button>
          <Button
            size="small"
            onClick={() => {}}
            color="primary"
            variant="outlined"
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
