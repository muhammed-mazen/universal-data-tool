import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import React, { useEffect, useRef, useCallback } from "react";
import { makeStyles, styled } from "@material-ui/core/styles";
import styles from "./styles";
import useKey from "use-key-hook";
import classnames from "classnames";
import SettingsDialog from "../SettingsDialog"; // import Fullscreen from "../Fullscreen"
import Regions from "../Regions";
import Transcribe from "../Transcribe";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import getActiveAudio from "../Annotator/reducers/get-active-audio";
import { useDispatchHotkeyHandlers } from "../ShortcutsManager";
import { withHotKeys } from "react-hotkeys";
import iconDictionary from "./icon-dictionary";
import Workspace from "../Workspace";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import useEventCallback from "use-event-callback";
import InfoDialog from "../InfoDialog";
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
    t = _ref2.t,
    titleContent =
      state.audios && state.audios.length > 0
        ? _ref2.titleContent
        : t("no-audio"),
    onNext = _ref2.onNext,
    onPrev = _ref2.onPrev,
    dataLoaded = _ref2.dataLoaded,
    dispatch = _ref2.dispatch,
    onPageChange = _ref2.onPageChange,
    onLogout = _ref2.onLogout,
    rtl = _ref2.rtl,
    currentSampleIndex = _ref2.currentSampleIndex,
    viewOnly = _ref2.viewOnly;
  var classes = useStyles();
  var fullScreenHandle = useFullScreenHandle();
  var memoizedActionFns = useRef({});

  const [openMissing, setOpenMissing] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenMissing(false);
  };
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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

  var _getActiveAudio = getActiveAudio(state),
    currentAudioIndex = _getActiveAudio.currentAudioIndex,
    activeAudio = _getActiveAudio.activeAudio;

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
  var innerContainerRef = useRef();
  var hotkeyHandlers = useDispatchHotkeyHandlers({
    dispatch: dispatch,
  });

  var refocusOnMouseEvent = useCallback(function(e) {
    if (!innerContainerRef.current) return;
    if (innerContainerRef.current.contains(document.activeElement)) return;

    if (innerContainerRef.current.contains(e.target)) {
      innerContainerRef.current.focus();
      e.target.focus();
    }
  }, []);
  var onTranscribe = useEventCallback(function(transcript) {
    dispatch({
      type: "HEADER_BUTTON_CLICKED",
      buttonName: "transcript",
      value: transcript,
    });
  });
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
    } else if (item.name === "logout") {
      onLogout();
    }
    if (["next", "prev", "done", "exit", "save"].includes(item.name)) {
      if (item.name === "next") {
        if (
          state.transcriptMissing ||
          state.audios[currentAudioIndex].transcription === ""
        ) {
          setOpenMissing(true);
          return;
        }
        onNext(state);
      } else if (item.name === "prev") {
        onPrev(state);
      }
    }
    dispatch({
      type: "HEADER_BUTTON_CLICKED",
      buttonName: item.name,
    });
  });

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
            headerLeftSide: titleContent,
            headerItems: [
              {
                name: "prev",
                text: t("prev"),
              },
              {
                name: "next",
                text: t("next"),
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
              {
                name: "settings",
                text: t("settings"),
              },
              {
                name: "logout",
                text: t("logout"),
              },
              {
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
                name: "play",
                helperText: t("play"),
                alwaysShowing: true,
              },
              {
                name: "stop",
                helperText: t("stop"),
                alwaysShowing: true,
              },
              {
                name: "seekbackward",
                helperText: t("seek-backward"),
                alwaysShowing: true,
              },
              {
                name: "seekforward",
                helperText: t("seek-forward"),
                alwaysShowing: true,
              },
            ]
              .filter(Boolean)
              .filter(function(a) {
                return a.alwaysShowing || state.enabledTools.includes(a.name);
              }),
          },
          state.audios && state.audios.length > 0 ? (
            state.annotationType === "regions" ? (
              <Regions></Regions>
            ) : (
              <Transcribe
                key={currentSampleIndex}
                audioFile={state.audios[0]}
                audioPlaying={state.audioPlaying}
                audioStopped={state.audioStopped}
                audioSeekBackward={state.audioSeekBackward}
                audioSeekForward={state.audioSeekForward}
                onTranscribed={onTranscribe}
                transcriptMissing={state.transcriptMissing}
                tagList={state.tagList}
                t={t}
                dataLoaded={dataLoaded}
                rtl={rtl}
              ></Transcribe>
            )
          ) : (
            <div className={classes.noAudio}>
              <div className={classes.noAudioText}>{t("no-audio")}</div>
            </div>
          )
        ),
        /*#__PURE__*/ React.createElement(SettingsDialog, {
          open: state.settingsOpen,
          t: t,
          currentPage: currentAudioIndex + 1,
          maxPages: state.dataCount,
          onChange: function onChange(index) {
            onPageChange(index);
          },
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
          text: state.instructions,
          onClose: function onClose() {
            return dispatch({
              type: "HEADER_BUTTON_CLICKED",
              buttonName: "info",
            });
          },
        }),
        /*#__PURE__*/ React.createElement(
          Snackbar,
          {
            open: openMissing,
            autoHideDuration: 5000,
            onClose: handleClose,
          },
          /*#__PURE__*/ React.createElement(
            Alert,
            {
              onClose: handleClose,
              severity: "error",
            },
            t("missing-transcript")
          )
        )
      )
    )
  );
};
export default MainLayout;
