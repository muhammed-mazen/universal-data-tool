import React from "react";
import Modal from "@material-ui/core/Modal";

export var ModalPopup = function ModalPopup(_ref2) {
  var text = _ref2.text,
    open = _ref2.open;

  return /*#__PURE__*/ React.createElement(
    Modal,
    {
      open: true,
    },
    text
  );
};
export default ModalPopup;
