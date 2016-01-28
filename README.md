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
* @param {Object} [details]
* @param {number} [details.amount] the amount of elements
* @param {string} [details.message] the message to show
* @param {Object} [options]
* @param {boolean} [options.async] the amount of elements
* @param {boolean} [options.sort] the message to show
*/
function getElements(start, { amount = 2, message = 'Done!' } = {}, {async = true, sort = false} = {}) {

}
```
the plugin will set `2` and `'Done!'` as the default values for `details.amount` and `details.message`, respectively, as well as `true` and `false` for `options.async` and `options.sort`.