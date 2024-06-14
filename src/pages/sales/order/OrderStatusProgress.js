import {
    useSteps
} from '@chakra-ui/react'
import ProgressBar from "../../../components/common/ProgressBar";


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

    return (
        <ProgressBar steps={steps} activeStep={activeStep}/>
    )

}

export default OrderStatusProgress;