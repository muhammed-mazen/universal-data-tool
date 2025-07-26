import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Person from "@material-ui/icons/Person";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import userService from "../../services/user.service";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Switch from "@material-ui/core/Switch";
import Container from "@material-ui/core/Container";
import UserService from "../../services/user.service";
import { DataGrid } from "@material-ui/data-grid";
import EnhancedTable from "./user-list";
import AuthService from "../../services/auth.service";

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

function FolderList(props) {
  const classes = useStyles();
  const t = props.t;
  const [open, setOpen] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [state, setState] = React.useState({
    username: "",
    password: "",
    isPhrase: false,
    errors: {},
  });

  const handleOpen = () => {
    setOpen(true);
  };
  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    console.log(name, value, checked);
    setState((prevState) => ({
      ...prevState,
      [name]: value ? value : checked,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let usernameError = undefined;
    let passwordError = undefined;

    if (/^[a-zA-Z\_0-9]+$/.test(state.username)) {
      if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(state.password)) {
        UserService.addUser(
          state.username,
          state.password,
          state.isPhrase
        ).then((res) => {
          window.location.reload();
        });
      } else {
        passwordError = t(
          "password-must-contain-minimum-eight-characters-at-least-one-letter-and-one-number"
        );
      }
    } else {
      usernameError = t("username-cant-contain-spaces");
    }

    setState((s) => ({
      ...s,
      errors: {
        ...s.errors,
        username: usernameError,
        password: passwordError,
      },
    }));
    console.log(state);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const users = props.users;
  const downloadFile = async (myData) => {
    const fileName = "file";
    const json = JSON.stringify(myData);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExport = async (selected) => {
    console.log(selected);
    setLoading(true);
    setSuccess(false);
    UserService.getUserDataByUsername(
      selected.map((item) => item.username)
    ).then((res) => {
      setLoading(false);
      setSuccess(true);
      downloadFile(res.data);
    });
  };

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <Person />
              </Avatar>
              <Typography component="h1" variant="h5">
                {t("add-user")}
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  onChange={handleChange}
                  label={
                    state.errors.username
                      ? state.errors.username
                      : t("username")
                  }
                  name="username"
                  error={state.errors.username !== undefined}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label={
                    state.errors.password
                      ? state.errors.password
                      : t("password")
                  }
                  error={state.errors.password !== undefined}
                  onChange={handleChange}
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.isPhrase}
                      onChange={handleChange}
                      name="isPhrase"
                    />
                  }
                  label={t("is-phrase-user")}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {t("add-user")}
                </Button>
              </form>
            </div>
          </Container>
        </Fade>
      </Modal>
      <EnhancedTable
        t={t}
        loading={loading}
        success={success}
        setLoading={setLoading}
        setSuccess={setSuccess}
        users={users}
        handleOpen={handleOpen}
        handleExport={handleExport}
      ></EnhancedTable>
    </>
  );
}

export default class UsersTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: props.t,
      loading: true,
    };
    userService.getAllUsers().then((res) => {
      if (!res) {
        AuthService.logout();
        window.location.reload();
      }
      this.setState({
        users: res,
        loading: false,
      });
    });
  }
  render() {
    return this.state.loading ? (
      <div>{this.state.t("loading")}...</div>
    ) : (
      <FolderList t={this.state.t} users={this.state.users}></FolderList>
    );
  }
}
