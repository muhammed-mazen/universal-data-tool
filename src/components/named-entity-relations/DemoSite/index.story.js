import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import DemoSite from "./";
storiesOf("DemoSite", module).add("Basic", function () {
  return /*#__PURE__*/React.createElement(DemoSite, null);
});