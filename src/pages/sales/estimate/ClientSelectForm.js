import {useDispatch, useSelector} from "react-redux";
import {
    Box,
    Button,
    Center, Container, Divider, FormControl,
    Grid,
    GridItem, HStack, IconButton,
    Input,
    InputGroup,
    InputRightElement, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger,
    Radio,
    RadioGroup, Select, Stack, Text,
    useDisclosure,
    VStack, Wrap
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {callSimpleSalesClientsAPI} from "../../../apis/ClientAPICalls";
import DaumPostcodeEmbed from "react-daum-postcode";

function ClientSelectForm({handleClientType, handleNewClient, handleExistingClient}) {
    const dispatch = useDispatch();
    const { onOpen, onClose, isOpen } = useDisclosure();

    const [clientType, setClientType] = useState('existing');
    const [existingClient, setExistingClient] = useState('');
    const [newClient, setNewClient] = useState({
        clientName : '',
        address : '',
        addressDetail : '',
        postcode: '',
        representativeName : '',
        phoneFirst: '',
        phoneSecond: '',
        phoneThird: '',
        phone: ''
    });

    const { simpleClients } = useSelector(state => state.clientReducer);

    useEffect(() => {
        dispatch(callSimpleSalesClientsAPI());
    }, [dispatch]);

    useEffect(() => handleClientType(clientType), [clientType]);
    useEffect(() => handleNewClient(newClient), [newClient]);
    useEffect(() => handleExistingClient(existingClient), [existingClient]);

    const handleExistingClientChange = (value) => setExistingClient(value);

    const handleNewClientChange = (e) => setNewClient({ ...newClient, [e.target.name]: e.target.value });

    const addressCompleteHandler = (data, state) => {
        setNewClient({
            ...newClient,
            address : data.address,
            postcode : data.zonecode,
        })
        onClose();
    }

    return (
        <>
            <RadioGroup onChange={setClientType} value={clientType} colorScheme='orange'>
                <Grid templateColumns='repeat(13, 1fr)'>
                    <GridItem/>
                    <GridItem colSpan={5}>
                        <VStack mt={4} spacing={2} align='left'>
                            <Radio value="existing">
                                <Text fontWeight='600' color='secondaryGray.900'>기존 거래처 선택</Text>
                            </Radio>
                            <Box overflowY="auto" h="230px" mt={4} pr={4}>
                                <RadioGroup
                                    onChange={handleExistingClientChange}
                                    value={existingClient}
                                    isDisabled={clientType !== 'existing'}
                                >
                                    <Stack direction="column">
                                        {simpleClients && simpleClients.map((client) => (
                                            <Box
                                                as="label"
                                                key={client.clientCode}
                                                borderWidth="1px"
                                                borderRadius="md"
                                                overflow="hidden"
                                                bg={existingClient == client.clientCode ? 'orange.400' : 'gray.100'}
                                                color={existingClient == client.clientCode ? 'secondaryGray.900' : 'secondaryGray.800'}
                                                _hover={{bg: existingClient == client.clientCode ? 'orange.600' : 'gray.200'}}
                                                py={2}
                                                cursor="pointer"
                                                {...(clientType !== 'existing') && {
                                                        opacity: 0.5,
                                                        cursor: 'not-allowed',
                                                        pointerEvents: 'none'
                                                }}>
                                                <Container fontWeight='600' fontSize='14px'>
                                                    <Radio value={client.clientCode} style={{display: 'none'}}/>
                                                    {client.clientCode}<span> ｜ </span>
                                                    {client.clientName}
                                                </Container>
                                            </Box>
                                        ))}
                                    </Stack>
                                </RadioGroup>

                            </Box>
                        </VStack>
                    </GridItem>

                    <GridItem colSpan={1}>
                        <Center height='300px'>
                            <Divider orientation='vertical' />
                        </Center>
                    </GridItem>

                    <GridItem colSpan={5}>
                        <VStack mt={4} spacing={2} align='left'>
                            <Radio value="new">
                                <Text fontWeight='600' color='secondaryGray.900'>신규 거래처 등록</Text>
                            </Radio>
                            <FormControl>
                                <Input placeholder="거래처명" size='sm' name="clientName" value={newClient.clientName} borderRadius="md"
                                       disabled={clientType !== 'new'} onChange={handleNewClientChange} />
                            </FormControl>
                            <FormControl>
                                <Input placeholder="대표자명" size='sm' name="representativeName" value={newClient.representativeName} borderRadius="md"
                                       disabled={clientType !== 'new'} onChange={handleNewClientChange} />
                            </FormControl>
                            <FormControl>
                                <HStack spacing={2}>
                                    <Input maxLength={3} placeholder="010" name='phoneFirst' value={newClient.phoneFirst} size='sm' borderRadius="md"
                                           disabled={clientType !== 'new'} onChange={handleNewClientChange}/><span>-</span>
                                    <Input maxLength={4} placeholder="0000" name='phoneSecond' value={newClient.phoneSecond} size='sm' borderRadius="md"
                                           disabled={clientType !== 'new'} onChange={handleNewClientChange}/><span>-</span>
                                    <Input maxLength={4} placeholder="0000" name='phoneThird' value={newClient.phoneThird} size='sm' borderRadius="md"
                                           disabled={clientType !== 'new'} onChange={handleNewClientChange}/>
                                </HStack>
                            </FormControl>
                            <FormControl>
                                <Input placeholder="우편번호" width="40%" size='sm' name="postcode" value={newClient.postcode} borderRadius="md"
                                       disabled={clientType !== 'new'} onChange={handleNewClientChange} />
                                <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose} isLazy
                                         placement='right' closeOnBlur={false}>
                                    <PopoverTrigger>
                                        <Button colorScheme="orange" variant="outline" size='sm' ml={1}
                                                disabled={clientType !== 'new'}>주소 검색</Button>
                                    </PopoverTrigger>
                                    <PopoverContent>
                                        <PopoverArrow/>
                                        <PopoverBody>
                                            <DaumPostcodeEmbed onComplete={addressCompleteHandler} onClose={onClose}/>
                                        </PopoverBody>
                                    </PopoverContent>
                                </Popover>
                                <Input placeholder="주소" size='sm' name="address" value={newClient.address} borderRadius="md" my={1}
                                       disabled={clientType !== 'new'} onChange={handleNewClientChange} />
                                <Input placeholder="상세주소" size='sm' name="addressDetail" value={newClient.addressDetail} borderRadius="md"
                                       disabled={clientType !== 'new'} onChange={handleNewClientChange} />
                            </FormControl>

                        </VStack>
                    </GridItem>
                    <GridItem/>

                </Grid>
            </RadioGroup>

        </>
    );
}

export default ClientSelectForm;