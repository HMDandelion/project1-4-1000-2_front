import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { callPlanningsAPI } from '../../../apis/PlanningAPICalls';
import CustomToolbar from './CustomToolbar';
import { Button, useDisclosure } from "@chakra-ui/react";
import PlanModify from "./PlanModify";

const localizer = momentLocalizer(moment);
moment.locale('ko');

function CalendarPlans() {
    const dispatch = useDispatch();
    const { plannings } = useSelector((state) => state.planningReducer);
    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(moment());
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();

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
                const key = `${item.startAt}_${item.endAt}`;
                if (!eventMap[key]) {
                    eventMap[key] = {
                        title: `${moment(item.startAt).format('YYYY-MM-DD')} ~ ${moment(item.endAt).format('YYYY-MM-DD')}`,
                        start: new Date(item.startAt),
                        end: new Date(item.endAt),
                        color: '#ff912e',
                        data: [item],
                    };
                } else {
                    eventMap[key].data.push(item);
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
        setSelectedEvent(event.data);
    };

    const handleModify = () => {
        onOpen();
    };

    return (
        <div style={{ width: '100%', display: 'flex' }}>
            <PlanModify isOpen={isOpen} onClose={onClose} plans={selectedEvent} />
            <div style={{ width: '50%' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    views={['month']}
                    eventPropGetter={eventStyleGetter}
                    components={{
                        toolbar: CustomToolbar,
                    }}
                    onNavigate={handleNavigate}
                    onSelectEvent={handleSelectEvent}
                />
            </div>
            <div style={{ width: '50%' }}>
                {selectedEvent && (
                    <div>
                        <Button colorScheme="gray" backgroundColor="orange" onClick={handleModify}>수정</Button>
                        <table>
                            <thead>
                            <tr>
                                <th>시작일</th>
                                <th>종료일</th>
                                <th>코드</th>
                                <th>품목</th>
                                <th>총수량</th>
                                <th>적요</th>
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
                                    <td>{item.description}</td>
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
