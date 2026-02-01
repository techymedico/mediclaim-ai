import React, { useState, useEffect } from 'react';
import {
    CheckCircle, AlertTriangle, FileText, Activity, Stethoscope,
    ChevronRight, Shield, Award, TrendingUp, ClipboardCheck,
    Heart, Sparkles, Download, Share2, Copy, CheckCheck,
    AlertCircle, Info, ChevronDown, ExternalLink
} from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function AnalysisResult({ data }) {
    const [animatedConfidence, setAnimatedConfidence] = useState(0);
    const [copiedCode, setCopiedCode] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        clinical: true,
        documentation: true
    });

    if (!data) return null;

    const { clinical_extraction, package_recommendation, insurance_justification } = data;
    const primary = package_recommendation.primary_package;
    const confidence = (insurance_justification.confidence_score * 100).toFixed(0);

    // Animate confidence score on mount
    useEffect(() => {
        const timer = setTimeout(() => {
            let current = 0;
            const increment = confidence / 50;
            const interval = setInterval(() => {
                current += increment;
                if (current >= confidence) {
                    setAnimatedConfidence(confidence);
                    clearInterval(interval);
                } else {
                    setAnimatedConfidence(Math.floor(current));
                }
            }, 20);
        }, 300);
        return () => clearTimeout(timer);
    }, [confidence]);

    const copyPackageCode = () => {
        navigator.clipboard.writeText(primary.package_code);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const getConfidenceColor = (score) => {
        if (score >= 80) return { ring: 'text-emerald-500', bg: 'bg-emerald-500', label: 'High Confidence', labelBg: 'bg-emerald-50 text-emerald-700 border-emerald-100' };
        if (score >= 60) return { ring: 'text-amber-500', bg: 'bg-amber-500', label: 'Moderate', labelBg: 'bg-amber-50 text-amber-700 border-amber-100' };
        return { ring: 'text-red-500', bg: 'bg-red-500', label: 'Review Needed', labelBg: 'bg-red-50 text-red-700 border-red-100' };
    };

    const confidenceStyle = getConfidenceColor(confidence);

    return (
        <div className="space-y-6 animate-fade-in">

            {/* Success Banner */}
            <div className="glass-card rounded-2xl p-4 border-l-4 border-emerald-500 flex items-center gap-4 animate-slide-in-right">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                    <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">Analysis Complete</h3>
                    <p className="text-sm text-gray-500">AI has successfully analyzed your discharge summary and matched it with insurance protocols.</p>
                </div>
                <div className="flex items-center gap-2">
                    <button className="glass-button px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-primary-600 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </button>
                    <button className="glass-button px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-primary-600 flex items-center gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                    </button>
                </div>
            </div>

            {/* Main Recommendation Card */}
            <div className="glass-card rounded-3xl overflow-hidden relative group">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-100/60 to-ai-100/40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:translate-x-1/4 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-accent-100/50 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

                <div className="relative p-8 md:p-10">
                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">

                        {/* Left Side - Package Details */}
                        <div className="flex-1 space-y-6">
                            {/* Header Badge */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                                    <Award className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <span className="badge badge-success">
                                        <CheckCircle className="w-3 h-3" />
                                        Recommended Package
                                    </span>
                                </div>
                            </div>

                            {/* Package Name */}
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                    {primary.package_name}
                                </h2>

                                {/* Package Code with Copy */}
                                <div className="flex flex-wrap items-center gap-4">
                                    <button
                                        onClick={copyPackageCode}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-mono text-sm transition-all group/copy"
                                    >
                                        <span>{primary.package_code}</span>
                                        {copiedCode ? (
                                            <CheckCheck className="w-4 h-4 text-emerald-400" />
                                        ) : (
                                            <Copy className="w-4 h-4 opacity-50 group-hover/copy:opacity-100" />
                                        )}
                                    </button>

                                    <span className="flex items-center gap-2 text-sm text-gray-600 bg-primary-50 px-3 py-2 rounded-lg border border-primary-100">
                                        <Shield className="w-4 h-4 text-primary-600" />
                                        PMJAY Compliant
                                    </span>
                                </div>
                            </div>

                            {/* Reasoning */}
                            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-ai-100 flex items-center justify-center flex-shrink-0">
                                        <Sparkles className="w-5 h-5 text-ai-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">AI Reasoning</h4>
                                        <p className="text-gray-600 leading-relaxed">
                                            {primary.reason}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Confidence Meter */}
                        <div className="lg:w-72 flex flex-col items-center justify-center">
                            <div className="glass-card rounded-3xl p-8 w-full text-center space-y-4 border border-white/60">
                                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Confidence Score</span>

                                {/* Animated Circle */}
                                <div className="relative w-40 h-40 mx-auto">
                                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                        {/* Background Circle */}
                                        <circle
                                            cx="50" cy="50" r="42"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            className="text-gray-100"
                                        />
                                        {/* Progress Circle */}
                                        <circle
                                            cx="50" cy="50" r="42"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            className={twMerge("transition-all duration-1000 ease-out", confidenceStyle.ring)}
                                            strokeDasharray={264}
                                            strokeDashoffset={264 - (264 * animatedConfidence / 100)}
                                        />
                                    </svg>
                                    {/* Center Content */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-5xl font-bold text-gray-900">{animatedConfidence}</span>
                                        <span className="text-gray-500 text-sm font-medium">percent</span>
                                    </div>
                                </div>

                                {/* Confidence Label */}
                                <span className={twMerge("inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold border", confidenceStyle.labelBg)}>
                                    <TrendingUp className="w-4 h-4" />
                                    {confidenceStyle.label}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detail Cards Grid */}
            <div className="grid lg:grid-cols-2 gap-6">

                {/* Clinical Extraction Card */}
                <div className="glass-card rounded-2xl overflow-hidden">
                    {/* Header */}
                    <button
                        onClick={() => toggleSection('clinical')}
                        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-indigo-50/80 to-transparent hover:from-indigo-100/80 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25">
                                <Stethoscope className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-gray-900">Clinical Extraction</h3>
                                <p className="text-sm text-gray-500">Diagnoses & Procedures</p>
                            </div>
                        </div>
                        <ChevronDown className={twMerge(
                            "w-5 h-5 text-gray-400 transition-transform duration-300",
                            expandedSections.clinical ? "rotate-180" : ""
                        )} />
                    </button>

                    {/* Content */}
                    <div className={twMerge(
                        "overflow-hidden transition-all duration-500 ease-out",
                        expandedSections.clinical ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                        <div className="p-6 pt-0 space-y-6">
                            {/* Diagnoses */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Heart className="w-4 h-4 text-rose-500" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Diagnoses Identified
                                    </span>
                                    <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                        {clinical_extraction.diagnoses.length} found
                                    </span>
                                </div>
                                {clinical_extraction.diagnoses.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {clinical_extraction.diagnoses.map((d, i) => (
                                            <span
                                                key={i}
                                                className="px-4 py-2 bg-gradient-to-br from-indigo-50 to-indigo-100/50 text-indigo-700 text-sm font-medium rounded-xl border border-indigo-100 hover:shadow-md hover:shadow-indigo-500/10 transition-shadow cursor-default"
                                            >
                                                {d}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-gray-400 text-sm bg-gray-50 p-4 rounded-xl">
                                        <Info className="w-4 h-4" />
                                        No specific diagnoses extracted
                                    </div>
                                )}
                            </div>

                            {/* Procedures */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <Activity className="w-4 h-4 text-indigo-500" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Procedures Performed
                                    </span>
                                    <span className="ml-auto text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                        {clinical_extraction.procedures.length} found
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {clinical_extraction.procedures.map((p, i) => (
                                        <div
                                            key={i}
                                            className="group flex items-start gap-4 p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-indigo-100 hover:shadow-md hover:shadow-indigo-500/5 transition-all cursor-default"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-indigo-100 group-hover:bg-indigo-500 flex items-center justify-center transition-colors flex-shrink-0">
                                                <Activity className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-sm text-gray-700 leading-relaxed pt-1">{p}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Documentation & Risks Card */}
                <div className="glass-card rounded-2xl overflow-hidden">
                    {/* Header */}
                    <button
                        onClick={() => toggleSection('documentation')}
                        className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-amber-50/80 to-transparent hover:from-amber-100/80 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/25">
                                <FileText className="w-6 h-6 text-white" />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-lg text-gray-900">Documentation & Risks</h3>
                                <p className="text-sm text-gray-500">Required evidence & flags</p>
                            </div>
                        </div>
                        <ChevronDown className={twMerge(
                            "w-5 h-5 text-gray-400 transition-transform duration-300",
                            expandedSections.documentation ? "rotate-180" : ""
                        )} />
                    </button>

                    {/* Content */}
                    <div className={twMerge(
                        "overflow-hidden transition-all duration-500 ease-out",
                        expandedSections.documentation ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                    )}>
                        <div className="p-6 pt-0 space-y-6">
                            {/* Risk Flags */}
                            {insurance_justification.risk_flags.length > 0 ? (
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-200/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                                        <h4 className="font-bold text-amber-800">Attention Required</h4>
                                    </div>
                                    <ul className="space-y-3">
                                        {insurance_justification.risk_flags.map((flag, i) => (
                                            <li
                                                key={i}
                                                className="flex items-start gap-3 text-sm text-amber-900 bg-white/60 p-3 rounded-xl border border-amber-100"
                                            >
                                                <AlertCircle className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                                                <span>{flag}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ) : (
                                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-200/50 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-emerald-800">All Clear</h4>
                                        <p className="text-sm text-emerald-600">No major risk flags detected in documentation</p>
                                    </div>
                                </div>
                            )}

                            {/* Required Documents */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <ClipboardCheck className="w-4 h-4 text-amber-500" />
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        Required Evidence
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {insurance_justification.required_documents.map((doc, i) => (
                                        <div
                                            key={i}
                                            className="group flex items-center gap-4 p-4 bg-gray-50 hover:bg-white rounded-xl border border-gray-100 hover:border-amber-100 hover:shadow-md hover:shadow-amber-500/5 transition-all"
                                        >
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:from-amber-200 group-hover:to-amber-300 flex items-center justify-center text-sm font-bold text-gray-600 group-hover:text-amber-700 transition-colors">
                                                {i + 1}
                                            </div>
                                            <span className="flex-1 text-sm text-gray-700">{doc}</span>
                                            <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                        <Info className="w-5 h-5 text-primary-600" />
                    </div>
                    <p className="text-sm text-gray-600">
                        Review the extracted information and ensure all required documents are attached before submission.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Generate Report
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        Submit to Insurance
                        <ExternalLink className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
