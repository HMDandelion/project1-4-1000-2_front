import React from 'react';
import moment from "moment";
import {Icon} from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";

const CustomToolbar = (toolbar) => {
    const goToBack = () => {
        toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
        toolbar.onNavigate('NEXT');
    };

    const goToCurrent = () => {
        toolbar.onNavigate('TODAY');
    };

    const label = () => {
        const date = moment(toolbar.date);
        return (
            <span>
                {date.format('YYYY년 MM월')}
            </span>
        );
    };

    return (
        <div className="rbc-toolbar">
            <span className="rbc-btn-group">
                <button type="button" style={{border:'0'}} onClick={goToBack}><Icon as={ChevronLeftIcon}/></button>
                <span className="rbc-toolbar-label">{label()}</span>
                {/*<button type="button" onClick={goToCurrent}>오늘</button>*/}
                <button type="button"  style={{border:'0'}} onClick={goToNext}><Icon as={ChevronRightIcon}/></button>
            </span>

        </div>
    );
};

export default CustomToolbar;