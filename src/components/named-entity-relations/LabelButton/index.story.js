import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import colors from "../../colors";
import LabelButton from "./";
storiesOf("LabelButton", module).add("Basic", function () {
  return /*#__PURE__*/React.createElement(LabelButton, {
    name: "hello_world",
    displayName: "Hello World",
    color: colors[0],
    hotkey: "h"
  });
});