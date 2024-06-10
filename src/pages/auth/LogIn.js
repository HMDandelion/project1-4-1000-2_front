import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    Text,
    InputGroup, InputRightElement,
    useColorModeValue, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverBody
} from "@chakra-ui/react";
import {RiEyeCloseLine} from "react-icons/ri";
import {MdOutlineRemoveRedEye} from "react-icons/md";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {callLoginAPI} from "../../apis/AuthAPICalls";
import {useNavigate} from "react-router-dom";

function LogIn() {
    const textColor = useColorModeValue("navy.700", "white");
    const textColorSecondary = "gray.400";
    const brandStars = useColorModeValue("brand.500", "brand.400");
    const [show, setShow] = useState(false);

    const handleClick = () => setShow(!show);
    const {success} = useSelector(state => state.authReducer);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});

    useEffect(() => {
        if(success === true) {
            navigate('/');
        }
    }, [success]);

    const onChangeHandler = e => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickLoginHandler = () => {
        dispatch(callLoginAPI({ loginRequest : form }));
    }

    return (
            <Flex
                maxW={{ base: "100%", md: "max-content" }}
                w='100%'
                mx={{ base: "auto", lg: "0px" }}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{ base: "30px", md: "60px" }}
                px={{ base: "25px", md: "0px" }}
                mt={{ base: "40px", md: "14vh" }}
                flexDirection='column'>
                <Box me='auto'>
                    <Text color={textColor} fontSize='40px' mb='5px' mt='50px' fontWeight='800'>
                        로그인
                    </Text>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'>
                        일사천리와 함께 하는 당신을 응원합니다.
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{ base: "100%", md: "420px" }}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{ base: "auto", lg: "unset" }}
                    me='auto'
                    mb={{ base: "20px", md: "auto" }}>

                    <FormControl>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            mb='8px'>
                            사번<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='sm'
                            ms={{ base: "0px", md: "0px" }}
                            type='email'
                            placeholder='사번을 입력해주세요'
                            mb='24px'
                            fontWeight='500'
                            size='lg'
                            name='employeeNo'
                            onChange={onChangeHandler}
                        />
                        <FormLabel
                            ms='4px'
                            fontSize='sm'
                            fontWeight='500'
                            color={textColor}
                            display='flex'>
                            비밀번호<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                isRequired={true}
                                fontSize='sm'
                                placeholder='비밀번호를 입력해주세요'
                                mb='24px'
                                size='lg'
                                type={show ? "text" : "password"}
                                variant='auth'
                                name='password'
                                onChange={onChangeHandler}
                            />
                            <InputRightElement display='flex' alignItems='center' mt='4px'>
                                <Icon
                                    color={textColorSecondary}
                                    _hover={{ cursor: "pointer" }}
                                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                                    onClick={handleClick}
                                />
                            </InputRightElement>
                        </InputGroup>
                        <Button
                            fontSize='sm'
                            colorScheme='orange'
                            fontWeight='500'
                            w='100%'
                            h='50'
                            my='14px'
                            onClick={ onClickLoginHandler }
                        >
                            로그인
                        </Button>
                    </FormControl>
                    <Flex justifyContent='flex-end' align='center' mb='24px'>
                        <Popover>
                            <PopoverTrigger>
                                <Text
                                    cursor='pointer'
                                    color='secondaryGray.500'
                                    fontSize='sm'
                                    align='right'
                                    pr='5px'
                                    fontWeight='500'>
                                    비밀번호를 잊어버리셨나요?
                                </Text>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverBody fontSize='sm'>
                                    비밀번호 초기화 및 계정 관련 안내사항은 각 기업의 담당자에게 문의하세요.
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Flex>
                </Flex>
            </Flex>
    );
}

export default LogIn;