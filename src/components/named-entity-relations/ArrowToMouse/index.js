import React, { useRef } from "react";
import { styled } from "@material-ui/core/styles";
import { useMouse } from "react-use";
var Container = styled("div")({
  position: "absolute",
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  pointerEvents: "none",
});
export var ArrowToMouse = function ArrowToMouse() {
  var _ref =
      arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    startAt = _ref.startAt;

  var ref = useRef(null);

  var _useMouse = useMouse(ref),
    mx = _useMouse.elX,
    my = _useMouse.elY;

  var dx, dy;

  if (mx === 0 && my === 0) {
    dx = 0;
    dy = 0;
    mx = startAt.left + startAt.width / 2;
    my = startAt.top + startAt.height / 2;
  } else {
    var a = mx - startAt.left;
    var b = my - startAt.top;
    var c = Math.sqrt(a * a + b * b);
    var sf = c < 100 ? Math.pow(c / 100, 2) : 1;
    dx = (a / c) * sf;
    dy = (b / c) * sf;
  }

  return /*#__PURE__*/ React.createElement(
    Container,
    {
      ref: ref,
    },
    /*#__PURE__*/ React.createElement(
      "svg",
      {
        width: Math.max(mx, startAt.left + startAt.width + 8),
        height: Math.max(my, startAt.top + startAt.height + 8),
      },
      /*#__PURE__*/ React.createElement(
        "defs",
        null,
        /*#__PURE__*/ React.createElement(
          "marker",
          {
            id: "arrowhead",
            markerWidth: "5",
            markerHeight: "5",
            refX: "0",
            refY: "2.5",
            orient: "auto",
          },
          /*#__PURE__*/ React.createElement("polygon", {
            fill: "rgba(255,0,0,0.75)",
            points: "0 0, 6 2.5, 0 5",
          })
        )
      ),
      /*#__PURE__*/ React.createElement("rect", {
        x: startAt.left - 5,
        y: startAt.top - 5,
        width: startAt.width + 10,
        height: startAt.height + 10,
        stroke: "rgba(255,0,0,0.75)",
        "stroke-dasharray": "10 5",
        fill: "none",
      }),
      /*#__PURE__*/ React.createElement("line", {
        x1: startAt.left - startAt.width / 2,
        y1: startAt.top + startAt.height / 2,
        x2: mx - dx * 30,
        y2: my - dy * 30,
        markerEnd: "url(#arrowhead)",
        "stroke-width": 3,
        stroke: "rgba(255,0,0,0.75)",
        fill: "none",
      })
    )
  );
};
export default ArrowToMouse;
