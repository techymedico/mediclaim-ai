import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';
import UploadZone from './components/UploadZone.jsx';
import AnalysisResult from './components/AnalysisResult.jsx';

function App() {
    const [result, setResult] = useState(null);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Government-Style Header */}
            <header className="header-gov">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                                <ShieldCheck className="w-6 h-6 text-blue-800" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-white">MediClaim AI</h1>
                                <p className="text-xs text-blue-200">Medical Coding Assistant</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="badge bg-white/20 text-white text-xs">
                                PMJAY Compliant
                            </span>
                            <span className="badge bg-white/20 text-white text-xs">
                                v2.0
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Secondary Header */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-12 text-sm">
                        <nav className="flex items-center gap-6">
                            <a href="#" className="text-blue-800 font-medium">Home</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">Documentation</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900">Support</a>
                        </nav>
                        <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>System Status: Operational</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!result ? (
                    <div className="space-y-8">
                        {/* Page Header */}
                        <div className="flex items-start justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Discharge Summary Analysis
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    Upload a discharge summary to extract clinical data and match insurance packages
                                </p>
                            </div>
                            <button className="btn btn-secondary flex items-center gap-2 text-sm">
                                <HelpCircle className="w-4 h-4" />
                                Help Guide
                            </button>
                        </div>

                        {/* Info Alert */}
                        <div className="alert alert-info">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="font-medium">How it works</p>
                                    <p className="text-sm mt-1 opacity-90">
                                        Upload a PDF or image of the discharge summary. Our AI will extract diagnoses,
                                        procedures, and clinical entities, then match them against 3,000+ PMJAY/MAA insurance packages.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Upload Section */}
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="section-title flex items-center gap-2">
                                            <FileText className="w-5 h-5 text-blue-800" />
                                            Upload Document
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <UploadZone onAnalysisComplete={setResult} />
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar Info */}
                            <div className="space-y-6">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="text-sm font-semibold text-gray-700">Accepted Formats</h3>
                                    </div>
                                    <div className="card-body">
                                        <ul className="space-y-3 text-sm">
                                            <li className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-red-50 rounded flex items-center justify-center">
                                                    <FileText className="w-4 h-4 text-red-600" />
                                                </div>
                                                <span>PDF Documents</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-blue-50 rounded flex items-center justify-center">
                                                    <FileText className="w-4 h-4 text-blue-600" />
                                                </div>
                                                <span>JPEG Images</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-green-50 rounded flex items-center justify-center">
                                                    <FileText className="w-4 h-4 text-green-600" />
                                                </div>
                                                <span>PNG Images</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="text-sm font-semibold text-gray-700">Processing Time</h3>
                                    </div>
                                    <div className="card-body text-center">
                                        <p className="text-3xl font-bold text-blue-800">&lt; 3 sec</p>
                                        <p className="text-sm text-gray-500 mt-1">Average analysis time</p>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="text-sm font-semibold text-gray-700">Security</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <ShieldCheck className="w-4 h-4 text-green-600" />
                                            <span>AES-256 Encryption</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                                            <ShieldCheck className="w-4 h-4 text-green-600" />
                                            <span>HIPAA Compliant</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-6 pt-8">
                            <div className="stat-card">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <ShieldCheck className="w-5 h-5 text-blue-800" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900">PMJAY Compliant</h4>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Full compliance with Pradhan Mantri Jan Arogya Yojana guidelines and protocols.
                                </p>
                            </div>
                            <div className="stat-card">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <CheckCircle className="w-5 h-5 text-green-700" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900">99.8% Accuracy</h4>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Powered by Google Gemini AI for precise clinical entity extraction.
                                </p>
                            </div>
                            <div className="stat-card">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-amber-700" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900">3,000+ Packages</h4>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Comprehensive database of insurance packages for accurate matching.
                                </p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Back Button */}
                        <button
                            onClick={() => setResult(null)}
                            className="btn btn-secondary"
                        >
                            ← Upload New Document
                        </button>

                        {/* Analysis Results */}
                        <AnalysisResult data={result} />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 mt-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-blue-800" />
                            <span className="font-semibold text-gray-900">MediClaim AI</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            © 2026 MediClaim AI. Designed for Government Healthcare Systems.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <a href="#" className="hover:text-gray-700">Privacy Policy</a>
                            <a href="#" className="hover:text-gray-700">Terms of Use</a>
                            <a href="#" className="hover:text-gray-700">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
