import {Button} from "@chakra-ui/react";
import {DeleteIcon} from "@chakra-ui/icons";

function MaterialClientDelSpecBTN() {
    return (
        <>
            <Button colorScheme='gray' size='xs' onClick={() => navigate(`${url}`)}>
                <DeleteIcon/>
            </Button>
        </>
    );
}
export default MaterialClientDelSpecBTN;