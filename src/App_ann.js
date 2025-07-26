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
                type: "box",
                x: 0.2746482808082475,
                y: 0.29061700951011077,
                w: 0.11067773730309288,
                h: 0.14009840164948456,
                highlighted: false,
                editingLabels: false,
                color: "#f44336",
                cls: "wearing_headgear",
                id: "6328061624360286",
              },
              {
                type: "box",
                x: 0.3504415161006187,
                y: 0.40839929432594585,
                w: 0.04976295226589694,
                h: 0.06814386256230931,
                highlighted: false,
                editingLabels: false,
                color: "#689f38",
                cls: "not_wearing_face_mask",
                id: "08026521271976517",
              },
              {
                type: "box",
                x: 0.36319472823621646,
                y: 0.44710477933621556,
                w: 0.05734467066455906,
                h: 0.0861058534281472,
                highlighted: false,
                editingLabels: false,
                color: "#ef6c00",
                cls: "not_wearing_hand_gloves",
                id: "6580277572210751",
              },
              {
                type: "box",
                x: 0.4247441440112254,
                y: 0.620048889633529,
                w: 0.030178004652050616,
                h: 0.06080309085450197,
                highlighted: false,
                editingLabels: false,
                color: "#ef6c00",
                cls: "not_wearing_hand_gloves",
                id: "5091877691530007",
              },
              {
                type: "box",
                x: 0.7727380775257735,
                y: 0.8165475730382165,
                w: 0.07771083216494845,
                h: 0.10572240494845364,
                highlighted: false,
                editingLabels: false,
                color: "#ef6c00",
                cls: "not_wearing_hand_gloves",
                id: "3624030590090619",
              },
              {
                type: "box",
                x: 0.8544621451546396,
                y: 0.8103858377804853,
                w: 0.05691497567010306,
                h: 0.08496708618556703,
                highlighted: false,
                editingLabels: false,
                color: "#ef6c00",
                cls: "not_wearing_hand_gloves",
                id: "25803143538656004",
              },
              {
                type: "box",
                x: 0.854097305567011,
                y: 0.46695017262584665,
                w: 0.050347863092783496,
                h: 0.05707712659793812,
                highlighted: false,
                editingLabels: false,
                color: "#e91e63",
                cls: "not_having_face_mask",
                id: "07540699350679736",
              },
              {
                type: "box",
                x: 0.8322069303092791,
                y: 0.31777131901759903,
                w: 0.08573730309278349,
                h: 0.1109112346391753,
                highlighted: false,
                editingLabels: false,
                color: "#2196f3",
                cls: "not_wearing_headgear",
                id: "5722693245498969",
              },
              {
                type: "box",
                x: 0.9119243802061864,
                y: 0.676124869533063,
                w: 0.0901153781443298,
                h: 0.166691153814433,
                highlighted: false,
                editingLabels: false,
                color: "#2196f3",
                cls: "not_wearing_headgear",
                id: "3807061764970603",
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
        viewOnly: true,
        description: "desc",
        instructions:
          "<p><strong>Image Annotation Project</strong><br />Annotate Each Image from the project using the provided labels</p>",
      });
    } else {
      setData(window.APP_DATA);
      console.log("loaded normal");
    }
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
      url: "/tasks/save_changes/bbox",
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
    <div> loading... </div>
  ) : (
    <AppContext.Provider value={appSettings}>
      <ThemeProvider theme={theme}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" variant="filled">
            {" "}
            {t("data-stored-successfully")}{" "}
          </Alert>{" "}
        </Snackbar>{" "}
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
            viewOnly={data["viewOnly"]}
          ></Validator>{" "}
          <form id="mturk_form"> </form>{" "}
        </LoadingOverlay>{" "}
      </ThemeProvider>{" "}
    </AppContext.Provider>
  );
};
export default App;
