import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

function GridIcon({ className = "" }) {
    return (
        <svg className={className} width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <rect x="3" y="3" width="7" height="7" rx="2"/>
            <rect x="14" y="3" width="7" height="7" rx="2"/>
            <rect x="14" y="14" width="7" height="7" rx="2"/>
            <rect x="3" y="14" width="7" height="7" rx="2"/>
        </svg>
    );
}

interface SidebarProps {
    onFilter?: (type: 'all' | 'twitter' | 'youtube') => void;
    active?: 'all' | 'twitter' | 'youtube';
}

export function Sidebar({ onFilter, active = 'all' }: SidebarProps) {
    return (
        <div className="h-screen bg-white/70 border-r border-gray-200 w-72 fixed left-0 top-0 pl-6 py-8 flex flex-col shadow-xl rounded-r-3xl backdrop-blur-2xl z-20">
            <div className="flex flex-col items-center mb-12">
                <Logo />
                <span className="font-extrabold text-3xl text-purple-600 tracking-wide drop-shadow-lg mt-2 select-none" style={{letterSpacing: '0.08em'}}>second-brain</span>
            </div>
            <div className="flex flex-col gap-3 mt-2">
                <SidebarItem text="All" icon={<GridIcon className={active === 'all' ? 'text-purple-600' : 'text-gray-300'} />} onClick={() => onFilter && onFilter('all')} active={active === 'all'} />
                <SidebarItem text="Twitter" icon={<TwitterIcon className={active === 'twitter' ? 'text-purple-600' : 'text-gray-300'} />} onClick={() => onFilter && onFilter('twitter')} active={active === 'twitter'} />
                <SidebarItem text="Youtube" icon={<YoutubeIcon className={active === 'youtube' ? 'text-purple-600' : 'text-gray-300'} />} onClick={() => onFilter && onFilter('youtube')} active={active === 'youtube'} />
            </div>
        </div>
    );
}