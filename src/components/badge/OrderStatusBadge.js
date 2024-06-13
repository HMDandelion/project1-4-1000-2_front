import {Badge} from "@chakra-ui/react";

function OrderStatusBadge(value) {
    const getStatusText = (value) => {
        switch (value) {
            case 'ORDER_RECEIVED':
                return (
                    <Badge colorScheme='orange' size='xs'>주문접수</Badge>
                );
            case 'RETURNED':
                return (
                    <Badge colorScheme='blue' size='xs'>반품</Badge>
                );
            case 'IN_PRODUCTION':
                return (
                    <Badge colorScheme='purple' size='xs'>생산중</Badge>
                );
            case 'WAIT_SHIPPING':
                return (
                    <Badge colorScheme='pink' size='xs'>배송대기</Badge>
                );
            case 'SHIPPING':
                return (
                    <Badge colorScheme='teal' size='xs'>배송중</Badge>
                );
            case 'CANCELED':
                return (
                    <Badge colorScheme='cyan' size='xs'>주문취소</Badge>
                );
            case 'COMPLETED':
                return (
                    <Badge colorScheme='green' size='xs'>최종완료</Badge>
                );
        }
    };

    return (
        getStatusText(value)
    );
}

export default OrderStatusBadge;