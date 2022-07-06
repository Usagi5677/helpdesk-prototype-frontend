import Layout from "./hoc/Layout/Layout";
import "./index.css";
import MyTickets from "./containers/MyTickets/MyTickets";
import ViewTicket from "./containers/ViewTicket/ViewTicket";
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { ApolloProvider, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { apolloClient } from "./api/client";
import jwtDecode from "jwt-decode";
import qs from "qs";
import UserContext from "./contexts/UserContext";
import Users from "./containers/Users/Users";
import Categories from "./containers/Categories/Categories";
import UserGroups from "./containers/UserGroups/UserGroups";
import Knowledgebase from "./containers/Knowledgebase/Knowledgebase";
import ViewKnowledgebase from "./containers/Knowledgebase/ViewKnowledgebase/ViewKnowledgebase";
import AllTickets from "./containers/AllTickets";
import AssignedTickets from "./containers/AssignedTickets";
import FollowingTickets from "./containers/FollowingTickets";
import { message } from "antd";
import { ME_QUERY } from "./api/queries";
import Sites from "./containers/Sites";
import UserRole from "./models/UserRole";
import Site from "./models/Site";

const App = () => {
  {
    const token = localStorage.getItem("helpdesk_token");
    if (token) {
      const prevRoute = localStorage.getItem("prevRoute");
      if (prevRoute) {
        localStorage.removeItem("prevRoute");
        window.location.pathname = prevRoute;
      }
    }
  }

  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);

  const [me] = useLazyQuery(ME_QUERY, {
    client: apolloClient,
    onCompleted: (data) => {
      const sites: Site[] = data.me.sites;
      const adminAccess: Site[] = data.me.isSuperAdmin
        ? sites
        : data.me.roles
            .filter((role: UserRole) => role.role === "Admin")
            .map((role: UserRole) =>
              sites.find((site: Site) => site.id === role.site.id)
            );
      const agentAccess: Site[] = data.me.roles
        .filter((role: UserRole) => role.role === "Agent")
        .map((role: UserRole) =>
          sites.find((site: Site) => site.id === role.site.id)
        );
      const adminOrAgentIds: number[] = [
        ...adminAccess.map((s) => s.id),
        ...agentAccess.map((s) => s.id),
      ];
      const unique = [...new Set(adminOrAgentIds)];
      const adminOrAgentAccess = sites.filter((site) =>
        unique.includes(site.id)
      );
      const siteAccess = {
        admin: adminAccess,
        agent: agentAccess,
        adminOrAgent: adminOrAgentAccess,
      };
      setUser({
        ...data.me,
        siteAccess,
        isAdmin: siteAccess.admin.length > 0,
        isAgent: siteAccess.agent.length > 0,
      });
      setAppLoading(false);
      setLoggedOut(false);
    },
    onError: () => {
      localStorage.setItem("logOutClicked", "true");
      localStorage.removeItem("helpdesk_token");
      setLoggedOut(true);
      setAppLoading(false);
      message.error("An error occurred while logging in.");
    },
  });

  const redirect = () => {
    localStorage.setItem("logOutClicked", "false");
    window.location.href = `https://id.mtcc.com.mv/?returnUrl=${process.env.REACT_APP_RETURN_URL}&type=employee&appId=${process.env.REACT_APP_APP_ID}`;
  };

  const logoutRedirect = () => {
    setPrevRoute();
    window.location.href = `https://id.mtcc.com.mv/logout/?returnUrl=${process.env.REACT_APP_RETURN_URL}&type=employee&appId=${process.env.REACT_APP_APP_ID}`;
  };

  const setPrevRoute = () => {
    const currentPath = window.location.pathname;
    const token = localStorage.getItem("helpdesk_token");
    if (currentPath !== "/" && !token)
      localStorage.setItem("prevRoute", currentPath);
  };

  interface SSOToken {
    id: number;
    type: string;
    iat: number;
    exp: number;
  }

  useEffect(() => {
    const setLogOutStates = () => {
      setPrevRoute();
      setLoggedOut(true);
      setAppLoading(false);
    };
    if (user === null) {
      const token = localStorage.getItem("helpdesk_token");
      if (token) {
        const decoded = jwtDecode<SSOToken>(token);
        if (decoded.id) {
          me();
        } else {
          setLogOutStates();
        }
      } else {
        if (window.location) {
          const tkn = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
          }).token as string;
          if (tkn) {
            localStorage.setItem("helpdesk_token", `${tkn}`);
            const decoded = jwtDecode<SSOToken>(tkn);
            if (decoded.id) {
              me();
            } else {
              setLogOutStates();
            }
          } else {
            setLogOutStates();
          }
        } else {
          setLogOutStates();
        }
      }
    } else {
      setAppLoading(false);
    }
  }, [user, me]);

  const logout = () => {
    localStorage.setItem("logOutClicked", "true");
    localStorage.removeItem("helpdesk_token");
    logoutRedirect();
  };

  if (appLoading) {
    return (
      <div style={{ padding: "40px" }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!appLoading && loggedOut) {
    if (localStorage.getItem("logOutClicked") === "true") {
      return <Login login={redirect} />;
    }
    redirect();
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/all-tickets" element={<AllTickets />} />
            <Route path="/assigned-tickets" element={<AssignedTickets />} />
            <Route path="/following-tickets" element={<FollowingTickets />} />
            <Route path="/ticket/:id" element={<ViewTicket />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
            <Route path="/usergroups" element={<UserGroups />} />
            <Route path="/knowledgebase" element={<Knowledgebase />} />
            <Route path="/knowledgebase/:id" element={<ViewKnowledgebase />} />
            <Route path="/sites" element={<Sites />} />
          </Routes>
        </Layout>
      </ApolloProvider>
    </UserContext.Provider>
  );
};

export default App;
