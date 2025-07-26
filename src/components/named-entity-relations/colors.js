import * as colors from "@material-ui/core/colors";
export default Object.keys(colors).filter(function (c) {
  return c !== "common";
}).map(function (c) {
  return colors[c][700];
});