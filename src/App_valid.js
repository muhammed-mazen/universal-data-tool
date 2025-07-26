import React, { useState, useEffect } from "react";
import Validator from "./components/validator/Validator";
import useEventCallback from "use-event-callback";
import i18n from "i18next";
import { Alert } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import axios from "axios";
import { useTranslation, initReactI18next } from "react-i18next";
import LoadingOverlay from "react-loading-overlay";
import AppContext from "./AppContext";
import en from "./locales/en/translation.json";
import ar from "./locales/ar/translation.json";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";


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
  const [isActive, setisActive] = useState(false);
  const [token, setToken] = useState("");
  const [app_state, setAppState] = useState({});

  const appSettings = {
    loading: isActive,
    setLoading: setisActive,
    token: token,
    setToken: setToken,
    app_state: app_state,
    setAppState: setAppState,
  };
  useEffect(() => {
    console.log(window.APP_DATA);

    if (!window.APP_DATA) {
      console.log("loaded demo");
      setData({
        categories: ["Class 1", "Class 2", "Class 3"],
        images: [
          {
            src:
              "https://cdn.pixabay.com/photo/2018/08/08/05/12/cat-3591348__340.jpg",
            name: "الصورة 2",

            regions: [
              {
                type: "polygon",
                points: [
                  [0.57421875, 0.736171875],
                  [0.56640625, 0.7377708333333334],
                  [0.560546875, 0.7393697916666667],
                  [0.556640625, 0.74096875],
                  [0.544921875, 0.7473645833333333],
                  [0.533203125, 0.755359375],
                  [0.52734375, 0.7585572916666666],
                  [0.5234375, 0.76015625],
                  [0.51953125, 0.7617552083333333],
                  [0.51171875, 0.7633541666666667],
                  [0.49609375, 0.764953125],
                  [0.490234375, 0.7665520833333334],
                  [0.484375, 0.7681510416666667],
                  [0.46875, 0.7729479166666666],
                  [0.455078125, 0.77934375],
                  [0.443359375, 0.7889375],
                  [0.439453125, 0.793734375],
                  [0.43359375, 0.8017291666666667],
                  [0.431640625, 0.8049270833333333],
                  [0.431640625, 0.808125],
                  [0.4296875, 0.8113229166666667],
                  [0.42578125, 0.8161197916666667],
                  [0.421875, 0.8209166666666666],
                  [0.412109375, 0.8289114583333334],
                  [0.40234375, 0.8337083333333334],
                  [0.396484375, 0.8353072916666666],
                  [0.390625, 0.83690625],
                  [0.369140625, 0.841703125],
                  [0.359375, 0.8433020833333333],
                  [0.33203125, 0.8480989583333334],
                  [0.322265625, 0.8496979166666667],
                  [0.3125, 0.8496979166666667],
                  [0.283203125, 0.8544947916666666],
                  [0.275390625, 0.85609375],
                  [0.26953125, 0.8576927083333333],
                  [0.259765625, 0.860890625],
                  [0.25390625, 0.8624895833333334],
                  [0.23046875, 0.880078125],
                  [0.220703125, 0.8880729166666667],
                  [0.21875, 0.8912708333333333],
                  [0.21484375, 0.8960677083333334],
                  [0.212890625, 0.899265625],
                  [0.2109375, 0.9040625],
                  [0.2109375, 0.9104583333333334],
                  [0.21484375, 0.91365625],
                  [0.224609375, 0.9168541666666666],
                  [0.251953125, 0.918453125],
                  [0.263671875, 0.9152552083333333],
                  [0.283203125, 0.9152552083333333],
                  [0.291015625, 0.91365625],
                  [0.296875, 0.9120572916666667],
                  [0.302734375, 0.9104583333333334],
                  [0.3125, 0.9056614583333333],
                  [0.32421875, 0.9056614583333333],
                  [0.33203125, 0.9040625],
                  [0.337890625, 0.9008645833333333],
                  [0.376953125, 0.9008645833333333],
                  [0.384765625, 0.899265625],
                  [0.390625, 0.8976666666666666],
                  [0.39453125, 0.8960677083333334],
                  [0.400390625, 0.8912708333333333],
                  [0.40625, 0.889671875],
                  [0.408203125, 0.8880729166666667],
                  [0.41015625, 0.8832760416666666],
                  [0.419921875, 0.87528125],
                  [0.43359375, 0.8672864583333333],
                  [0.44140625, 0.8640885416666667],
                  [0.455078125, 0.8592916666666667],
                  [0.4609375, 0.85609375],
                  [0.470703125, 0.8480989583333334],
                  [0.478515625, 0.8385052083333333],
                  [0.494140625, 0.8257135416666667],
                  [0.50390625, 0.8193177083333333],
                  [0.5078125, 0.81771875],
                  [0.51171875, 0.8161197916666667],
                  [0.521484375, 0.812921875],
                  [0.52734375, 0.8113229166666667],
                  [0.533203125, 0.8097239583333333],
                  [0.541015625, 0.8097239583333333],
                  [0.54296875, 0.808125],
                  [0.548828125, 0.808125],
                  [0.55078125, 0.8049270833333333],
                  [0.552734375, 0.8001302083333334],
                  [0.552734375, 0.7953333333333333],
                  [0.55859375, 0.7873385416666666],
                  [0.572265625, 0.7585572916666666],
                  [0.57421875, 0.7537604166666667],
                  [0.576171875, 0.7425677083333333],
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
          {
            src:
              "https://www.warrenphotographic.co.uk/photography/bigs/35504-Silver-and-ginger-cats-sitting-together-white-background.jpg",
            name: "الصورة 3",

            regions: [],
          },
          {
            src:
              "https://www.aces.edu/wp-content/uploads/2018/09/Beef-Cattle-2.jpg",
            name: "Image 4",
            regions: [],
          },
          {
            src:
              "https://horsej-intellectsolutio.netdna-ssl.com/cdn/farfuture/SVD1oaF2ITMncqEBjp-F4wIPN3Iqw8M25m7mvjCT1-Q/mtime:1543626961/files/styles/article_large/public/pictures-videos/blogs/shutterstock_250751620_-_grigorita_ko_-_web.jpg?itok=dr2UJXfv",
            name: "Image 5",
            regions: [],
          },
          {
            src:
              "https://modernfarmer.com/wp-content/uploads/2017/12/StCroixHairSheep.jpg",
            name: "Image 6",
            regions: [],
          },
        ],
        label_type: ["Tag 1", "Tag 2", "Tag 3"],
        user_id: 999,
        task_id: 1,
        lang: "en",
        description: "desc",
        instructions:
          "<p><strong>Image Annotation Project</strong><br />Annotate Each Image from the project using the provided labels</p>",
      });
    } else {
      setData(window.APP_DATA);
      console.log("loaded normal");
    }

 
    setLoading(false);
    setToken("52e8c43db5503f67efea9e1043ca3ad9d0c37567");
  }, [loading]);
  const { t } = useTranslation();

  const onExit = useEventCallback((output, nextAction) => {

    let result = {
      images: output["images"],
      task_type: "img",
      task_id: data["task_id"],
      user_id: data["user_id"],
      invalid_only: data["invalid_only"],

    };
    console.log(result);
    axios({
      method: "post",
      url: "/tasks/save_changes/validate",
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

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return loading ? (
    <div>loading...</div>
  ) : (
    <AppContext.Provider value={appSettings}>
      <ThemeProvider theme={theme}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled">
            {t("data-stored-successfully")}
          </Alert>
        </Snackbar>
        <LoadingOverlay active={isActive} spinner text={t("loading")}>
          <Validator
            images={data["images"]}
            t={t}
            onExit={onExit}
            setLoading={setisActive}
            regionClsList={data["categories"]}
            imageTagList={data["label_type"]}
            taskDescription={data["description"]}
            taskInstructions={data["instructions"]}
          ></Validator>
          <form id="mturk_form"></form>
        </LoadingOverlay>
      </ThemeProvider>
    </AppContext.Provider>
  );
};
export default App;
