import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function UploadZone({ onAnalysisComplete }) {
    const [isDragOver, setIsDragOver] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

    const handleFile = useCallback(async (file) => {
        if (!file) return;

        // Validate file type
        const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            setError('Invalid file type. Please upload PDF, JPG, or PNG files only.');
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError('File too large. Maximum size is 10MB.');
            return;
        }

        setError(null);
        setSelectedFile(file);
        setIsLoading(true);
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            // Simulate progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => Math.min(prev + 10, 90));
            }, 200);

            const response = await axios.post(`${API_URL}/analyze`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            clearInterval(progressInterval);
            setUploadProgress(100);

            setTimeout(() => {
                onAnalysisComplete(response.data);
                setIsLoading(false);
                setSelectedFile(null);
            }, 500);

        } catch (err) {
            setIsLoading(false);
            setUploadProgress(0);
            setSelectedFile(null);

            if (err.response?.data?.detail) {
                setError(err.response.data.detail);
            } else if (err.message === 'Network Error') {
                setError('Unable to connect to server. Please check if the backend is running.');
            } else {
                setError('Analysis failed. Please try again.');
            }
        }
    }, [API_URL, onAnalysisComplete]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        handleFile(file);
    }, [handleFile]);

    const handleInputChange = useCallback((e) => {
        const file = e.target.files[0];
        handleFile(file);
    }, [handleFile]);

    const clearError = () => setError(null);

    return (
        <div className="space-y-4">
            {/* Error Alert */}
            {error && (
                <div className="alert alert-danger flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="font-medium">Error</p>
                            <p className="text-sm mt-1">{error}</p>
                        </div>
                    </div>
                    <button onClick={clearError} className="text-red-600 hover:text-red-800">
                        <X className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Upload Zone */}
            <div
                className={`upload-zone ${isDragOver ? 'drag-active' : ''} ${isLoading ? 'pointer-events-none opacity-60' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => !isLoading && document.getElementById('file-upload').click()}
            >
                <input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleInputChange}
                    className="hidden"
                />

                {isLoading ? (
                    /* Loading State */
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-blue-800 animate-spin" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">Analyzing Document...</p>
                            <p className="text-sm text-gray-500 mt-1">
                                {selectedFile?.name}
                            </p>
                        </div>
                        {/* Progress Bar */}
                        <div className="max-w-xs mx-auto">
                            <div className="progress-bar">
                                <div
                                    className="progress-bar-fill"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                {uploadProgress < 30 && 'Uploading document...'}
                                {uploadProgress >= 30 && uploadProgress < 60 && 'Extracting clinical data...'}
                                {uploadProgress >= 60 && uploadProgress < 90 && 'Matching insurance packages...'}
                                {uploadProgress >= 90 && 'Finalizing analysis...'}
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Default Upload State */
                    <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                            <Upload className="w-8 h-8 text-blue-800" />
                        </div>
                        <div>
                            <p className="font-medium text-gray-900">
                                Drop your discharge summary here
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                or click to browse files
                            </p>
                        </div>
                        <div className="flex items-center justify-center gap-4 pt-2">
                            <span className="badge badge-neutral">PDF</span>
                            <span className="badge badge-neutral">JPG</span>
                            <span className="badge badge-neutral">PNG</span>
                        </div>
                        <p className="text-xs text-gray-400">
                            Maximum file size: 10MB
                        </p>
                    </div>
                )}
            </div>

            {/* Instructions */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Best Practices
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Ensure the document is clearly legible</li>
                    <li>• Include complete discharge summary with all sections</li>
                    <li>• Scanned documents should be at least 150 DPI</li>
                </ul>
            </div>
        </div>
    );
}
