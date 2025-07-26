import { setIn } from "seamless-immutable";
import getActiveAudio from "./get-active-audio";
export default (function(state, action) {
  var _getActiveAudio = getActiveAudio(state),
    currentAudioIndex = _getActiveAudio.currentAudioIndex,
    pathToActiveAudio = _getActiveAudio.pathToActiveAudio,
    activeAudio = _getActiveAudio.activeAudio;

  return state;
});
