import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import React from "react";
import { styled } from "@material-ui/core/styles";
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

/*

This file turned really ugly. It turns out routing arrows is pretty tricky.

I would advise a rewrite to anyone trying to work with this file. At first I
thought I needed to use a constraint solver, but it turns out that a system of
rules is fine. A lot of the formulas were built by checking numbers against examples
interactively.

Conceptually, we place arrows in places where we know they'll overlap, then we
look at each overlapping group and place them next to eachother in an order
prioritized by how far the arrow has traveled.

*/

var X_SEP_DIST = 5;
var Y_SEP_DIST = 16;
var ArrowLabel = styled("div")({
  position: "absolute",
  transform: "translate(-50%,0%)",
  padding: 1,
  paddingLeft: 4,
  paddingRight: 4,
  fontSize: 11,
  color: "#fff",
  border: "1px solid rgba(0,0,0,0.2)",
  // transition: "transform 120ms",
  borderRadius: 4,
  fontWeight: "bold",
  "&:hover": {
    zIndex: 999,
    cursor: "pointer",
    transform: "translate(-50%, 0%) scale(1.05,1.05)",
  },
});
export var RelationshipArrows = function RelationshipArrows(_ref) {
  var positions = _ref.positions,
    _ref$showBoxBg = _ref.showBoxBg,
    showBoxBg = _ref$showBoxBg === void 0 ? false : _ref$showBoxBg,
    arrows = _ref.arrows,
    _ref$rowHeight = _ref.rowHeight,
    rowHeight = _ref$rowHeight === void 0 ? 100 : _ref$rowHeight,
    onClickArrow = _ref.onClickArrow;
  var totalWidth = Math.max.apply(
    Math,
    _toConsumableArray(
      Object.values(positions).map(function(o) {
        return o.offset.left + o.offset.width;
      })
    )
  );
  var totalHeight = Math.max.apply(
    Math,
    _toConsumableArray(
      Object.values(positions).map(function(o) {
        return o.offset.top + o.offset.height;
      })
    )
  );
  var constraintGroups = [];

  var _iterator = _createForOfIteratorHelper(arrows),
    _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done; ) {
      var arrow = _step.value;
      var from = arrow.from,
        to = arrow.to,
        label = arrow.label;
      if (!positions[from] || !positions[to]) return null;
      var p1 = positions[from].offset;
      var p2 = positions[to].offset;
      var sameRow = p1.top === p2.top;
      var xDist = p1.left - p2.left;
      var rowDelta = Math.round(Math.abs(p1.top - p2.top) / rowHeight);

      if (sameRow) {
        var y = p1.top - Y_SEP_DIST * 1.5;
        constraintGroups.push([
          {
            type: "vertical",
            direction: -Math.sign(xDist),
            weight: Math.abs(xDist),
            x: p1.left + p1.width / 2 - X_SEP_DIST * Math.sign(xDist),
            y: p1.top,
            height: rowHeight / 2,
            centerY: (p1.top + y) / 2,
          },
          {
            type: "horizontal",
            direction: -1,
            weight: Math.abs(xDist),
            width: Math.abs(p1.left + p1.width / 2 - p2.left - p2.width / 2),
            centerX: (p1.left + p2.left + p1.width / 2 + p2.width / 2) / 2,
            y: y,
            hasLabel: true,
          },
          {
            type: "vertical",
            direction: Math.sign(xDist),
            weight: Math.abs(xDist),
            x: p2.left + p2.width / 2 + X_SEP_DIST * Math.sign(xDist),
            y: p2.top,
            height: rowHeight / 2,
            centerY: (p1.top + y) / 2,
          },
        ]);
      } else if (rowDelta === 1) {
        var yDist = p1.top - p2.top;

        if (yDist < 0) {
          var _y = p1.top + p1.height + Y_SEP_DIST;

          constraintGroups.push([
            {
              type: "vertical",
              direction: -Math.sign(xDist),
              weight: Math.abs(xDist),
              x: p1.left + p1.width / 2 - X_SEP_DIST * Math.sign(xDist),
              y: p1.top + p1.height,
              height: rowHeight / 2,
              centerY: (_y + p1.top + p1.height) / 2,
            },
            {
              type: "horizontal",
              direction: 1,
              weight: Math.abs(xDist),
              width: Math.abs(p1.left + p1.width / 2 - p2.left - p2.width / 2),
              centerX: (p1.left + p2.left + p1.width / 2 + p2.width / 2) / 2,
              y: _y,
              hasLabel: true,
            },
            {
              type: "vertical",
              direction: Math.sign(xDist),
              weight: Math.abs(xDist),
              x: p2.left + p2.width / 2 + X_SEP_DIST * Math.sign(xDist),
              y: p2.top,
              height: rowHeight / 2,
              centerY: (_y + p2.top) / 2,
            },
          ]);
        } else {
          var _y2 = p1.top - Y_SEP_DIST * 1.5; // this arrow is going up (to the above row)

          constraintGroups.push([
            {
              type: "vertical",
              direction: -Math.sign(xDist),
              weight: Math.abs(xDist),
              x: p1.left + p1.width / 2 - X_SEP_DIST * Math.sign(xDist),
              y: p1.top,
              height: rowHeight / 2,
              centerY: (_y2 + p1.top + p1.height) / 2,
            },
            {
              type: "horizontal",
              direction: -1,
              weight: Math.abs(xDist),
              width: Math.abs(p1.left + p1.width / 2 - p2.left - p2.width / 2),
              centerX: (p1.left + p2.left + p1.width / 2 + p2.width / 2) / 2,
              y: _y2,
              hasLabel: true,
            },
            {
              type: "vertical",
              direction: Math.sign(xDist),
              weight: Math.abs(xDist),
              x: p2.left + p2.width / 2 + X_SEP_DIST * Math.sign(xDist),
              y: p2.top + p2.height,
              height: rowHeight / 2,
              centerY: (_y2 + p2.top + p2.height) / 2,
            },
          ]);
        }
      } else {
        var y1 = p1.top + p1.height + Y_SEP_DIST;
        var y2 = p2.top - Y_SEP_DIST * 1.5;
        var x1 = -10;
        var xDist1 = p1.left + p1.width / 2 - x1;
        var xDist2 = x1 - p2.left + p2.width / 2;
        var yDist1 = p1.top + p1.height - p2.top;
        var dsign = Math.sign(p2.top - p1.top);
        constraintGroups.push([
          {
            type: "vertical",
            direction: -1,
            weight: Math.abs(xDist1),
            x: p1.left + p1.width / 2 - X_SEP_DIST,
            y: p1.top + p1.height,
            height: rowHeight / 2,
            centerY: y1,
          },
          {
            type: "horizontal",
            direction: 1,
            weight: Math.abs(xDist),
            width: Math.abs(p1.left + p1.width / 2 - p2.left - p2.width / 2),
            centerX: (p1.left + x1 + p1.width / 2) / 2,
            y: y1,
            hasLabel: true,
          },
          {
            type: "vertical",
            direction: -1,
            weight: Math.abs(xDist),
            x: x1,
            height: Math.abs(y1 - y2),
            centerY: (p1.top + p2.top) / 2,
          },
          {
            type: "horizontal",
            direction: -1,
            weight: Math.abs(xDist2),
            width: Math.abs(x1 - p2.left - p2.width / 2),
            centerX: (p2.left + x1 + p2.width / 2) / 2,
            y: y2,
          },
          {
            type: "vertical",
            direction: -1,
            weight: Math.abs(xDist2),
            x: p2.left + p2.width / 2 - X_SEP_DIST,
            y: p2.top,
            height: Math.abs(y1 - y2),
            centerY: (p1.top + p2.top) / 2,
          },
        ]);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  for (
    var _i = 0, _constraintGroups = constraintGroups;
    _i < _constraintGroups.length;
    _i++
  ) {
    var cg = _constraintGroups[_i];

    var _iterator2 = _createForOfIteratorHelper(cg),
      _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var constraint = _step2.value;
        constraint.originalX = constraint.x;
        constraint.originalY = constraint.y;
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }

  var verticalConstraintLocations = new Set();

  var _iterator3 = _createForOfIteratorHelper(
      constraintGroups.flatMap(function(cg) {
        return cg.filter(function(c) {
          return c.type === "vertical";
        });
      })
    ),
    _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
      var verticalConstraint = _step3.value;
      verticalConstraintLocations.add(verticalConstraint.x);
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  var _iterator4 = _createForOfIteratorHelper(verticalConstraintLocations),
    _step4;

  try {
    var _loop = function _loop() {
      var location = _step4.value;
      var constraints = constraintGroups.flatMap(function(cg) {
        return cg.filter(function(c) {
          return c.type === "vertical" && c.x === location;
        });
      }); // In order of weight, each constraint is placed.

      constraints.sort(function(a, b) {
        return b.weight - a.weight;
      });
      var placedConstraints = [];

      var _iterator8 = _createForOfIteratorHelper(constraints),
        _step8;

      try {
        for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
          var c1 = _step8.value;
          var conflicting = [];

          var _iterator9 = _createForOfIteratorHelper(placedConstraints),
            _step9;

          try {
            for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
              var c2 = _step9.value;

              if (
                Math.abs(c1.centerY - c2.centerY) <
                  c1.height / 2 + c2.height / 2 &&
                c1.x === c2.originalX
              ) {
                conflicting.push(c2);
              }
            }
          } catch (err) {
            _iterator9.e(err);
          } finally {
            _iterator9.f();
          }

          if (conflicting.length === 0) {
            placedConstraints.push(c1);
            continue;
          } else {
            // Find highest/lowest y of conflicting constraint
            var highestVal = Math[c1.direction === 1 ? "max" : "min"].apply(
              Math,
              _toConsumableArray(
                conflicting.map(function(c) {
                  return c.x;
                })
              )
            );
            c1.x = highestVal + X_SEP_DIST * c1.direction;
            placedConstraints.push(c1);
          }
        }
      } catch (err) {
        _iterator8.e(err);
      } finally {
        _iterator8.f();
      }
    };

    for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
      _loop();
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  var horzConstraintLocations = new Set();

  var _iterator5 = _createForOfIteratorHelper(
      constraintGroups.flatMap(function(cg) {
        return cg.filter(function(c) {
          return c.type === "horizontal";
        });
      })
    ),
    _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
      var horzConstraint = _step5.value;
      horzConstraintLocations.add(horzConstraint.x);
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  var _iterator6 = _createForOfIteratorHelper(horzConstraintLocations),
    _step6;

  try {
    var _loop2 = function _loop2() {
      var location = _step6.value;
      var constraints = constraintGroups.flatMap(function(cg) {
        return cg.filter(function(c) {
          return c.type === "horizontal" && c.x === location;
        });
      }); // In order of weight, each constraint is placed.

      constraints.sort(function(a, b) {
        return a.weight - b.weight;
      });
      var placedConstraints = [];

      var _iterator10 = _createForOfIteratorHelper(constraints),
        _step10;

      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done; ) {
          var c1 = _step10.value;
          var conflicting = [];

          var _iterator11 = _createForOfIteratorHelper(placedConstraints),
            _step11;

          try {
            for (_iterator11.s(); !(_step11 = _iterator11.n()).done; ) {
              var c2 = _step11.value;

              if (
                Math.abs(c1.centerX - c2.centerX) <
                  c1.width / 2 + c2.width / 2 &&
                c1.y === c2.originalY
              ) {
                conflicting.push(c2);
              }
            }
          } catch (err) {
            _iterator11.e(err);
          } finally {
            _iterator11.f();
          }

          if (conflicting.length === 0) {
            placedConstraints.push(c1);
            continue;
          } else {
            // Find highest/lowest y of conflicting constraint
            var highestVal = Math[c1.direction === 1 ? "max" : "min"].apply(
              Math,
              _toConsumableArray(
                conflicting.map(function(c) {
                  return c.y;
                })
              )
            );
            c1.y = highestVal + Y_SEP_DIST * c1.direction;
            placedConstraints.push(c1);
          }
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    };

    for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
      _loop2();
    } // Convert lines to points
  } catch (err) {
    _iterator6.e(err);
  } finally {
    _iterator6.f();
  }

  var linePoints = [];

  for (
    var _i2 = 0, _constraintGroups2 = constraintGroups;
    _i2 < _constraintGroups2.length;
    _i2++
  ) {
    var constraints = _constraintGroups2[_i2];
    var lastPoint = [constraints[0].x || 0, constraints[0].y || 0];
    var points = [lastPoint];

    var _iterator7 = _createForOfIteratorHelper(constraints.slice(1, -1)),
      _step7;

    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
        var _constraint = _step7.value;
        lastPoint = [
          _constraint.x === undefined ? lastPoint[0] : _constraint.x,
          _constraint.y === undefined ? lastPoint[1] : _constraint.y,
        ];
        points.push(lastPoint);
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }

    var lastConstraint = constraints[constraints.length - 1];

    if (lastConstraint.type === "vertical") {
      points.push(
        [lastConstraint.x, lastPoint[1]],
        [lastConstraint.x, lastConstraint.y]
      );
    } else {
      throw new Error("Didn't build support for horizontal final (not needed)");
    }

    linePoints.push(points);
  }

  var labelPositions = constraintGroups.map(function(group, i) {
    var labelConstraintIndex = group.findIndex(function(c) {
      return c.hasLabel;
    });
    var p1 = linePoints[i][labelConstraintIndex];
    var p2 = linePoints[i][labelConstraintIndex + 1];
    return [(p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2];
  });
  var svgOffset = {
    x: 100,
    y: 100,
  };
  var containerPosition = {
    position: "absolute",
    left: -svgOffset.x,
    top: -svgOffset.y,
  };
  return /*#__PURE__*/ React.createElement(
    "div",
    null,
    /*#__PURE__*/ React.createElement(
      "div",
      {
        style: _objectSpread(
          {
            pointerEvents: "none",
          },
          containerPosition
        ),
      },
      /*#__PURE__*/ React.createElement(
        "svg",
        {
          width: totalWidth + svgOffset.x,
          height: totalHeight + svgOffset.y + 50,
        },
        /*#__PURE__*/ React.createElement(
          "defs",
          null,
          arrows.map(function(arrow, i) {
            return /*#__PURE__*/ React.createElement(
              "marker",
              {
                id: "arrowhead" + i,
                markerWidth: "5",
                markerHeight: "5",
                refX: "0",
                refY: "2.5",
                orient: "auto",
              },
              /*#__PURE__*/ React.createElement("polygon", {
                fill: arrow.color || "#000",
                points: "0 0, 6 2.5, 0 5",
              })
            );
          })
        ),
        linePoints.map(function(lp, i) {
          return /*#__PURE__*/ React.createElement("polyline", {
            key: i,
            stroke: arrows[i].color || "#000",
            fill: "none",
            "marker-end": "url(#arrowhead".concat(i, ")"),
            "stroke-width": "2",
            points: lp
              .map(function(_ref2, i) {
                var _ref3 = _slicedToArray(_ref2, 2),
                  x = _ref3[0],
                  y = _ref3[1];

                return ""
                  .concat(svgOffset.x + x, ",")
                  .concat(
                    svgOffset.y +
                      y -
                      (i === lp.length - 1 ? (lp[i - 1][1] < y ? 10 : -10) : 0)
                  );
              })
              .join(" "),
          });
        }),
        showBoxBg &&
          Object.values(positions).map(function(p) {
            return /*#__PURE__*/ React.createElement("rect", {
              x: p.offset.left + svgOffset.x,
              y: p.offset.top + svgOffset.y,
              width: p.offset.width,
              height: p.offset.height,
              stroke: "rgba(0,0,0,0.5)",
              "stroke-dasharray": "10 5",
              fill: "none",
            });
          })
      )
    ),
    arrows.map(function(arrow, i) {
      return /*#__PURE__*/ React.createElement(
        ArrowLabel,
        {
          key: i,
          onClick: function onClick(e) {
            e.stopPropagation();
            onClickArrow(arrow);
          },
          style: {
            left: labelPositions[i][0],
            top: labelPositions[i][1] - 9,
            backgroundColor: arrow.color,
          },
        },
        arrow.label
      );
    })
  );
};
export default RelationshipArrows;
