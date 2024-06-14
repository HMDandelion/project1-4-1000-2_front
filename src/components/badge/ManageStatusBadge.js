import {Badge} from "@chakra-ui/react";

function ManageStatusBadge(value) {
    const getStatusText = (value) => {
        switch (value) {
            case 'RETURN_RECEIVED':
                return (
                    <Badge colorScheme='orange' size='xs'>반품접수</Badge>
                );
            case 'REFUNDED':
                return (
                    <Badge colorScheme='green' size='xs'>환불됨</Badge>
                );
            case 'IN_PRODUCTION':
                return (
                    <Badge colorScheme='purple' size='xs'>생산중</Badge>
                );
            case 'WAIT_SHIPPING':
                return (
                    <Badge colorScheme='cyan' size='xs'>배송대기</Badge>
                );
            case 'SHIPPING':
                return (
                    <Badge colorScheme='teal' size='xs'>배송중</Badge>
                );
            case 'COMPLETED':
                return (
                    <Badge colorScheme='green' size='xs'>최종완료</Badge>
                );
            case 'CANCELED':
                return (
                    <Badge colorScheme='red' size='xs'>반품취소</Badge>
                );
        }
    };

    return (
        getStatusText(value)
    );
}

export default ManageStatusBadge;