import React, { useState, useReducer, useEffect } from "react";
import useEventCallback from "use-event-callback";
import MainLayout from "../MainLayout";
import audioReducer from "./reducers/audio-reducer";
import generalReducer from "./reducers/general-reducer";
import combineReducers from "./reducers/combine-reducers.js";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import makeImmutable, { without } from "seamless-immutable";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import historyHandler from "./reducers/history-handler.js";
import AuthService from "../../../services/auth.service";
import Box from "@material-ui/core/Box";

function Annotator(props) {
  const {
    t,
    rtl,
    onNextAudio,
    sampleIndex,
    onPrevAudio,
    dataLoaded,
    onExit,
    dataCount,
    annotationType,
    selectedAudio = 0,
    audios,
    instructions,
    tags,
  } = props;
  const [app_state_updated, setAppStateUpdated] = useState(0);
  const [currentSampleIndex, setCurrentSampleIndex] = useState(sampleIndex);
  const addCommas = (num) => {
    if (num) {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return num;
  };
  const removeNonNumeric = (num) => {
    if (num) {
      return num.toString().replace(/[^0-9]/g, "");
    }
    return num;
  };

  var _useReducer = useReducer(
      historyHandler(combineReducers(audioReducer, generalReducer)),
      makeImmutable(
        _objectSpread({
          annotationType: annotationType,
          selectedAudio: selectedAudio,
          instructions: instructions,
          audios: audios,
          audioPlaying: false,
          audioStopped: false,
          audioSeekBackward: false,
          audioSeekForward: false,
          transcriptMissing: false,
          tagList: tags,
          dataCount: dataCount,
        })
      )
    ),
    _useReducer2 = _slicedToArray(_useReducer, 2),
    state = _useReducer2[0],
    dispatchToReducer = _useReducer2[1];

  var dispatch = useEventCallback(function(action) {
    if (action.type === "HEADER_BUTTON_CLICKED") {
      if (["exit", "done", "save", "complete"].includes(action.buttonName)) {
        return onExit(without(state, "history"));
      } else if (action.buttonName === "next" && onNextAudio) {
        return onNextAudio(without(state, "history"));
      } else if (action.buttonName === "prev" && onPrevAudio) {
        return onPrevAudio(without(state, "history"));
      }
    }

    dispatchToReducer(action);
  });
  useEffect(
    function() {
      // setAppStateUpdated(currentSampleIndex);
      if (currentSampleIndex === undefined) return;
      dispatchToReducer({
        type: "SELECT_AUDIO",
        audioIndex: 0,
        audio: state.audios[0],
      });
    },
    [currentSampleIndex]
  );
  return (
    <MainLayout
      key={sampleIndex}
      currentSampleIndex={currentSampleIndex}
      titleContent={
        <Box paddingLeft={4}>
          {`${t("sample")} ${addCommas(
            removeNonNumeric(currentSampleIndex + 1)
          )}/${addCommas(removeNonNumeric(props.dataCount))}`}
        </Box>
      }
      t={t}
      rtl={rtl}
      onNext={(result) => {
        let sampleIndex =
          currentSampleIndex < dataCount - 1
            ? currentSampleIndex + 1
            : currentSampleIndex;
        setCurrentSampleIndex(sampleIndex);
        return onExit(
          without({ ...result, currentSampleIndex: sampleIndex }, "history")
        );
      }}
      onPrev={(result) => {
        let sampleIndex = currentSampleIndex > 0 ? currentSampleIndex - 1 : 0;
        setCurrentSampleIndex(sampleIndex);
        return onExit(
          without({ ...result, currentSampleIndex: sampleIndex }, "history")
        );
      }}
      onPageChange={(page) => {
        setCurrentSampleIndex(page - 1);
      }}
      alwaysShowNextButton={Boolean(onNextAudio)}
      alwaysShowPrevButton={Boolean(onPrevAudio)}
      state={state}
      dataLoaded={dataLoaded}
      dispatch={dispatch}
      onLogout={(result) => {
        AuthService.logout();
        window.location.reload();
        console.log(result);
      }}
    ></MainLayout>
  );
}
export default Annotator;
