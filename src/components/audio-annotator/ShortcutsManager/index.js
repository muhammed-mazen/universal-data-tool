import React, { useMemo } from "react";
import { HotKeys } from "react-hotkeys";
export var defaultHotkeys = [{
  id: "select_tool",
  description: "Switch to the Select Tool",
  binding: "escape"
}, {
  id: "zoom_tool",
  description: "Select the Zoom Tool",
  binding: "z"
}, {
  id: "create_point",
  description: "Create a point"
}, {
  id: "create_bounding_box",
  description: "Create a bounding box",
  binding: "b"
}, {
  id: "pan_tool",
  description: "Select the Pan Tool",
  binding: "m"
}, {
  id: "create_polygon",
  description: "Create a Polygon",
  binding: "p"
}, {
  id: "create_pixel",
  description: "Create a Pixel Mask"
}, {
  id: "save_and_previous_sample",
  description: "Save and go to previous sample",
  binding: "ArrowLeft"
}, {
  id: "save_and_next_sample",
  description: "Save and go to next sample",
  binding: "ArrowRight"
}, {
  id: "save_and_exit_sample",
  description: "Save and exit current sample"
}, {
  id: "exit_sample",
  description: "Exit sample without saving"
}];
export var defaultKeyMap = {};

for (var _i = 0, _defaultHotkeys = defaultHotkeys; _i < _defaultHotkeys.length; _i++) {
  var _ref2 = _defaultHotkeys[_i];
  var id = _ref2.id;
  var binding = _ref2.binding;
  defaultKeyMap[id] = binding;
}

export var useDispatchHotkeyHandlers = function useDispatchHotkeyHandlers(_ref3) {
  var dispatch = _ref3.dispatch;
  var handlers = useMemo(function () {
    return {
      select_tool: function select_tool() {
        dispatch({
          type: "SELECT_TOOL",
          selectedTool: "select"
        });
      },
      zoom_tool: function zoom_tool() {
        dispatch({
          type: "SELECT_TOOL",
          selectedTool: "zoom"
        });
      },
      create_ai: function create_ai() {
        dispatch({
          type: "SELECT_TOOL",
          selectedTool: "create-ai"
        });
      },
      create_point: function create_point() {
        dispatch({
          type: "SELECT_TOOL",
          selectedTool: "create-point"
        });
      },
      create_bounding_box: function create_bounding_box() {
        dispatch({
          type: "SELECT_TOOL",
          selectedTool: "create-box"
        });
      },
      pan_tool: function pan_tool() {
        dispatch({
          type: "SELECT_TOOL",
          selectedTool: "pan"
        });
      },
      create_polygon: function create_polygon() {
        dispatch({
          type: "SELECT_TOOL",
          selectedTool: "create-polygon"
        });
      },
      create_pixel: function create_pixel() {
        dispatch({
          type: "SELECT_TOOL",
          selectedTool: "create-pixel"
        });
      },
      save_and_previous_sample: function save_and_previous_sample() {
        dispatch({
          type: "HEADER_BUTTON_CLICKED",
          buttonName: "Prev"
        });
      },
      save_and_next_sample: function save_and_next_sample() {
        dispatch({
          type: "HEADER_BUTTON_CLICKED",
          buttonName: "Next"
        });
      },
      save_and_exit_sample: function save_and_exit_sample() {
        dispatch({
          type: "HEADER_BUTTON_CLICKED",
          buttonName: "Save"
        });
      } // TODO
      // exit_sample: () => {
      //   dispatch({
      //     type: "",
      //   })
      // }

    };
  }, [dispatch]);
  return handlers;
};
export default (function (_ref4) {
  var children = _ref4.children,
      dispatch = _ref4.dispatch;
  var handlers = useDispatchHotkeyHandlers({
    dispatch: dispatch
  });
  return /*#__PURE__*/React.createElement(HotKeys, {
    allowChanges: true,
    handlers: handlers
  }, children);
});