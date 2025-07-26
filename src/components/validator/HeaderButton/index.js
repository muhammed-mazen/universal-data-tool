import React from "react"
import Button from "@material-ui/core/Button"
import { styled } from "@material-ui/core/styles"
import { useIconDictionary } from "../icon-dictionary.js"
import { iconMapping } from "../icon-mapping.js"
var defaultNameIconMapping = iconMapping

var getIcon = function getIcon(name, customIconMapping) {
  var Icon =
    customIconMapping[name.toLowerCase()] ||
    defaultNameIconMapping[name.toLowerCase()] ||
    defaultNameIconMapping.help
  return /*#__PURE__*/ React.createElement(Icon, null)
}

var StyledButton = styled(Button)({
  textTransform: "none",
  width: 80,
  marginLeft: 4,
  marginRight: 4
})
var ButtonInnerContent = styled("div")({
  display: "flex",
  flexDirection: "column"
})
var IconContainer = styled("div")({})
var Text = styled("div")({
  fontWeight: "bold",
  lineHeight: 1,
  height: 28,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,"Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji","Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
})
export var HeaderButton = function HeaderButton(_ref) {
  var name = _ref.name,
    icon = _ref.icon,
    text = _ref.text,
    disabled = _ref.disabled,
    onClick = _ref.onClick
  var customIconMapping = useIconDictionary()
  return /*#__PURE__*/ React.createElement(
    StyledButton,
    {
      onClick: onClick,
      disabled: disabled
    },
    /*#__PURE__*/ React.createElement(
      ButtonInnerContent,
      null,
      /*#__PURE__*/ React.createElement(
        IconContainer,
        null,
        icon || getIcon(name, customIconMapping)
      ),
      /*#__PURE__*/ React.createElement(
        Text,
        null,
        /*#__PURE__*/ React.createElement("div", null, text)
      )
    )
  )
}
export default HeaderButton
