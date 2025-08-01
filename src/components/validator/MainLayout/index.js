import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { useRef, useCallback } from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import ImageCanvas from "../ImageCanvas";
import styles from "./styles";
import useKey from "use-key-hook";
import classnames from "classnames";
import { useSettings } from "../SettingsProvider";
import SettingsDialog from "../SettingsDialog"; // import Fullscreen from "../Fullscreen"
import InfoDialog from "../InfoDialog";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import getActiveImage from "../Validator/reducers/get-active-image";
import useImpliedVideoRegions from "./use-implied-video-regions";
import { useDispatchHotkeyHandlers } from "../ShortcutsManager";
import { withHotKeys } from "react-hotkeys";
import iconDictionary from "./icon-dictionary";
import KeyframeTimeline from "../KeyframeTimeline";
import Workspace from "../Workspace";
import DebugBox from "../DebugSidebarBox";
import TagsSidebarBox from "../TagsSidebarBox";
import KeyframesSelector from "../KeyframesSelectorSidebarBox";
import TaskDescription from "../TaskDescriptionSidebarBox";
import RegionSelector from "../RegionSelectorSidebarBox";
import ImageSelector from "../ImageSelectorSidebarBox";
import HistorySidebarBox from "../HistorySidebarBox";
import useEventCallback from "use-event-callback";
var emptyArr = [];
var useStyles = makeStyles(styles);
var HotkeyDiv = withHotKeys(function(_ref) {
  var hotKeys = _ref.hotKeys,
    children = _ref.children,
    divRef = _ref.divRef,
    props = _objectWithoutProperties(_ref, ["hotKeys", "children", "divRef"]);

  return /*#__PURE__*/ React.createElement(
    "div",
    Object.assign({}, _objectSpread({}, hotKeys, props), {
      ref: divRef,
    }),
    children
  );
});
var FullScreenContainer = styled("div")({
  width: "100%",
  height: "100%",
  "& .fullscreen": {
    width: "100%",
    height: "100%",
  },
});
export var MainLayout = function MainLayout(_ref2) {
  var state = _ref2.state,
    dispatch = _ref2.dispatch,
    _ref2$alwaysShowNextB = _ref2.alwaysShowNextButton,
    alwaysShowNextButton =
      _ref2$alwaysShowNextB === void 0 ? false : _ref2$alwaysShowNextB,
    _ref2$alwaysShowPrevB = _ref2.alwaysShowPrevButton,
    alwaysShowPrevButton =
      _ref2$alwaysShowPrevB === void 0 ? false : _ref2$alwaysShowPrevB,
    RegionEditLabel = _ref2.RegionEditLabel,
    onRegionClassAdded = _ref2.onRegionClassAdded,
    t = _ref2.t,
    viewOnly = _ref2.viewOnly;
  var classes = useStyles();
  var settings = useSettings();
  var fullScreenHandle = useFullScreenHandle();
  var memoizedActionFns = useRef({});

  var action = function action(type) {
    for (
      var _len = arguments.length,
        params = new Array(_len > 1 ? _len - 1 : 0),
        _key = 1;
      _key < _len;
      _key++
    ) {
      params[_key - 1] = arguments[_key];
    }

    var fnKey = "".concat(type, "(").concat(params.join(","), ")");
    if (memoizedActionFns.current[fnKey])
      return memoizedActionFns.current[fnKey];

    var fn = function fn() {
      for (
        var _len2 = arguments.length, args = new Array(_len2), _key2 = 0;
        _key2 < _len2;
        _key2++
      ) {
        args[_key2] = arguments[_key2];
      }

      return params.length > 0
        ? dispatch(
            _objectSpread(
              {
                type: type,
              },
              params.reduce(function(acc, p, i) {
                return (acc[p] = args[i]), acc;
              }, {})
            )
          )
        : dispatch(
            _objectSpread(
              {
                type: type,
              },
              args[0]
            )
          );
    };

    memoizedActionFns.current[fnKey] = fn;
    return fn;
  };

  var _getActiveImage = getActiveImage(state),
    currentImageIndex = _getActiveImage.currentImageIndex,
    activeImage = _getActiveImage.activeImage;

  var nextImage;

  if (currentImageIndex !== null) {
    nextImage = state.images[currentImageIndex + 1];
  }

  useKey(
    function() {
      return dispatch({
        type: "CANCEL",
      });
    },
    {
      detectKeys: [27],
    }
  );
  var isAVideoFrame = activeImage && activeImage.frameTime !== undefined;
  var innerContainerRef = useRef();
  var hotkeyHandlers = useDispatchHotkeyHandlers({
    dispatch: dispatch,
  });
  var impliedVideoRegions = useImpliedVideoRegions(state);
  var refocusOnMouseEvent = useCallback(function(e) {
    if (!innerContainerRef.current) return;
    if (innerContainerRef.current.contains(document.activeElement)) return;

    if (innerContainerRef.current.contains(e.target)) {
      innerContainerRef.current.focus();
      e.target.focus();
    }
  }, []);
  var canvas = /*#__PURE__*/ React.createElement(
    ImageCanvas,
    Object.assign({}, settings, {
      t: t,
      viewOnly: viewOnly,
      showCrosshairs:
        settings.showCrosshairs &&
        !["select", "pan", "zoom"].includes(state.selectedTool),
      key: state.selectedImage,
      showMask: state.showMask,
      fullImageSegmentationMode: state.fullImageSegmentationMode,
      autoSegmentationOptions: state.autoSegmentationOptions,
      showTags: state.showTags,
      allowedArea: state.allowedArea,
      modifyingAllowedArea: state.selectedTool === "modify-allowed-area",
      regionClsList: state.regionClsList,
      regionTagList: state.regionTagList,
      regions:
        state.annotationType === "image"
          ? activeImage.regions || []
          : impliedVideoRegions,
      realSize: activeImage ? activeImage.realSize : undefined,
      videoPlaying: state.videoPlaying,
      imageSrc: state.annotationType === "image" ? activeImage.src : null,
      videoSrc: state.annotationType === "video" ? state.videoSrc : null,
      pointDistancePrecision: state.pointDistancePrecision,
      createWithPrimary: state.selectedTool.includes("create"),
      dragWithPrimary: state.selectedTool === "pan",
      zoomWithPrimary: state.selectedTool === "zoom",
      showPointDistances: state.showPointDistances,
      videoTime:
        state.annotationType === "image"
          ? state.selectedImageFrameTime
          : state.currentVideoTime,
      keypointDefinitions: state.keypointDefinitions,
      onMouseMove: action("MOUSE_MOVE"),
      onMouseDown: action("MOUSE_DOWN"),
      onMouseUp: action("MOUSE_UP"),
      onChangeRegion: action("CHANGE_REGION", "region"),
      onBeginRegionEdit: action("OPEN_REGION_EDITOR", "region"),
      onCloseRegionEdit: action("CLOSE_REGION_EDITOR", "region"),
      onDeleteRegion: action("DELETE_REGION", "region"),
      onBeginBoxTransform: action("BEGIN_BOX_TRANSFORM", "box", "directions"),
      onBeginMovePolygonPoint: action(
        "BEGIN_MOVE_POLYGON_POINT",
        "polygon",
        "pointIndex"
      ),
      onBeginMoveKeypoint: action(
        "BEGIN_MOVE_KEYPOINT",
        "region",
        "keypointId"
      ),
      onAddPolygonPoint: action(
        "ADD_POLYGON_POINT",
        "polygon",
        "point",
        "pointIndex"
      ),
      showHighlightBox: true,
      onSelectRegion: action("SELECT_REGION", "region"),
      onBeginMovePoint: action("BEGIN_MOVE_POINT", "point"),
      onImageLoaded: action("IMAGE_LOADED", "image"),
      RegionEditLabel: RegionEditLabel,
      onImageOrVideoLoaded: action("IMAGE_OR_VIDEO_LOADED", "metadata"),
      onChangeVideoTime: action("CHANGE_VIDEO_TIME", "newTime"),
      onChangeVideoPlaying: action("CHANGE_VIDEO_PLAYING", "isPlaying"),
      onRegionClassAdded: onRegionClassAdded,
    })
  );
  var onClickIconSidebarItem = useEventCallback(function(item) {
    dispatch({
      type: "SELECT_TOOL",
      selectedTool: item.name,
    });
  });
  var onClickHeaderItem = useEventCallback(function(item) {
    if (item.name === "fullscreen") {
      fullScreenHandle.enter();
    } else if (item.name === "window") {
      fullScreenHandle.exit();
    }

    dispatch({
      type: "HEADER_BUTTON_CLICKED",
      buttonName: item.name,
    });
  });
  var debugModeOn = Boolean(window.localStorage.$ANNOTATE_DEBUG_MODE && state);
  var nextImageHasRegions =
    !nextImage || (nextImage.regions && nextImage.regions.length > 0);
  return /*#__PURE__*/ React.createElement(
    FullScreenContainer,
    null,
    /*#__PURE__*/ React.createElement(
      FullScreen,
      {
        handle: fullScreenHandle,
        onChange: function onChange(open) {
          if (!open) {
            fullScreenHandle.exit();
            action("HEADER_BUTTON_CLICKED", "buttonName")("Window");
          }
        },
      },
      /*#__PURE__*/ React.createElement(
        HotkeyDiv,
        {
          tabIndex: -1,
          divRef: innerContainerRef,
          onMouseDown: refocusOnMouseEvent,
          onMouseOver: refocusOnMouseEvent,
          allowChanges: true,
          handlers: hotkeyHandlers,
          className: classnames(
            classes.container,
            state.fullScreen && "Fullscreen"
          ),
        },
        /*#__PURE__*/ React.createElement(
          Workspace,
          {
            allowFullscreen: true,
            iconDictionary: iconDictionary,
            headerLeftSide: [
              state.annotationType === "video"
                ? /*#__PURE__*/ React.createElement(KeyframeTimeline, {
                    currentTime: state.currentVideoTime,
                    duration: state.videoDuration,
                    onChangeCurrentTime: action("CHANGE_VIDEO_TIME", "newTime"),
                    keyframes: state.keyframes,
                  })
                : activeImage
                ? /*#__PURE__*/ React.createElement(
                    "div",
                    {
                      className: classes.headerTitle,
                    },
                    activeImage.name
                  )
                : null,
            ].filter(Boolean),
            headerItems: [
              {
                name: "prev",
                text: t("prev"),
              },
              {
                name: "next",
                text: t("next"),
              },
              !viewOnly && {
                name: "validate",
                text: t("validate"),
              },
              state.fullScreen
                ? {
                    name: "window",
                    text: t("window"),
                  }
                : {
                    name: "fullscreen",
                    text: t("fullscreen"),
                  },

              {
                name: "info",
                text: t("info"),
              },
              !viewOnly && {
                name: "save",
                text: t("save"),
              },
            ].filter(Boolean),
            onClickHeaderItem: onClickHeaderItem,
            onClickIconSidebarItem: onClickIconSidebarItem,
            selectedTools: [
              state.selectedTool,
              state.showTags && "show-tags",
              state.showMask && "show-mask",
            ].filter(Boolean),
            iconSidebarItems: [
              {
                name: "select",
                helperText: t("select"),
                alwaysShowing: true,
              },
              {
                name: "pan",
                helperText: t("drag-pan"),
                alwaysShowing: true,
              },
              {
                name: "zoom",
                helperText: t("zoom-in-out"),
                alwaysShowing: true,
              },
              {
                name: "show-tags",
                helperText: t("show-hide-tags"),
                alwaysShowing: true,
              },
              {
                name: "create-point",
                helperText: t("add-point"),
              },
              {
                name: "create-box",
                helperText: t("add-bounding-box"),
              },
              {
                name: "create-polygon",
                helperText: t("add-polygon"),
              },
              {
                name: "create-expanding-line",
                helperText: t("add-expanding-line"),
              },
              {
                name: "create-keypoints",
                helperText: t("add-keypoints-pose"),
              },
              state.fullImageSegmentationMode && {
                name: "show-mask",
                alwaysShowing: true,
                helperText: t("show-hide-mask"),
              },
              {
                name: "modify-allowed-area",
                helperText: t("modify-allowed-area"),
              },
            ]
              .filter(Boolean)
              .filter(function(a) {
                return a.alwaysShowing || state.enabledTools.includes(a.name);
              }),
            rightSidebarItems: [
              debugModeOn &&
                /*#__PURE__*/ React.createElement(DebugBox, {
                  state: debugModeOn,
                  lastAction: state.lastAction,
                }),
              state.taskDescription &&
                /*#__PURE__*/ React.createElement(TaskDescription, {
                  description: state.taskDescription,
                  t: t,
                }),
              state.labelImages &&
                /*#__PURE__*/ React.createElement(TagsSidebarBox, {
                  currentImage: activeImage,
                  imageClsList: state.imageClsList,
                  imageTagList: state.imageTagList,
                  t: t,
                  onChangeImage: action("CHANGE_IMAGE", "delta"),
                  expandedByDefault: true,
                }),
              /*#__PURE__*/
              // (state.images?.length || 0) > 1 && (
              //   <ImageSelector
              //     onSelect={action("SELECT_REGION", "region")}
              //     images={state.images}
              //   />
              // ),
              React.createElement(RegionSelector, {
                regions: activeImage ? activeImage.regions : emptyArr,
                t: t,
                onSelectRegion: action("SELECT_REGION", "region"),
                onDeleteRegion: action("DELETE_REGION", "region"),
                onChangeRegion: action("CHANGE_REGION", "region"),
              }),
              state.keyframes &&
                /*#__PURE__*/ React.createElement(KeyframesSelector, {
                  onChangeVideoTime: action("CHANGE_VIDEO_TIME", "newTime"),
                  onDeleteKeyframe: action("DELETE_KEYFRAME", "time"),
                  onChangeCurrentTime: action("CHANGE_VIDEO_TIME", "newTime"),
                  currentTime: state.currentVideoTime,
                  duration: state.videoDuration,
                  keyframes: state.keyframes,
                }),
              /*#__PURE__*/ React.createElement(HistorySidebarBox, {
                history: state.history,
                t: t,
                onRestoreHistory: action("RESTORE_HISTORY"),
              }),
            ].filter(Boolean),
          },
          canvas
        ),
        /*#__PURE__*/ React.createElement(SettingsDialog, {
          open: state.settingsOpen,
          t: t,
          onClose: function onClose() {
            return dispatch({
              type: "HEADER_BUTTON_CLICKED",
              buttonName: "settings",
            });
          },
        }),
        /*#__PURE__*/ React.createElement(InfoDialog, {
          open: state.infoOpen,
          t: t,
          text: state.taskInstructions,
          onClose: function onClose() {
            return dispatch({
              type: "HEADER_BUTTON_CLICKED",
              buttonName: "info",
            });
          },
        })
      )
    )
  );
};
export default MainLayout;
