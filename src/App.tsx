import { useQuery } from "@tanstack/react-query"
import { getGeocode, getWeather } from "./api"
import CurrentWeather from "./components/cards/CurrentWeather"
import HourlyForecast from "./components/cards/HourlyForecast"
import DailyForecast from "./components/cards/DailyForecast"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import Map from "./components/Map"
import { useState } from "react"
import type { Coords } from "./types"
import LocationDropdown from "./components/dropdowns/LocationDropdown"
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown"


function App() {
  const [coordinates, setCoords] = useState<Coords>({ lat: 50, lon: 45 })
  const [location, setLocation] = useState("Tokyo")
  const [mapType, setMapType] = useState("clouds_new")

  const { data: geocodeData } = useQuery({
    queryKey: ["geocode", location],
    queryFn: () => getGeocode(location),
  })
  
  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon })
    setLocation("custom")
  }

  const coords =
    location === "custom"
      ? coordinates
      : { lat: geocodeData?.[0].lat ?? 0, lon: geocodeData?.[0].lon ?? 0 }

  return (
    <>
      <div className="flex flex-col gap-8">
        <LocationDropdown location={location} setLocation={setLocation} />
        <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType}/>
        <CurrentWeather coords={coords} />
        <HourlyForecast coords={coords} />
        <DailyForecast coords={coords} />
        <AdditionalInfo coords={coords} />
      </div>    
    </>
  )
}

export default App
