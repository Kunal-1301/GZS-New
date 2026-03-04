import React, { createContext, useContext, useState } from 'react';
import { useToast } from '../../public/components/Toast';

const AdminGamePostContext = createContext();

export const useAdminGamePost = () => useContext(AdminGamePostContext);

export const AdminGamePostProvider = ({ children }) => {
    const { showToast } = useToast();
    const [gamePostData, setGamePostData] = useState({
        hero: { game_title: "", game_desc_short: "", background_img: "" },
        game_info: { developer: "", publisher: "", release_date: "", genres: "", platforms: "", profile_size_photo: "" },
        storyline: { paragraphs: "" },
        gameplay: { paragraph: "", gameplay_title: "", gameplay_title_desc: "" },
        quick_control_overview: { qco_title: "", qco_title_desc: "" },
        system_requirement: { os_min: "", os_rec: "", processor_min: "", processor_rec: "", memory_min: "", memory_rec: "", graphics_min: "", graphics_rec: "", storage_min: "", storage_rec: "", directx_min: "", directx_rec: "" },
        get_game: [{ affiliate_links: "" }],
        carousel: [{ yt_url_official: "", upload: "" }],
        modes: [{ mode_title: "", mode_titledesc: "" }],
        dlcs: [{ dlc_pt: "" }],
        awards_and_achievements: [{ aa_pt: "" }],
        join_our_community: [{ platform_name: "", platform_link: "" }]
    });

    const updateSection = (section, data) => {
        setGamePostData(prev => ({
            ...prev,
            [section]: typeof data === 'function' ? data(prev[section]) : { ...prev[section], ...data }
        }));
    };

    const updateArray = (section, data) => {
        setGamePostData(prev => ({
            ...prev,
            [section]: typeof data === 'function' ? data(prev[section]) : data
        }));
    };

    const saveGamePost = async (isDraft = true) => {
        try {
            const payload = { ...gamePostData, is_draft: isDraft };
            const response = await fetch('/api/gameposts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            if (response.ok) {
                showToast(`Game Post ${isDraft ? 'saved as Draft' : 'Published'} successfully! ID: ` + data.game_post_id, 'success');
            } else {
                showToast('Error: ' + data.error, 'error');
            }
        } catch (error) {
            console.error(error);
            showToast('Failed to connect to backend.', 'error');
        }
    };

    const publishGamePost = () => saveGamePost(false);
    const saveDraft = () => saveGamePost(true);

    return (
        <AdminGamePostContext.Provider value={{ gamePostData, updateSection, updateArray, publishGamePost, saveDraft }}>
            {children}
        </AdminGamePostContext.Provider>
    );
};
