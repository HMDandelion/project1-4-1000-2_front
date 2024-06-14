import React, {useEffect, useState} from "react";
import ColumnsTable from "../components/table/ComplexTable";
import OrderStatusBadge from "../components/badge/OrderStatusBadge";
import MiniCalendar from "../components/calendar/MiniCalendar";
import axios from "axios";
import './TestPage.css';
import {callEmployeesAPI} from "../apis/StorageAPICalls";
import {useDispatch, useSelector} from "react-redux";
import {Box, Flex, VStack, Text, Image, Avatar} from "@chakra-ui/react"; // CSS 파일을 임포트합니다
function TestPage() {
    const [weather, setWeather] = useState(null);
    const dispatch = useDispatch();

    const { employee } = useSelector(state => state.authReducer);

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
        dispatch(callEmployeesAPI());
        fetchWeather();
    }, [dispatch]);

    const renderWeather = () => {
        if (!weather) {
            return <Text>Loading weather...</Text>;
        }

        const temperature = weather.main.temp.toFixed(1); // 소수점 한 자리로 제한
        const weatherDescription = weather.weather[0].main;
        const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`;

        return (
            <Box bg="white" p={4} borderRadius="md" boxShadow="md" textAlign="center" width="150px" height="68px" position="absolute" top="0" right="0">
                <Flex alignItems="center" justifyContent="center">
                    <Image src={weatherIcon} alt="Weather icon" boxSize="30px" />
                    <Text ml={2} fontWeight="bold" color="navy">{weatherDescription}</Text>
                </Flex>
                <Text fontWeight="bold" color="navy">{temperature}°C</Text>
            </Box>
        );
    };

    const renderEmployeeInfo = () => {
        if (!employee) {
            return null;
        }

        // 기본 사람 형태의 이미지 URL
        const defaultProfileImage = 'https://via.placeholder.com/150';

        return (
            <VStack align="start" spacing={4}>
                <Flex bg="gray.50" p={4} borderRadius="md" boxShadow="md" alignItems="center">
                    <Image
                        borderRadius="full"
                        boxSize="100px"
                        src={employee.profileImageUrl || defaultProfileImage} // 프로필 이미지 URL이 없으면 기본 이미지 사용
                        alt={employee.employeeName}
                        mr={4}
                    />
                    <VStack align="start">
                        <Text fontSize="xl" fontWeight="bold">{employee.employeeName}</Text>
                        <Text>{employee.email}</Text>
                        <Text>{employee.positionName}</Text>
                        <Text>{employee.departmentName}</Text>
                    </VStack>
                </Flex>
            </VStack>
        );
    };

    return (
        <Box position="relative">
            <Box mb={8}>
                {employee && <Text fontSize="3xl" fontWeight="bold" color="navy">{employee.employeeName}님 환영합니다.</Text>}
            </Box>
            <Flex justify="space-between" mb={4}>
                <Box flex="1">
                    <Box mb={8}>
                        <MiniCalendar />
                    </Box>
                </Box>
                <Box ml={4}>
                    {renderEmployeeInfo()}
                </Box>
            </Flex>
            {renderWeather()}
        </Box>
    );
}

export default TestPage;