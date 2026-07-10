function StatCard({ title, value, color }) {
    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">

            <h3 className="text-gray-500 text-sm font-semibold uppercase">
                {title}
            </h3>

            <p className={`text-4xl font-bold mt-3 ${color}`}>
                {value}
            </p>

        </div>
    );
}

export default StatCard;