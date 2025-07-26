import React, { Component } from "react";

import {
  AppBar,
  Toolbar,
  Button,
  CssBaseline,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import PropTypes from "prop-types";
import UsersTable from "./users";
import BasicTable from "./tasks";
import AuthService from "../../services/auth.service";

const useStyles = makeStyles((theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Navbar(props) {
  const classes = useStyles();

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleLogout = () => {
    AuthService.logout();
    window.location.reload();
  };
  const t = props.t;

  return (
    <>
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
            {t("admin-dashboard")}
          </Typography>
          <div className={classes.navlinks}>
            <Button onClick={handleLogout} className={classes.link}>
              {t("logout")}
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth="md" style={{ marginTop: 20 }}>
          <Typography component="div" style={{ height: "50vh" }}>
            <div className={classes.root}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="simple tabs example"
                >
                  <Tab label={t("users")} {...a11yProps(0)} />
                  {/*<Tab label={t("tasks")} {...a11yProps(1)} />*/}
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
                <UsersTable t={t}></UsersTable>
              </TabPanel>
            </div>
          </Typography>
        </Container>
      </React.Fragment>
    </>
  );
}

export default class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t: props.t,
    };
  }
  render() {
    return (
      <>
        <Navbar t={this.state.t} />
      </>
    );
  }
}
