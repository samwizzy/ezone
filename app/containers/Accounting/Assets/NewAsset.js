import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import EzoneUtils from '../../../utils/EzoneUtils'
import moment from 'moment';
import _ from 'lodash';
import Autocomplete from '@material-ui/lab/Autocomplete';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {
  makeStyles,
  InputAdornment,
  Button,
  CircularProgress,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  FormControl,
  FormHelperText,
  Paper,
  TextField,
} from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import * as AppSelectors from '../../App/selectors';
import * as Selectors from './selectors';
import * as Actions from './actions';
import { GET_BRANCHES_SUCCESS } from '../../HRPage/constants';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiCardActions-root': {
      justifyContent: 'flex-end',
      borderTop: `1px solid ${theme.palette.divider}`
    },
    '& .MuiCardHeader-root': {
      borderBottom: `1px solid ${theme.palette.divider}`
    },
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    boxShadow: theme.shadows[0]
  },
}));

const assetStatuses = [
  { label: 'Good', value: 'GOOD', id: 'GOOD' },
  { label: 'Bad', value: 'BAD', id: 'BAD' },
  { label: 'MAINTAINANCE', value: 'MAINTAINANCE', id: 'MAINTAINANCE' },
  { label: 'Lost', value: 'LOST', id: 'LOST' },
];
const measurements = [
  { label: 'cm', value: 'CM', id: 'CM' },
  { label: 'mm', value: 'MM', id: 'MM' },
  { label: 'km', value: 'KM', id: 'KM' },
  { label: 'm', value: 'M', id: 'M' },
];

const initialState = {
  aquisitionDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  aquisitionValue: 0,
  assetCondition: '',
  assetId: '',
  assetName: '',
  assetNumber: '',
  assetStatus: 'GOOD',
  assetTypeId: 0,
  barcode: '',
  description: '',
  image: {
    file: '',
    fileName: '',
    fileUrl: '',
  },
  length: 0,
  location: '',
  manufacturer: '',
  measurement: 'CM',
  quantity: 0,
  taxAccountId: 0,
  taxAmount: 0,
  weigth: 0,
  width: 0,
};

