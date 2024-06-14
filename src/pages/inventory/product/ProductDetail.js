import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    callBomDeleteAPI,
    callProductAPI,
    callProductBomAPI,
    callProductListAPI,
    callProductsAPI, callProductSpecAPI, callSpecDeleteAPI
} from "../../../apis/ProductAPICalls";
import {
    Badge,
    Button, Divider,
    Flex,
    Modal, ModalBody, ModalCloseButton,
    ModalContent, ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure, useToast
} from "@chakra-ui/react";
import BomSave from "../../../modals/products/BomSave";
import CustomizedTable from "../../../components/table/product/CustomizedTable";
import BomUpdate from "../../../modals/products/BomUpdate";
import PagingBar from "../../../components/common/PagingBar";
import SpecSave from "../../../modals/products/SpecSave";
import SpecUpdate from "../../../modals/products/SpecUpdate";
import {statusToastAlert} from "../../../utils/ToastUtils";
function ProductDetail() {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { productCode } = useParams();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
    const { isOpen: isSpecOpen, onOpen: onSpecOpen, onClose: onSpecClose } = useDisclosure();
    const { isOpen: isSpecRegistOpen, onOpen: onSpecRegistOpen, onClose: onSpecRegistClose } = useDisclosure();
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [specCurrentPage,setSpecCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const product = useSelector(state => state.productReducer.product);
    const bom = useSelector(state => state.productReducer.bom);
    const bomPaging = useSelector(state => state.productReducer.bomPaging);
    const spec = useSelector(state => state.productReducer.spec);
    const specPaging = useSelector(state => state.productReducer.specPaging);
    const toast = useToast();




    useEffect(() => {
            setLoading(true);
             dispatch(callProductBomAPI({currentPage,productCode}));
             dispatch(callProductAPI({productCode}));
             dispatch(callProductSpecAPI({specCurrentPage,productCode}));
    }, [currentPage,specCurrentPage]);

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
        },
        {
            Header: '',
            accessor: 'edit'
        }
    ]

    const specColumns = [
        {
            Header: '코드',
            accessor: 'specCode'
        },
        {
            Header: '색상',
            accessor: 'color'
        },
        {
            Header: '종류',
            accessor: 'type'
        },
        {
            Header: '크기',
            accessor: 'size'
        },
        {
            Header: '',
            accessor: 'editSpec'
        }
    ]


    if(specPaging){
        console.log("스펙페이징",specPaging)
    }

    const bomTableTitle = "BOM ";     // 테이블 제목
    const bomBaseLink = "/inventory/product/bom";   // 상세조회 React 주소
    const bomIdAccessor = "bomCode";     // id로 사용할 컬럼 지정

    const specTableTitle = "상품 스펙 ";     // 테이블 제목
    const specBaseLink = "/inventory/product/spec";   // 상세조회 React 주소
    const specIdAccessor = "specCode";     // id로 사용할 컬럼 지정

//상품 수정
    const handleEditClick = (bom) => (event) => {
        event.stopPropagation(); // 이벤트 버블링 방지
        setSelectedProduct(bom);
        onEditModalOpen(); // 수정 모달 열기 함수 호출
    };

    // 상품 삭제
    const handleDeleteClick = (bom) => (event) => {
        event.stopPropagation();
        setSelectedProduct(bom);
        dispatch(callBomDeleteAPI({
            onSuccess: async () => {
                const title = 'BOM 삭제';
                const desc = 'BOM이 삭제 되었습니다.';
                statusToastAlert(title, desc, 'success');
                await dispatch(callProductBomAPI({currentPage,productCode}));
                await dispatch(callProductAPI({productCode}));
                onEditModalClose();
                navigate(`/inventory/product/${productCode}`, {replace: true});
            },
            selectedBom:bom.bomCode
        }));
    };


    let processedBoms;
    if(bom) {
        processedBoms = bom.map(el => ({
            ...el,
            edit: (() => {
                return (
                    <div>
                        <Button colorScheme="orange" size="sm"  float="right"
                                onClick={handleEditClick(el)}>BOM 수정</Button>
                        <BomUpdate productCode={productCode} bom={el} isOpen={isEditModalOpen} onClose={() => {
                            onEditModalClose();
                            setSelectedProduct(null);
                        }} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
                        <Button colorScheme="red" size="sm" onClick={handleDeleteClick(el)}>BOM 삭제</Button>
                    </div>
                );
            })()
        }));
    }

    //상품 스펙 수정
    const handleEditSpecClick = (spec) => (event) => {
        event.stopPropagation(); // 이벤트 버블링 방지
        setSelectedProduct(spec);
        onSpecOpen(); // 수정 모달 열기 함수 호출
    };

    //상품 스펙 삭제
    const handleSpecDeleteClick = (spec) => (event) => {
        event.stopPropagation();
        setSelectedProduct(spec);
        dispatch(callSpecDeleteAPI({
            onSuccess: async () => {
                const title = '상품 스펙 삭제';
                const desc = '상품 스펙 삭제가 완료 되었습니다.';
                statusToastAlert(title, desc, 'success');
                await dispatch(callProductSpecAPI({specCurrentPage:1,productCode}))
                await  dispatch(callProductBomAPI({currentPage:1,productCode}))
                await dispatch(callProductAPI({productCode}))
                onEditModalClose();
                navigate(`/inventory/product/${productCode}`, {replace: true});
            },
            selectedSpec:spec.specCode
        }));
    };
    let processedSpec;
    if(spec){
        processedSpec = spec.map(
            el => ({
                ...el,
                editSpec:(() => {
                    return(
                        <div>
                            <Button colorScheme="orange" size="sm"  float="right"
                                    onClick={handleEditSpecClick(el)}>스펙 수정</Button>
                            <SpecUpdate productCode={productCode} spec={el} isOpen={isSpecOpen} onClose={() => {
                                onSpecClose();
                                setSelectedProduct(null);
                            }} selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct}/>
                            <Button colorScheme="red" size="sm" onClick={handleSpecDeleteClick(el)}>스펙 삭제</Button>
                        </div>
                    )
                })()
            })
        )
    }



    return (
        <>
            {product && specPaging &&
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
                    <Divider mt='20px'/>
                    <Button colorScheme="orange" size="sm" onClick={onOpen} float="right" ml={5}>BOM 등록</Button>
                    <BomSave onClose={onClose} productCode={productCode} isOpen={isOpen}/>
                        <CustomizedTable
                            columnsData={bomColumns}
                            tableData={processedBoms}
                            tableTitle={bomTableTitle}
                            baseLink={bomBaseLink}
                            idAccessor={bomIdAccessor}
                        />
                    <PagingBar pageInfo={bomPaging} setCurrentPage={setCurrentPage} />
                    <Divider mt='20px'/>
                    <Button colorScheme="orange" size="sm" onClick={onSpecRegistOpen} float="right" ml={5}>스펙 등록</Button>
                    <SpecSave onClose={onSpecRegistClose} productCode={productCode} isOpen={isSpecRegistOpen}/>
                    <CustomizedTable
                        columnsData={specColumns}
                        tableData={processedSpec}
                        tableTitle={specTableTitle}
                        baseLink={specBaseLink}
                        idAccessor={specIdAccessor}
                    />
                    <PagingBar pageInfo={specPaging} setCurrentPage={setSpecCurrentPage} />
                </div>
            }
        </>
    );


}

export default ProductDetail;