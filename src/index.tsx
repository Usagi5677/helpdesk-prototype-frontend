import ReactDOM from "react-dom";
import Navbar from "./components/navbar/Navbar";
import './index.css';

const App = () => {
    return(
        <div>
            <Navbar></Navbar>
            <h1>Help Desk - Hello world</h1>
        </div>
    )
};

ReactDOM.render(
    <App></App>,
    document.querySelector('#root')
);

