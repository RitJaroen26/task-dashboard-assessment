import { LayoutDashboard, CheckSquare, Users, Settings, Menu } from 'lucide-react';
import type { ReactNode } from 'react';

interface NavItemProps {
    icon: ReactNode;
    label: string;
    active?: boolean;
    isOpen: boolean;
    onClick?: () => void;
    disabled?: boolean;
}

const NavItem = ({ icon, label, active = false, isOpen, onClick, disabled = false }: NavItemProps) => (
    <div
        onClick={disabled ? undefined : onClick}
        className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 ${active
                ? 'bg-blue-600 text-white shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100' 
            }`}
    >
        <span className="min-w-[20px] flex justify-center">{icon}</span>
        {isOpen && (
            <span className="ml-3 text-sm font-medium whitespace-nowrap tracking-wide">
                {label}
            </span>
        )}
    </div>
);

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    activeMenu: string;
    onMenuClick: (menu: string) => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
    return (
        <aside className={`bg-[#0f172a] text-white transition-all duration-300 ease-in-out ${isOpen ? 'w-64' : 'w-[72px]'} flex flex-col h-screen shrink-0 border-r border-slate-800`}>
            <div className={`flex items-center h-16 px-4 border-b border-slate-800 ${isOpen ? 'justify-between' : 'justify-center'}`}>
                {isOpen && (
                    <span className="font-bold text-lg text-blue-400 tracking-wide">TaskFlow</span>
                )}
                <button
                    onClick={onToggle}
                    className="p-2 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-colors shrink-0"
                >
                    <Menu size={20} />
                </button>
            </div>

            <nav className="flex-1 p-3 space-y-1.5 overflow-hidden mt-2">
                <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active isOpen={isOpen} />
                <NavItem icon={<CheckSquare size={20} />} label="My Tasks" isOpen={isOpen} />
                <NavItem icon={<Users size={20} />} label="Team" isOpen={isOpen} />

                <div className="pt-4 mt-4 border-t border-slate-800">
                    <NavItem icon={<Settings size={20} />} label="Settings" isOpen={isOpen} disabled />
                </div>
            </nav>
        </aside>
    );
}