
import Layout from "./hoc/Layout/Layout"
import "./index.css";
import MyTickets from "./containers/MyTickets/MyTickets";
import CreateTicket from "./containers/CreateTicket/CreateTicket";
const App = () => {
  
  return (
    <div>
      <Layout>
        <CreateTicket/>
      </Layout>
    </div>
  );
};

export default App;
