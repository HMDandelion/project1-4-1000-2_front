import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function StockRatio({ products, total, productTotal }) {
    const labels = products.map(product => product.productName);

    const accumulateQuantities = productTotal.data.map(item => item.accumulateQuantity);
    const ratio = productTotal.data.map(item => item.ratio);

    const data = {
        labels: labels,
        datasets: [
            {
                label: '',
                data: accumulateQuantities,
                backgroundColor: "orange",
                borderColor: "orange",
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    formatter: (value, context) => {
                        return ratio[context.dataIndex] + '%';
                    },
                    color: 'navy', // 색상을 네이비로 변경
                    font: {
                        weight: 'bold',
                        size: 12, // 글자 크기를 조정
                    }
                }
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                display: true,
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false,
                },
            },
            x: {
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <Box p={5} borderWidth="1px" borderRadius="lg" width="100%" height="40%">
            <Text fontSize="lg" color="gray.500">총 누적 재고량</Text>
            <Text fontSize="4xl" fontWeight="bold" color="navy">{total.data}</Text>
            <Bar data={data} options={options} plugins={[ChartDataLabels]} />
        </Box>
    );
}

export default StockRatio;
