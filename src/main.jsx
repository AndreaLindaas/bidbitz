import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
ReactDOM.createRoot(document.getElementById("root")).render(
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <App />
  </LocalizationProvider>
);
