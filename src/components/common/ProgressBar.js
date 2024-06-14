import {
    Box,
    Progress,
    Step,
    StepIcon,
    StepIndicator,
    Stepper,
    StepSeparator,
    StepStatus,
    Text,
    useSteps
} from "@chakra-ui/react";

function ProgressBar({steps, activeStep}) {
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

export default ProgressBar;