import React, { type ReactElement } from 'react';

export function SidebarItem({text, icon, onClick, active}: {
    text: string;
    icon: ReactElement;
    onClick?: () => void;
    active?: boolean;
}) {
    return (
        <div
            className={
                `flex items-center gap-3 text-lg py-3 px-4 cursor-pointer rounded-xl max-w-56 transition-all duration-150 font-semibold select-none relative ` +
                (active
                    ? 'bg-white/80 shadow-lg text-purple-600 font-bold border-l-4 border-purple-600'
                    : 'hover:bg-white/40 hover:text-purple-900 text-gray-700')
            }
            style={{backdropFilter: 'blur(6px)'}}
            onClick={onClick}
        >
            <div className="pr-1 flex items-center text-2xl">
                {icon}
            </div>
            <div className="truncate">
                {text}
            </div>
        </div>
    );
}