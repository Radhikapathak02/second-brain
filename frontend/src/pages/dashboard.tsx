import { useEffect, useState } from "react"
import { Button } from "../components/Button"
import { Card } from "../components/Card"
import { CreateContentModal } from "../components/CreateContentModal"
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Sidebar } from "../components/Sidebar"
import { useContent } from "../hooks/useContent"
import type { ContentItem } from "../hooks/useContent"
import { BACKEND_URL } from "../config"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<'all' | 'twitter' | 'youtube'>('all');
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, [modalOpen])

  const filteredContents = (contents as ContentItem[])
    .filter(({title, type}) =>
      title.toLowerCase().includes(search.toLowerCase()) &&
      (filter === 'all' ? true : type === filter)
    );

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-blue-50 to-white flex flex-col sm:flex-row font-sans">
      {/* Sidebar: hidden on mobile, visible on sm+ */}
      <div className="hidden sm:block">
        <Sidebar onFilter={setFilter} active={filter} />
      </div>
      <div className="flex-1 flex flex-col min-h-screen w-full sm:ml-72">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-12 py-6 bg-white/80 backdrop-blur-md shadow border-b border-gray-200 sticky top-0 z-10 gap-4 rounded-b-2xl">
          <div className="flex items-center gap-2 w-full sm:w-1/2">
            <input
              className="px-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-purple-400 transition-all bg-white/80 shadow-sm"
              type="text"
              placeholder="Search content..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto justify-end items-center">
            <Button onClick={() => setModalOpen(true)} variant="primary" text="Add content" startIcon={<PlusIcon />} />
            <Button onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                share: true
              }, {
                headers: {
                  "Authorization": localStorage.getItem("token")
                }
              });
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl.replace('brainly', 'second-brain'));
            }} variant="secondary" text="Share collection" startIcon={<ShareIcon />} />
            <Button onClick={handleLogout} variant="secondary" text="Logout" />
          </div>
        </div>
        <div className="flex-1 p-4 sm:p-10 bg-white/60 min-h-screen w-full border-l border-gray-100 rounded-tl-3xl">
          <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} refresh={refresh} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-start">
            {filteredContents.length > 0 ? filteredContents.map(({type, link, title, _id}, idx) => (
              <Card key={_id} type={type as any} link={link} title={title} _id={_id} onDelete={async () => {
                await axios.delete(`${BACKEND_URL}/api/v1/content`, {
                  data: { contentId: _id },
                  headers: {
                    "Authorization": localStorage.getItem("token")
                  }
                });
                refresh();
              }} />
            )) : (
              <div className="text-gray-400 text-lg mt-12 ml-4">No content found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
