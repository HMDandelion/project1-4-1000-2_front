import {useLocation} from "react-router-dom";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callMaterialStockAPI} from "../../../apis/MaterialStockAPICalls";
import {
    Avatar,
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    Skeleton,
    Text,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import DeleteAlertButton from "../../../components/button/DeleteAlertButton";
import {callMaterialSpecDeleteAPI} from "../../../apis/MaterialSpecAPICalls";
import Card from "../../../components/card/Card";
import {
    CartIcon,
    CreditIcon,
    DashboardLogo,
    GlobeIcon,
    HelpIcon,
    RocketIcon,
    SlackLogo, StatsIcon
} from "../../../components/icons/Icons";

function StockDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const {isOpen, onOpen, onClose} = useDisclosure();
    const location = useLocation();
    const stockCode = location.state;

    const dispatch = useDispatch();

    const {stock} = useSelector(state => state.materialStockReducer);

    useEffect(() => {
            dispatch(callMaterialStockAPI({stockCode}));
        }, []
    );
    return (
        stock &&
        <>
            <Flex justify="space-between">
                <Text fontSize="3xl" fontWeight="800" color={textColor} m="10px">
                    {stock.spec.materialName}
                </Text>
                <div>
                    <Button colorScheme="gray" size="xs" onClick={onOpen}>
                        수정
                    </Button>
                    <DeleteAlertButton code={stockCode} deleteAPI={callMaterialSpecDeleteAPI} />
                </div>
                {/* <ClientModify isOpen={isOpen} onClose={onClose} client={client}/> */}
            </Flex>
            <Flex>
                <Card>
                    <Text fontWeight="bold" color={textColor}>
                        <Badge fontSize="sm" m="2px 5px" colorScheme="orange">코드</Badge>
                        <span>{stockCode}</span>
                    </Text>
                    <Text fontWeight="bold" color={textColor}>
                        <Badge fontSize="sm" m="2px 5px" colorScheme="orange">적재일</Badge>
                        <span>{stock.storageDate}</span>
                    </Text>
                    <Text fontWeight="bold" color={textColor}>
                        <Badge fontSize="sm" m="2px 5px" colorScheme="orange">점검일</Badge>
                        <span>{stock.inspectionDate}</span>
                    </Text>
                    <Text fontWeight="bold" color={textColor}>
                        <Badge fontSize="sm" m="2px 5px" colorScheme="orange">비고</Badge>
                        <span>{stock.remarks}</span>
                    </Text>
                    <Divider mb={2} mt={2}/>
                    <Text fontWeight="bold" color={textColor}>
                        <Badge fontSize="sm" m="2px 5px" colorScheme="orange">분류</Badge>
                        <span>{stock.spec.categoryName}</span>
                    </Text>
                    <Text fontWeight="bold" color={textColor}>
                        <Badge fontSize="sm" m="2px 5px" colorScheme="orange">스펙</Badge>
                        <span>{stock.spec.specification}</span>
                    </Text>
                    <Text fontWeight="bold" color={textColor}>
                        <Badge fontSize="sm" m="2px 5px" colorScheme="orange">비고</Badge>
                        <span>{stock.spec.remarks}</span>
                    </Text>
                </Card>
                <Card>
                    <Flex>
                        <Box bg="gray.100">
                            <Text fontWeight="bold" color={textColor}>
                                <Badge fontSize="sm" m="2px 5px" colorScheme="orange">창고</Badge>
                                <span>{stock.warehouse.warehouseName}</span>
                            </Text>
                            <Text fontWeight="bold" color={textColor}>
                                <Badge fontSize="sm" m="2px 5px" colorScheme="orange">위치</Badge>
                                <span>{stock.warehouse.location}</span>
                            </Text>
                            <Text fontWeight="bold" color={textColor}>
                                <Badge fontSize="sm" m="2px 5px" colorScheme="orange">적재량</Badge>
                                <span>{stock.actualQuantity} {stock.unit}</span>
                            </Text>
                        </Box>

                    </Flex>
                </Card>
            </Flex>


        </>
    );
}
export default StockDetail;