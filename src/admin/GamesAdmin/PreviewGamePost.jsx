import { useAdminGamePost } from "../context/AdminGamePostContext";
import GamePostPage from "../../public/pages/gamepost/GamePostPage";

export default function PreviewGamePost() {
    const { gamePostData } = useAdminGamePost();

    return (
        <div>
            <h1 className="admin-page-title">Live Preview</h1>
            <p className="text-[var(--theme-text-muted)] mb-6">
                This is a live preview of your game post as it is currently configured in the drafts.
            </p>

            <div className="border-[4px] border-[var(--theme-primary)] rounded-xl overflow-hidden relative shadow-2xl bg-[#0f1923]" style={{ minHeight: '800px' }}>
                <GamePostPage previewData={gamePostData} />
            </div>
        </div>
    );
}
