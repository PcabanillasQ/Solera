import React from "react"
import { ServiceProvider } from "./context/services"
import ServicesPage from "./pages/ServicesPage"

function App() {
  return (
    <ServiceProvider>
      <ServicesPage />
    </ServiceProvider>
  )
}

export default App
