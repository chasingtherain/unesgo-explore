import { render } from "@testing-library/react";
import { AuthContextProvider } from "../contexts/AuthContext";
import { SiteContextProvider } from "../contexts/SiteContext";
import { BrowserRouter as Router } from "react-router-dom";

const AllTheProviders = ({ children }) => {
    return (
    <Router>
      <SiteContextProvider>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </SiteContextProvider>
    </Router>
    );
  };

const renderWithContext = (ui, options) => render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from "@testing-library/react";

// override render method
export {renderWithContext as render}