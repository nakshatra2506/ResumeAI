function ScoreCircle({ score }) {

    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (score / 100) * circumference;

    return (

        <div className="flex justify-center">

            <svg width="180" height="180">

                <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                />

                <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    stroke="#2563EB"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform="rotate(-90 90 90)"
                />

                <text
                    x="90"
                    y="100"
                    textAnchor="middle"
                    className="fill-black text-3xl font-bold"
                >
                    {score}%
                </text>

            </svg>

        </div>

    );
}

export default ScoreCircle;