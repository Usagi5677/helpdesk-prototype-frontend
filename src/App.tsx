// Updated App.tsx - Frontend Changes

import Layout from "./hoc/Layout/Layout";
import "./index.css";
import MyTickets from "./containers/MyTickets/MyTickets";
import ViewTicket from "./containers/ViewTicket/ViewTicket";
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { ApolloProvider, useLazyQuery, gql } from "@apollo/client";
import { useEffect, useState } from "react";
import { apolloClient } from "./api/client";
import jwtDecode from "jwt-decode";
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

// New Auth Mutation for local login
const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const App = () => {
  // Remove the third-party redirect logic
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
      localStorage.removeItem("helpdesk_token");
      setLoggedOut(true);
      setAppLoading(false);
      message.error("An error occurred while logging in.");
    },
  });

  // New login function for local auth
  const handleLogin = (token:any) => {
    localStorage.setItem("helpdesk_token", token);
    me();
  };

  // Simplified logout
  const logout = () => {
    localStorage.removeItem("helpdesk_token");
    setUser(null);
    setLoggedOut(true);
  };

  useEffect(() => {
    const token = localStorage.getItem("helpdesk_token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded) {
          me();
        } else {
          setLoggedOut(true);
          setAppLoading(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("helpdesk_token");
        setLoggedOut(true);
        setAppLoading(false);
      }
    } else {
      setLoggedOut(true);
      setAppLoading(false);
    }
  }, [me]);

  if (appLoading) {
    return (
      <div style={{ padding: "40px" }}>
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!appLoading && loggedOut) {
    return <Login login={handleLogin} />;
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