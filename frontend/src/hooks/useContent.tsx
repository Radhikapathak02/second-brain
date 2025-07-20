import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface ContentItem {
    _id: string;
    title: string;
    link: string;
    type: string;
}

export function useContent() {
    const [contents, setContents] = useState<ContentItem[]>([]);

    function refresh() {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((response) => {
                setContents(response.data.content)
            })
    }

    useEffect(() => {
        refresh()
        let interval = setInterval(() => {
            refresh()
        }, 10 * 1000)

        return () => {
            clearInterval(interval);
        }
    }, [])

    return {contents, refresh};
}