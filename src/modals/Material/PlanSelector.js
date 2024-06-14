import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Box, Container, Radio, RadioGroup, Stack, Text, useIds} from "@chakra-ui/react";
import {callSimplePlanningAPI} from "../../apis/PlanningAPICalls";

function PlanSelector({setPlanCode, existingPlan}) {
    const dispatch = useDispatch();
    const { plannings } = useSelector(state => state.planningReducer);

    useEffect(() => {
        dispatch(callSimplePlanningAPI());
        },[]
    );
    return (
        plannings &&
        <Box>
            <Text fontWeight='600' color='secondaryGray.900'>생산계획 선택</Text>
            <Box overflowY="auto" h="230px" mt={4} pr={4} w='350px'>
                <RadioGroup
                    onChange={setPlanCode}
                    value={existingPlan}
                >
                    <Stack direction="column">
                        {plannings.map((plan) => (
                            <Box
                                as="label"
                                key={plan.planCode}
                                borderWidth="1px"
                                borderRadius="md"
                                overflow="hidden"
                                bg={existingPlan == plan.planCode ? 'orange.400' : 'gray.100'}
                                color={existingPlan == plan.planCode ? 'secondaryGray.900' : 'secondaryGray.800'}
                                _hover={{bg: existingPlan == plan.planCode ? 'orange.400' : 'gray.200'}}
                                py={2}
                                cursor="pointer"
                                >
                                <Container fontWeight='600' fontSize='14px'>
                                    <Radio value={plan.planCode} style={{display: 'none'}}/>
                                    {plan.startAt}<span>_</span>
                                    {plan.planCode}
                                </Container>
                            </Box>
                        ))}
                    </Stack>
                </RadioGroup>
            </Box>
        </Box>
    );
}
export default PlanSelector;