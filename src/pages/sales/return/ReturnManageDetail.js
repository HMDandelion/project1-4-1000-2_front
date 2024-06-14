import {Center, Divider, Flex, Text, useColorModeValue, VStack} from "@chakra-ui/react";
import React from "react";
import ReturnStatusProgress from "./ReturnStatusProgress";
import {WarningIcon} from "@chakra-ui/icons";

function ReturnManageDetail({returnData}) {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    return (
        <VStack
            spacing={2}
            align='stretch'
        >
            <Flex justify='space-between'>
                <Text fontSize='xl' fontWeight='800' color={textColor} m='10px'>
                    반품 재고 처리 상세
                </Text>
                <Text fontSize='sm' fontWeight='600' color={textColor} mt='15px' mr='10px'>
                    반품번호 : {returnData.returnCode}
                </Text>
            </Flex>
            <Divider/>
            {
                returnData.returnStatus !== 'CANCELED' ?
                <ReturnStatusProgress status={returnData.returnStatus}/> :
                    <Center height='100px'>
                        <WarningIcon color='secondaryGray.800'/>
                        <Text fontSize='xl' fontWeight='800' color='secondaryGray.800' m='10px'>
                            취소된 반품건입니다.
                        </Text>
                    </Center>
            }

            <Flex justify='space-between'>
                <Text fontSize='md' fontWeight='700' color={textColor} m='5px 10px'>
                    반품일자
                </Text>
                <Text fontSize='md' fontWeight='500' color={textColor} m='5px 10px'>
                    {returnData.returnDatetime}
                </Text>
            </Flex>
        </VStack>
    );
}

export default ReturnManageDetail;