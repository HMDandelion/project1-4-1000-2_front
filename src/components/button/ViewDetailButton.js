import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function ViewDetailButton(url, code) {
    const navigate = useNavigate();

    return (
        <Button colorScheme='gray' size='xs' onClick={() => navigate(`${url}`, {state: code})}>
            상세보기
        </Button>
    );
}

export default ViewDetailButton;