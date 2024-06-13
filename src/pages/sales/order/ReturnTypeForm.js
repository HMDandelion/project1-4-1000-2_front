import {Button, Flex, Heading, Radio, Text, RadioGroup} from "@chakra-ui/react";

function ReturnTypeForm({manageType, setManageType, deadline, onDeadlineChange}) {
    const options = [
        { label: '반품', value: 'REFUND' },
        { label: '교환', value: 'EXCHANGE' }
    ];


    const onTypeChange = (value) => {
        setManageType(value);
    }

    return (
        <>
            <Heading size="sm" color='secondaryGray.900'>1. 반품 정보 입력</Heading>
            <Flex direction="column" mb={4}>
                <RadioGroup onChange={onTypeChange} value={manageType}>
                    <Flex>
                        {options.map(option => (
                            <Button
                                as="label"
                                key={option.value}
                                flex="1"
                                m={1}
                                bg={manageType === option.value ? 'orange.400' : 'gray.200'}
                                color={manageType === option.value ? 'white' : 'black'}
                                borderRadius="md"
                                _hover={{ bg: manageType === option.value ? 'orange.500' : 'gray.300' }}
                                _active={{ bg: manageType === option.value ? 'orange.600' : 'gray.400' }}
                                _focus={{ boxShadow: 'outline' }}
                            >
                                <Radio
                                    value={option.value}
                                    display="none"
                                />
                                {option.label}
                            </Button>
                        ))}
                    </Flex>
                </RadioGroup>
            </Flex>

        </>
    );
}

export default ReturnTypeForm;