This plugin for JSDoc 3 picks up default values for pseudo-named parameters created using destructuring, thus, allowing to avoid duplicating the values in comments.

# Install
```
npm i jsdoc-plugin-named-defaults
```
and add to the list of plugins in your JSDoc configuration file:
```
{
    "plugins": ["./node_modules/jsdoc-plugin-named-defaults/named-defaults.js"]
}
```
# Example
```javascript
/**
* @param {number} start the starting index
* @param {Object} [options]
* @param {number} [options.amount] the amount of elements
* @param {string} [options.message] the message to show
*/
function getElements(start, { amount = 2, message = 'Done!' } = {}) {

}
```
the plugin will set `2` and `'Done!'` as the default values for `options.amount` and `options.message`, respectively, in the resulting documentation.

# Limitations

- only works for literal default values
- only allows one object parameter per function named `options` as the holder of the pseudo-named parameters.