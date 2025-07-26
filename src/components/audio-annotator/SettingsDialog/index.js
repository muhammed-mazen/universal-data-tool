import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Survey from "material-survey/components/Survey";
import { useSettings } from "../SettingsProvider";
export var SettingsDialog = function SettingsDialog(_ref) {
  var open = _ref.open,
    t = _ref.t,
    onChange = _ref.onChange,
    currentPage = _ref.currentPage,
    maxPages = _ref.maxPages,
    onClose = _ref.onClose;
  var settings = useSettings();
  return /*#__PURE__*/ React.createElement(
    Dialog,
    {
      open: open || false,
      onClose: onClose,
    },
    /*#__PURE__*/ React.createElement(DialogTitle, null, t("settings")),
    /*#__PURE__*/ React.createElement(
      DialogContent,
      {
        style: {
          minWidth: 400,
        },
      },
      /*#__PURE__*/ React.createElement(Survey, {
        variant: "flat",
        defaultAnswers: settings,
        onFinish: function onFinish(answers) {
          console.log("answers", answers);
          return onChange(answers.changePage);
        },
        form: {
          questions: [
            {
              type: "slider",
              title: t("change-page"),
              name: "changePage",
              min: 1,
              max: maxPages,
              defaultValue: currentPage,
              unit: "pages",
              step: 1,
            },
          ],
        },
        completeText: t("change-page"),
      })
    ),
    /*#__PURE__*/ React.createElement(
      DialogActions,
      null,
      /*#__PURE__*/ React.createElement(
        Button,
        {
          onClick: onClose,
        },
        t("close")
      )
    )
  );
};
export default SettingsDialog;
