import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function ViewDetailButton(url) {
    const navigate = useNavigate();

    return (
        <Button colorScheme='gray' size='xs' onClick={() => navigate(`${url}`)}>
            상세보기
        </Button>
    );
}

export default ViewDetailButton;