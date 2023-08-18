import React from "react";
import moment from "moment/moment";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Forecast({data}) {

    // Loop over list from services with adjusted slice variables
    let adjustedSliceStart = -6;
    let adjustedSliceEnd = 2;

    // Data loop with moment.js
    const today = moment();
    const nextThreeDays = [];

    for (let i = 1; i <= 3; i++) {
        const nextDay = today.clone().add(i, 'days');
        nextThreeDays.push(nextDay);
    }

    // Controlled MUI Accordion
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (<>
        <div className="lg:h-1">
            <div className="text-center text-2xl mt-5 md:text-3xl md:mt-10">
                <span><b>Next 3 days weather forecast</b></span>
            </div>
            {nextThreeDays.map((date, dayIndex) => {
                adjustedSliceStart = adjustedSliceStart + 8;
                adjustedSliceEnd = adjustedSliceEnd + 8;
                return (<Accordion expanded={expanded === `panel${dayIndex + 1}`}
                                   onChange={handleChange(`panel${dayIndex + 1}`)}
                                   key={dayIndex}
                                   style={{width: 90 + "%", margin: 20 + "px auto"}}>
                    <div className="hover:bg-gray-200 duration-500">
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}
                                          aria-controls={`panel${dayIndex + 1}bh-content`}
                                          id={`panel${dayIndex + 1}bh-header`}>
                            <Typography sx={{width: '33%', flexShrink: 0}}>
                                {date.format('MMMM D')}
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>{date.format('dddd')}</Typography>
                        </AccordionSummary>
                    </div>
                    <AccordionDetails style={{maxHeight: 170 + "px", overflowY: "auto"}}>
                        {data.list.slice(adjustedSliceStart, adjustedSliceEnd).map((item, index) => {
                            return (<Typography key={index}>
                                <div className="grid grid-cols-8 mx-auto items-center border-b-2 border-black">
                                    <div className="mx-auto text-sm md:text-2xl lg:text-xl">
                                        <span>{moment(item.dt_txt).format('HH:mm')}</span>
                                    </div>
                                    <div
                                        className="text-xl mx-auto text-center col-start-2 col-span-2 md:text-5xl lg:text-3xl">
                                        <b>{Math.round(item.main.temp)}°C</b>
                                        <div className="text-center text-sm md:text-xl lg:text-xl">
                                            <span>Feels like {Math.round(item.main.feels_like)}°C</span>
                                        </div>
                                    </div>
                                    <div className="mx-auto text-center text-xs col-start-4 col-span-3 md:text-xl">
                                        <span className="text-sm md:text-xl lg:text-xl"><b>Details</b></span>
                                        <div className="grid grid-cols-2 place-content-between">
                                            <div className="text-left">
                                                <div>Wind</div>
                                                <div>Humidity</div>
                                                <div>Pressure</div>
                                            </div>
                                            <div className="text-right">
                                                <div>{item.wind.speed} m/s</div>
                                                <div>{item.main.humidity} %</div>
                                                <div>{item.main.pressure} hPa</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mx-auto text-center text-sm col-span-2 md:text-2xl lg:text-xl">
                                        <img src={`icons/${item.weather[0].icon}.png`}
                                             alt="CurrentWeather icon"/>
                                        {item.weather[0].description}
                                    </div>
                                </div>
                            </Typography>)
                        })}
                    </AccordionDetails>
                </Accordion>)
            })}
        </div>
    </>)
}