import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {callSalesClientAPI} from "../../../apis/ClientAPICalls";
import {useParams} from "react-router-dom";

function ClientDetail() {

    const dispatch = useDispatch();
    const { clientCode } = useParams();
    const { client } = useSelector(state => state.clientReducer);

    useEffect(() => {
        dispatch(callSalesClientAPI({clientCode}));
    }, []);


    return (
        client &&
        <>
            <div>
                {client.clientName}
            </div>
        </>
    );
}

export default ClientDetail;