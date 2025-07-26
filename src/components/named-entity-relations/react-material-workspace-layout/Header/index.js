import React from "react"
import HeaderButton from "../HeaderButton"
import Box from "@material-ui/core/Box"
import { styled } from "@material-ui/core/styles"
var emptyObj = {}
var Container = styled("div")({
  width: "100%",
  display: "flex",
  backgroundColor: "#fff",
  borderBottom: "1px solid #ccc",
  alignItems: "center",
  flexShrink: 1,
  boxSizing: "border-box",
  flexWrap: "wrap",
  alignContent: "center",
  justifyContent: "space-around"
})
export var Header = function Header(_ref) {
  var _ref$leftSideContent = _ref.leftSideContent,
    leftSideContent =
      _ref$leftSideContent === void 0 ? null : _ref$leftSideContent,
    items = _ref.items,
    onClickItem = _ref.onClickItem
  return /*#__PURE__*/ React.createElement(
    Container,
    null,
    /*#__PU RE__*/ React.createElement(
      Box,
      {
        flexGrow: 1
      },
      leftSideContent
    ),
    items.map(function(item) {
      return /*#__PURE__*/ React.createElement(
        HeaderButton,
        Object.assign(
          {
            key: item.name,
            onClick: function onClick() {
              return onClickItem(item)
            },
            disabled: false
          },
          item
        )
      )
    })
  )
}
export default Header
