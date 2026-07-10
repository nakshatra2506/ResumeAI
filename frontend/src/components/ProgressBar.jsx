function ProgressBar({ title, value, color }) {
    return (
        <div className="mb-5">

            <div className="flex justify-between mb-2">
                <span className="font-medium">{title}</span>
                <span>{value}%</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4">

                <div
                    className={`${color} h-4 rounded-full transition-all duration-700`}
                    style={{ width: `${value}%` }}
                />

            </div>

        </div>
    );
}

export default ProgressBar;