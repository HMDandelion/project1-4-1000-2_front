import {Badge} from "@chakra-ui/react";

function ReturnStatusBadge(value) {
    const getStatusText = (value) => {
        switch (value) {
            case 'AWAITING_INSPECTION':
                return (
                    <Badge colorScheme='orange' size='xs'>검수대기</Badge>
                );
            case 'UNDER_INSPECTION':
                return (
                    <Badge colorScheme='purple' size='xs'>검수중</Badge>
                );
            case 'INSPECTION_COMPLETED':
                return (
                    <Badge colorScheme='green' size='xs'>검수완료</Badge>
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

export default ReturnStatusBadge;