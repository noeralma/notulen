import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Server,
  Database,
  Code2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ExternalLink,
  Terminal,
  Cpu,
} from "lucide-react";
import { api } from "./lib/api";

interface HealthResponse {
  status: string;
  timestamp: string;
}

function App() {
  const [health, setHealth] = useState<HealthResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        // Artificial delay to show off the loading state animation
        await new Promise((resolve) => setTimeout(resolve, 800));
        const data = await api.get<HealthResponse>("/health");
        setHealth(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to connect to backend");
      } finally {
        setLoading(false);
      }
    };

    checkHealth();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen text-white p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-4xl w-full z-10 space-y-8"
      >
        {/* Header Section */}
        <motion.div variants={item} className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></span>
            <span className="text-xs font-medium text-gray-300">
              System Operational
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            PERN <span className="text-gradient">Stack Template</span>
          </h1>

          <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            The ultimate starting point for your next big idea. Pre-configured
            with <span className="text-blue-400">TypeScript</span>,
            <span className="text-purple-400"> Prisma</span>, and
            <span className="text-cyan-400"> Tailwind CSS</span>.
          </p>
        </motion.div>

        {/* Status Cards Grid */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Backend Status Card */}
          <div className="glass-panel rounded-2xl p-6 relative group hover:border-blue-500/30 transition-colors duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
                <Server size={24} />
              </div>
              {loading ? (
                <Loader2 size={20} className="animate-spin text-blue-400" />
              ) : error ? (
                <AlertCircle size={20} className="text-red-400" />
              ) : (
                <CheckCircle2 size={20} className="text-green-400" />
              )}
            </div>
            <h3 className="text-lg font-semibold mb-1">Backend API</h3>
            <p className="text-sm text-gray-400 mb-4">
              Express + Node.js runtime
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono bg-black/20 p-2 rounded border border-white/5">
              <Terminal size={12} className="text-gray-500" />
              <span className={error ? "text-red-400" : "text-green-400"}>
                {loading
                  ? "Connecting..."
                  : error
                  ? "Connection Failed"
                  : "Active"}
              </span>
            </div>
          </div>

          {/* Database Status Card */}
          <div className="glass-panel rounded-2xl p-6 relative group hover:border-purple-500/30 transition-colors duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400 group-hover:text-purple-300 transition-colors">
                <Database size={24} />
              </div>
              <CheckCircle2 size={20} className="text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-1">PostgreSQL</h3>
            <p className="text-sm text-gray-400 mb-4">Managed via Prisma ORM</p>

            <div className="flex items-center space-x-2 text-xs font-mono bg-black/20 p-2 rounded border border-white/5">
              <Cpu size={12} className="text-gray-500" />
              <span className="text-purple-300">Ready for queries</span>
            </div>
          </div>

          {/* Frontend Status Card */}
          <div className="glass-panel rounded-2xl p-6 relative group hover:border-cyan-500/30 transition-colors duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400 group-hover:text-cyan-300 transition-colors">
                <Code2 size={24} />
              </div>
              <CheckCircle2 size={20} className="text-green-400" />
            </div>
            <h3 className="text-lg font-semibold mb-1">Frontend</h3>
            <p className="text-sm text-gray-400 mb-4">
              React + Vite + Tailwind
            </p>

            <div className="flex items-center space-x-2 text-xs font-mono bg-black/20 p-2 rounded border border-white/5">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-cyan-300">HMR Enabled</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Links Section */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-panel p-4 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                <img src="/vite.svg" className="w-6 h-6" alt="Vite" />
              </div>
              <div>
                <h4 className="font-medium text-white">Documentation</h4>
                <p className="text-sm text-gray-400">
                  Explore React & Vite docs
                </p>
              </div>
            </div>
            <ExternalLink
              size={18}
              className="text-gray-500 group-hover:text-white transition-colors"
            />
          </a>

          <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                <span className="text-lg font-bold text-gray-400">API</span>
              </div>
              <div>
                <h4 className="font-medium text-white">Server Response</h4>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  {health?.timestamp || "Waiting for data..."}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div variants={item} className="pt-12 text-center">
          <p className="text-sm text-gray-500">
            Edit{" "}
            <code className="px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300 font-mono text-xs">
              client/src/App.tsx
            </code>{" "}
            to start building
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
