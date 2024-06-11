import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/ko';
import { useDispatch } from 'react-redux';
import { callPlanningsAPI } from "../../../apis/PlanningAPICalls";
import CustomToolbar from "./CustomToolbar";
import CustomEventComponent from "./CustomEventComponent";

const localizer = momentLocalizer(moment);
moment.locale('ko');

function MyBigCalendar() {
    const [events, setEvents] = useState([]);
    const dispatch = useDispatch();
    const currentDate = moment();

    useEffect(() => {
        fetchMonthlyProductionPlan().then(r => {} );
    }, []);

    const fetchMonthlyProductionPlan = async () => {
        try {
            const startOfMonth = currentDate.clone().startOf('month').format('YYYY-MM-DD');
            const response = await dispatch(callPlanningsAPI({ dt: startOfMonth }));
            const data = response.payload; // API 응답 데이터
            const eventList = data.map(item => ({
                title: item.title,
                start: new Date(item.start),
                end: new Date(item.end),
            }));
            setEvents(eventList); // 이벤트 배열 업데이트
        } catch (error) {
            console.error('Error fetching monthly production plan:', error);
        }
    };

    const eventStyleGetter = (event) => {
        const style = {
            backgroundColor: '#3174ad', // 막대 그래프의 색상
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
            textAlign: 'left'
        };
        return {
            style
        };
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={['month']} // 월별 뷰만 사용하도록 설정
                components={{
                    event: CustomEventComponent,
                    toolbar: CustomToolbar // 커스텀 툴바 컴포넌트 사용
                }}
                eventPropGetter={eventStyleGetter} // 이벤트 스타일 설정
            />
        </div>
    );
}

export default MyBigCalendar;
