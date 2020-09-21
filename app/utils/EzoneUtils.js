import _ from 'lodash'

class EzoneUtils {

  mergeWithPairs(object, sources) {
    function customizer(objValue, srcValue, key) {
      return _.has(object, key) ? srcValue : null;
    }

    var defaults = _.partialRight(_.assignInWith, customizer);

    const result = defaults(object, sources, [customizer]);
    return _.pickBy(result, _.identity)
  }

  matchWithPairs(initial, sources) {
    if (!initial || !sources) {
      return;
    }

    let objectMap = new Map()
    for (let key in sources) {
      if (_.has(initial, key)) {
        objectMap.has(key) ? objectMap.delete(key) : objectMap.set(key, sources[key])
      }
    }

    return Object.fromEntries(objectMap.entries());
  }

  matchArrayPairs(initial, sources) {
    const result = []
    sources.map(source => {
      const matchedObject = _.mapKeys(source, function (value, key) {
        return _.has(initial, key) ? initial[key] : key;
      });
      // const matchedObject = this.matchWithPairs(initial, source)
      result.push(matchedObject)
    })

    return result
  }

  toTitleCase = str => (str ? str[0].toUpperCase() + str.slice(1) : '');

  toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(',')[1]);
      reader.onerror = error => reject(error);
    })
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
    var month = date.getMonth() + 1; //months from 1-12
    var day = date.getDate();
    var year = date.getFullYear();

    var day = day.length > 0 ? day : day.toString().padStart(2, '0')
    var month = month.length > 0 ? month : month.toString().padStart(2, '0')

    const newdate = year + "-" + month + "-" + day;
    return newdate;
  }
}

const Instance = new EzoneUtils

export default Instance