import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Bar, Line, Scatter, Bubble } from 'react-chartjs-2';

// register chart.js plugins
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default function Chart(props:any) {

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        elements: {
            line: {
                tension: 0,
                borderWidth: 2,
                borderColor: '#2563EB',
                fill: "start",
            }
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            {/* <Line data={props.data} options={props.options} /> */}
        </div>
    )
} 