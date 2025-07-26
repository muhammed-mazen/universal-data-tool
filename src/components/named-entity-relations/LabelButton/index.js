import React, { useMemo } from "react";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { iconMapping } from "../icon-mapping";
import { styled } from "@material-ui/core/styles";

var defaultNameIconMapping = iconMapping;

var getIcon = function getIcon(name, customIconMapping) {
  var Icon =
    defaultNameIconMapping[name.toLowerCase()] || defaultNameIconMapping.help;
  return /*#__PURE__*/ React.createElement(Icon, null);
};

var IconContainer = styled("div")({});

var useStyles = makeStyles({
  label: {
    display: "inline-flex",
    cursor: "pointer",
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    margin: 4,
    borderRadius: 4,
    fontSize: 18,
    color: "#fff",
    alignItems: "center",
    "&:hover": {
      opacity: 0.6,
    },
    "&.small": {
      fontSize: 12,
      fontWeight: "bold",
    },
  },
  deleteableIcon: {
    display: "inline-flex",
    cursor: "pointer",
    alignSelf: "center",
    fontSize: 11,
    width: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
    borderRadius: 9,
    color: "#fff",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  hotkeyText: {
    paddingLeft: 4,
  },
  tooltip: {
    whiteSpace: "pre-wrap",
  },
});

var Label = function Label(props) {
  var parent = props.parent,
    color = props.color,
    displayName = props.displayName,
    description = props.description,
    id = props.id,
    small = props.small,
    hasChildren = props.hasChildren,
    hotkey = props.hotkey,
    icon = props.icon ? props.icon : "LocalOffer",
    deletable = props.deletable;
  var classes = useStyles();
  var tooltipClasses = useMemo(
    function() {
      return {
        tooltip: classes.tooltip,
      };
    },
    [classes]
  );
  var button = /*#__PURE__*/ React.createElement(
    "div",
    {
      onClick: function onClick() {
        return props.onClick(id);
      },
      className: classnames(classes.label, small && "small"),
      style: {
        backgroundColor: color,
      },
    },
    hasChildren &&
      /*#__PURE__*/ React.createElement(FolderOpenIcon, {
        style: {
          width: small ? 12 : 20,
          height: small ? 12 : 20,
          marginRight: small ? 3 : 6,
        },
      }),
    hotkey &&
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: classes.hotkeyText,
          marginLeft: small ? 3 : 6,
        },
        "(",
        hotkey,
        ")"
      ),
    /*#__PURE__*/ React.createElement("div", null, displayName || id),
    icon &&
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: classes.hotkeyText,
        },
        /*#__PURE__*/ React.createElement(
          IconContainer,
          null,
          getIcon(icon, null)
        )
      ),
    deletable &&
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: classes.deleteableIcon,
        },
        /*#__PURE__*/ React.createElement("span", null, "\u2716")
      )
  );

  if (description) {
    return /*#__PURE__*/ React.createElement(
      Tooltip,
      {
        title: description,
        arrow: true,
        classes: tooltipClasses,
      },
      button
    );
  } else {
    return button;
  }
};

export default Label;
