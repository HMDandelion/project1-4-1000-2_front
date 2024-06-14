import React, {useEffect, useState} from "react";
import ColumnsTable from "../components/table/ComplexTable";
import OrderStatusBadge from "../components/badge/OrderStatusBadge";
import MiniCalendar from "../components/calendar/MiniCalendar";
import axios from "axios";
import './TestPage.css'; // CSS 파일을 임포트합니다


function TestPage() {
    const [weather, setWeather] = useState(null);

    const data = [
        {
            name: 'dh',
            phone: '010-1234-1234',
            email: 'dhkang@naver.com',
            status: 'ORDER_RECEIVED'
        },
        {
            name: 'mike',
            phone: '010-1234-1234',
            email: 'mike@naver.com',
            status: 'ORDER_RECEIVED'
        },
        {
            name: 'dsfd',
            phone: '010-3233-2222',
            email: 'mike@naver.com',
            status: 'ORDER_RECEIVED'
        }
    ];

    const columns = [
        {
            Header: '이름',
            accessor: 'name'
        },
        {
            Header: '이메일',
            accessor: 'email'
        },
        {
            Header: '상태',
            accessor: 'status',
            Cell: (cell) => OrderStatusBadge(cell.value)
        },
        {
            Header: '연락처',
            accessor: 'phone'
        }
    ];

    const renderWeather = () => {
        if (!weather) {
            return <p>Loading weather...</p>;
        }

        const temperature = weather.main.temp.toFixed(1); // 소수점 한 자리로 제한
        const weatherDescription = weather.weather[0].main;
        const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

        return (
            <div className="weather-container">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img className="weather-icon" src={weatherIcon} alt="Weather icon" />
                    <p className="weather-text" style={{ marginLeft: '10px' }}>{weatherDescription}</p>
                </div>
                <p className="weather-text">{temperature}°C</p>
            </div>
        );
    };

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const API_KEY = '1979e32939a403642fabed1bcf2e559f'; // OpenWeatherMap API 키로 교체하세요.
                const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${API_KEY}&units=metric`);
                setWeather(response.data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        };

        fetchWeather();
    }, []);

    return (
        <>
            <div className="weather-wrapper">
                {renderWeather()}
            </div>

            <div>
                <ColumnsTable columnsData={columns} tableData={data}/>
            </div>

            <div>
                <MiniCalendar/>
            </div>
        </>
    );
}

export default TestPage;