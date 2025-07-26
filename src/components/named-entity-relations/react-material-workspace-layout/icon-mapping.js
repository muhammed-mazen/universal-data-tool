import BackIcon from "@material-ui/icons/KeyboardArrowLeft"
import NextIcon from "@material-ui/icons/KeyboardArrowRight"
import PlayIcon from "@material-ui/icons/PlayArrow"
import PauseIcon from "@material-ui/icons/Pause"
import LockOutlined from "@material-ui/icons/LockOutlined"
import SettingsIcon from "@material-ui/icons/Settings"
import HelpIcon from "@material-ui/icons/Help"
import FullscreenIcon from "@material-ui/icons/Fullscreen"
import ExitIcon from "@material-ui/icons/ExitToApp"
import QueuePlayNextIcon from "@material-ui/icons/QueuePlayNext"
import HotkeysIcon from "@material-ui/icons/Keyboard"
import InfoIcon from "@material-ui/icons/InfoOutlined"

export var iconMapping = {
  back: BackIcon,
  prev: BackIcon,
  info: InfoIcon,
  prevrtl: NextIcon,
  previous: BackIcon,
  next: NextIcon,
  nextrtl: BackIcon,
  forward: NextIcon,
  play: PlayIcon,
  pause: PauseIcon,
  settings: SettingsIcon,
  options: SettingsIcon,
  help: HelpIcon,
  fullscreen: FullscreenIcon,
  exit: ExitIcon,
  quit: ExitIcon,
  save: ExitIcon,
  done: ExitIcon,
  logout: LockOutlined,
  clone: QueuePlayNextIcon,
  hotkeys: HotkeysIcon,
  shortcuts: HotkeysIcon
}
export default iconMapping
