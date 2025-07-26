import React, { useState, useEffect, useReducer } from "react";
import Annotator from "./components/annotator/Annotator";
import Validator from "./components/validator/Validator";
import Survey from "./components/survey/Survey";
import TextEntityRelations from "./components/named-entity-relations/TextEntityRelations";
import useEventCallback from "use-event-callback";
import i18n from "i18next";
import { Alert, AlertTitle } from "@material-ui/lab";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import { useTranslation, initReactI18next } from "react-i18next";
import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";

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
  useEffect(() => {
    console.log(window.APP_DATA);

    if (!window.APP_DATA) {
      console.log("loaded demo");
      setData({
        categories: ["Class 1", "Class 2", "Class 3"],
        images: [
          {
            src: "https://placekitten.com/408/257",
            name: "الصورة 2",

            regions: [
              {
                type: "polygon",
                points: [
                  [0.05856363902892185, 0.5369153586971699],
                  [0.04387935121688073, 0.5369153586971699],
                  [0.03506877852965606, 0.5236994996663329],
                  [0.030663492186043726, 0.48184927940201566],
                  [0.055626781466513626, 0.4422017023095047],
                  [0.09233750099661642, 0.4102633763183152],
                  [0.13418772126093362, 0.3998008212522359],
                  [0.17310108396284257, 0.3970475172874782],
                  [0.20393808836812893, 0.4168713058337337],
                  [0.2193565905707721, 0.44054971993065006],
                  [0.21715394739896593, 0.4873558873315311],
                  [0.2024696595869248, 0.5275541252169936],
                  [0.17163265518163845, 0.5578404688293285],
                  [0.1444667227293624, 0.5666510415165531],
                  [0.11069286076166782, 0.545175270591443],
                ],
                open: false,
                highlighted: false,
                color: "#f44336",
                cls: "tomato",
                id: "7191800793505827",
                editingLabels: false,
                tags: ["Truncated"],
                valid: true,
              },
            ],
          },
        ],
        label_type: ["Tag 1", "Tag 2", "Tag 3"],
        user_id: 999,
        task_id: 1,
        lang: "en",
      });
    } else {
      setData(window.APP_DATA);
      console.log("loaded normal");
    }
    setLoading(false);
  }, [loading]);
  const { t } = useTranslation();
  const onNER = useEventCallback((...args) => {
    console.log(args);
    onExit(args, null);
  });
  const onExit = useEventCallback((output, nextAction) => {
    let result = {
      /*  images: output["images"], */
      task_type: "ner",
      segments: output,
      task_id: data["task_id"],
      user_id: data["user_id"],
      invalid_only: data["invalid_only"],
    };
    console.log(result);
    axios({
      method: "post",
      url: "/tasks/save_changes/",
      data: result,
      xsrfHeaderName: "X-CSRFToken",
      responseType: "json",
    })
      .then(function(response) {
        setOpen(true);
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
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
    <div>loading...</div>
  ) : (
    <ThemeProvider theme={theme}>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" variant="filled">
          {t("data-stored-successfully")}
        </Alert>
      </Snackbar>
      <Survey t={t} onExit={onNER} />
    </ThemeProvider>
  );
};
export default App;
