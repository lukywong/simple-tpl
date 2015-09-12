var R = require('ramda');

module.exports = {
  render: function(template, obj, regExp) {
    return (template || '').replace(regExp || /\{\{([^{{}}]+)\}\}/g, function (match, key) {
      return obj ? (obj[key] || match) : match;
    });
  },

  render2: function(template, obj) {
    return Object.keys(obj || {})
      .map(function(key) {
        return function(text) {
          var regExp = new RegExp('\{\{' + key + '\}\}', 'g');
          return text.replace(regExp, obj[key]);
        }
      })
      .reduce(function(sofar, transform) {
        return transform(sofar);
      }, template);
  },

  render3: function(template, obj) {
    function reducer(text, pair) {
      var regExp = new RegExp('\{\{' + pair[0] + '\}\}', 'g');
      return text.replace(regExp, pair[1]);
    }

    return R.compose(R.flip(R.reduce)(template, reducer), R.toPairs)(obj);
  },

  render4: function(template, obj) {
    function reducer(text, pair) {
      var regExp = new RegExp('\{\{' + pair[0] + '\}\}', 'g');
      return text.replace(regExp, pair[1]);
    }

    return R.transduce(R.map(R.identity), reducer, template, R.toPairs(obj || {}));
  }

};
