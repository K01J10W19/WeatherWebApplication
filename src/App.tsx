import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import CurrentWeather from "./components/cards/CurrentWeather"
import HourlyForecast from "./components/cards/HourlyForecast"
import DailyForecast from "./components/cards/DailyForecast"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { useState } from "react"
import type { Coords } from "./types"


function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 50, lon: 45 })
  const [mapType, setMapType] = useState("clouds_new")

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon })
    // setLocation("custom")
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <Map coords={coordinates} onMapClick={onMapClick} mapType={mapType}/>
        <CurrentWeather coords={coordinates} />
        <HourlyForecast coords={coordinates} />
        <DailyForecast coords={coordinates} />
        <AdditionalInfo coords={coordinates} />
      </div>    
    </>
  )
}

export default App
