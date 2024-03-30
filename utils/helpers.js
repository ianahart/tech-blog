module.exports = {
  format_date: (date) => {
    return date.toDateString();
  },

  truncate: (text) => text.split(' ').slice(0, 10).join(' ') + '...',

  eq: (a, b) => a === b,
};
