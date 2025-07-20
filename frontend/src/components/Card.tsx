import { ShareIcon } from "../icons/ShareIcon";
import { CrossIcon } from "../icons/CrossIcon";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    twttr?: any;
  }
}

interface CardProps {
    title: string;
    link: string;
    type: "twitter" | "youtube";
    _id: string;
    onDelete: () => void;
}

function getYoutubeId(url: string) {
    // Handles both youtu.be and youtube.com links
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/);
    return match ? match[1] : null;
}

export function Card({title, link, type, _id, onDelete}: CardProps) {
    const tweetRef = useRef<HTMLDivElement>(null);
    const [showVideo, setShowVideo] = useState(false);
    const youtubeId = type === "youtube" ? getYoutubeId(link) : null;

    useEffect(() => {
        if (type === "twitter" && window.twttr && window.twttr.widgets) {
            window.twttr.widgets.load(tweetRef.current);
        }
    }, [type, link]);

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 max-w-80 min-w-72 min-h-56 transition-transform hover:scale-105 hover:shadow-xl flex flex-col justify-between overflow-hidden">
            <div className="flex justify-between items-center p-4 pb-2">
                <div className="flex items-center gap-2 text-lg font-semibold text-gray-800 truncate max-w-[12rem]">
                    {type === "youtube" ? (
                        <span className="inline-block bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-bold">YouTube</span>
                    ) : (
                        <span className="inline-block bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs font-bold">Twitter</span>
                    )}
                    <span className="truncate">{title}</span>
                </div>
                <button onClick={onDelete} className="ml-2 p-2 rounded-full hover:bg-red-100 transition-colors" title="Delete content">
                    <CrossIcon />
                </button>
            </div>
            <div className="flex-1 flex items-center justify-center px-4 pb-4 w-full">
                {type === "youtube" && youtubeId && !showVideo && (
                    <div className="w-full aspect-video rounded-lg border border-gray-100 bg-black flex items-center justify-center cursor-pointer overflow-hidden relative" onClick={() => setShowVideo(true)}>
                        <img
                            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                            alt="YouTube thumbnail"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute flex items-center justify-center w-full h-full top-0 left-0 pointer-events-none">
                            <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 84 84">
                                <circle cx="42" cy="42" r="42" fill="black" fillOpacity="0.5"/>
                                <polygon points="33,24 66,42 33,60" fill="white"/>
                            </svg>
                        </div>
                    </div>
                )}
                {type === "youtube" && youtubeId && showVideo && (
                    <iframe
                        className="w-full aspect-video rounded-lg border border-gray-100"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                )}
                {type === "twitter" && (
                    <div ref={tweetRef} className="w-full overflow-hidden">
                        <blockquote className="twitter-tweet w-full">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    </div>
                )}
            </div>
        </div>
    );
}