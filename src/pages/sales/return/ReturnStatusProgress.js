import {
    useSteps
} from '@chakra-ui/react'
import ProgressBar from "../../../components/common/ProgressBar";


function ReturnStatusProgress({status}) {
    const steps = [
        { title: '검수대기' },
        { title: '검수중' },
        { title: '검수완료' }
    ]

    const getStatusIndex = (status) => {
        switch (status) {
            case 'AWAITING_INSPECTION': return 1;
            case 'UNDER_INSPECTION': return 2;
            case 'INSPECTION_COMPLETED': return 3;
            default: return 1;
        }
    };

    const { activeStep, setActiveStep } = useSteps({
        index: status && getStatusIndex(status),
        count: steps.length,
    });

    return (
        <ProgressBar steps={steps} activeStep={activeStep}/>
    );
}

export default ReturnStatusProgress;