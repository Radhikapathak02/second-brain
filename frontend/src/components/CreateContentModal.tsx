import { useRef, useState } from "react";
import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

enum ContentType {
    Youtube = "youtube",
    Twitter = "twitter"
}

interface CreateContentModalProps {
    open: boolean;
    onClose: () => void;
    refresh?: () => void;
}

// controlled component
export function CreateContentModal({open, onClose, refresh}: CreateContentModalProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [type, setType] = useState(ContentType.Youtube);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function addContent() {
        setError("");
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        if (!title || !link) {
            setError("Both title and link are required.");
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/api/v1/content`, {
                link,
                title,
                type
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            if (refresh) refresh();
            onClose();
        } catch (e: any) {
            setError(e.response?.data?.message || "Failed to add content.");
        } finally {
            setLoading(false);
        }
    }

    return <div>
        {open && <div>
            {/* Overlay with strong blur, covers everything */}
            <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center z-50"></div>
            {/* Modal */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative flex flex-col">
                    <div className="flex justify-end mb-2">
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-700 transition-colors">
                            <CrossIcon />
                        </button>
                    </div>
                    <h2 className="text-xl font-semibold text-purple-700 mb-4 text-center">Add New Content</h2>
                    <div className="flex flex-col gap-3 mb-2">
                        <Input reference={titleRef} placeholder={"Title"} />
                        <Input reference={linkRef} placeholder={"Link"} />
                    </div>
                    <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-600 mb-1">Type</h3>
                        <div className="flex gap-2 justify-center">
                            <Button text="Youtube" variant={type === ContentType.Youtube ? "primary" : "secondary"} onClick={() => setType(ContentType.Youtube)} />
                            <Button text="Twitter" variant={type === ContentType.Twitter ? "primary" : "secondary"} onClick={() => setType(ContentType.Twitter)} />
                        </div>
                    </div>
                    {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}
                    <div className="flex justify-center">
                        <Button onClick={addContent} variant="primary" text={loading ? "Submitting..." : "Submit"} fullWidth={true} loading={loading} />
                    </div>
                </div>
            </div>
        </div>}
    </div>
}