import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="User Management System" />

            <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden">
                
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 -z-10">
                    <div className="absolute top-20 left-20 h-72 w-72 bg-indigo-600/30 rounded-full blur-3xl animate-spin-slow"></div>
                    <div className="absolute bottom-20 right-20 h-72 w-72 bg-pink-600/30 rounded-full blur-3xl animate-spin-reverse"></div>
                </div>

                {/* Navbar */}
                <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                    <h1 className="text-xl font-bold tracking-wide">
                        User<span className="text-indigo-500">Manager</span>
                    </h1>

                    <nav className="space-x-4">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md bg-indigo-600 px-5 py-2 text-sm font-medium hover:bg-indigo-500 transition"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="text-sm hover:text-indigo-400 transition"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md border border-indigo-500 px-5 py-2 text-sm font-medium hover:bg-indigo-600 transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="flex flex-col items-center justify-center text-center px-6 pt-20">
                    
                    {/* Rotating Icon */}
                    <div className="mb-8 flex items-center justify-center">
                        <div className="h-24 w-24 rounded-xl bg-indigo-600/20 flex items-center justify-center animate-rotate-y">
                            <svg
                                className="h-12 w-12 text-indigo-400"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
                        Modern <span className="text-indigo-500">User Management</span>
                        <br /> System
                    </h2>

                    <p className="mt-6 max-w-2xl text-slate-300 text-lg">
                        Secure, scalable and enterprise-ready user management built with
                      
                    </p>

                    <div className="mt-10 flex gap-4">
                        {!auth?.user && (
                            <>
                                <Link
                                    href={route('register')}
                                    className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold hover:bg-indigo-500 transition"
                                >
                                    Get Started
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="rounded-lg border border-slate-600 px-8 py-3 font-semibold hover:border-indigo-500 transition"
                                >
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </main>
            </div>

            {/* Animations */}
            <style>{`
                @keyframes spinSlow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spinReverse {
                    from { transform: rotate(360deg); }
                    to { transform: rotate(0deg); }
                }
                @keyframes rotateY {
                    0% { transform: rotateY(0deg); }
                    100% { transform: rotateY(360deg); }
                }
                .animate-spin-slow {
                    animation: spinSlow 25s linear infinite;
                }
                .animate-spin-reverse {
                    animation: spinReverse 30s linear infinite;
                }
                .animate-rotate-y {
                    animation: rotateY 6s linear infinite;
                    transform-style: preserve-3d;
                }
            `}</style>
        </>
    );
}
