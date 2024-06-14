const CustomEventComponent = ({ event }) => {
    return (
        <div style={{
            backgroundColor: '#3174ad', // 막대 그래프의 색상
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block',
            textAlign: 'left'
        }}>
            {event.title}
        </div>
    );
};

export default CustomEventComponent;