import UploadResume from "./components/UploadResume";

function App() {

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">

            {/* Navbar */}

            <nav className="border-b border-white/10 backdrop-blur-lg">

                <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">

                    <h1 className="text-3xl font-bold text-white">
                        Resume<span className="text-cyan-400">IQ</span>
                    </h1>

                    <div className="space-x-8">

                        <a
                            href="#"
                            className="text-slate-300 hover:text-cyan-400 transition"
                        >
                            Home
                        </a>

                        <a
                            href="#"
                            className="text-slate-300 hover:text-cyan-400 transition"
                        >
                            Features
                        </a>

                        <a
                            href="#"
                            className="text-slate-300 hover:text-cyan-400 transition"
                        >
                            About
                        </a>

                    </div>

                </div>

            </nav>

            {/* Hero */}

            <section className="text-center pt-24 pb-10 px-6">

                <h1 className="text-6xl font-extrabold text-white">

                    AI Resume
                    <span className="text-cyan-400"> Analyzer</span>

                </h1>

                <p className="mt-6 max-w-3xl mx-auto text-xl text-slate-300 leading-8">

                    Upload your resume, calculate ATS score, compare it with
                    any Job Description, discover missing skills, and receive
                    AI-powered suggestions to land more interviews.

                </p>

            </section>

            {/* Resume Analyzer */}

            <UploadResume />

        </div>

    );

}

export default App;