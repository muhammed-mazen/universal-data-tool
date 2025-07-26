import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import React, { useState, memo } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./styles";
import classnames from "classnames";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TrashIcon from "@material-ui/icons/Delete";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import UndoIcon from "@material-ui/icons/Undo";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { asMutable } from "seamless-immutable";
import { useTranslation } from "react-i18next";
var useStyles = makeStyles(styles);
export var RegionLabel = function RegionLabel(_ref) {
  var region = _ref.region,
    viewOnly = _ref.viewOnly,
    editing = _ref.editing,
    allowedClasses = _ref.allowedClasses,
    allowedTags = _ref.allowedTags,
    onDelete = _ref.onDelete,
    _onChange = _ref.onChange,
    onClose = _ref.onClose,
    onOpen = _ref.onOpen,
    onValidationAdded = _ref.onValidationAdded;
  var classes = useStyles();
  const { t } = useTranslation();

  return viewOnly
    ? /*#__PURE__*/ React.createElement(
        "div",
        {
          style: {
            display: "flex",
            backgroundColor: region.color || "#888",
            color: "#fff",
            padding: 2,
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 4,
            fontWeight: "bold",
            textShadow: "0px 0px 5px rgba(0,0,0,0.4)",
          },
        },
        region.cls
      )
    : /*#__PURE__*/ React.createElement(
        Paper,
        {
          onClick: function onClick() {
            return !editing ? onOpen(region) : null;
          },
          className: classnames(classes.regionInfo, {
            highlighted: region.highlighted,
          }),
        },
        !editing
          ? /*#__PURE__*/ React.createElement(
              "div",
              null,
              region.cls &&
                region.valid !== undefined &&
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "name",
                  },
                  /*#__PURE__*/ React.createElement("div", {
                    className: "circle",
                    style: {
                      backgroundColor: region.valid === true ? "#0f0" : "#f00",
                    },
                  }),
                  region.cls
                ),
              region.cls &&
                region.valid !== undefined &&
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    className: "tags",
                  },
                  /*#__PURE__*/ React.createElement(
                    "div",
                    {
                      key: region.valid,
                      className: "tag",
                    },
                    region.valid === true
                      ? t("region-is-valid")
                      : t("region-is-invalid")
                  )
                )
            )
          : /*#__PURE__*/ React.createElement(
              "div",
              {
                style: {
                  width: 200,
                },
              },
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  style: {
                    display: "flex",
                    flexDirection: "row",
                  },
                },
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    style: {
                      display: "flex",
                      backgroundColor: region.color || "#888",
                      color: "#fff",
                      padding: 4,
                      paddingLeft: 8,
                      paddingRight: 8,
                      borderRadius: 4,
                      marginBottom: 15,
                      fontWeight: "bold",
                      textShadow: "0px 0px 5px rgba(0,0,0,0.4)",
                    },
                  },
                  region.cls
                ),
                /*#__PURE__*/ React.createElement("div", {
                  style: {
                    flexGrow: 1,
                  },
                })
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  style: {
                    marginBottom: 15,
                    textAlign: "center",
                  },
                },
                t("is-the-label-valid")
              ),
              /*#__PURE__*/ React.createElement(
                "div",
                {
                  style: {
                    marginTop: 4,
                    display: "flex",
                  },
                },
                /*#__PURE__*/ React.createElement(
                  "div",
                  {
                    style: {
                      flexGrow: 1,
                    },
                  },
                  /*#__PURE__*/ React.createElement(
                    Button,
                    {
                      onClick: function onClick() {
                        _onChange(
                          _objectSpread({}, region, {
                            valid: true,
                          })
                        );
                        return onClose(region);
                      },
                      size: "small",
                      variant: "contained",
                      color: "primary",
                      style: {
                        marginLeft: 15,
                      },
                    },
                    /*#__PURE__*/ React.createElement(CheckIcon, null)
                  ),
                  /*#__PURE__*/ React.createElement(
                    Button,
                    {
                      onClick: function onClick() {
                        _onChange(
                          _objectSpread({}, region, {
                            valid: false,
                          })
                        );
                        return onClose(region);
                      },
                      size: "small",
                      variant: "contained",
                      color: "secondary",
                      style: {
                        marginLeft: 25,
                      },
                    },
                    /*#__PURE__*/ React.createElement(CloseIcon, null)
                  )
                )
              )
            )
      );
};
export default memo(RegionLabel, function(prevProps, nextProps) {
  return (
    prevProps.editing === nextProps.editing &&
    prevProps.region === nextProps.region
  );
});
