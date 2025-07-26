import React from "react";
import { styled } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { iconMapping } from "../icon-mapping.js";
import { useIconDictionary } from "../icon-dictionary";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
var Container = styled("div")({
  width: 50,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "#fff",
  flexShrink: 0,
});
export var IconSidebar = function IconSidebar(_ref) {
  var _ref$items = _ref.items,
    items = _ref$items === void 0 ? [] : _ref$items,
    onClickItem = _ref.onClickItem,
    _ref$selectedTools = _ref.selectedTools,
    selectedTools = _ref$selectedTools === void 0 ? [] : _ref$selectedTools;
  var customIconMapping = useIconDictionary();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // console.log(items);
  return /*#__PURE__*/ React.createElement(
    Container,
    null,
    items.map(function(item, i) {
      var NameIcon =
        customIconMapping[item.name.toLowerCase()] ||
        iconMapping[item.name.toLowerCase()] ||
        iconMapping["help"];
      var buttonPart = /*#__PURE__*/ React.createElement(
        IconButton,
        {
          key: i,
          color:
            item.selected || selectedTools.includes(item.name.toLowerCase())
              ? "primary"
              : "default",
          disabled: Boolean(item.disabled),
          onClick: item.onClick
            ? item.onClick
            : function() {
                return onClickItem(item);
              },
        },
        item.icon || /*#__PURE__*/ React.createElement(NameIcon, null)
      );

      var menuPart = (
        <React.Fragment>
          <IconButton
            aria-controls="ai-menu"
            aria-haspopup="true"
            key={i}
            color={
              item.selected || selectedTools.includes(item.name.toLowerCase())
                ? "primary"
                : "default"
            }
            disabled={Boolean(item.disabled)}
            onClick={handleClick}
          >
            {item.icon || /*#__PURE__*/ React.createElement(NameIcon, null)}
          </IconButton>
          <Menu
            id="ai-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {/*  change option to id and text
             */}
            {item.items
              ? item.items.map(function(option, j) {
                  return (
                    <MenuItem
                      key={j}
                      onClick={
                        option.onClick
                          ? option.onClick
                          : function() {
                              handleClose();
                              return onClickItem(option);
                            }
                      }
                    >
                      {option.helperText}
                    </MenuItem>
                  );
                })
              : ""}
          </Menu>
        </React.Fragment>
      );
      if (!item.helperText) return buttonPart;
      return /*#__PURE__*/ React.createElement(
        Tooltip,
        {
          key: i,
          title: item.helperText,
          placement: "right",
        },
        item.type && item.type == "menu" ? menuPart : buttonPart
      );
    })
  );
};
export default IconSidebar;
