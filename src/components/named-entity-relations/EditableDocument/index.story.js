import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import EditableDocument from "./";
storiesOf("EditableDocument", module).add("Basic", function () {
  return /*#__PURE__*/React.createElement(EditableDocument, null);
});