import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getGeocode, getWeather } from "./api"
import type { Coords } from "./types"
import CurrentWeather from "./components/cards/CurrentWeather"
import HourlyForecast from "./components/cards/HourlyForecast"
import DailyForecast from "./components/cards/DailyForecast"
import AdditionalInfo from "./components/cards/AdditionalInfo"
import MapLegend from "./components/MapLegend"
import Map from "./components/Map"
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
      <div className="flex flex-col gap-8 pt-4 p-8 xs:pt-8 lg:w-[calc(100dvw-var(--sidebar-width))] 2xl:h-screen 2xl:min-h-[1120px]">
        <div className="flex flex-col gap-4 xs:flex-row xs:gap-8">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold">Location: </h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="text-2xl font-semibold whitespace-nowrap">
              Map Type:{" "}
            </h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
        </div>

        <div className="grid grid-cols-1 2xl:flex-1 2xl:min-h-0 md:grid-cols-2 2xl:grid-cols-4 2xl:grid-rows-4 gap-4">
          <div className="relative h-120 2xl:h-auto col-span-1 md:col-span-2 2xl:col-span-4 2xl:row-span-2 order-1">
            <Map coords={coords} onMapClick={onMapClick} mapType={mapType} />
            <MapLegend mapType={mapType} />
          </div>
          <div className="col-span-1 2xl:row-span-2 order-2">
              <CurrentWeather coords={coords} />
          </div>
          <div className="col-span-1 order-3 2xl:order-4 2xl:row-span-2">
              <DailyForecast coords={coords} />
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-4 2xl:order-3">
              <HourlyForecast coords={coords} />
          </div>
          <div className="col-span-1 md:col-span-2 2xl:row-span-1 order-5">
              <AdditionalInfo coords={coords} />
          </div>
        </div>
      </div>
      {/* <div className="flex flex-col gap-8">
        <LocationDropdown location={location} setLocation={setLocation} />
        <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
        <Map coords={coords} onMapClick={onMapClick} mapType={mapType}/>
        <CurrentWeather coords={coords} />
        <HourlyForecast coords={coords} />
        <DailyForecast coords={coords} />
        <AdditionalInfo coords={coords} />
      </div>     */}
    </>
  )
}

export default App
