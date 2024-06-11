import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { callPlanningsAPI } from '../../../apis/PlanningAPICalls';
import CustomToolbar from './CustomToolbar';

const localizer = momentLocalizer(moment);
moment.locale('ko');

function CalendarPlans() {
    const dispatch = useDispatch();
    const {plannings} = useSelector((state) => state.planningReducer);
    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedEvent, setSelectedEvent] = useState(null); // 선택된 이벤트의 상태

    const fetchPlans = (date) => {
        const formattedDate = date.format('YYYY-MM');
        dispatch(callPlanningsAPI({ dt: formattedDate }));
    };

    useEffect(() => {
        fetchPlans(currentDate);
    }, [currentDate, dispatch]);

    useEffect(() => {
        if (plannings?.data?.length > 0) {
            const eventMap = {};
            plannings.data.forEach(item => {
                const key = `${item.startAt}_${item.endAt}`; // 생산 계획 기간으로 고유한 키 생성
                if (!eventMap[key]) {
                    eventMap[key] = {
                        title: `${moment(item.startAt).format('YYYY-MM-DD')} ~ ${moment(item.endAt).format('YYYY-MM-DD')}`,
                        start: new Date(item.startAt),
                        end: new Date(item.endAt),
                        color: '#ff912e',
                        data: [item], // 해당 기간에 대한 모든 상품 정보를 담는 배열
                    };
                } else {
                    eventMap[key].data.push(item); // 이미 있는 이벤트에 상품 정보를 추가
                }
            });

            const uniqueEvents = Object.values(eventMap);
            setEvents(uniqueEvents);
        }
    }, [plannings]);

    const handleNavigate = (date) => {
        setCurrentDate(moment(date));
    };

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: event.color ? event.color : '#ff912e',
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
            textAlign: 'left',
        };
        return {
            style,
        };
    };
    const handleSelectEvent = (event) => {
        setSelectedEvent(event.data); // 선택된 이벤트의 데이터를 상태로 저장
    };
    return (
        <div style={{width: '100%', display:'flex'}}>
            <div style={{width: '60%'}}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{height: 500}}
                    views={['month']}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        toolbar: CustomToolbar,
                    }}
                    onNavigate={handleNavigate} // 달력이 이동할 때 호출되는 콜백 함수
                    onSelectEvent={handleSelectEvent} // 이벤트를 클릭할 때 호출되는 콜백 함수
                />
            </div>
            <div style={{width: '40%'}}>
                {selectedEvent && (
                    <div>
                        <table>
                            <thead>
                            <tr>
                                <th>시작일</th>
                                <th>종료일</th>
                                <th>코드</th>
                                <th>품목</th>
                                <th>총수량</th>
                            </tr>
                            </thead>
                            <tbody>
                            {selectedEvent.map((item, index) => (
                                <tr key={index}>
                                    <td>{moment(item.startAt).format('YYYY-MM-DD')}</td>
                                    <td>{moment(item.endAt).format('YYYY-MM-DD')}</td>
                                    <td>{item.productCode}</td>
                                    <td>{item.productName}</td>
                                    <td>{item.requiredQuantity}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CalendarPlans;
