import "./App.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { AxiosProvider } from "./components/Context/AuthContext/SimpleAxiosContextWithAuth";
import { AuthProvider } from "./components/Context/AuthContext/SimpleAuthProvider";

function App() {
  return (
    <AxiosProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter></AppRouter>
        </BrowserRouter>
      </AuthProvider>
    </AxiosProvider>
  );
}

export default App;
