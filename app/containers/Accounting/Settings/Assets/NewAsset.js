import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import EzoneUtils from '../../../../utils/EzoneUtils'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import moment from 'moment';
import Autocomplete from '@material-ui/lab/Autocomplete'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {
  makeStyles,
  Button,
  CircularProgress,
  Card, CardHeader, CardContent, CardActions,
  Grid,
  FormControl,
  Paper,
  TextField,
} from '@material-ui/core';
import * as AppSelectors from '../../../App/selectors';
import * as Selectors from '../selectors';
import * as Actions from '../actions';

const useStyles = makeStyles(theme => ({
  root: {},
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const assetStatuses = [
  { label: 'Good', value: 'GOOD', id: 'GOOD' },
  { label: 'Bad', value: 'BAD', id: 'BAD' },
  { label: 'MAINTAINANCE', value: 'MAINTAINANCE', id: 'MAINTAINANCE' },
  { label: 'Lost', value: 'LOST', id: 'LOST' },
]
const measurements = [
  { label: 'cm', value: 'CM', id: 'CM' },
  { label: 'mm', value: 'MM', id: 'MM' },
  { label: 'km', value: 'KM', id: 'KM' },
  { label: 'm', value: 'M', id: 'M' },
]

const initialState = {
  aquisitionDate: moment().format('YYYY-MM-DDTHH:mm:ss'),
  aquisitionValue: 0,
  assetCondition: "",
  assetId: "",
  assetName: "",
  assetNumber: "",
  assetStatus: "GOOD",
  assetTypeId: 0,
  barcode: "",
  description: "",
  image: {
    file: "",
    fileName: "",
    fileUrl: ""
  },
  length: 0,
  location: "",
  manufacturer: "",
  measurement: "CM",
  quantity: 0,
  taxAccountId: 0,
  taxAmount: 0,
  weigth: 0,
  width: 0
}

const NewAsset = props => {
  const classes = useStyles(props);
  const [form, setForm] = React.useState({ ...initialState });

  const {
    loading,
    dialog,
    chartOfAccounts,
    assetTypes,
    createAsset,
  } = props;

  useEffect(() => {
    if (dialog.type === 'edit') {
      setForm({ ...initialState })
    } else {
      setForm({ ...initialState })
    }
  }, [])

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.type === 'checkbox' ? event.target.checked : event.target.value });
  };

  const handleSelectChange = name => (event, object) => {
    setForm({ ...form, [name]: object ? object.id : object })
  }

  const handleDateChange = name => (date) => {
    setForm({ ...form, [name]: moment(date).format('YYYY-MM-DDTHH:mm:ss') })
  }

  const handleImageChange = (event) => {
    const { files } = event.target
    const fileName = EzoneUtils.formatFileName(files[0].name)
    EzoneUtils.toBase64(files[0])
      .then(base64 => setForm({ ...form, image: { ...form.image, file: base64, fileName } }));
  }

  const handleSubmit = () => {
    dialog.type === 'new' ?
      createAsset(form) : "";
  };

  const canSubmitForm = () => {
    const { assetName, assetStatus, description } = form
    return assetName.length > 0 && assetStatus.length > 0 && description.length > 0
  }

  console.log(loading, "loading")
  console.log(form, "form")
  console.log(dialog, "form dialog")

  return (
    <div>
      <Card square elevation={0}>
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
                      label='Select Asset Type'
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
                  value={form.assetStatus ? _.find(assetStatuses, { id: form.assetStatus }) : null}
                  renderInput={params => (
                    <TextField
                      {...params}
                      label='Select Asset Status'
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
                  rows={3}
                  rowsMax={4}
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
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <TextField
                  id="length"
                  name="length"
                  label="Length"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <TextField
                  id="weigth"
                  name="weigth"
                  label="Weigth"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <TextField
                  id="width"
                  name="width"
                  label="Width"
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
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
                      label='Select Measurement'
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
                      label='Select Tax Account'
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
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <TextField
                  id="location"
                  name="location"
                  label="Location"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  multiline
                  rows={3}
                  rowsMax={4}
                  fullWidth
                />
              </Paper>
            </Grid>
            <Grid item xs>
              <Paper className={classes.paper}>
                <TextField
                  id="asset-id"
                  name="assetId"
                  label="Asset Identification"
                  required
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  margin="normal"
                  size="small"
                  fullWidth
                />

                <FormControl variant="outlined" className={classes.formControl} margin="normal">
                  <TextField
                    id="asset-image"
                    name="image"
                    type="file"
                    label="Attachment"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    fullWidth
                    onChange={handleImageChange}
                    variant="outlined"
                  />
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
            disabled={loading ? loading : !canSubmitForm()}
            endIcon={loading && <CircularProgress size={20} />}
          >
            {dialog.type === 'edit' ? 'Update' : 'Save'}
          </Button>

          <Button
            variant="contained"
            onClick={() => { }}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

NewAsset.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  dialog: Selectors.makeSelectAssetDialog(),
  assetTypes: Selectors.makeSelectAssetTypes(),
  chartOfAccounts: Selectors.makeSelectGetChartOfAccounts(),
});


function mapDispatchToProps(dispatch) {
  return {
    createAsset: data => dispatch(Actions.createAsset(data)),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(NewAsset);