import React, { useState, useEffect } from "react";
import {
    Input,
    InputGroup,
    InputRightElement,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    useDisclosure
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import MiniCalendar from "../../../components/calendar/MiniCalendar";

function PlanCalendar({ deadline, handleDeadline }) {
    const getFormattedDate = (date) => {
        return date.toISOString().split('T')[0]; // Format as 'YYYY-MM-DD'
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { onOpen, onClose, isOpen } = useDisclosure();
    const [selectedDate, setSelectedDate] = useState(deadline ? deadline : getFormattedDate(tomorrow));

    useEffect(() => {
        handleDeadline(selectedDate); // Notify parent component of deadline change
    }, [selectedDate, handleDeadline]);

    const handleDateChange = (date) => {
        const formattedDate = getFormattedDate(date);
        setSelectedDate(formattedDate);
        onClose(); // Close popover after date selection
    };

    return (
        <>
            <Popover
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
                placement='top'
            >
                <PopoverTrigger>
                    <InputGroup>
                        <Input placeholder='Select deadline' w='180px' size='md' borderRadius='md'
                               type='text' value={selectedDate} readOnly />
                        <InputRightElement>
                            <CalendarIcon color='gray.400' />
                        </InputRightElement>
                    </InputGroup>
                </PopoverTrigger>
                <PopoverContent p={5}>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <MiniCalendar
                        onChange={handleDateChange}
                        value={selectedDate ? new Date(selectedDate) : tomorrow}
                        tomorrow={tomorrow}
                    />
                </PopoverContent>
            </Popover>
        </>
    );
}

export default PlanCalendar;
