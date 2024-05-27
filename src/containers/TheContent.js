import React, { Suspense, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Redirect,
  Route,
  Switch,
  useLocation,
  useHistory,
} from "react-router-dom";
import { CContainer, CFade } from "@coreui/react";

// routes config
import routes from "../routes";
import { setUser, setRoles, setModules } from "../redux/actions";
import http from "../config";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const TheContent = (props) => {
  const [apicheck, setApicheck] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const route = ["/login", "/forgot-password", "/register", "/reset-password"];
  let isMount = false;

  const basicModules = async () => {
    try {
      let result = await http.get("/commons/basic-modules");
      const { roles, user, modules } = result.data;
      props.setUser(user);
      props.setRoles(roles);
      props.setModules(modules);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    //basicModules();
  }, []);

  useEffect(() => {
    if (!apicheck && route.indexOf(history.location.pathname) === -1)
      //checkApi()
      return () => {
        isMount = true;
      };
  }, [location]);

  const checkApi = async () => {
    try {
      setApicheck(true);
      let r = await http.get("/auth/check-authentication");
      if (r.data.authenticated && route.indexOf(history.location.pathname) > -1)
        history.push("/dashboard");
      if (!isMount) {
        setApicheck(false);
      }
    } catch (err) {
      if (err.response.status === 401) history.push("/login");

      if (!isMount) {
        setApicheck(false);
      }
    }
  };
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <Switch>
            {routes.map((route, idx) => {
              return (
                route.component && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    render={(props) => (
                      <CFade>
                        <route.component {...props} />
                      </CFade>
                    )}
                  />
                )
              );
            })}
            <Redirect from="/" to="/dashboard" />
          </Switch>
        </Suspense>
      </CContainer>
    </main>
  );
};
const mapStateToProps = (state) => ({});
export default connect(mapStateToProps, { setUser, setRoles, setModules })(
  React.memo(TheContent)
);
