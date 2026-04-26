export const MOCK_CONVERSATIONS = [
    {
        id: 'c1',
        user: { id: 'u2', username: 'artisan_flux', display_name: 'Artisan Flux', avatar_url: 'https://i.pravatar.cc/150?u=artisan_flux' },
        last_message: { text: 'The environment assets are ready for review!', timestamp: '2024-04-05T14:30:00Z', is_read: true },
        unread_count: 0
    },
    {
        id: 'c2',
        user: { id: 'u3', username: 'sync_master', display_name: 'Sync Master', avatar_url: 'https://i.pravatar.cc/150?u=sync_master' },
        last_message: { text: 'Can we sync on the database migration today?', timestamp: '2024-04-05T16:45:00Z', is_read: false },
        unread_count: 1
    },
    {
        id: 'c3',
        user: { id: 'u4', username: 'rapid_fire', display_name: 'Rapid Fire', avatar_url: 'https://i.pravatar.cc/150?u=rapid_fire' },
        last_message: { text: "GGs on the game earlier. Your Viper lineups are insane.", timestamp: '2024-04-04T22:15:00Z', is_read: true },
        unread_count: 0
    },
    {
        id: 'c4',
        user: { id: 'u5', username: 'strategy_mind', display_name: 'Strategy Mind', avatar_url: 'https://i.pravatar.cc/150?u=strategy_mind' },
        last_message: { text: 'We have 3 new tournament sponsors incoming.', timestamp: '2024-04-04T10:00:00Z', is_read: true },
        unread_count: 0
    },
    {
        id: 'c5',
        user: { id: 'u6', username: 'sonic_wave', display_name: 'Sonic Wave', avatar_url: 'https://i.pravatar.cc/150?u=sonic_wave' },
        last_message: { text: 'Just sent the SFX batch for the UI transitions.', timestamp: '2024-04-03T18:50:00Z', is_read: true },
        unread_count: 0
    }
];

export const MOCK_MESSAGES = {
    'c1': [
        { id: 'm1', sender_id: 'u2', text: 'Hey, I updated the environment assets.', timestamp: '14:20' },
        { id: 'm2', sender_id: 'u1', text: 'Awesome, let me check the UE5 scene.', timestamp: '14:22' },
        { id: 'm3', sender_id: 'u2', text: 'The atmosphere sync is match better now.', timestamp: '14:25' },
        { id: 'm4', sender_id: 'u2', text: 'The environment assets are ready for review!', timestamp: '14:30' }
    ],
    'c2': [
        { id: 'm5', sender_id: 'u3', text: 'Can we sync on the database migration today?', timestamp: '16:45' }
    ]
};

// Function to generate more mock messages for testing
export const generateMockMessages = (count = 15) => {
    const messages = [];
    for (let i = 0; i < count; i++) {
        messages.push({
            id: `msg-${i}`,
            sender_id: i % 2 === 0 ? 'u1' : 'remote',
            text: `This is a generated test message ${i} for Gzone DM.`,
            timestamp: `10:${i < 10 ? '0' + i : i}`
        });
    }
    return messages;
};