const NewAsset = props => {
  const classes = useStyles(props);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    dialog,
    chartOfAccounts,
    branches,
    assetTypes,
    createAsset,
    updateAsset,
  } = props;

  useEffect(() => {
    console.log(moment().format('x'), "moment().format('x')")
    if (dialog.type === 'edit' && dialog.data) {
      const { taxAccount, assetType } = dialog.data
      const newData = EzoneUtils.matchWithPairs(initialState, dialog.data)
      console.log(newData, "newData")
      setForm({ ...newData, taxAccountId: taxAccount.id, assetTypeId: assetType.id });
    } else {
      setForm({ ...initialState });
    }
  }, [dialog.data]);

  const handleChange = event => {
    const { name, value, type, checked } = event.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSelectChange = name => (event, object) => {
    name === 'location'
      ? setForm({ ...form, [name]: object ? object.name : object })
      : setForm({ ...form, [name]: object ? object.id : object });
  };

  const handleDateChange = name => date => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') });
  };

  const handleImageChange = event => {
    const { files } = event.target;
    const fileName = EzoneUtils.formatFileName(files[0].name);
    EzoneUtils.toBase64(files[0]).then(base64 =>
      setForm({ ...form, image: { ...form.image, file: base64, fileName } }),
    );
  };

  const handleSubmit = () => {
    dialog.type === 'new' ? createAsset(form) : updateAsset(form);
  };

  const handleFormReset = () => {
    setForm({ ...initialState })
  };

  const canSubmitForm = () => {
    const { assetName, assetStatus, description } = form;
    return (
      assetName.length > 0 && assetStatus.length > 0 && description.length > 0
    );
  };

  console.log(loading, 'loading');
  console.log(chartOfAccounts, 'chartOfAccounts');
  console.log(branches, 'branches');
  console.log(form, 'form');
  console.log(dialog, 'form dialog');

  return (
    <div>
      <Card square elevation={0} className={classes.root}>
        <CardHeader
          title={dialog.type === 'new' ? 'Create Asset' : 'Edit Asset'}
        />

        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs>
              <Paper className={classes.paper}>
                <TextField
                  id="asset-name"
                  name="assetName"
                  label="Asset Name"
                  required
                  variant="outlined"
                  value={form.assetName}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <TextField
                  id="asset-number"
                  name="assetNumber"
                  label="Asset Number"
                  required
                  variant="outlined"
                  value={form.assetNumber}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <TextField
                  id="asset-condition"
                  name="assetCondition"
                  label="Asset Condition"
                  required
                  variant="outlined"
                  value={form.assetCondition}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <Autocomplete
                  id="asset-type-id"
                  options={assetTypes}
                  getOptionLabel={option => option.name}
                  onChange={handleSelectChange('assetTypeId')}
                  value={form.assetTypeId ? _.find(assetTypes, { id: form.assetTypeId }) : null}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select Asset Type"
                      required
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      placeholder="Asset Type"
                      fullWidth
                    />
                  )}
                />

                <Autocomplete
                  id="asset-status"
                  options={assetStatuses}
                  getOptionLabel={option => option.label}
                  onChange={handleSelectChange('method')}
                  value={
                    form.assetStatus
                      ? _.find(assetStatuses, { id: form.assetStatus })
                      : null
                  }
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select Asset Status"
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      placeholder="Asset Status"
                      fullWidth
                    />
                  )}
                />

                <TextField
                  id="barcode"
                  name="barcode"
                  label="Barcode"
                  required
                  variant="outlined"
                  value={form.barcode}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <TextField
                  id="aquisition-value"
                  name="aquisitionValue"
                  label="Aquisition Value"
                  required
                  variant="outlined"
                  value={form.aquisitionValue}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    id="aquisition-date"
                    inputVariant="outlined"
                    format="dd/MM/yyyy"
                    fullWidth
                    margin="normal"
                    size="small"
                    label="Aquisition Date"
                    required
                    value={form.aquisitionDate}
                    onChange={handleDateChange('aquisitionDate')}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>

                <TextField
                  name="description"
                  label="Description"
                  id="asset-type-description"
                  fullWidth
                  margin="normal"
                  size="small"
                  variant="outlined"
                  multiline
                  rows={1}
                  rowsMax={3}
                  value={form.description}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Paper>
            </Grid>

            <Grid item xs>
              <Paper className={classes.paper}>
                <TextField
                  id="manufacturer"
                  name="manufacturer"
                  label="Manufacturer"
                  required
                  variant="outlined"
                  value={form.manufacturer}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <TextField
                  id="asset-id"
                  name="assetId"
                  label="Asset Identification"
                  required
                  variant="outlined"
                  value={form.assetId}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      id="length"
                      name="length"
                      label="Length"
                      required
                      variant="outlined"
                      value={form.length}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">{form.measurement}</InputAdornment>
                      }}
                      margin="normal"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      id="width"
                      name="width"
                      label="Width"
                      variant="outlined"
                      value={form.width}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">{form.measurement}</InputAdornment>
                      }}
                      margin="normal"
                      size="small"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <TextField
                  id="weigth"
                  name="weigth"
                  label="Weight"
                  required
                  variant="outlined"
                  value={form.weigth}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{form.measurement}</InputAdornment>
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <Autocomplete
                  id="measurement"
                  options={measurements}
                  getOptionLabel={option => option.label}
                  onChange={handleSelectChange('measurement')}
                  value={form.measurement ? _.find(measurements, { id: form.measurement }) : null}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select Measurement"
                      required
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      placeholder="Measurement"
                      fullWidth
                    />
                  )}
                />

                <Autocomplete
                  id="tax-account-id"
                  options={chartOfAccounts}
                  getOptionLabel={option => option.accountName}
                  onChange={handleSelectChange('taxAccountId')}
                  value={form.taxAccountId ? _.find(chartOfAccounts, { id: form.taxAccountId }) : null}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select Tax Account"
                      required
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      placeholder="Tax Account"
                      fullWidth
                    />
                  )}
                />

                <TextField
                  id="tax-amount"
                  name="taxAmount"
                  label="Tax Amount"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  value={form.taxAmount}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <TextField
                  id="quantity"
                  name="quantity"
                  label="Quantity"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  value={form.quantity}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <Autocomplete
                  id="location"
                  options={branches}
                  getOptionLabel={option => option.name}
                  onChange={handleSelectChange('location')}
                  value={form.location ? _.find(branches, { name: form.location }) : null}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label="Select location"
                      required
                      variant="outlined"
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      size="small"
                      placeholder="Location"
                      fullWidth
                    />
                  )}
                />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <FormControl variant="outlined" margin="normal">
                  <Button
                    variant="outlined"
                    component="label"
                    color="secondary"
                    disableElevation
                    startIcon={<AttachFileIcon />}
                  >
                    Upload Image
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={handleImageChange}
                    />
                  </Button>

                  <FormHelperText>
                    {form.image && form.image.fileName.length > 0 ? `${form.image.fileName} selected` : ''}
                  </FormHelperText>
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            disableElevation
            disabled={loading || !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>

          <Button variant="contained" onClick={handleFormReset} disableElevation>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

NewAsset.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectAssetDialog(),
  assetTypes: Selectors.makeSelectAssetTypes(),
  chartOfAccounts: Selectors.makeSelectGetChartOfAccounts(),
  branches: Selectors.makeSelectGetBranches(),
});

function mapDispatchToProps(dispatch) {
  return {
    createAsset: data => dispatch(Actions.createAsset(data)),
    updateAsset: data => dispatch(Actions.updateAsset(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewAsset);
