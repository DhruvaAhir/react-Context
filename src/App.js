import { LocalizationProvider } from "@mui/x-date-pickers";
import "./App.css";
import { UserProvider } from "./context/userContext";
import { UserHistoryProvider } from "./context/userHistoryContext";
import AppRoutes from "./routes";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UserProvider>
        <UserHistoryProvider>
          <AppRoutes />
        </UserHistoryProvider>
      </UserProvider>
    </LocalizationProvider>
  );
};

export default App;
