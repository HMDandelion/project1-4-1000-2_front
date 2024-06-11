import {
    Input, InputGroup, InputRightElement,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger, useDisclosure
} from "@chakra-ui/react";
import MiniCalendar from "./MiniCalendar";
import {useEffect, useState} from "react";
import {CalendarIcon} from "@chakra-ui/icons";

function PopoverCalendar({handleDeadline}) {
    const getFormattedDate = date => {
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }

    const { onOpen, onClose, isOpen } = useDisclosure();
    const [selectedDate, setSelectedDate] = useState(getFormattedDate(new Date()));

    useEffect(() => handleDeadline(selectedDate), [selectedDate]);

    const handleDateChange = (date) => {
        setSelectedDate(getFormattedDate(date));
        onClose();
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
                        <Input placeholder='희망 마감일자' w='180px' size='md' borderRadius='md'
                               type='text' value={selectedDate}/>
                        <InputRightElement>
                            <CalendarIcon color='secondaryGray.800' mr={10}/>
                        </InputRightElement>
                    </InputGroup>
                </PopoverTrigger>
                <PopoverContent p={5}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <MiniCalendar
                            onChange={handleDateChange}
                            value={selectedDate ? new Date(selectedDate) : new Date()}
                        />
                </PopoverContent>
            </Popover>
        </>
    );
}

export default PopoverCalendar;