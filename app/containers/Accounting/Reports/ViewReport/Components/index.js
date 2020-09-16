import exportFromJSON from 'export-from-json';

const downloadCSV = ({ fileName, exportType, data }) =>
  exportFromJSON({
    data,
    fileName,
    exportType: exportType || 'csv',
    withBOM: true,
  });

export default downloadCSV;
