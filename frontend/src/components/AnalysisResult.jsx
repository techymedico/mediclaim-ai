import React from 'react';
import {
    CheckCircle, AlertTriangle, FileText, Activity,
    Award, ClipboardCheck, AlertCircle, Download, Printer,
    ChevronRight, Shield
} from 'lucide-react';

export default function AnalysisResult({ data }) {
    if (!data) return null;

    const { clinical_extraction, package_recommendation, insurance_justification } = data;
    const primary = package_recommendation.primary_package;
    const confidence = (insurance_justification.confidence_score * 100).toFixed(0);

    const getConfidenceClass = (score) => {
        if (score >= 80) return 'confidence-high';
        if (score >= 60) return 'confidence-medium';
        return 'confidence-low';
    };

    const getConfidenceLabel = (score) => {
        if (score >= 80) return 'High Confidence';
        if (score >= 60) return 'Moderate Confidence';
        return 'Low Confidence - Review Required';
    };

    return (
        <div className="space-y-6">
            {/* Success Banner */}
            <div className="alert alert-success">
                <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <div>
                        <p className="font-medium">Analysis Complete</p>
                        <p className="text-sm mt-0.5 opacity-90">
                            Document successfully analyzed and matched with insurance packages.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Results Grid */}
            <div className="grid lg:grid-cols-3 gap-6">

                {/* Primary Recommendation - Spans 2 columns */}
                <div className="lg:col-span-2 card">
                    <div className="card-header flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Award className="w-5 h-5 text-blue-800" />
                            <h3 className="section-title">Recommended Package</h3>
                        </div>
                        <span className="badge badge-success">
                            <CheckCircle className="w-3 h-3" />
                            Best Match
                        </span>
                    </div>
                    <div className="card-body">
                        <div className="space-y-4">
                            {/* Package Info Table */}
                            <table className="data-table">
                                <tbody>
                                    <tr>
                                        <td className="font-medium text-gray-700 w-1/4">Package Name</td>
                                        <td className="font-semibold text-gray-900">{primary.package_name}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium text-gray-700">Package Code</td>
                                        <td>
                                            <code className="bg-gray-100 px-2 py-1 rounded text-blue-800 font-mono text-sm">
                                                {primary.package_code}
                                            </code>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="font-medium text-gray-700">Compliance</td>
                                        <td>
                                            <span className="badge badge-primary">
                                                <Shield className="w-3 h-3" />
                                                PMJAY Compliant
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            {/* AI Reasoning */}
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                                <h4 className="text-sm font-semibold text-blue-800 mb-2">AI Reasoning</h4>
                                <p className="text-sm text-blue-900">{primary.reason}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confidence Score */}
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-sm font-semibold text-gray-700">Confidence Score</h3>
                    </div>
                    <div className="card-body text-center">
                        <div className="relative inline-block">
                            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                                <circle
                                    cx="50" cy="50" r="42"
                                    fill="none"
                                    stroke="#e5e7eb"
                                    strokeWidth="8"
                                />
                                <circle
                                    cx="50" cy="50" r="42"
                                    fill="none"
                                    stroke={confidence >= 80 ? '#059669' : confidence >= 60 ? '#d97706' : '#dc2626'}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={264}
                                    strokeDashoffset={264 - (264 * confidence / 100)}
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className={`text-4xl font-bold ${getConfidenceClass(confidence)}`}>
                                    {confidence}%
                                </span>
                            </div>
                        </div>
                        <p className={`text-sm font-medium mt-3 ${getConfidenceClass(confidence)}`}>
                            {getConfidenceLabel(confidence)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Clinical Extraction Section */}
            <div className="card">
                <div className="card-header">
                    <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-blue-800" />
                        <div>
                            <h3 className="section-title">Clinical Extraction</h3>
                            <p className="section-subtitle">Diagnoses and procedures identified from the document</p>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Diagnoses */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                                Diagnoses ({clinical_extraction.diagnoses.length})
                            </h4>
                            {clinical_extraction.diagnoses.length > 0 ? (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Diagnosis</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clinical_extraction.diagnoses.map((d, i) => (
                                            <tr key={i}>
                                                <td className="text-gray-500 w-12">{i + 1}</td>
                                                <td>{d}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-sm text-gray-500 italic">No diagnoses extracted</p>
                            )}
                        </div>

                        {/* Procedures */}
                        <div>
                            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                Procedures ({clinical_extraction.procedures.length})
                            </h4>
                            {clinical_extraction.procedures.length > 0 ? (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Procedure</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {clinical_extraction.procedures.map((p, i) => (
                                            <tr key={i}>
                                                <td className="text-gray-500 w-12">{i + 1}</td>
                                                <td>{p}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="text-sm text-gray-500 italic">No procedures extracted</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Documentation & Risks */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Risk Flags */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-600" />
                            <h3 className="section-title">Risk Flags</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        {insurance_justification.risk_flags.length > 0 ? (
                            <div className="space-y-3">
                                {insurance_justification.risk_flags.map((flag, i) => (
                                    <div key={i} className="alert alert-warning py-3">
                                        <div className="flex items-start gap-2">
                                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                            <span className="text-sm">{flag}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="alert alert-success">
                                <div className="flex items-center gap-2">
                                    <CheckCircle className="w-4 h-4" />
                                    <span className="text-sm">No risk flags detected</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Required Documents */}
                <div className="card">
                    <div className="card-header">
                        <div className="flex items-center gap-3">
                            <ClipboardCheck className="w-5 h-5 text-blue-800" />
                            <h3 className="section-title">Required Documents</h3>
                        </div>
                    </div>
                    <div className="card-body">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Document Required</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {insurance_justification.required_documents.map((doc, i) => (
                                    <tr key={i}>
                                        <td className="text-gray-500">{i + 1}</td>
                                        <td>{doc}</td>
                                        <td>
                                            <span className="badge badge-warning text-xs">Pending</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="card">
                <div className="card-body">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-800 mt-0.5" />
                            <p className="text-sm text-gray-600">
                                Please verify the extracted information and ensure all required documents
                                are attached before submitting to the insurance provider.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="btn btn-secondary">
                                <Printer className="w-4 h-4" />
                                Print Report
                            </button>
                            <button className="btn btn-secondary">
                                <Download className="w-4 h-4" />
                                Export PDF
                            </button>
                            <button className="btn btn-primary">
                                Submit to Insurance
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
