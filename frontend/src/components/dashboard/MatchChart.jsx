import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function MatchChart({ score }) {

    const data = [
        {
            name: "Job Match",
            score: score
        }
    ];

    return (

        <div className="bg-white rounded-2xl shadow-md p-6">

            <h2 className="text-xl font-bold mb-4">
                Resume Match
            </h2>

            <div className="h-72">

                <ResponsiveContainer>

                    <BarChart data={data}>

                        <XAxis dataKey="name" />

                        <YAxis domain={[0, 100]} />

                        <Tooltip />

                        <Bar
                            dataKey="score"
                            radius={[8, 8, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );
}

export default MatchChart;