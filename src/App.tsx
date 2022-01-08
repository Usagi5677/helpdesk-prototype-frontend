
import Layout from "./hoc/Layout/Layout"
import "./index.css";
import MyTickets from "./containers/MyTickets/MyTickets";
import CreateTicket from "./containers/CreateTicket/CreateTicket";
import ViewTicket from "./containers/ViewTicket/ViewTicket";
import Login from "./containers/Login/Login";
import Dashboard from "./containers/Dashboard/Dashboard";

const App = () => {
  
  return (
    <div>
      <Layout>
        <Dashboard/>
      </Layout>
      
    </div>
  );
};

export default App;
