import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from "react-html-parser";

export var InfoDialog = function InfoDialog(_ref) {
  var open = _ref.open,
    t = _ref.t,
    text = _ref.text,
    onClose = _ref.onClose;

  return /*#__PURE__*/ React.createElement(
    Dialog,
    {
      open: open || false,
      onClose: onClose,
    },
    /*#__PURE__*/ React.createElement(DialogTitle, null, t("info")),
    /*#__PURE__*/ React.createElement(
      DialogContent,
      {
        style: {
          minWidth: 400,
        },
      },
      ReactHtmlParser(text)
    ),
    /*#__PURE__*/ React.createElement(
      DialogActions,
      null,
      /*#__PURE__*/ React.createElement(
        Button,
        {
          onClick: onClose,
        },
        t("close")
      )
    )
  );
};
export default InfoDialog;
