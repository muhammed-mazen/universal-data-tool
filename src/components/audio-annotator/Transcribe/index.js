import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useEffect,
} from "react";

import LinearProgress from "@material-ui/core/LinearProgress";

import { WaveSurfer, WaveForm } from "wavesurfer-react";
import { Paper } from "@material-ui/core";
import TimelinePlugin from "wavesurfer.js/dist/plugin/wavesurfer.timeline.min";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import UserService from "../../../services/user.service";
import ToggleButton from "@material-ui/lab/ToggleButton";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  progress: {
    width: "100%",
  },
  buttonNormal: {
    backgroundColor: "#f5f5f5",
    color: "#000",
    "&:hover": {
      backgroundColor: "#f5f5f5",
      color: "#000",
    },
  },
  buttonSelected: {
    backgroundColor: "#ff0000",
    color: "white",
    border: `1px solid ${theme.palette.divider}`,
  },
  paper: {
    padding: theme.spacing(2, 2, 2),
    direction: "rtl",
  },
  tagsRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  tagsTitle: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  wavesurfer: {
    marginBottom: theme.spacing(15),
  },
}));
function Transcribe(props) {
  const {
    onPlayAudio,
    dataLoaded,
    audioFile,
    audioPlaying,
    audioStopped,
    audioSeekBackward,
    audioSeekForward,
    t,
    rtl,
    tagList,
    transcriptMissing,
    onTranscribed,
  } = props;
  const [timelineVis, setTimelineVis] = useState(true);
  const [loading, setLoading] = useState(true);

  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const [tags, setTags] = React.useState(tagList);
  const [selectedTags, setSelectedTags] = React.useState([]);

  const [value, setValue] = React.useState(audioFile.transcription);

  const handleTags = (event, newTags) => {
    setTags(newTags);
  };

  const handleTagSelection = (event, newSelectedTags) => {
    setSelectedTags(newSelectedTags);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
    onTranscribed(event.target.value);
  };
  const wavesurferRef = useRef();

  useEffect(() => {
    wavesurferRef.current.playPause();
  }, [audioPlaying]);

  useEffect(() => {
    if (window && window.surferidze) {
      window.surferidze.stop();
    }
    wavesurferRef.current.stop();
  }, [audioFile]);

  useEffect(() => {
    wavesurferRef.current.stop();
  }, [audioStopped]);
  useEffect(() => {
    wavesurferRef.current.skipBackward(5);
  }, [audioSeekBackward]);
  useEffect(() => {
    wavesurferRef.current.skipForward(5);
  }, [audioSeekForward]);

  const plugins = useMemo(() => {
    return [
      timelineVis && {
        plugin: TimelinePlugin,
        options: {
          container: "#timeline",
        },
      },
    ].filter(Boolean);
  }, [timelineVis]);
  const options = useMemo(() => {
    return {
      waveColor: "#D8D8D8",
      progressColor: "#ED2784",
      barRadius: 3,
      cursorColor: "transparent",
      responsive: true,
      xhr: {
        cache: "default",
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: [
          { key: "cache-control", value: "no-cache" },
          { key: "pragma", value: "no-cache" },
        ],
      },
    };
  }, [plugins]);
  const handleWSMount = function mount(waveSurfer) {
    if (waveSurfer.markers) {
      waveSurfer.clearMarkers();
    }

    wavesurferRef.current = waveSurfer;
  };

  useEffect(() => {
    if (wavesurferRef.current) {
      console.log(audioFile.file_path);
      UserService.getFile(audioFile.file_path).then((res) => {
        wavesurferRef.current.load(res.data);

        wavesurferRef.current.on("loading", (percent) => {
          console.log("loading --> ", percent);
          setProgress(percent);
          setBuffer(percent + 10);
          setLoading(false);
        });

        if (window) {
          window.surferidze = wavesurferRef.current;
        }
      });
    }
  }, [dataLoaded]);

  const classes = useStyles();
  return (
    <div>
      <Grid
        container
        spacing={3}
        direction="column"
        justifyContent="space-around"
        alignItems="stretch"
        style={{ minHeight: "15vh" }}
      >
        <Grid item>
          <WaveSurfer {...options} plugins={plugins} onMount={handleWSMount}>
            <WaveForm
              className={classes.wavesurfer}
              id="waveform"
              hideCursor
              cursorColor="transparent"
            ></WaveForm>
            <div id="timeline" />
          </WaveSurfer>
        </Grid>
        {progress < 100 && (
          <Grid item>
            <div className={classes.progress}>
              <LinearProgress
                variant="buffer"
                value={progress}
                valueBuffer={buffer}
              />
            </div>
          </Grid>
        )}
        {tagList && (
          <div>
            <Grid item>
              <p className={classes.tagsTitle}> {t("additional-attributes")}</p>
            </Grid>
            <Grid item>
              <div className={classes.tagsRoot}>
                {tags &&
                  tags.map((tag) => (
                    <ToggleButton
                      value={tag}
                      area-label={tag}
                      selected={selectedTags.indexOf(tag) > -1}
                      onChange={() => {
                        if (selectedTags.includes(tag)) {
                          setSelectedTags(
                            selectedTags.filter((item) => item !== tag)
                          );
                        } else {
                          setSelectedTags([...selectedTags, tag]);
                        }
                      }}
                      className={
                        selectedTags.indexOf(tag) > -1
                          ? classes.buttonSelected
                          : classes.buttonNormal
                      }
                    >
                      {tag} {selectedTags.indexOf(tag) > -1 && <CheckIcon />}
                    </ToggleButton>
                  ))}
              </div>
            </Grid>
          </div>
        )}

        <Grid item>
          <Paper elevation={3} className={classes.paper}>
            <form noValidate autoComplete="off">
              <TextField
                id="outlined-multiline-static"
                label={
                  transcriptMissing
                    ? t("transcription-missing")
                    : t("transcribe")
                }
                multiline
                fullWidth
                rows={4}
                variant="outlined"
                value={value}
                error={transcriptMissing}
                onChange={handleChange}
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
export default Transcribe;
