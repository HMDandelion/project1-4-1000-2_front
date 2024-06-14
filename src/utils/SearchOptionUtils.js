export const searchOption = (option) => {
    switch (option) {
        case '거래처명' : return 'clientName';
        case '대표명' : return 'representativeName';
        case '상품명' : return 'productName';
        default : return null;
    }
}