import { useState } from "react";

function JobDescription({ onAnalyze }) {

    const [jobDescription, setJobDescription] = useState("");

    return (

        <div className="mt-10 bg-white p-10 rounded-2xl shadow-md w-full max-w-xl mx-auto">

            <h2 className="text-2xl font-bold mb-5">
                Paste Job Description
            </h2>

            <textarea
                rows="10"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste any job description here..."
                className="w-full border rounded-lg p-4"
            />

            <button
                className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg"
                onClick={() => onAnalyze(jobDescription)}
            >
                Compare Resume
            </button>

        </div>

    );

}

export default JobDescription;
