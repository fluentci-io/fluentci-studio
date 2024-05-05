import React from "react";
import ReactDOM from "react-dom/client";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { RecoilRoot } from "recoil";
import { theme } from "./Themes/index.tsx";
import { BaseProvider } from "baseui";
import App from "./App.tsx";
import "./index.css";
import ApolloProvider from "./Providers/ApolloProvider.tsx";
import { DebugObserver } from "./recoil.tsx";

const engine = new Styletron();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyletronProvider value={engine}>
      <BaseProvider theme={theme}>
        <RecoilRoot>
          <DebugObserver />
          <ApolloProvider>
            <App />
          </ApolloProvider>
        </RecoilRoot>
      </BaseProvider>
    </StyletronProvider>
  </React.StrictMode>
);
