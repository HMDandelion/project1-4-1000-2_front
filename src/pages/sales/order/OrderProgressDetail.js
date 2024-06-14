import {Badge, Center, Container, Divider, Flex, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import OrderStatusProgress from "./OrderStatusProgress";
import React from "react";
import ReturnStatusProgress from "../return/ReturnStatusProgress";
import {WarningIcon} from "@chakra-ui/icons";

function OrderProgressDetail({type, order}) {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const getDayLeft = (deadline) => {
        const deadlineDate = new Date(deadline);
        const today = new Date();
        const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        return (
            <Text color={daysLeft < 3 ? 'red' : ''}>{daysLeft < 0 ? 0 : daysLeft} 일</Text>
        );
    }

    return (
        <VStack
            spacing={2}
            align='stretch'
        >
            <Flex justify='space-between'>
                <Flex m='10px'>
                    <Text fontSize='xl' fontWeight='800' color={textColor}>
                        { type === 'order' ? '주문 상세' : '교환 상세' }
                    </Text>
                    <Text fontSize='sm' fontWeight='600' color={textColor} mt='5px' mx='10px'>
                        주문번호 : {order.orderCode}
                    </Text>
                </Flex>
                <Flex>
                    {
                        order.status === 'COMPLETED' ?
                            <>
                                <Badge fontSize='md' fontWeight='700' colorScheme='green' my='8px'>
                                    👏 완료일시
                                </Badge>
                                <Text fontSize='md' fontWeight='500' color={textColor} m='10px'>
                                    {order.completedAt}
                                </Text>
                            </> :
                            <>
                                <Text fontSize='md' fontWeight='700' color={textColor} mt='13px'>
                                    마감까지
                                </Text>
                                <Text fontSize='md' fontWeight='500' color='orange.400' mx='10px' mt='13px'>
                                    {getDayLeft(order.deadline)}
                                </Text>
                            </>
                    }
                </Flex>

            </Flex>
            <Divider/>
            {
                order.status !== 'CANCELED' ?
                    <OrderStatusProgress status={order.status}/> :
                    <Center height='100px'>
                        <WarningIcon color='secondaryGray.800'/>
                        <Text fontSize='xl' fontWeight='800' color='secondaryGray.800' m='10px'>
                            취소된 주문건입니다.
                        </Text>
                    </Center>
            }
            <Flex justify='space-between'>
                <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>
                    주문일자
                </Text>
                <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>
                    {order.orderDatetime}
                </Text>
            </Flex>
            <Flex justify='space-between'>
                <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>
                    마감일자
                </Text>
                <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>
                    {order.deadline}
                </Text>
            </Flex>
        </VStack>

    );
}

export default OrderProgressDetail;