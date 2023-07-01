import "./App.css";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {Routes, Route} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar"
import Dashboard from "./scenes/Dashboard"
import Team from "./scenes/team"
import Contacts from "./scenes/contacts"
import Invoices from "./scenes/invoices"
// import Bar from "./scenes/bar"
import Form from "./scenes/form"
// import Line from "./scenes/line"
import FAQ from "./scenes/faq"
import SignUp from "./scenes/global/signup";
import { AuthContextProvider } from "./context/AuthContext";
// import Geography from "./scenes/geography"
import Calendar from "./scenes/calendar"
import Protected from "./components/Protected";
import PieChart from "./scenes/pie";
import ClickableColumnChart from "./scenes/clickableColumnChart";
import Piechartseparate from "./scenes/piechartseparate"
import ClickableColumnChartSeparate from "./scenes/clickableColumnChartSeparate";
  
function App() {
  const [theme, colorMode] = useMode();

  return (
    <AuthContextProvider>

    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path = "/" element= {<Dashboard />} />
              <Route path = "/team" element= {<Protected><Team /></Protected>} />
              <Route path = "/contacts" element= {<Contacts />} />
              <Route path = "/invoices" element= {<Invoices />} />
              <Route path = "/form" element= {<Form />} />
              <Route path = "/signup" element={<SignUp/>} />
              <Route path = "/calendar" element= {<Calendar />} />
              <Route path = "/faq" element= {<FAQ />} />
              <Route path = "/piechartseparate" element= {<Piechartseparate />} />
              <Route path = "/ClickableColumnChartSeparate" element= {<ClickableColumnChartSeparate />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
    </AuthContextProvider>
  );
}

export default App;
