import BackIcon from "@material-ui/icons/KeyboardArrowLeft";
import NextIcon from "@material-ui/icons/KeyboardArrowRight";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SettingsIcon from "@material-ui/icons/Settings";
import HelpIcon from "@material-ui/icons/Help";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import ExitIcon from "@material-ui/icons/ExitToApp";
import DoneAll from "@material-ui/icons/DoneAll";
import InfoOutlined from "@material-ui/icons/InfoOutlined";
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext";
import HotkeysIcon from "@material-ui/icons/Keyboard";
import StopIcon from "@material-ui/icons/Stop";
import FastForwardIcon from "@material-ui/icons/FastForward";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import lockIcon from "@material-ui/icons/LockOutlined";

export var iconMapping = {
  back: BackIcon,
  prev: BackIcon,
  previous: BackIcon,
  next: NextIcon,
  validate: DoneAll,
  forward: NextIcon,
  play: PlayIcon,
  pause: PauseIcon,
  stop: StopIcon,
  seekbackward: FastRewindIcon,
  seekforward: FastForwardIcon,
  settings: SettingsIcon,
  options: SettingsIcon,
  help: HelpIcon,
  fullscreen: FullscreenIcon,
  exit: ExitIcon,
  quit: ExitIcon,
  save: ExitIcon,
  logout: lockIcon,
  info: InfoOutlined,
  done: ExitIcon,
  clone: QueuePlayNextIcon,
  hotkeys: HotkeysIcon,
  shortcuts: HotkeysIcon,
};
export default iconMapping;
