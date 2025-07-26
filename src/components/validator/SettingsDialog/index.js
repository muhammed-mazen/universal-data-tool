import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import Button from "@material-ui/core/Button"
import Survey from "material-survey/components/Survey"
import { useSettings } from "../SettingsProvider"
export var SettingsDialog = function SettingsDialog(_ref) {
  var open = _ref.open,
    t = _ref.t,
    onClose = _ref.onClose
  var settings = useSettings()
  return /*#__PURE__*/ React.createElement(
    Dialog,
    {
      open: open || false,
      onClose: onClose
    },
    /*#__PURE__*/ React.createElement(DialogTitle, null, t("settings")),
    /*#__PURE__*/ React.createElement(
      DialogContent,
      {
        style: {
          minWidth: 400
        }
      },
      /*#__PURE__*/ React.createElement(Survey, {
        variant: "flat",
        noActions: true,
        defaultAnswers: settings,
        onQuestionChange: function onQuestionChange(q, a, answers) {
          return settings.changeSetting(q, a)
        },
        form: {
          questions: [
            {
              type: "boolean",
              title: t("show-crosshairs"),
              name: "showCrosshairs"
            },
            {
              type: "boolean",
              title: t("show-highlight-box"),
              name: "showHighlightBox"
            },
            {
              type: "boolean",
              title: t("wasd-mode"),
              name: "wasdMode"
            },
            {
              type: "dropdown",
              title: t("video-playback-speed"),
              name: "videoPlaybackSpeed",
              defaultValue: "1x",
              choices: ["0.25x", "0.5x", "1x", "2x"]
            }
          ]
        }
      })
    ),
    /*#__PURE__*/ React.createElement(
      DialogActions,
      null,
      /*#__PURE__*/ React.createElement(
        Button,
        {
          onClick: onClose
        },
        t("close")
      )
    )
  )
}
export default SettingsDialog
