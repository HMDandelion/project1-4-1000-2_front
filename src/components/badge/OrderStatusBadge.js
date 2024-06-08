import {Badge, Button} from "@chakra-ui/react";

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
            case 'CANCELED':
                return (
                    <Badge colorScheme='red' size='xs'>주문취소</Badge>
                );
        }
    };

    return (
        getStatusText(value)
    );
}

export default OrderStatusBadge;