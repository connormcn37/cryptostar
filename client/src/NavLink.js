import React from "react";
import { Link as RouterLink, Route } from "react-router-dom";
import { FontIcon, ListItem } from "react-md";

import { DEBUG } from "./configs/localconfigs";

import { LOG, CLIENT_HOST } from "./api/logremote";
if (DEBUG)
  LOG.log(
    "[" + CLIENT_HOST + "]",
    "0.navlink initiated : ",
    new Date().toISOString()
  );

const NavLink = ({ label, to, exact, icon }) => (
  <Route path={to} exact={exact}>
    {({ match }) => {
      let leftIcon;
      if (icon) {
        leftIcon = <FontIcon>{icon}</FontIcon>;
      }

      return (
        <ListItem
          component={RouterLink}
          active={!!match}
          to={to}
          primaryText={label}
          leftIcon={leftIcon}
        />
      );
    }}
  </Route>
);

export default NavLink;
