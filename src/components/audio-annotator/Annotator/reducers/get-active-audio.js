import { getIn } from "seamless-immutable";
export default (function(state) {
  var currentAudioIndex = null,
    pathToActiveAudio,
    activeAudio;

  if (state.annotationType === "transcribe") {
    currentAudioIndex = state.selectedAudio;

    if (currentAudioIndex === -1) {
      currentAudioIndex = null;
      activeAudio = null;
    } else {
      pathToActiveAudio = ["audios", currentAudioIndex];
      activeAudio = getIn(state, pathToActiveAudio);
    }
  } else if (state.annotationType === "video") {
    pathToActiveAudio = ["keyframes", state.currentVideoTime || 0];
    activeAudio = getIn(state, pathToActiveAudio) || null;
  }

  return {
    currentAudioIndex: currentAudioIndex,
    pathToActiveAudio: pathToActiveAudio,
    activeAudio: activeAudio,
  };
});
