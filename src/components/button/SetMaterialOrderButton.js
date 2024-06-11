import {Button} from "@chakra-ui/react";
import {useNavigate} from "react-router-dom";

function SetMaterialOrderButton({specCode,clientCode}) {
    const navigate = useNavigate();
    const url = "/purchase/material/orders"

    return (
        <Button colorScheme='gray' size='xs' onClick={() => navigate(`${url}`)}>
            주문하기
        </Button>
    );
}

export default SetMaterialOrderButton;