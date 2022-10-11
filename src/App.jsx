import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Icon } from "@iconify/react";
import ReactAnimatedWeather from "./weather-animate/ReactAnimatedWeather"
function App() {
  const [time, setTime] = useState(Date.now());
  const [timemon, settime] = useState("");
  const [data, setdata] = useState("");
  const [name, setname] = useState("");
  const [seacrh, lets] = useState("");
  const [datee, future] = useState("");
  const [icon, seticon] = useState("");
  const [list, bruh] = useState([]);
  const [color, colorit] = useState("goldenrod");
  const [link, setlink] = useState(
    `https://api.weatherapi.com/v1/current.json?key=0cb021f26c2e44d4be562400220110&q=London&aqi=yes`
  );
  const [link2, setlink2] = useState(
    `https://api.weatherapi.com/v1/forecast.json?key=0cb021f26c2e44d4be562400220110&q=London&days=4&aqi=yes&alerts=yes`
  );
  const [link3, setlink3] = useState(
    `https://api.weatherapi.com/v1/search.json?key=0cb021f26c2e44d4be562400220110&q=${name}`
  );
  useEffect(() => {
    axios(link).then((e) => {
      setdata(e.data);
    });
  }, [link]);
  useEffect(() => {
    axios(link2).then((e) => {
      future(e.data);
    });
  }, [link2]);
  useEffect(() => {
    axios(link3).then((e) => {
      lets(e.data);
      if (seacrh != undefined) {
        bruh(seacrh);
      }
    });
  }, [name]);

  const getTime = () => {
    const currenTime = new Date();
    const hours = currenTime.getHours();

    if (hours >= 5 && hours <= 11) settime("Morning");
    if (hours >= 12 && hours <= 16) settime("Afternoon");
    if (hours >= 17 && hours <= 20) settime("Evening");
    if ((hours >= 21 && hours <= 23) || (hours >= 0 && hours <= 4))
      settime("Night");
    return "";
  };

  useEffect(() => {
    if (data) {
      if (data.current.condition.text.includes("rain")) {
        seticon("SLEET");
        colorit("lightblue");
      } else if (data.current.condition.text.includes("Overcast")) {
        seticon("WIND");
        colorit("lightblue");
      } else if (data.current.condition.text.includes("Clear")) {
        seticon("CLEAR_NIGHT");
        colorit("lightblue");
      } else if (data.current.condition.text.includes("Sunny")) {
        seticon("CLEAR_DAY");
        colorit("goldenrod");
      } else if (data.current.condition.text.includes("fog")) {
        seticon("FOG");
        colorit("lightblue");
      } else if (data.current.condition.text.includes("cloudy")) {
        if (data.current.condition.icon.includes("day")) {
          seticon("PARTLY_CLOUDY_DAY");
          colorit("goldenrod");
        } else if (data.current.condition.icon.includes("night")) {
          seticon("PARTLY_CLOUDY_NIGHT");
          colorit("lightblue");
        } else if (data.current.condition.text.includes("snow")) {
          seticon("SNOW");
          colorit("lightblue");
        }
      } else if (timemon == "Afternoon") {
        seticon("PARTLY_CLOUDY_DAY");
      } else if (timemon == "Evening") {
        seticon("CLOUDY");
      } else if (timemon == "Night") {
        seticon("CLEAR_NIGHT");
        colorit("lightblue");
      }
    }
  }, [timemon, data]);
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
      getTime();
    };
  }, []);

  const defaults = {
    icon: `${icon}`,
    color: `${color}`,
    size: 160,
    animate: true,
  };

  return (
    data &&
    datee && (
      <div
        className="bg-neutral-800 relative h-screen w-full flex flex-row items-center justify-center gap-2 "
        style={{ backgroundImage: `` }}
      >
        <div className="absolute bottom-0">made by liming from MRGA</div>
        <div className="bg-neutral-800 h-screen w-[50vw] flex items-center justify-center ">
          <div>
            <div>{moment(time).format("hh:mm")}</div>
            <div className="text-5xl">{`Weather App`}</div>
            <div className="jitang mt-2">
              Here's you weather telecast for today.
            </div>
            <ReactAnimatedWeather
              icon={defaults.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
            <div className="text-sm">
              feels like {data.current.feelslike_c}°C
            </div>

            <div className="text-2xl mt-2 flex items-center">
              <Icon icon="gis:poi" />
              <div className="w-3"></div>
              <div>{data.location.name}</div>
            </div>
            <div className="text-sm mt-2">{data.current.condition.text}</div>
            <div className=" flex flex-row items-center mr-14">
              <div>
                <img src={data.current.condition.icon}></img>
              </div>
              <div className="text-2xl">{data.current.temp_c}°C</div>
            </div>
          </div>
        </div>
        <div className="bg-neutral-800 h-screen w-[50vw]  flex items-center justify-center flex-col ">
          <div className="flex flex-row items-center h-8 w-auto bg-white justify-center rounded-md">
            <button className="flex items-center flex-row ">
            <div className="flex items-center justify-center h-8 w-8  ">
            <Icon icon="carbon:search" className="w-5 h-5  text-gray-400 "/>
            </div>
          <div>
            <input
              className="p-3 w-80 h-8   bg-gray-50 rounded-md"
              value={name}
              onChange={(e) => {
                setname(e.target.value);
                setlink3(
                  `https://api.weatherapi.com/v1/search.json?key=0cb021f26c2e44d4be562400220110&q=${e.target.value}`
                );
              }}
            />
          </div>
            </button>
          </div>
          <div>
            <div className="relative w-full flex justify-center">
              <div
                className={`fixed w-80 p-3 ${
                  name != ""
                    ? `border-2 border-blue-300 bg-neutral-900 overflow-y-scroll`
                    : ""
                } mt-2  `}
              >
                <>
                  {name != "" && list == ""
                    ? `no result`
                    : name != ""
                    ? list.map((e, i) => (
                        <div
                          className={i > 0 && "mt-2"}
                          onClick={() => {
                            setlink(
                              `https://api.weatherapi.com/v1/current.json?key=0cb021f26c2e44d4be562400220110&q=${e.name}&aqi=yes`
                            );
                            setlink2(
                              `https://api.weatherapi.com/v1/forecast.json?key=0cb021f26c2e44d4be562400220110&q=${e.name}&days=4&aqi=yes&alerts=yes`
                            );
                            setname("");
                            bruh(seacrh);
                          }}
                        >
                          {e.name},{e.region},{e.country}
                        </div>
                      ))
                    : ""}
                </>
              </div>
            </div>
            <div className="text-center mt-2">
              <div className="w-full bg h-1 mt-2cd  transition-all"></div>
              <div className="mt-5 w-full">
                <div className="text-2xl">Weather Details</div>
                <div className=" flex mt-4 felx-row justify-between">
                  <div>Cloudy</div>
                  <div>{data.current.cloud} %</div>
                </div>
                <div className=" flex felx-row justify-between mt-2">
                  <div>Humidity</div>
                  <div>{data.current.humidity} %</div>
                </div>
                <div className=" flex felx-row justify-between mt-2">
                  <div>Wind</div>
                  <div>W@{data.current.wind_kph}km/h</div>
                </div>
              </div>
            </div>
            <div className="mt-8 w-full ">
              <div className="text-2xl">Forecasts</div>
              <div className="flex flex-row justify-between items-center">
                <div>{datee.forecast.forecastday[1].date}</div>
                <div>
                  <img
                    src={datee.forecast.forecastday[1].day.condition.icon}
                    className="h-14 w-14"
                  ></img>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>{datee.forecast.forecastday[2].date}</div>
                <div>
                  <img
                    src={datee.forecast.forecastday[2].day.condition.icon}
                    className="h-14 w-14"
                  ></img>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center">
                <div>{datee.forecast.forecastday[3].date}</div>
                <div>
                  <img
                    src={datee.forecast.forecastday[3].day.condition.icon}
                    className="h-14 w-14"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default App;
