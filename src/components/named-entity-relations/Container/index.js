import React, { useMemo, useState } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Workspace from "../react-material-workspace-layout/Workspace";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fade from "@material-ui/core/Fade";
import parse from "html-react-parser";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CheckIcon from "@material-ui/icons/Check";
import Grid from "@material-ui/core/Grid";

export default (function(_ref) {
  var children = _ref.children,
    onNext = _ref.onNext,
    onPrev = _ref.onPrev,
    onLogout = _ref.onLogout,
    sampleIndex = _ref.sampleIndex,
    sampleCount = _ref.sampleCount,
    onPageChange = _ref.onPageChange,
    t = _ref.t,
    _ref$currentSampleInd = _ref.currentSampleIndex,
    currentSampleIndex =
      _ref$currentSampleInd === void 0 ? 0 : _ref$currentSampleInd,
    _ref$numberOfSamples = _ref.numberOfSamples,
    numberOfSamples =
      _ref$numberOfSamples === void 0 ? 1 : _ref$numberOfSamples,
    titleContent = _ref.titleContent,
    instructions = _ref.instructions,
    onClickHeaderItem = _ref.onClickHeaderItem;

  var [open, setOpen] = useState(false);
  var [settings, setSettings] = useState(false);
  var [pageNumber, setPageNumber] = useState(sampleIndex + 1);
  const handleChange = (event) => {
    setPageNumber(event.target.value);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      backgroundColor: theme.palette.background.paper,
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1, 1, 1, 1),
      borderRadius: 4,
    },
    dialog: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const settingsDialog = function(className) {
    return (
      <Dialog
        open={open}
        fullWidth
        maxWidth="xs"
        aria-labelledby="form-dialog-title"
        style={{
          direction: _ref.rtl ? "rtl" : "ltr",
        }}
        onClose={() => {
          setSettings(false);
          setOpen(false);
        }}
      >
        <DialogTitle id="form-dialog-title">{t("settings-title")}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t("settings-description")}</DialogContentText>
          <Grid
            container
            spacing={1}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={9}>
              <TextField
                autoFocus
                margin="dense"
                id="page_number"
                label={t("page-number")}
                type="number"
                inputProps={{ min: sampleIndex + 1, max: sampleCount }}
                helperText={
                  t("page-number-helper-text") +
                  " " +
                  (sampleIndex + 1) +
                  "/" +
                  sampleCount
                }
                value={pageNumber}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  onPageChange(pageNumber - 1);
                  setSettings(false);
                  setOpen(false);
                }}
              >
                <CheckIcon />
              </IconButton>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  const infoDialog = function(className) {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        scroll="paper"
        maxWidth="lg"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent dividers>
          <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
            {parse(instructions)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  const handleSettings = () => {
    setSettings(true);
    setOpen(true);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setSettings(false);
    setOpen(false);
  };

  var headerItems = useMemo(
    function() {
      let items = [];

      if (!_ref.rtl) {
        items.push({
          name: "Logout",
          text: t("logout"),
          onClick: onLogout,
        });
        items.push({
          name: "info",
          text: t("info"),
          onClick: handleOpen,
        });
        items.push({
          name: "settings",
          text: t("settings"),
          onClick: handleSettings,
        });
        items.push(
          (currentSampleIndex > 0 || onPrev) && {
            name: "Prev",
            text: t("prev"),
            onClick: onPrev,
          }
        );
        items.push(
          (numberOfSamples > currentSampleIndex + 1 || onNext) && {
            name: "Next",
            text: t("next"),
            onClick: onNext,
          }
        );
        items.push({
          name: "Save",
          text: t("save"),
        });
      } else {
        items.push({
          name: "Save",
          text: t("save"),
        });
        items.push(
          (numberOfSamples > currentSampleIndex + 1 || onNext) && {
            name: "NextRtl",
            text: t("next"),
            onClick: onNext,
          }
        );
        items.push(
          (currentSampleIndex > 0 || onPrev) && {
            name: "PrevRtl",
            text: t("prev"),
            onClick: onPrev,
          }
        );
        items.push({
          name: "info",
          text: t("info"),
          onClick: handleOpen,
        });
        items.push({
          name: "settings",
          text: t("settings"),
          onClick: handleSettings,
        });
        items.push({
          name: "Logout",
          text: t("logout"),
          onClick: onLogout,
        });
      }

      return items.filter(Boolean);
    },
    [currentSampleIndex, numberOfSamples]
  );
  const classes = useStyles();
  var width = window.innerWidth;

  return /*#__PURE__*/ React.createElement(
    Workspace,
    {
      headerLeftSide: /*#__PURE__*/ React.createElement(
        Box,
        {
          paddingLeft: 11,
          paddingBottom: 1,
          marginBottom: 3,
          fontWeight: "bold",

          borderBottom: width && width < 767 ? "1px solid #ccc" : "",
          width: "100%",
        },
        /*#__PURE__*/ React.createElement(
          Typography,
          null,
          titleContent === undefined
            ? ["Sample ", currentSampleIndex + 1, " / ", numberOfSamples]
            : titleContent
        )
      ),
      onClickHeaderItem: onClickHeaderItem,
      headerItems: headerItems,
      iconSidebarItems: [],
      rightSidebarItems: [],
    },
    /*#__PURE__*/ React.createElement(
      Box,
      {
        padding: 2,
      },
      [
        children,
        settings === true
          ? settingsDialog(classes.dialog)
          : infoDialog(classes.dialog),
      ]
    )
  );
});
