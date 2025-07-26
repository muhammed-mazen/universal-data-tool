import React, { useState, useEffect, useReducer } from "react";
import { FallingLines } from "react-loader-spinner";
import Annotator from "./components/audio-annotator/Annotator";
import Login from "./components/user/login";
import AdminDashboard from "./components/admin-dashboard";
import useEventCallback from "use-event-callback";
import i18n from "i18next";
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import { useTranslation, initReactI18next } from "react-i18next";
import LoadingOverlay from "react-loading-overlay";
import AuthService from "./services/auth.service";
import UserService from "./services/user.service";
import AppContext from "./AppContext";
import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";
import { i18nextPlugin } from "translation-check";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import userService from "./services/user.service";

var theme = createMuiTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
  },
});

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(i18nextPlugin) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      ar: {
        translation: ar,
      },
    },
    lng: window.APP_DATA ? window.APP_DATA["lang"] : "ar",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },
  });
export var App = function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [isActive, setisActive] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState(undefined);
  const [app_state, setAppState] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "30%",
      marginTop: "10%",
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

  const appSettings = {
    loading: isActive,
    setLoading: setisActive,
    token: token,
    setToken: setToken,
    app_state: app_state,
    setAppState: setAppState,
  };
  let loadUserData = (index = -1) => {
    let newData = {
      key: currentIndex,
      name: "New Dataset",
      rtl: true,
      annotationType: "transcribe",
      dataCount: 0,
      audios: [],
      instructions: "",
      sampleIndex: 0,
      tags: [],
    };
    const user = AuthService.getCurrentUser();
    if (user && user.isAdmin) {
      setLoading(false);
    }
    if (user && user.accessToken) {
      console.log(index);
      UserService.getUserTasksFull(index)
        .then((res) => {
          let dataResult = res.data;
          let resultIndex = dataResult.currentIndex;
          setCurrentIndex(resultIndex);
          newData["audios"] = dataResult.data;
          newData["dataCount"] = dataResult.dataCount;
          newData["instructions"] = dataResult.instructions;
          newData["sampleIndex"] = dataResult.currentIndex;
          newData["tags"] = dataResult.tags;
          setData(newData);
          setDataLoaded(!dataLoaded);
          setLoading(false);
        })
        .catch((err) => {
          if (!(user && user.isAdmin)) AuthService.logout();
          setLoading(false);
          //window.location.reload();
        });
    } else {
      if (!(user && user.isAdmin)) AuthService.logout();
      setLoading(false);
      //window.location.reload();
    } ///////////////////////////////////////////////
  };
  useEffect(() => {
    loadUserData();
  }, [loading]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setToken(user.accessToken);
      setUser(user);
    }
  }, [token]);

  const { t } = useTranslation();

  const onExit = useEventCallback((output, nextAction, index) => {
    if (output.audios.length > 0) {
      let currentSampleIndex = output.currentSampleIndex;
      let currentData = output.audios[0];
      UserService.saveUserTasks({
        caseID: currentData.caseID,
        transcription: currentData.transcription,
      }).then((res) => {
        console.log(currentData);
        loadUserData(currentSampleIndex);
      });
    }
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const classes = useStyles();

  return loading ? (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <FallingLines width="110" color="#c8553d" />
        <br />
        <h1>{t("loading")}</h1>
      </div>
    </div>
  ) : user && user.isAdmin ? (
    <AdminDashboard t={t}></AdminDashboard>
  ) : user ? (
    <AppContext.Provider value={appSettings}>
      <ThemeProvider theme={theme}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled">
            {t("data-stored-successfully")}
          </Alert>
        </Snackbar>
        <LoadingOverlay active={isActive} spinner text={t("loading")}>
          {data.audios && data.audios.length > 0 ? (
            <Annotator
              t={t}
              onExit={onExit}
              {...data}
              dataLoaded={dataLoaded}
            ></Annotator>
          ) : (
            <div>
              <Card className={classes.root}>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    <h1>{t("no-data-found")}</h1>
                  </Typography>
                  {t("no-data-found-description")}
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => {
                      const user = AuthService.getCurrentUser();
                      if (!(user && user.isAdmin)) AuthService.logout();
                      window.location.reload();
                    }}
                  >
                    {t("logout")}
                  </Button>
                </CardActions>
              </Card>
            </div>
          )}
        </LoadingOverlay>
      </ThemeProvider>
    </AppContext.Provider>
  ) : (
    <Login t={t}></Login>
  );
};
export default App;
