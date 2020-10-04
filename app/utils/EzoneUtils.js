import _ from 'lodash';
import moment from 'moment';

class EzoneUtils {
  mergeWithPairs(object, sources) {
    function customizer(objValue, srcValue, key) {
      return _.has(object, key) ? srcValue : null;
    }

    const defaults = _.partialRight(_.assignInWith, customizer);

    const result = defaults(object, sources, [customizer]);
    return _.pickBy(result, _.identity);
  }

  matchWithPairs(initial, sources) {
    if (!initial || !sources) {
      return;
    }

    const objectMap = new Map();
    for (const key in sources) {
      if (_.has(initial, key)) {
        objectMap.has(key)
          ? objectMap.delete(key)
          : objectMap.set(key, sources[key]);
      }
    }

    return Object.fromEntries(objectMap.entries());
  }

  matchArrayPairs(initial, sources) {
    const result = [];
    sources.map(source => {
      const matchedObject = _.mapKeys(
        source,
        (value, key) => initial[key] || key,
      );
      // const matchedObject = this.matchWithPairs(initial, source)
      result.push(matchedObject);
    });

    return result;
  }

  toTitleCase = str => (str ? str[0].toUpperCase() + str.slice(1) : '');

  formatCurrency = (value, code = 'NGN', locale = 'en-NG') => {
    if (!code) code = 'NGN';
    return new Intl.NumberFormat(locale, { style: 'currency', currency: code, maximumSignificantDigits: 3 }).format(Number(value))
  }

  formatFileName = fileName => {
    const fName = fileName.split('.')[0];
    return `${fName
      .substr(0, Math.ceil(fName.length / 2))
      .trim()}-${moment().format('YYYY-MM-DDTHH:mm:ss')}`;
  };

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    });
  }

  getBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      return cb(reader.result.split(',')[1]);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  reformattedDate(date) {
    var month = date.getMonth() + 1; // months from 1-12
    var day = date.getDate();
    const year = date.getFullYear();

    var day = day.length > 0 ? day : day.toString().padStart(2, '0');
    var month = month.length > 0 ? month : month.toString().padStart(2, '0');

    const newdate = `${year}-${month}-${day}`;
    return newdate;
  }
}

const Instance = new EzoneUtils();

export default Instance;
