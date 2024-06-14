import {Divider, Flex, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import React from "react";
import {ChevronRightIcon} from "@chakra-ui/icons";

function ReturnRefundDetail({returnData}) {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const getTotalPrice = (products) => {
        return products.reduce((total, product) => total + (product.quantity * product.refundPrice), 0);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ko-KR').format(number);
    };

    return (
        <VStack
            spacing={2}
            align='stretch'
        >
            <Flex justify='flex-start'>
                <Text fontSize='xl' fontWeight='800' color={textColor} m='10px'>
                    환불 상세
                </Text>
            </Flex>
            <Divider/>

            <Flex>
                <Text fontSize='md' fontWeight='700' color={textColor} mx='10px' mt='10px'>환불 대상 수량</Text>
            </Flex>
            {
                returnData.returnProducts.map(product =>
                    <Flex justify='space-between'>
                        <Text fontSize='sm' fontWeight='700' color={textColor} m='5px 10px'>
                            <ChevronRightIcon color={textColor} mb='3px'/>{product.productName}
                        </Text>
                        <Text fontSize='sm' fontWeight='500' color={textColor} m='5px 10px'>{product.quantity}개</Text>
                    </Flex>
                )
            }
            <Flex justify='space-between'>
                <Text fontSize='md' fontWeight='700' color={textColor} mx='10px' mt='20px'>환불 총액</Text>
                <Text fontSize='md' fontWeight='500' color={textColor} mx='10px' mt='20px'>
                    {formatNumber(getTotalPrice(returnData.returnProducts))}원
                </Text>
            </Flex>

        </VStack>
    );
}

export default ReturnRefundDetail;