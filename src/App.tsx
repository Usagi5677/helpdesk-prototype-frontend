import Layout from "./hoc/Layout/Layout";
import "./index.css";
import MyTickets from "./containers/MyTickets/MyTickets";
import CreateTicket from "./containers/CreateTicket/CreateTicket";
import ViewTicket from "./containers/ViewTicket/ViewTicket";
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/my-tickets" element={<MyTickets />}/>
        <Route path="/create-ticket" element={<CreateTicket />}/>
        <Route path="/view-ticket/:id" element={<ViewTicket />}/>
        
      </Routes>
    </Layout>
  );
};

export default App;
