import { useQuery } from "@tanstack/react-query"
import { getWeather } from "./api"
import CurrentWeather from "./components/cards/CurrentWeather"
import HourlyForecast from "./components/cards/HourlyForecast"
import DailyForecast from "./components/cards/DailyForecast"
import AdditionalInfo from "./components/cards/AdditionalInfo"


function App() {

  const {data} = useQuery({
    queryKey: ['weather'],
    queryFn: () => getWeather({ lat: 50, lon: 50 }),
  })

  return (
    <>
      <div className="flex flex-col gap-8">
        <CurrentWeather coords={{ lat: 50, lon: 50 }} />
        <HourlyForecast coords={{ lat: 50, lon: 50 }} />
        <DailyForecast coords={{ lat: 50, lon: 50 }} />
        <AdditionalInfo coords={{ lat: 50, lon: 50 }} />
      </div>    
    </>
  )
}

export default App
