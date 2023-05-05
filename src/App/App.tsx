
// completed in approx 2  hours

import React, { useState } from "react";
import { Weather } from "./Weather";
import { ThemeProvider, ThemeContext, lightTheme, darkTheme } from "./ThemeProvider";

import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

const App = () => {
  const [input, setInput] = useState("");
  const [city, setCity] = useState("");




  const handleSearch = () => {
    if (input) {
      setCity(input);
    }
  };

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => (
          <div className={`app ${theme === darkTheme ? "dark" : ""}`}>
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div className="col-lg-8 col-md-10 col-sm-12">
                  <h1 className="text-center mb-5 mt-3">Let's check the weather</h1>
                  <div className="search-container">
                    <input
                      className="form-control"
                      role="search"
                      type="text"
                      placeholder="Enter a city"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                    className="btn btn-primary rounded-pill custom-button"
                    onClick={handleSearch}
                    disabled={!input}
                    style={{ marginLeft: "1rem", marginTop: "1rem" }}
                    >
                    Show Weather
                    </button>
                  </div>
                  <Weather city={city} />
                  <div className="d-flex justify-content-center" style={{ marginTop: "1rem" }}>
                    <button className="btn btn-secondary" onClick={toggleTheme}>
                      {theme === darkTheme ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
  
};

export { App };
