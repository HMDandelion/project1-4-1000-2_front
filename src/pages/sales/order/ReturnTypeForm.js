import {
    Box,
    Button,
    Text,
    Flex,
    Heading,
    Radio,
    RadioGroup,
    Grid, GridItem, HStack
} from "@chakra-ui/react";
import {InfoOutlineIcon} from "@chakra-ui/icons";
import PopoverCalendar from "../../../components/calendar/PopoverCalendar";
import React from "react";

function ReturnTypeForm({manageType, setManageType, deadline, onDeadlineChange}) {
    const options = [
        { label: '반품', value: 'REFUND' },
        { label: '교환', value: 'EXCHANGE' }
    ];

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const onTypeChange = (value) =>  setManageType(value);

    return (
        <>
            <Heading size="sm" color='secondaryGray.900' ml={4}>1. 반품 정보 입력</Heading>
            <Flex direction="column" my={4} ml={4}>
                <RadioGroup onChange={onTypeChange} value={manageType}>
                    <Flex mx={3}>
                        {
                            options.map(option => (
                            <Button
                                as="label"
                                key={option.value}
                                flex="1"
                                size='sm'
                                bg={manageType === option.value ? 'orange.400' : 'white'}
                                color={manageType === option.value ? 'white' : 'secondaryGray.900'}
                                border='2px'
                                borderRadius="sm"
                                borderColor={manageType === option.value ? 'orange.500' : 'secondaryGray.400'}
                                _hover={{ bg: manageType === option.value ? 'orange.500' : 'secondaryGray.300' }}
                                _active={{ bg: manageType === option.value ? 'orange.600' : 'secondaryGray.400' }}
                                _focus={{ boxShadow: 'outline' }}
                            >
                                <Radio
                                    value={option.value}
                                    display="none"
                                />
                                {option.label}
                            </Button>
                            ))
                        }
                    </Flex>
                </RadioGroup>
            </Flex>
            {
                manageType === 'EXCHANGE' ?
                    <Box mx={4}>
                        <Grid Grid templateColumns='repeat(3, 1fr)'>
                            <GridItem>
                                <Text fontWeight='700' color='secondaryGray.900' mt='4px' textAlign='center'>마감일자</Text>
                            </GridItem>
                            <GridItem colSpan={2}>
                                <PopoverCalendar handleDeadline={onDeadlineChange}/>
                            </GridItem>
                        </Grid>
                    </Box> :
                    <HStack ml={8} mr={4} mt={4}>
                        <InfoOutlineIcon color='secondaryGray.900' overflow='visible' mr={1}/>
                        <Text fontWeight='400' fontSize='sm' color='secondaryGray.900'>
                            환불액은 반품 접수한 상품이 공장에 입고되어 재검수를 거친 이후에 확정됩니다.
                        </Text>
                    </HStack>
            }
        </>
    );
}

export default ReturnTypeForm;