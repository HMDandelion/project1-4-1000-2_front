import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {callMaterialDropAPI} from "../../apis/MaterialStockAPICalls";
import {
    Box,
    Button, ChakraProvider, Divider, IconButton, Input, InputGroup,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import CategoryItem from "./CategoryItem";
import {AddIcon} from "@chakra-ui/icons";
import {callMaterialCateCreateAPI} from "../../apis/MaterialSpecAPICalls";

function CategoryModal() {
    const [isOpen, setIsOpen] = useState(false); // 모달 상태를 직접 제어
    const dispatch = useDispatch();
    const { dropdown, successDrop } = useSelector(state => state.materialDropReducer);
    const searchType = "c";
    const [text, setText] = useState("");

    useEffect(() => {
        dispatch(callMaterialDropAPI({searchType}));
    }, [successDrop]);

    const addCategory = () => {
        console.log(text);
        dispatch(callMaterialCateCreateAPI(text));
        setText("");
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Button colorScheme="orange" size="sm" onClick={openModal}>
                카테고리 관리
            </Button>
            <ChakraProvider>
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <ModalOverlay>
                        <ModalContent minHeight="600px" maxHeight="600px">
                            <ModalHeader>
                                <Text justifyContent="center">카테고리 관리</Text>
                            </ModalHeader>
                            <ModalBody>
                                <InputGroup mb={5}>
                                    <Input placeholder='새로운 카테고리 입력' onChange={e => setText(e.target.value)} value={text}
                                           variant='outline' bg='secondaryGray.300' borderRadius='30px' w='400px' />
                                    <IconButton icon={<AddIcon/>} onClick={addCategory} ml='5px' bg='secondaryGray.300'/>
                                </InputGroup>
                                <Divider mb={5} color="gray.500"/>
                                <Box maxHeight="400px" overflowY="scroll" mb={2}
                                sx={{
                                    '&::-webkit-scrollbar': {
                                        display: 'none',
                                },
                                    '-ms-overflow-style': 'none',}
                                    }>
                                    {
                                        dropdown &&
                                        dropdown.map(category => (<CategoryItem key={category.code} category={category}/>))
                                    }
                                </Box>
                            </ModalBody>
                        </ModalContent>
                    </ModalOverlay>
                </Modal>
            </ChakraProvider>

        </>
    );
}
export default CategoryModal;
