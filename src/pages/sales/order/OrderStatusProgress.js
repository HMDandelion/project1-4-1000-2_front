import {
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps, Box, Progress, Text, Badge,
} from '@chakra-ui/react'


function OrderStatusProgress({status}) {
    const steps = [
        { title: '주문접수' },
        { title: '생산중' },
        { title: '출고대기' },
        { title: '배송중' },
        { title: '완료'},
    ]

    const getStatusIndex = (status) => {
        switch (status) {
            case 'ORDER_RECEIVED': return 1;
            case 'IN_PRODUCTION': return 2;
            case 'WAIT_SHIPPING': return 3;
            case 'SHIPPING': return 4;
            case 'COMPLETED': return 5;
        }
    };

    const { activeStep, setActiveStep } = useSteps({
        index: status && getStatusIndex(status),
        count: steps.length,
    });

    const max = steps.length - 1;
    const progressPercent = (activeStep / max) * 100;


    return (
        <Box position='relative' m='30px 20px 40px 20px' >
            <Stepper size='xs' index={activeStep} colorScheme='orange' gap='0'>
                {steps.map((step, index) => (
                    <Step key={index} gap='0'>
                        <StepIndicator bg='white'>
                            <StepStatus complete={<StepIcon/>}/>
                        </StepIndicator>
                        <Text color='secondaryGray.800' fontSize='xs' position='absolute' top={5}
                              left='0%' whiteSpace='nowrap'>
                            {step.title}
                        </Text>
                        <StepSeparator _horizontal={{ ml: '0' }} />
                    </Step>
                ))}
            </Stepper>
            <Progress
                value={progressPercent}
                position='absolute'
                height='3px'
                width='full'
                top='10px'
                zIndex={-1}
            />
        </Box>
    )

}

export default OrderStatusProgress;