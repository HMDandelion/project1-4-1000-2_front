import WorkOrderForm from "./WorkOrderForm";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {callWorkOrderRegistAPI} from "../../apis/WorkOrderAPICalls";

function WorkOrderRegist(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const { success } = useSelector(state => state.WorkOrderReducer);

    useEffect(() => {
        if (success === true) navigate('/production/work-order');
    }, [success]);

    const onClickWorkOrderRegistHandler = () => {
        const formData = new FormData();
        formData.append('workOrderRegist', new Blob([JSON.stringify(form)],{ type: 'application/json' }) );
        dispatch(callWorkOrderRegistAPI({ registRequest : formData }))
    }
    return(
        <>
            <WorkOrderForm/>
            <div>
                <button onClick={ onClickWorkOrderRegistHandler }>등록</button>
                <button onClick={ () => navigate(-1) }>취소</button>
            </div>
        </>
    )
}

export default WorkOrderRegist;