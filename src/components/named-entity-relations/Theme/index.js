import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./theme.css";
var useStyles = makeStyles({
  container: {
    fontFamily: '"Inter UI", sans-serif'
  }
});
var theme = createMuiTheme({
  typography: {
    fontFamily: '"Inter UI", "Roboto", sans-serif'
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    }
  }
});
export default (function (_ref) {
  var children = _ref.children;
  var classes = useStyles();
  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/React.createElement("div", {
    className: classes.container
  }, children));
});