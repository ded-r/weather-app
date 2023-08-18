import "./App.css";
import Search from "./components/Search/Search";
import CurrentWeather from "./components/Weather/Current/CurrentWeather";
import Forecast from "./components/Weather/Forecast/Forecast";
import {weatherApiKey, weatherApiUrl} from "./services/API";
import {useEffect, useState} from "react";
import Footer from "./components/Footer/Footer";

export default function App() {

    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const [loading, setLoading] = useState(null);

    useEffect(() => {
        if (currentWeather && forecast) {
            setLoading(true);
            const timeout = setTimeout(() => {
                setLoading(false);
            }, 5000); // Change the timeout duration as needed

            return () => clearTimeout(timeout); // Clear the timeout on unmount
        }
    }, [currentWeather, forecast]);

    const handleOnSearchChange = (searchData) => {
        const [lat, long] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(`${weatherApiUrl}/weather?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=metric`)
        const forecastWeatherFetch = fetch(`${weatherApiUrl}/forecast?lat=${lat}&lon=${long}&appid=${weatherApiKey}&units=metric`)

        Promise.all([currentWeatherFetch, forecastWeatherFetch])
            .then(async (responce) => {
                const weatherResponce = await responce[0].json();
                const forecastResponce = await responce[1].json();

                setCurrentWeather({city: searchData.label, ...weatherResponce});
                setForecast({city: searchData.label, ...forecastResponce});
                setLoading(true)
            }).catch(err => console.log(err));
    }

    console.log(currentWeather);
    console.log(forecast);

    return (<>
        <div className="grid grid-cols-1 lg:grid-cols-2"
             style={{
                 background: `url(${process.env.PUBLIC_URL + '/background.jpg'})`,
                 backgroundRepeat: "no-repeat",
                 backgroundSize: "cover"
             }}>
            <div className="mt-5 md:mt-10 lg:h-screen">
                <Search onSearchChange={handleOnSearchChange}/>
            </div>
            <div className="text-white">
                {currentWeather || forecast ?
                    (
                        <div className="weather-wrapper grid grid-rows-2">
                            <div>
                                <CurrentWeather data={currentWeather}/>
                            </div>
                            <div>
                                <Forecast data={forecast}/>
                            </div>
                        </div>
                    ) : (
                        <div className="weather-wrapper h-screen">
                            <div className="flex items-center align-middle justify-center text-center h-1/2 lg:h-3/4">
                                <p className="text-3xl"><b>Please enter a city name into search bar</b></p>
                            </div>
                        </div>
                    )}
            </div>
            <Footer/>
        </div>
    </>);
}
