
import Layout from "./hoc/Layout/Layout"
import "./index.css";
import MyTickets from "./containers/MyTickets/MyTickets"
const App = () => {
  
  return (
    <div>
      <Layout>
        <MyTickets></MyTickets>
      </Layout>
    </div>
  );
};

export default App;
