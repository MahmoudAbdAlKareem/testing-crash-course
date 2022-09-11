import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Checkout/Login";
import SignUp from "./components/SignUp/SignUp";
import AppContext, { useAppContext } from "./contexts/AppContext";

function Routes() {
  const { isAuthenticated } = useAppContext();
  return (
    <div className="App">{isAuthenticated ? <Checkout /> : <SignUp />}</div>
  );
}

function App() {
  return (
    <div className="App">
      <AppContext>
        <Routes />
      </AppContext>
    </div>
  );
}

export default App;
