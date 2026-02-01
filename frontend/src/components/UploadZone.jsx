import React, { useState, useCallback } from 'react';
import { UploadCloud, FileText, Loader2, Image, FileType, Sparkles, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { twMerge } from 'tailwind-merge';

export default function UploadZone({ onAnalysisComplete }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [processingStage, setProcessingStage] = useState('');

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback(() => setIsDragOver(false), []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) processFile(files[0]);
    }, []);

    const handleFileSelect = useCallback((e) => {
        if (e.target.files.length > 0) processFile(e.target.files[0]);
    }, []);

    const processFile = async (file) => {
        setIsLoading(true);
        setError(null);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        // Simulate progress stages for better UX
        const stages = [
            { progress: 20, text: 'Uploading document...' },
            { progress: 40, text: 'Extracting text with OCR...' },
            { progress: 60, text: 'Analyzing clinical entities...' },
            { progress: 80, text: 'Matching insurance protocols...' },
            { progress: 95, text: 'Generating recommendations...' },
        ];

        let stageIndex = 0;
        const progressInterval = setInterval(() => {
            if (stageIndex < stages.length) {
                setUploadProgress(stages[stageIndex].progress);
                setProcessingStage(stages[stageIndex].text);
                stageIndex++;
            }
        }, 500);

        try {
            // Use environment variable for API URL, fallback to localhost for development
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
            const response = await axios.post(`${API_URL}/analyze`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            clearInterval(progressInterval);
            setUploadProgress(100);
            setProcessingStage('Analysis complete!');

            // Small delay for completion animation
            setTimeout(() => {
                onAnalysisComplete(response.data);
            }, 500);
        } catch (err) {
            clearInterval(progressInterval);
            console.error(err);
            setError("Unable to connect to the AI engine. Please ensure the backend server is running.");
        } finally {
            setIsLoading(false);
        }
    };

    const fileTypes = [
        { icon: FileText, label: 'PDF', color: 'text-red-500', bg: 'bg-red-50' },
        { icon: Image, label: 'JPG', color: 'text-blue-500', bg: 'bg-blue-50' },
        { icon: Image, label: 'PNG', color: 'text-green-500', bg: 'bg-green-50' },
    ];

    return (
        <div className="max-w-2xl mx-auto relative z-10">
            <div
                className={twMerge(
                    "relative group cursor-pointer transition-all duration-700 ease-out",
                    isLoading ? "pointer-events-none" : ""
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isLoading && document.getElementById('file-upload').click()}
            >
                {/* Animated Gradient Border */}
                <div className={twMerge(
                    "absolute -inset-[2px] rounded-[28px] opacity-0 transition-all duration-700",
                    "bg-gradient-to-r from-primary-500 via-ai-500 to-accent-500 bg-[length:200%_200%]",
                    isDragOver ? "opacity-100 animate-gradient-x" : "group-hover:opacity-60 group-hover:animate-gradient-x"
                )} />

                {/* Glowing Background Effect */}
                <div className={twMerge(
                    "absolute -inset-4 rounded-[40px] transition-all duration-700",
                    "bg-gradient-to-r from-primary-400/20 via-ai-400/20 to-accent-400/20 blur-2xl",
                    isDragOver ? "opacity-100 scale-105" : "opacity-0 group-hover:opacity-70"
                )} />

                {/* Main Upload Card */}
                <div className={twMerge(
                    "relative overflow-hidden rounded-[26px] transition-all duration-500",
                    "bg-white/80 backdrop-blur-xl border-2",
                    isDragOver
                        ? "border-transparent bg-gradient-to-br from-primary-50 to-ai-50 scale-[1.02]"
                        : "border-white/60 group-hover:border-white/80 group-hover:bg-white/90"
                )}>

                    {/* Inner Gradient Decoration */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-100/50 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-ai-100/50 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <div className="relative p-10 md:p-14">
                        {isLoading ? (
                            /* Loading State */
                            <div className="flex flex-col items-center justify-center py-8 animate-fade-in">
                                {/* Animated Loader */}
                                <div className="relative mb-8">
                                    {/* Outer rotating ring */}
                                    <div className="absolute inset-0 w-28 h-28 rounded-full border-4 border-primary-100" />
                                    <div className="w-28 h-28 rounded-full border-4 border-transparent border-t-primary-500 border-r-ai-500 animate-spin" />

                                    {/* Center icon */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-ai-600 flex items-center justify-center shadow-lg shadow-primary-500/30 animate-pulse-soft">
                                            <Sparkles className="w-8 h-8 text-white" />
                                        </div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="w-full max-w-xs mb-4">
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary-500 via-ai-500 to-accent-500 rounded-full transition-all duration-500 ease-out"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Status Text */}
                                <div className="text-center space-y-2">
                                    <h3 className="text-xl font-bold text-gray-900">
                                        Analyzing Document
                                    </h3>
                                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
                                        </span>
                                        {processingStage}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            /* Default Upload State */
                            <div className="flex flex-col items-center justify-center space-y-6">
                                {/* Upload Icon */}
                                <div className="relative">
                                    {/* Decorative rings */}
                                    <div className={twMerge(
                                        "absolute inset-0 w-24 h-24 rounded-3xl transition-all duration-500",
                                        "bg-gradient-to-br from-primary-100 to-ai-100",
                                        isDragOver ? "scale-150 opacity-50" : "scale-100 opacity-0 group-hover:scale-125 group-hover:opacity-30"
                                    )} />

                                    {/* Main Icon Container */}
                                    <div className={twMerge(
                                        "relative w-24 h-24 rounded-3xl flex items-center justify-center transition-all duration-500",
                                        "bg-gradient-to-br from-primary-500 via-primary-600 to-ai-600",
                                        "shadow-xl shadow-primary-500/30",
                                        isDragOver
                                            ? "scale-110 rotate-3 shadow-2xl shadow-primary-500/40"
                                            : "group-hover:scale-105 group-hover:-rotate-2"
                                    )}>
                                        <UploadCloud className={twMerge(
                                            "w-12 h-12 text-white transition-transform duration-500",
                                            isDragOver ? "-translate-y-1" : "group-hover:-translate-y-1"
                                        )} strokeWidth={1.5} />
                                    </div>

                                    {/* Floating particles */}
                                    <div className={twMerge(
                                        "absolute -top-2 -right-2 w-6 h-6 rounded-lg bg-accent-400 flex items-center justify-center transition-all duration-500",
                                        isDragOver ? "scale-110 rotate-12" : "opacity-0 group-hover:opacity-100 group-hover:scale-100"
                                    )}>
                                        <Sparkles className="w-3 h-3 text-white" />
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="text-center space-y-3">
                                    <h3 className={twMerge(
                                        "text-2xl md:text-3xl font-bold transition-colors duration-300",
                                        isDragOver ? "text-primary-600" : "text-gray-900"
                                    )}>
                                        {isDragOver ? "Drop to Analyze" : "Upload Discharge Summary"}
                                    </h3>
                                    <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">
                                        {isDragOver
                                            ? "Release to start AI-powered analysis"
                                            : "Drag & drop your medical document, or click to browse"}
                                    </p>
                                </div>

                                {/* File Types */}
                                <div className="flex items-center gap-3 pt-2">
                                    {fileTypes.map((type, index) => (
                                        <div
                                            key={type.label}
                                            className={twMerge(
                                                "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-300",
                                                "bg-white/60 border-gray-100 hover:border-primary-200 hover:bg-primary-50/50",
                                                `stagger-${index + 1}`
                                            )}
                                        >
                                            <type.icon className={twMerge("w-4 h-4", type.color)} />
                                            <span className="text-sm font-medium text-gray-600">{type.label}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* CTA Button */}
                                <button className="mt-4 btn-primary flex items-center gap-2 group/btn">
                                    <span>Select Document</span>
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
            />

            {/* Error Message */}
            {error && (
                <div className="mt-6 animate-fade-in-up">
                    <div className="glass-card rounded-2xl p-5 border-l-4 border-red-500 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Connection Error</h4>
                            <p className="text-sm text-gray-600">{error}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Security Note */}
            <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-accent-500" />
                <span>Your documents are encrypted and processed securely</span>
            </div>
        </div>
    );
}
