"use client";

import { useState } from "react";

export default function Home() {
  // State Management
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // Form Handlers
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult("");

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setResult(data.coverLetter);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = result;
    navigator.clipboard.writeText(tempElement.innerText);
    alert("Copied to clipboard!");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* LEFT COLUMN: Input Form */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8 flex items-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              AI Cover Letter Gen
            </span>
            <span className="ml-2 text-4xl">🚀</span>
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Candidate Name
              </label>
              <input
                name="candidateName"
                required
                className="block w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-3 transition-all duration-200"
                placeholder="e.g., Virat Kohli"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                name="jobDescription"
                required
                rows={8}
                className="block w-full rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm px-4 py-3 transition-all duration-200 resize-y"
                placeholder="Paste the full job listing here..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Resume (PDF)
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                required
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all duration-200 cursor-pointer"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Generating Magic...
                </div>
              ) : (
                "Generate Cover Letter"
              )}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
              <p className="text-red-600 text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Output Display */}
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col h-full relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Result</h2>
            {result && (
              <button
                onClick={copyToClipboard}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Copy Text
              </button>
            )}
          </div>

          <div className="flex-grow bg-gray-50 rounded-xl p-6 border border-gray-200 overflow-y-auto text-gray-800 leading-relaxed shadow-inner">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full space-y-6">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-2xl">🪶</span>
                  </div>
                </div>
                <p className="text-gray-500 font-medium animate-pulse">
                  Analyzing your profile and the job...
                </p>
              </div>
            ) : result ? (
              <div
                className="prose prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: result }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-lg font-medium text-gray-500">
                  Ready to generate!
                </p>
                <p className="text-sm mt-2">
                  Fill out the form and upload your resume to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}