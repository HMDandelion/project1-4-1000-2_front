import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import ProductSave from "./ProductSave";
import React from "react";

function ProductSave2({isOpen,onClose}){
    return(
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={"navy"}>상품 등록</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ProductSave onClose={onClose} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default ProductSave2;