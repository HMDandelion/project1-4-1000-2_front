import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../assets/css/MiniCalendar.css";
import { Text, Icon } from "@chakra-ui/react";
// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// Custom components
import Card from "../card/Card.js";

function MiniCalendar({value, onChange, tomorrow}) {
    return (
        <Card
            align='center'
            direction='column'
            w='100%'
            maxW='max-content'
            h='max-content'
            p={0}
        >
            <Calendar
                onChange={onChange}
                value={value}
                minDate={tomorrow}
                view={"month"}
                tileContent={<Text color='brand.500'></Text>}
                prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
                nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
                formatDay={(locale, date) => date.toLocaleString('en', { day: 'numeric' })}
            />
        </Card>
    );
}

export default MiniCalendar;