import {
    Button,
    FormControl, FormLabel, HStack, Input,
    ModalBody,
    ModalCloseButton,
    ModalHeader, NumberInput, NumberInputField, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import DaumPostcodeEmbed from "react-daum-postcode";
import React, {useEffect} from "react";
import DropDownMenu from "../../../components/common/DropDownMenu";
import {useDispatch, useSelector} from "react-redux";
import {callMaterialDropAPI} from "../../../apis/MaterialStockAPICalls";

function SpecForm({spec, setForm}) {
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const { onOpen, onClose, isOpen } = useDisclosure()
    const { dropdown } = useSelector(state => state.materialDropReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        const searchType = "c";
            dispatch(callMaterialDropAPI({searchType}))
        },[]
    );

    const onChangeHandler = e => {
        setForm && setForm({
            ...spec,
            [e.target.name] : e.target.value
        });
    }
    const onNumberInputChangeHandler = (value) => {
        setForm && setForm({
            ...spec,
            safetyStock: value
        });
    };
    const dropdownHandler = (value) => {
        setForm && setForm({
            ...spec,
            categoryCode : value
        });
    };

    return (
        <>
            <ModalHeader fontWeight='800' color={textColor}>원자재 스펙 설정</ModalHeader>
            <ModalCloseButton/>
            <ModalBody borderTop='1px solid' borderColor='secondaryGray.100' p='30px 40px'>
                <VStack spacing={4} align="stretch">
                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>자재명</FormLabel>
                        <Input placeholder="자재명을 입력하세요" _placeholder={{fontSize: 'sm'}}
                               name='materialName' value={spec.materialName}
                               onChange={onChangeHandler}/>
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>카테고리 선택</FormLabel>
                        {
                            dropdown &&
                            <DropDownMenu dropDownList={dropdown} setValue={dropdownHandler} fontColor={textColor}/>
                        }
                    </FormControl>

                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>측정 단위</FormLabel>
                        <Input placeholder="kg, pcs, ea...etc" mt={2} _placeholder={{fontSize: 'sm'}}
                               name="unit" value={spec.unit}
                               onChange={onChangeHandler}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>상세 스펙</FormLabel>
                        <Input placeholder="해드크기, 규격 등 " mt={2} _placeholder={{fontSize: 'sm'}}
                               name="specification" value={spec.specification}
                               onChange={onChangeHandler}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>비고</FormLabel>
                        <Input placeholder="..." mt={2} _placeholder={{fontSize: 'sm'}}
                               name="remarks" value={spec.remarks}
                               onChange={onChangeHandler}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel fontWeight='800' color={textColor}>안전 재고</FormLabel>
                        <NumberInput
                                     onChange={onNumberInputChangeHandler}>
                            <NumberInputField
                                placeholder="" mt={2} _placeholder={{fontSize: 'sm'}}
                                name="safetyStock" value={spec.safetyStock}/>
                        </NumberInput>
                    </FormControl>
                </VStack>
            </ModalBody>
        </>
    );
}
export default SpecForm;