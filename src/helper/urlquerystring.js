export function objectToQueryString(obj) {
  const keyValuePairs = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
    }
  }

  const queryString = keyValuePairs.join('&');

  // Add a question mark at the beginning if the query string is not empty
  return queryString ? '?' + queryString : '';
}
