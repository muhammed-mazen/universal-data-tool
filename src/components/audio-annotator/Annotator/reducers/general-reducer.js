import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
import getActiveAudio from "./get-active-audio";
import { getIn, setIn, updateIn } from "seamless-immutable";

var getRandomId = function getRandomId() {
  return Math.random()
    .toString()
    .split(".")[1];
};

export default (function(state, action) {
  var _getActiveAudio = getActiveAudio(state),
    currentAudioIndex = _getActiveAudio.currentAudioIndex,
    activeAudio = _getActiveAudio.activeAudio;

  var setNewAudio = function setNewAudio(audio, index) {
    var _ref =
        typeof audio === "object"
          ? audio
          : {
              src: audio,
            },
      src = _ref.src;

    return setIn(state, ["selectedAudio"], index);
  };
  switch (action.type) {
    case "@@INIT": {
      return state;
    }
    case "SELECT_AUDIO": {
      return setNewAudio(action.audio, action.audioIndex);
    }
    case "HEADER_BUTTON_CLICKED": {
      var buttonName = action.buttonName.toLowerCase();

      switch (buttonName) {
        case "prev": {
          if (currentAudioIndex === null) return state;
          if (currentAudioIndex === 0) return state;
          return setNewAudio(
            state.audios[currentAudioIndex - 1],
            currentAudioIndex - 1
          );
        }
        case "transcript": {
          var value = action.value;
          if (!value) {
            return setIn(state, ["transcriptMissing"], true);
          } else {
            return setIn(
              setIn(state, ["transcriptMissing"], false),
              ["audios", currentAudioIndex, "transcription"],
              value
            );
          }
        }
        case "next": {
          if (currentAudioIndex === null) return state;
          if (currentAudioIndex === state.audios.length - 1) return state;
          return setNewAudio(
            state.audios[currentAudioIndex + 1],
            currentAudioIndex + 1
          );
        }

        case "clone": {
          if (currentAudioIndex === null) return state;
          if (currentAudioIndex === state.audios.length - 1) return state;
          return setIn(
            setNewAudio(
              state.audios[currentAudioIndex + 1],
              currentAudioIndex + 1
            ),
            ["audios", currentAudioIndex + 1, "regions"],
            activeAudio.regions
          );
        }

        case "settings": {
          return setIn(state, ["settingsOpen"], !state.settingsOpen);
        }
        case "info": {
          return setIn(state, ["infoOpen"], !state.infoOpen);
        }
        case "help": {
          return state;
        }

        case "fullscreen": {
          return setIn(state, ["fullScreen"], true);
        }

        case "exit fullscreen":
        case "window": {
          return setIn(state, ["fullScreen"], false);
        }

        case "hotkeys": {
          return state;
        }

        case "exit":
        case "done": {
          return state;
        }

        default:
          return state;
      }
    }

    case "SELECT_TOOL": {
      if (action.selectedTool === "play") {
        return setIn(state, ["audioPlaying"], !state.audioPlaying);
      } else if (action.selectedTool === "stop") {
        return setIn(state, ["audioStopped"], !state.audioStopped);
      } else if (action.selectedTool === "seekbackward") {
        return setIn(state, ["audioSeekBackward"], !state.audioSeekBackward);
      } else if (action.selectedTool === "seekforward") {
        return setIn(state, ["audioSeekForward"], !state.audioSeekForward);
      }

      state = setIn(state, ["mode"], null);
      return setIn(state, ["selectedTool"], action.selectedTool);
    }
    default:
      break;
  }

  return state;
});
