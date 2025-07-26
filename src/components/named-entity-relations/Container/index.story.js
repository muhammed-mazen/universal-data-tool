import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Container from "./";
storiesOf("Container", module).add("Basic", function () {
  return /*#__PURE__*/React.createElement(Container, {
    onNext: action("onNext"),
    onPrev: action("onPrev"),
    onClickHeaderItem: action("onClickHeaderItem")
  }, "Some inner content");
});