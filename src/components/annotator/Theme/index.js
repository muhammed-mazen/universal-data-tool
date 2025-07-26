import React from "react"
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles
} from "@material-ui/core/styles"
var useStyles = makeStyles({
  container: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
  }
})
var theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none"
      }
    }
  }
})
export var Theme = function Theme(_ref) {
  var children = _ref.children
  var classes = useStyles()
  return /*#__PURE__*/ React.createElement(
    ThemeProvider,
    {
      theme: theme
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: classes.container
      },
      children
    )
  )
}
export default Theme
