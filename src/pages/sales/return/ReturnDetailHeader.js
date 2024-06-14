import {Badge, Container, Flex, HStack, Link, StackDivider, Text} from "@chakra-ui/react";
import React from "react";

function ReturnDetailHeader({returnData}) {
    return (
        <HStack
            divider={<StackDivider borderColor='secondaryGray.100' orientation='vertical'/>}
            spacing={2}
            align='stretch'
        >
            <Container>
                <Flex justify='space-between'>
                    <Text fontWeight='600' color='secondaryGray.900'>반품유형</Text>
                    {
                        returnData.manageType === 'EXCHANGE' ?
                            <Badge colorScheme='gray' size='xs'>교환</Badge> :
                            <Badge colorScheme='black' size='xs'>환불</Badge>
                    }
                </Flex>
            </Container>
            <Container>
                <Flex justify='space-between'>
                    <Text fontWeight='600' color='secondaryGray.900'>거래처</Text>
                    <Link fontWeight='600' color='orange.500' textDecoration='underline'>{returnData.clientName}</Link>
                </Flex>
            </Container>
            <Container>
                <Flex justify='space-between'>
                    <Text fontWeight='600' color='secondaryGray.900'>기존 주문 상세</Text>
                    <Link fontWeight='600' color='orange.500' textDecoration='underline'>주문번호 {returnData.orderCode}</Link>
                </Flex>
            </Container>
            {
                returnData.manageType === 'EXCHANGE' &&
                <Container>
                    <Flex justify='space-between'>
                        <Text fontWeight='600' color='secondaryGray.900'>교환 주문 상세</Text>
                        <Link fontWeight='600' color='orange.500' textDecoration='underline'>주문번호 {returnData.exchangeOrder.orderCode}</Link>
                    </Flex>
                </Container>
            }
        </HStack>
    );
}

export default ReturnDetailHeader;