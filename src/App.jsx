import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import LoginPageComponent from "./pages/LoginPage/LoginPageComponent";
import PreparationPageComponent from "./pages/PreparationPage/PreparationPageComponent";
import GraphsPageComponent from "./pages/GraphsPage/GraphsPageComponent";
import PageNotFound from "./pages/SharedComponents/PageNotFound";
import { ThemeProvider } from "styled-components";
import Theme from "./Theme";
import GlobalStyles from "./styles/Global";
import Footer from "./pages/SharedComponents/Footer";
import { GlobalProvider } from "./pages/contexts/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <ThemeProvider theme={Theme}>
        <GlobalStyles />
        <main className={"main"}>
          <Routes>
            <Route path="/" element={<LoginPageComponent />} />
            <Route
              path="/preparationpage"
              element={<PreparationPageComponent />}
            />
            <Route path="/graphpage" element={<GraphsPageComponent />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
        <footer className={"footer"}>
          <Footer />
        </footer>
      </ThemeProvider>
    </GlobalProvider>
  );
}

export default App;
