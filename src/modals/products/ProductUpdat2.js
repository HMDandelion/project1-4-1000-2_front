import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import ProductUpdate from "./ProductUpdate";
import React from "react";

function ProductUpdat2({isOpen,onClose,selectedProduct, setSelectedProduct}){
    return(
        <>
            <Modal isOpen={isOpen} onClose={() => { onClose(); setSelectedProduct(null); }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader color={"navy"}>상품 수정</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedProduct && <ProductUpdate onClose={() => { onClose(); setSelectedProduct(null); }} product={selectedProduct}/>}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
export default ProductUpdat2;