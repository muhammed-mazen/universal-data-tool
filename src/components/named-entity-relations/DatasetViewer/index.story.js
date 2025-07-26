import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DatasetViewer from "./";
storiesOf("DatasetViewer", module).add("Basic", function () {
  return /*#__PURE__*/React.createElement(DatasetViewer, null);
});