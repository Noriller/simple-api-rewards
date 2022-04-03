/**
 * This is a simple implementation of a database.
 */
function Database() {
  const data = new Map();
  data.set('hello', 'world');

  function get() {
    return Array.from(data.values());
  }

  function getOne(key) {
    return data.get(key);
  }

  function save(key, value) {
    data.set(key, value);
  }

  function update(key, value) {
    const newValue = { ...data.get(key), ...value };
    data.set(key, newValue);
  }

  function remove(key) {
    data.delete(key);
  }

  return {
    get,
    getOne,
    save,
    update,
    remove,
  };
}

module.exports = Database;