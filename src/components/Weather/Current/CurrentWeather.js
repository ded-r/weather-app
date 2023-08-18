import moment from "moment/moment";

export default function CurrentWeather({data}) {

    const description = data.weather[0].description;
    const descriptionUpperCase = description.charAt(0).toUpperCase() + description.slice(1);

    return (<>
        <div className="mx-auto text-center mt-5 lg:mt-10">
            <div className="text-3xl md:text-4xl">
                Current weather in
                <p className="p-2"><b>{data.city}</b></p>
            </div>
            <div className="text-xl mt-5 md:text-2xl">
                <p>Today: <b>{moment().format("MMMM Do, YYYY")}</b></p>
            </div>
            <div className="grid grid-cols-1 items-center align-middle justify-center lg:grid-cols-3">
                <div className="text-6xl my-4 md:text-8xl md:my-10 lg:text-6xl">
                    <b>{Math.round(data.main.temp)}°C</b>
                    <div className="text-xl md:text-3xl lg:text-xl">
                        Feels like {Math.round(data.main.feels_like)}°C
                    </div>
                </div>
                <div className="text-md border-t-2 border-b-2 border-gray-400 lg:border-0 lg:mt-10">
                    <div className="my-7">
                        <div className="text-xl lg:text-xl">
                            <b>Details</b>
                        </div>
                        <div className="flex w-2/3 mx-auto place-content-between md:text-2xl lg:text-xl lg:w-full">
                            <div className="text-left">
                                <p>Wind</p>
                                <p>Humidity</p>
                                <p>Pressure</p>
                            </div>
                            <div className="text-right">
                                <p>{data.wind.speed} m/s</p>
                                <p>{data.main.humidity} %</p>
                                <p>{data.main.pressure} hPa</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <img className="mx-auto md:w-1/4 lg:w-1/2" src={`icons/${data.weather[0].icon}.png`} alt="CurrentWeather icon"/>
                    <div className="text-xl md:text-4xl lg:text-2xl">
                        {descriptionUpperCase}
                    </div>
                </div>
            </div>
        </div>
    </>)
}