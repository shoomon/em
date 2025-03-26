import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App.tsx"
import "./index.css"

import { getGaDataLayerScript, getGaScript } from "./config/ga"

document.head.appendChild(getGaScript())
document.head.appendChild(getGaDataLayerScript())

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
