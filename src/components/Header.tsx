import { Search, Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
    globalSearchTerm: string;
    setGlobalSearchTerm: (val: string) => void;
}

export default function Header({ globalSearchTerm, setGlobalSearchTerm }: HeaderProps) {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-3 flex justify-between items-center h-16 shrink-0 sticky top-0 z-30 transition-all">
            <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">
                Dashboard
            </h1>

            <div className="flex items-center space-x-3 md:space-x-5">
                <div className="relative hidden md:block group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Global search..."
                        value={globalSearchTerm}
                        onChange={(e) => setGlobalSearchTerm(e.target.value)}
                        className="pl-10 pr-12 py-2 bg-slate-100 hover:bg-slate-200/50 border border-transparent focus:bg-white focus:border-blue-500 rounded-xl text-sm w-72 outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center pointer-events-none">
                        <kbd className="bg-white border border-slate-200 text-slate-400 rounded px-1.5 py-0.5 text-[10px] font-bold shadow-sm">
                            /
                        </kbd>
                    </div>
                </div>

                <div className="hidden md:block w-px h-6 bg-slate-200"></div>

                <button className="relative p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all outline-none focus:ring-2 focus:ring-blue-500/50">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                </button>

                <button className="flex items-center space-x-2 p-1 pr-2 rounded-full hover:bg-slate-100 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50 cursor-pointer">
                    <img
                        src="https://i.pravatar.cc/150?u=admin"
                        alt="Profile"
                        className="w-8 h-8 rounded-full border-2 border-white shadow-sm object-cover"
                    />
                    <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
                </button>
            </div>
        </header>
    );
}