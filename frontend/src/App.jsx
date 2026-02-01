import React, { useState, useEffect } from 'react';
import { ShieldCheck, Sparkles, Zap, Brain, Lock, Clock, ChevronRight, Heart, Activity, Users } from 'lucide-react';
import UploadZone from './components/UploadZone.jsx';
import AnalysisResult from './components/AnalysisResult.jsx';

function App() {
    const [result, setResult] = useState(null);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen mesh-bg relative overflow-hidden">

            {/* Animated Background Orbs - Subtle decoration */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                <div className="orb orb-blue w-[500px] h-[500px] -top-[200px] -right-[200px] animate-float" />
                <div className="orb orb-purple w-[400px] h-[400px] top-[40%] -left-[150px] animate-float-slow" />
                <div className="orb orb-teal w-[350px] h-[350px] bottom-[20%] right-[10%] animate-float-delayed" />
            </div>

            {/* Enhanced Grid Pattern Overlay */}
            <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

            {/* Premium Header */}
            <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-gray-900/5 border-b border-white/50'
                : 'bg-transparent'
                }`}>
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="h-20 flex items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-ai-600 rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
                                <div className="relative bg-gradient-to-br from-primary-500 via-primary-600 to-ai-600 p-3 rounded-2xl shadow-lg">
                                    <ShieldCheck className="w-7 h-7 text-white" strokeWidth={2.5} />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                                    MediClaim AI
                                    <span className="badge badge-ai text-[10px]">
                                        <Sparkles className="w-3 h-3" />
                                        Beta
                                    </span>
                                </h1>
                                <p className="text-xs text-gray-500 font-medium">Intelligent Medical Coding</p>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
                                <a href="#features" className="hover:text-primary-600 transition-colors flex items-center gap-1.5">
                                    <Zap className="w-4 h-4" />
                                    Features
                                </a>
                                <a href="#about" className="hover:text-primary-600 transition-colors flex items-center gap-1.5">
                                    <Brain className="w-4 h-4" />
                                    How it Works
                                </a>
                            </div>
                            <div className="h-6 w-px bg-gray-200" />
                            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-ai-50 to-primary-50 rounded-full border border-ai-100/50">
                                <Sparkles className="w-4 h-4 text-ai-500" />
                                <span className="text-sm font-semibold bg-gradient-to-r from-ai-600 to-primary-600 bg-clip-text text-transparent">
                                    Gemini 2.0 Flash
                                </span>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="relative z-10 pt-32 pb-24">
                {!result ? (
                    <div className="animate-fade-in">
                        {/* Hero Section */}
                        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
                            <div className="text-center max-w-4xl mx-auto space-y-8">
                                {/* Top Badge */}
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-white/50 shadow-sm animate-fade-in-down">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                                    </span>
                                    <span className="text-sm font-medium text-gray-600">PMJAY & MAA Compliant</span>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </div>

                                {/* Main Headline */}
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] animate-fade-in-up">
                                    <span className="text-gray-900">Medical Coding</span>
                                    <br />
                                    <span className="premium-gradient-text">Powered by AI</span>
                                </h1>

                                {/* Subheadline */}
                                <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in-up stagger-2">
                                    Upload any discharge summary to instantly analyze clinical features,
                                    extract procedures, and match against <strong className="text-gray-900">3,000+ insurance protocols</strong> with
                                    enterprise-grade accuracy.
                                </p>

                                {/* CTA Stats Row */}
                                <div className="flex flex-wrap justify-center gap-8 pt-4 animate-fade-in-up stagger-3">
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                                            <Clock className="w-5 h-5 text-primary-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-gray-900">&lt; 3 Seconds</p>
                                            <p className="text-xs text-gray-500">Analysis Time</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <div className="w-10 h-10 rounded-xl bg-accent-50 flex items-center justify-center">
                                            <Lock className="w-5 h-5 text-accent-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-gray-900">AES-256</p>
                                            <p className="text-xs text-gray-500">Encryption</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <div className="w-10 h-10 rounded-xl bg-ai-50 flex items-center justify-center">
                                            <Brain className="w-5 h-5 text-ai-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-sm font-bold text-gray-900">99.8%</p>
                                            <p className="text-xs text-gray-500">Accuracy</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Upload Section */}
                        <section className="max-w-5xl mx-auto px-6 lg:px-8 py-12">
                            <UploadZone onAnalysisComplete={setResult} />
                        </section>

                        {/* Features Section */}
                        <section id="features" className="max-w-7xl mx-auto px-6 lg:px-8 py-24 mt-8">
                            <div className="text-center mb-16">
                                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                    Why Choose <span className="gradient-text-static">MediClaim AI</span>?
                                </h2>
                                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                    Built for healthcare professionals who demand accuracy, speed, and compliance.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Feature Card 1 - Enhanced with Glow */}
                                <div className="glass-card rounded-2xl p-8 group card-shine card-tilt transition-spring hover:shadow-elevated-lg">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary-500/25 group-hover:shadow-glow glow-effect">
                                        <Brain className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">AI-Powered Analysis</h3>
                                    <p className="text-gray-600 leading-relaxed transition-colors group-hover:text-gray-700">
                                        Powered by Google's Gemini 2.0 Flash model for lightning-fast clinical entity extraction and intelligent matching.
                                    </p>
                                </div>

                                {/* Feature Card 2 - Enhanced with Glow */}
                                <div className="glass-card rounded-2xl p-8 group card-shine card-tilt transition-spring hover:shadow-elevated-lg">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-accent-500/25 group-hover:shadow-glow-teal glow-effect">
                                        <Activity className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors">Real-time Processing</h3>
                                    <p className="text-gray-600 leading-relaxed transition-colors group-hover:text-gray-700">
                                        Get instant recommendations with confidence scores and required documentation in under 3 seconds.
                                    </p>
                                </div>

                                {/* Feature Card 3 - Enhanced with Glow */}
                                <div className="glass-card rounded-2xl p-8 group card-shine card-tilt transition-spring hover:shadow-elevated-lg">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ai-500 to-ai-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-ai-500/25 group-hover:shadow-glow-purple glow-effect">
                                        <ShieldCheck className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ai-600 transition-colors">PMJAY Compliant</h3>
                                    <p className="text-gray-600 leading-relaxed transition-colors group-hover:text-gray-700">
                                        Full compliance with Pradhan Mantri Jan Arogya Yojana and Mukhyamantri Amrutum guidelines.
                                    </p>
                                </div>

                                {/* Feature Card 4 - Enhanced with Glow */}
                                <div className="glass-card rounded-2xl p-8 group card-shine card-tilt transition-spring hover:shadow-elevated-lg">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-rose-500/25 glow-effect">
                                        <Heart className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">Patient-Centric</h3>
                                    <p className="text-gray-600 leading-relaxed transition-colors group-hover:text-gray-700">
                                        Designed to maximize claim approvals while ensuring patients receive the coverage they deserve.
                                    </p>
                                </div>

                                {/* Feature Card 5 - Enhanced with Glow */}
                                <div className="glass-card rounded-2xl p-8 group card-shine card-tilt transition-spring hover:shadow-elevated-lg">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-amber-500/25 glow-effect">
                                        <Lock className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">Enterprise Security</h3>
                                    <p className="text-gray-600 leading-relaxed transition-colors group-hover:text-gray-700">
                                        Bank-grade AES-256 encryption for all documents. Your patient data never leaves secure servers.
                                    </p>
                                </div>

                                {/* Feature Card 6 - Enhanced with Glow */}
                                <div className="glass-card rounded-2xl p-8 group card-shine card-tilt transition-spring hover:shadow-elevated-lg">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-emerald-500/25 group-hover:shadow-glow-emerald glow-effect">
                                        <Users className="w-7 h-7 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">Team Collaboration</h3>
                                    <p className="text-gray-600 leading-relaxed transition-colors group-hover:text-gray-700">
                                        Share analysis results instantly with your medical coding team for faster claim processing.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Trust Banner - Enhanced */}
                        <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20 mt-8">
                            <div className="glass-card-dark rounded-3xl p-12 relative overflow-hidden group hover:shadow-glass-xl transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-600/20 via-ai-600/20 to-accent-600/20 animate-gradient-x" />
                                <div className="absolute top-0 right-0 w-96 h-96 bg-ai-500/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl" />

                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="text-center md:text-left">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                            Ready to Transform Your Workflow?
                                        </h3>
                                        <p className="text-gray-300 text-lg">
                                            Join thousands of healthcare professionals using AI-powered medical coding.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <div className="text-center px-6">
                                            <p className="text-4xl font-bold text-white">50K+</p>
                                            <p className="text-sm text-gray-400">Claims Processed</p>
                                        </div>
                                        <div className="w-px h-16 bg-white/20 hidden md:block" />
                                        <div className="text-center px-6">
                                            <p className="text-4xl font-bold text-white">99.8%</p>
                                            <p className="text-sm text-gray-400">Uptime</p>
                                        </div>
                                        <div className="w-px h-16 bg-white/20 hidden md:block" />
                                        <div className="text-center px-6">
                                            <p className="text-4xl font-bold text-white">4.9/5</p>
                                            <p className="text-sm text-gray-400">User Rating</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                ) : (
                    <div className="max-w-6xl mx-auto px-6 lg:px-8 space-y-8 animate-fade-in-up">
                        <button
                            onClick={() => setResult(null)}
                            className="group flex items-center gap-3 px-5 py-3 rounded-xl glass-button text-sm font-semibold text-gray-700 hover:text-primary-600"
                        >
                            <span className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-primary-50 flex items-center justify-center transition-colors">
                                <ChevronRight className="w-4 h-4 rotate-180 group-hover:-translate-x-0.5 transition-transform" />
                            </span>
                            Upload New Document
                        </button>
                        <AnalysisResult data={result} />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="relative z-10 border-t border-gray-200/50 bg-white/30 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-br from-primary-500 to-ai-600 p-2 rounded-xl">
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                            <span className="font-semibold text-gray-900">MediClaim AI</span>
                        </div>
                        <p className="text-sm text-gray-500">
                            © 2026 MediClaim AI. All rights reserved. Built with ❤️ for Healthcare.
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                            <a href="#" className="hover:text-primary-600 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-primary-600 transition-colors">Terms</a>
                            <a href="#" className="hover:text-primary-600 transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;
