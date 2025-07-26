import React, { Component } from "react";

import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AuthService from "../../../services/auth.service";
import Lock from "@material-ui/icons/Lock";
import Avatar from "@material-ui/core/Avatar";
import { Alert, AlertTitle } from "@material-ui/lab";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      username: "",
      usernameMissing: false,
      password: "",
      passwordMissing: false,
      loading: false,
      message: "",
      t: props.t,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true,
    });
    if (this.state.username && this.state.username !== "") {
      if (this.state.password && this.state.password !== "") {
        AuthService.login(this.state.username, this.state.password).then(
          () => {
            window.location.reload();
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();

            this.setState({
              loading: false,
              message: resMessage,
            });
          }
        );
      } else {
        this.setState({ passwordMissing: true, loading: false });
      }
    } else {
      this.setState({ usernameMissing: true, loading: false });
    }
  }
  render() {
    return (
      <>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item md={4}>
            <Card variant="outlined" sx={{ width: 500 }}>
              <CardContent>
                <Box
                  fontWeight="fontWeightMedium"
                  fontSize={30}
                  lineHeight={2}
                  textAlign="center"
                >
                  <Avatar
                    alt="Remy Sharp"
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                  />

                  {this.state.t("login")}
                </Box>
                <Box marginBottom={5}>
                  <TextField
                    id="username"
                    error={this.state.usernameMissing}
                    onChange={this.onChangeUsername}
                    label={
                      this.state.passwordMissing
                        ? this.state.t("enter-username")
                        : this.state.t("username")
                    }
                    variant="outlined"
                  />
                </Box>
                <TextField
                  id="password"
                  error={this.state.passwordMissing}
                  onChange={this.onChangePassword}
                  label={
                    this.state.passwordMissing
                      ? this.state.t("enter-password")
                      : this.state.t("password")
                  }
                  type="password"
                  variant="outlined"
                />
              </CardContent>
              <CardActions>
                <Box alignItems={"center"}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={this.handleLogin}
                    disabled={this.state.loading}
                    startIcon={<Lock />}
                  >
                    {this.state.loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                    )}
                    {this.state.t("Login")}
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
          {this.state.message && (
            <Alert severity="error" marginTop={4}>
              <AlertTitle>{this.state.t("error")}</AlertTitle>
              {this.state.t("login-failed")} —
              <strong>{this.state.message}</strong>
            </Alert>
          )}
        </Grid>
      </>
    );
  }
}
