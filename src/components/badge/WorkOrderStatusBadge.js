import {Badge} from "@chakra-ui/react";

function WorkOrderStatusBadge({value}) {
    const getStatusText = (status) => {
        switch (status) {
            case 'inProgress':
                return (
                    <Badge colorScheme='orange' size='xs'>진행중</Badge>
                );
            case 'done':
                return (
                    <Badge colorScheme='red' size='xs'>완료</Badge>
                );
        }
    };

    return (
        getStatusText(value)
    );
}

export default WorkOrderStatusBadge;