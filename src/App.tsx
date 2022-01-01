
import Layout from "./hoc/Layout/Layout"
import "./index.css";
import MyTickets from "./containers/MyTickets/MyTickets";
import CreateTicket from "./containers/CreateTicket/CreateTicket";
import ViewTicket from "./containers/ViewTicket/ViewTicket";
import Login from "./containers/Login/Login";
const App = () => {
  
  return (
    <div>
      <Layout>
        <ViewTicket/>
      </Layout>
        
      
    </div>
  );
};

export default App;
