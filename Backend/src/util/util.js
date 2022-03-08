
const filter = (data, filter, filed) => {
  return data.filter((field) => field[filed] === filter);
}

module.exports = {
  filter
}