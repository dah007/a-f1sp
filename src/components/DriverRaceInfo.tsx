// Sample JSON data
const jsonData = [
    { x: 50, y: 60 },
    { x: 150, y: 120 },
    { x: 250, y: 180 },
    { x: 350, y: 240 },
    { x: 450, y: 300 },
];

const DriverRaceInfo: React.FC = () => {
    // Get the canvas element and its context
    const canvas = document.getElementById(
        'myCanvas',
    ) as unknown as HTMLCanvasElement;
    const ctx = canvas?.getContext('2d');

    // Function to plot points on the canvas
    function plotPoints(data: { x: number; y: number }[]) {
        data.forEach((point) => {
            if (ctx) {
                ctx.beginPath();
                ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = 'blue';
                ctx.fill();
                ctx.stroke();
            }
        });
    }

    // Plot the points
    plotPoints(jsonData);
    return (
        <>
            <canvas
                id="myCanvas"
                width="800"
                height="600"
                style={{ border: '1px solid #000000' }}
            ></canvas>
        </>
    );
};

export default DriverRaceInfo;
