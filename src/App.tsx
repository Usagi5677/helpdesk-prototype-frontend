import Layout from "./hoc/Layout/Layout";
import "./index.css";
import MyTickets from "./containers/MyTickets/MyTickets";
import CreateTicket from "./containers/CreateTicket/CreateTicket";
import ViewTicket from "./containers/ViewTicket/ViewTicket";
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";
import { ApolloProvider, gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { apolloClient } from "./api/client";
import jwtDecode from "jwt-decode";
import qs from "qs";
import UserContext from "./contexts/UserContext";
import Users from "./containers/Users/Users";
import Categories from "./containers/Categories/Categories";

const ME_QUERY = gql`
  query {
    me {
      id
      rcno
      fullName
      email
      roles
    }
  }
`;

const App = ({ history }: { history: any }) => {
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [loggedOut, setLoggedOut] = useState(false);

  const [me] = useLazyQuery(ME_QUERY, {
    client: apolloClient,
    onCompleted: (data) => {
      setUser({
        ...data.me,
        isAdmin: data.me.roles.includes("Admin"),
        isAgent: data.me.roles.includes("Agent"),
      });
      setAppLoading(false);
      setLoggedOut(false);
    },
    onError: (error) => {
      localStorage.removeItem("helpdesk_token");
      // history.replace("");
      setLoggedOut(true);
      setAppLoading(false);

      // if (error.message === "Unauthorized") {
      //   message.error("Not authorized to access this app.");
      // } else {
      //   message.error("An error occurred while logging in.");
      // }
    },
  });

  const redirect = () => {
    window.location.href = `https://id.mtcc.com.mv/?returnUrl=${process.env.REACT_APP_RETURN_URL}&type=employee&appId=${process.env.REACT_APP_APP_ID}`;
  };

  const logoutRedirect = () => {
    window.location.href = `https://id.mtcc.com.mv/logout/?returnUrl=${process.env.REACT_APP_RETURN_URL}&type=employee&appId=${process.env.REACT_APP_APP_ID}`;
  };

  interface SSOToken {
    id: number;
    type: string;
    iat: number;
    exp: number;
  }

  useEffect(() => {
    if (user === null) {
      const token = localStorage.getItem("helpdesk_token");
      if (token) {
        const decoded = jwtDecode<SSOToken>(token);
        if (decoded.id) {
          me();
        } else {
          setLoggedOut(true);
          setAppLoading(false);
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
              setLoggedOut(true);
              setAppLoading(false);
            }
          } else {
            setLoggedOut(true);
            setAppLoading(false);
          }
        } else {
          setLoggedOut(true);
          setAppLoading(false);
        }
      }
    } else {
      setAppLoading(false);
    }
  }, [user, me]);

  const logout = () => {
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
    return <Login login={redirect} />;
  }

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/create-ticket" element={<CreateTicket />} />
            <Route path="/view-ticket/:ticketID" element={<ViewTicket />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </Layout>
      </ApolloProvider>
    </UserContext.Provider>
  );
};

export default App;
