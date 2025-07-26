import React, { useState, useEffect, useReducer } from "react";
import Annotator from "./components/annotator/Annotator";
import { FallingLines } from "react-loader-spinner";
import TextEntityRelations from "./components/named-entity-relations/TextEntityRelations";
import Login from "./components/user/login";
import AdminDashboard from "./components/admin-dashboard";
import useEventCallback from "use-event-callback";
import i18n from "i18next";
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import { useTranslation, initReactI18next } from "react-i18next";
import LoadingOverlay from "react-loading-overlay";
import AuthService from "./services/auth.service";
import UserService from "./services/user.service";
import AppContext from "./AppContext";
import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";
import { i18nextPlugin } from "translation-check";

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

  const appSettings = {
    loading: isActive,
    setLoading: setisActive,
    token: token,
    setToken: setToken,
    app_state: app_state,
    setAppState: setAppState,
  };
  let loadUserData = (index = 0) => {
    let samples = [
      {
        _id: "s5ccx3mxu",
        document: "",
      },
    ];
    let labels = [
      {
        id: "",
        displayName: "",
        description: "",
      },
    ];
    let newData = {
      name: "New Dataset",
      key: UserService.generateString(3),
      interface: {
        type: "label-sequence",
        rtl: true,
        entityLabels: [],
        relationLabels: [
          {
            id: "subject",
            displayName: "Subject",
            color: "#c25511",
          },
        ],
      },
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

          newData["interface"]["entityLabels"] = user.isPhrase
            ? dataResult.classes["phrases"]
            : dataResult.classes["words"];
          newData["interface"]["dataCount"] = dataResult.dataCount;
          newData["instructions"] = dataResult.instructions;
          newData["samples"] = [];
          newData["sampleIndex"] = resultIndex;
          dataResult.data.forEach((sample) => {
            let sampleData = {
              _id: UserService.generateString(9),
              caseID: sample["caseID"],
              sentenceID: sample["sentenceID"],
              document: sample["sentenceText"],
              annotation: {
                entities: [],
              },
            };
            sample["entities"].forEach((entity) => {
              sampleData.annotation.entities.push({
                id: entity.textId,
                text: entity.word ? entity.word : entity.phrase,
                start: entity.from_position,
                end: entity.to_position,
                label: entity.label,
              });
            });
            newData["samples"].push(sampleData);
          });
          console.log(resultIndex);
          setData(newData);
          setLoading(false);
        })
        .catch((err) => {
          newData["samples"] = samples;
          newData["interface"]["entityLabels"] = labels;
          AuthService.logout();
          setData(data);
          setLoading(false);
        });
    } else {
      newData["samples"] = samples;
      newData["interface"]["entityLabels"] = labels;
      AuthService.logout();
      setData(data);
      setLoading(false);
    }
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
  const onNER = useEventCallback((...args) => {
    onExit(args, null, null);
  });

  const onExit = useEventCallback((output, nextAction, index) => {
    if (output.length > 0) {
      let currentData = output[0];
      let entities = currentData.entities.map((entity) => {
        return {
          caseID: currentData.caseID,
          sentenceID: currentData.sentenceID,
          from_position: entity.start,
          to_position: entity.end,
          label: entity.label,
          word: entity.text,
          phrase: entity.text,
        };
      });

      UserService.saveUserTasks({
        annotations: entities,
        caseID: currentData.caseID,
        sentenceID: currentData.sentenceID,
      }).then((res) => {
        console.log(currentData);
        loadUserData(currentData.currentSampleIndex);
      });
    }
  });
  const onChange = useEventCallback((...args) => {
    onExit(args, null, null);
  });

  const onPageChange = useEventCallback((index) => {
    loadUserData(index);
  });
  const onValidateAll = useEventCallback((output, nextAction) => {
    let newData = data;
    newData["images"][output.selectedImage].regions.forEach((item) => {
      item.valid = true;
    });
    newData["selectedImage"] = output.selectedImage;
    window.APP_DATA = newData;
    setLoading(true);
  });
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
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
          <TextEntityRelations
            onSaveTaskOutputItem={(...args) => {
              //setLoading(true);
              loadUserData(args[0]);
              console.log(args[0]);
            }}
            {...data}
            t={t}
            onExit={onNER}
            onChange={onChange}
            onPageChange={onPageChange}
          />
        </LoadingOverlay>
      </ThemeProvider>
    </AppContext.Provider>
  ) : (
    <Login t={t}></Login>
  );
};
export default App;
