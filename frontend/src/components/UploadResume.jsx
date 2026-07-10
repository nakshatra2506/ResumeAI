import { useState } from "react";
import api from "../services/api";

import ProgressBar from "./ProgressBar";
import ScoreCircle from "./ScoreCircle";

import StatCard from "./dashboard/StatCard";
import MatchChart from "./dashboard/MatchChart";

import jsPDF from "jspdf";

function UploadResume() {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState(null);

    const [jobDescription, setJobDescription] = useState("");

    const [feedback, setFeedback] = useState("");

    const [jobMatch, setJobMatch] = useState(null);
    const [tailoredResume, setTailoredResume] = useState("");


    function handleChange(event) {
        setFile(event.target.files[0]);
    }


    function downloadReport() {

        if (!result) return;

        const pdf = new jsPDF();

        pdf.setFontSize(22);
        pdf.text("ResumeAI Analysis Report", 20, 20);

        pdf.setFontSize(14);

        pdf.text(`Name : ${result.candidate.name}`, 20, 40);
        pdf.text(`Email : ${result.candidate.email}`, 20, 50);
        pdf.text(`Phone : ${result.candidate.phone}`, 20, 60);

        pdf.text(
            `ATS Score : ${result.ats.overall_score}%`,
            20,
            80
        );

        if (jobMatch) {

            pdf.text(
                `Job Match : ${jobMatch.match_score}%`,
                20,
                90
            );

        }

        pdf.text("AI Feedback", 20, 110);

        const lines = pdf.splitTextToSize(
            feedback,
            170
        );

        pdf.text(lines, 20, 120);

        pdf.save("Resume_Report.pdf");

    }


    async function uploadResume() {

        if (!file) {

            alert("Please upload a resume.");

            return;

        }

        if (!jobDescription.trim()) {

            alert("Please paste a Job Description.");

            return;

        }

        const formData = new FormData();

        formData.append("file", file);

        setLoading(true);

        try {

            //----------------------------------
            // Upload Resume
            //----------------------------------

            const response = await api.post(

                "/upload-resume",

                formData

            );

            setResult(response.data);

            //----------------------------------
            // Job Match
            //----------------------------------

            const matchResponse = await api.post(

                "/job-match",

                {

                    resume_skills: response.data.skills,

                    job_description: jobDescription

                }

            );

            setJobMatch(matchResponse.data);

            //----------------------------------
            // Build Resume Text
            //----------------------------------

            const resumeText = `

Candidate Name:
${response.data.candidate.name}

Email:
${response.data.candidate.email}

Phone:
${response.data.candidate.phone}

Skills:
${response.data.skills.join(", ")}

ATS Overall Score:
${response.data.ats.overall_score}

Technical Skills:
${response.data.ats.technical_score}

Experience:
${response.data.ats.experience_score}

Projects:
${response.data.ats.project_score}

Education:
${response.data.ats.education_score}

Resume Format:
${response.data.ats.format_score}

`;

            //----------------------------------
            // AI Feedback
            //----------------------------------

            const aiResponse = await api.post(

                "/feedback",

                {

                    resume: resumeText,

                    job_description: jobDescription

                }

            );

            setFeedback(aiResponse.data.feedback);
            //----------------------------------
// AI Resume Tailoring
//----------------------------------

const tailorResponse = await api.post(
    "/tailor-resume",
    {
        resume: resumeText,
        job_description: jobDescription
    }
);

setTailoredResume(tailorResponse.data.tailored_resume);

        }

        catch (error) {

            console.log(error);

            if (error.response) {

                console.log(error.response.data);

            }

            alert("Upload Failed");

        }

        setLoading(false);

    }

    return (

        <div className="mt-16 bg-white p-10 rounded-2xl shadow-md w-full max-w-4xl mx-auto">

            <h2 className="text-3xl font-bold mb-6">

                Upload Your Resume

            </h2>

            <input

                type="file"

                accept=".pdf"

                onChange={handleChange}

                className="block w-full border rounded-lg p-3"

            />

            {file && (

                <p className="mt-3 text-green-600">

                    ✅ {file.name}

                </p>

            )}

            {/* Job Description */}

<div className="mt-8">

    <h3 className="text-xl font-bold mb-3">
        Paste Job Description
    </h3>

    <textarea
        rows={8}
        placeholder="Paste the Job Description here..."
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        className="w-full border rounded-lg p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

</div>
            <button

                onClick={uploadResume}

                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"

            >

                Analyze Resume

            </button>

            {loading && (

                <p className="mt-5 text-blue-600">

                    Analyzing Resume...

                </p>

            )}

            {result && (
                                <div className="mt-10 border-t pt-8 space-y-10">

                    {/* Dashboard Cards */}

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                        <StatCard
                            title="ATS Score"
                            value={`${result.ats.overall_score}%`}
                            color="text-green-600"
                        />

                        <StatCard
                            title="Skills"
                            value={result.skills.length}
                            color="text-blue-600"
                        />

                        <StatCard
                            title="Job Match"
                            value={
                                jobMatch
                                    ? `${jobMatch.match_score}%`
                                    : "--"
                            }
                            color="text-purple-600"
                        />

                        <StatCard
                            title="Projects"
                            value={result.ats.project_score}
                            color="text-orange-600"
                        />

                    </div>

                    {/* ATS Score */}

                    <div>

                        <h3 className="text-2xl font-bold mb-5">

                            ATS Score

                        </h3>

                        <ScoreCircle
                            score={result.ats.overall_score}
                        />

                    </div>

                    {/* Candidate */}

                    <div>

                        <h3 className="text-xl font-bold mb-4">

                            Candidate Information

                        </h3>

                        <p>
                            <b>Name:</b> {result.candidate.name}
                        </p>

                        <p>
                            <b>Email:</b> {result.candidate.email}
                        </p>

                        <p>
                            <b>Phone:</b> {result.candidate.phone}
                        </p>

                    </div>

                    {/* Skills */}

                    <div>

                        <h3 className="text-xl font-bold mb-4">

                            Skills Detected

                        </h3>

                        <div className="flex flex-wrap gap-2">

                            {result.skills.map((skill, index) => (

                                <span
                                    key={index}
                                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                                >

                                    {skill}

                                </span>

                            ))}

                        </div>

                    </div>

                    {/* ATS Breakdown */}

                    <div>

                        <h3 className="text-xl font-bold mb-4">

                            ATS Breakdown

                        </h3>

                        <ProgressBar
                            title="Technical Skills"
                            value={result.ats.technical_score}
                            color="bg-blue-500"
                        />

                        <ProgressBar
                            title="Experience"
                            value={result.ats.experience_score}
                            color="bg-green-500"
                        />

                        <ProgressBar
                            title="Projects"
                            value={result.ats.project_score}
                            color="bg-purple-500"
                        />

                        <ProgressBar
                            title="Education"
                            value={result.ats.education_score}
                            color="bg-yellow-500"
                        />

                        <ProgressBar
                            title="Resume Format"
                            value={result.ats.format_score}
                            color="bg-red-500"
                        />

                    </div>

                    {/* Job Match */}

                    {jobMatch && (

                        <div>

                            <h3 className="text-2xl font-bold mb-4">

                                Resume vs Job Match

                            </h3>

                            <MatchChart
                                score={jobMatch.match_score}
                            />

                            <div className="mt-6">

                                <h4 className="font-bold mb-3">

                                    ✅ Matching Skills

                                </h4>

                                <div className="flex flex-wrap gap-2 mb-6">

                                    {jobMatch.matched_skills.map(

                                        (skill, index) => (

                                            <span
                                                key={index}
                                                className="bg-green-100 text-green-700 px-3 py-1 rounded-full"
                                            >

                                                {skill}

                                            </span>

                                        )

                                    )}

                                </div>

                                <h4 className="font-bold mb-3">

                                    ❌ Missing Skills

                                </h4>

                                <div className="flex flex-wrap gap-2">

                                    {jobMatch.missing_skills.map(

                                        (skill, index) => (

                                            <span
                                                key={index}
                                                className="bg-red-100 text-red-700 px-3 py-1 rounded-full"
                                            >

                                                {skill}

                                            </span>

                                        )

                                    )}

                                </div>

                            </div>

                        </div>

                    )}

                

                    {/* AI Feedback */}

                    {feedback && (

                        <div>

                            <h3 className="text-2xl font-bold mb-4">

                                AI Resume Feedback

                            </h3>

                            <div className="bg-white border rounded-xl shadow-sm p-6 whitespace-pre-wrap leading-8">

                                {feedback}

                            </div>

                            <button

                                onClick={downloadReport}

                                className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"

                            >

                                Download PDF Report

                            </button>

                        </div>

                    )}
                    {tailoredResume && (

<div className="mt-10">

    <h3 className="text-2xl font-bold mb-4">
        ✨ AI Tailored Resume
    </h3>

    <div className="bg-slate-900 text-green-300 rounded-xl p-6 whitespace-pre-wrap leading-7 font-mono max-h-[600px] overflow-y-auto">

        {tailoredResume}

    </div>

</div>

)}

                </div>

            )}

        </div>

    );

}

export default UploadResume;