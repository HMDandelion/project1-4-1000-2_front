import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {callSalesClientAPI} from "../../../apis/ClientAPICalls";
import {useParams} from "react-router-dom";
import StockRatio from "../../../chart/StockRatio";
import {callProductTotalAPI, callStocksAPI, callTotalStockAPI} from "../../../apis/StockAPICalls";
import {callProductAPI, callProductBomAPI, callProductListAPI, callProductsAPI} from "../../../apis/ProductAPICalls";
import {callDestroysTotalAPI, callProductDestroyAPI} from "../../../apis/StorageAPICalls";
import {
    Badge,
    Button,
    Flex,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import ClientModify from "../../sales/client/ClientModify";
import HorizonLine from "../../../components/common/HorizonLine";
import ColumnsTable from "../../../components/table/ComplexTable";
import ProductSave from "../../../modals/products/ProductSave";
import BomSave from "../../../modals/products/BomSave";
function ProductDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { productCode } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const product = useSelector(state => state.productReducer.product);
    const bom = useSelector(state => state.productReducer.bom);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await dispatch(callProductBomAPI({currentPage,productCode}));
            await dispatch(callProductAPI({productCode}));
            setLoading(false);
        };
        fetchData();
    }, [currentPage]);

    const bomColumns = [
        {
            Header: '코드',
            accessor: 'bomCode'
        },
        {
            Header: '원자재',
            accessor: 'materialName'
        },
        {
            Header: '수량',
            accessor: 'quantity'
        },
        {
            Header: '조립순서',
            accessor: 'sequence',
        }
    ]

    const bomTableTitle = "BOM ";     // 테이블 제목
    const bomBaseLink = "/inventory/product/bom";   // 상세조회 React 주소
    const bomIdAccessor = "bomCode";     // id로 사용할 컬럼 지정

    console.log("bom",bom);


    return (
        <>
            {product &&
                <div style={{ backgroundColor: '#ffffff', margin: '10px', padding: '10px', borderRadius: '5px' }}>
                    <Flex justify='space-between'>
                        <Text fontSize='3xl' fontWeight='800' color={textColor} m='10px'>
                            {product.data.productName}
                        </Text>
                    </Flex>
                    <Text fontWeight='bold' color={textColor}>
                        <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>가격</Badge><span>{product.data.price}원</span>
                    </Text>
                    <Text fontWeight='bold' color={textColor}>
                        <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>출시 일자</Badge><span>{product.data.launchDate}</span>
                    </Text>
                    <Flex align='center' fontWeight='bold' color={textColor}>
                        <Badge fontSize='sm' m='2px 5px' colorScheme='orange'>생산 상태</Badge>
                        <div className="status-container">
                            <div className={`status-circle ${product.data.status === "in_production" ? "green" : "red"}`}>
                                {product.data.status === "in_production" ? '\u2713' : '\u2715'}
                            </div>
                            <span className="status-text">
                            {product.data.status === "in_production" ? "생산가능" : "생산중단"}
                        </span>
                        </div>
                    </Flex>
                    <Button colorScheme="orange" size="sm" onClick={onOpen} float="right" ml={5}>BOM 등록</Button>
                    <BomSave onClose={onClose} productCode={productCode} isOpen={isOpen}/>
                        <ColumnsTable
                            columnsData={bomColumns}
                            tableData={bom}
                            tableTitle={bomTableTitle}
                            baseLink={bomBaseLink}
                            idAccessor={bomIdAccessor}
                        />

                    <HorizonLine />
                </div>
            }
        </>
    );


}

export default ProductDetail;