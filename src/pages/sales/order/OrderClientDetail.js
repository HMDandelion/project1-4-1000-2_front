import {Divider, Flex, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import React from "react";

function OrderClientDetail({client}) {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <VStack
            align='stretch'
        >
            <Flex>
                <Text fontSize='xl' fontWeight='800' color={textColor} m='10px'>거래처 상세</Text>
            </Flex>
            <Divider/>
            <Flex>
                <Text fontSize='xl' fontWeight='700' color={textColor} m='10px'>{client.clientName}</Text>
            </Flex>
            <Flex justify='space-between'>
                <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>대표명</Text>
                <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>{client.representativeName}</Text>
            </Flex>
            <Flex justify='space-between'>
                <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>연락처</Text>
                <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>{client.phone}</Text>
            </Flex>
            <Flex justify='space-between'>
                <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>주소</Text>
                <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>{client.address}{client.addressDetail}</Text>
            </Flex>
        </VStack>
    );
}

export default OrderClientDetail;