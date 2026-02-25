import express from 'express';
import cors from 'cors';
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;
const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres'
});

app.post('/api/gameposts', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const {
            hero, game_info, storyline, gameplay, quick_control_overview,
            system_requirement, get_game, carousel, modes, dlcs,
            awards_and_achievements, join_our_community,
            is_draft
        } = req.body;

        const savedAsDraft = is_draft !== false;
        const publishedAt = savedAsDraft ? null : new Date();

        // 1. Create Game Post
        const gpRes = await client.query('INSERT INTO gamepost.game_posts DEFAULT VALUES RETURNING game_post_id');
        const postId = gpRes.rows[0].game_post_id;

        // 1.5 Update admin tracking table
        await client.query(
            'INSERT INTO admin_gamepost.admin (game_post_id, saved_as_draft, published_at, scheduled_at) VALUES ($1, $2, $3, null)',
            [postId, savedAsDraft, publishedAt]
        );

        // 2. Hero
        if (hero) {
            await client.query(
                'INSERT INTO gamepost.hero (game_post_id, game_title, game_desc_short, background_img) VALUES ($1, $2, $3, $4)',
                [postId, hero.game_title, hero.game_desc_short, hero.background_img]
            );
        }

        // 3. Game Info
        if (game_info) {
            await client.query(
                `INSERT INTO gamepost.game_info (game_post_id, developer, publisher, release_date, genres, platforms, profile_size_photo)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [postId, game_info.developer, game_info.publisher, game_info.release_date || null, game_info.genres, game_info.platforms, game_info.profile_size_photo]
            );
        }

        // 4. Storyline
        if (storyline) {
            await client.query(
                'INSERT INTO gamepost.storyline (game_post_id, paragraphs) VALUES ($1, $2)',
                [postId, storyline.paragraphs]
            );
        }

        // 5. Gameplay
        if (gameplay) {
            await client.query(
                'INSERT INTO gamepost.gameplay (game_post_id, paragraph, gameplay_title, gameplay_title_desc) VALUES ($1, $2, $3, $4)',
                [postId, gameplay.paragraph, gameplay.gameplay_title, gameplay.gameplay_title_desc]
            );
        }

        // 6. Quick Control Overview (Only one record expected per schema)
        if (quick_control_overview) {
            await client.query(
                'INSERT INTO gamepost.quick_control_overview (game_post_id, qco_title, qco_title_desc) VALUES ($1, $2, $3)',
                [postId, quick_control_overview.qco_title, quick_control_overview.qco_title_desc]
            );
        }

        // 7. System Requirements
        if (system_requirement) {
            await client.query(
                `INSERT INTO gamepost.system_requirement (
          game_post_id, os_min, os_rec, processor_min, processor_rec,
          memory_min, memory_rec, graphics_min, graphics_rec,
          storage_min, storage_rec, directx_min, directx_rec
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
                [
                    postId,
                    system_requirement.os_min, system_requirement.os_rec,
                    system_requirement.processor_min, system_requirement.processor_rec,
                    system_requirement.memory_min, system_requirement.memory_rec,
                    system_requirement.graphics_min, system_requirement.graphics_rec,
                    system_requirement.storage_min, system_requirement.storage_rec,
                    system_requirement.directx_min, system_requirement.directx_rec
                ]
            );
        }

        // 8. Get Game (Multiple records possible per schema)
        if (get_game && Array.isArray(get_game)) {
            for (let g of get_game) {
                await client.query(
                    'INSERT INTO gamepost.get_game (game_post_id, affiliate_links) VALUES ($1, $2)',
                    [postId, g.affiliate_links]
                );
            }
        } else if (get_game) {
            await client.query(
                'INSERT INTO gamepost.get_game (game_post_id, affiliate_links) VALUES ($1, $2)',
                [postId, get_game.affiliate_links]
            );
        }

        // Array Inserts
        if (carousel && carousel.length) {
            for (let c of carousel) {
                await client.query(
                    'INSERT INTO gamepost.carousel (game_post_id, yt_url_official, upload) VALUES ($1, $2, $3)',
                    [postId, c.yt_url_official, c.upload]
                );
            }
        }
        if (modes && modes.length) {
            for (let m of modes) {
                await client.query(
                    'INSERT INTO gamepost.modes (game_post_id, mode_title, mode_titledesc) VALUES ($1, $2, $3)',
                    [postId, m.mode_title, m.mode_titledesc]
                );
            }
        }
        if (dlcs && dlcs.length) {
            for (let d of dlcs) {
                await client.query(
                    'INSERT INTO gamepost.dlcs (game_post_id, dlc_pt) VALUES ($1, $2)',
                    [postId, d.dlc_pt]
                );
            }
        }
        if (awards_and_achievements && awards_and_achievements.length) {
            for (let a of awards_and_achievements) {
                await client.query(
                    'INSERT INTO gamepost.awards_and_achievements (game_post_id, aa_pt) VALUES ($1, $2)',
                    [postId, a.aa_pt]
                );
            }
        }
        if (join_our_community && join_our_community.length) {
            for (let cmp of join_our_community) {
                await client.query(
                    'INSERT INTO gamepost.join_our_community (game_post_id, platform_name, platform_link) VALUES ($1, $2, $3)',
                    [postId, cmp.platform_name, cmp.platform_link]
                );
            }
        }

        await client.query('COMMIT');
        res.status(201).json({ success: true, game_post_id: postId, saved_as_draft: savedAsDraft });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error inserting game post:', error);
        res.status(500).json({ error: error.message });
    } finally {
        client.release();
    }
});

app.get('/api/gameposts', async (req, res) => {
    try {
        const query = `
      SELECT gp.game_post_id, h.game_title, h.background_img, i.developer, i.release_date, a.saved_as_draft, a.published_at
      FROM gamepost.game_posts gp
      LEFT JOIN gamepost.hero h ON gp.game_post_id = h.game_post_id
      LEFT JOIN gamepost.game_info i ON gp.game_post_id = i.game_post_id
      LEFT JOIN admin_gamepost.admin a ON gp.game_post_id = a.game_post_id
    `;
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching game posts:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/gameposts/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = {};

        const qHero = await pool.query('SELECT * FROM gamepost.hero WHERE game_post_id = $1', [id]);
        result.hero = qHero.rows[0];

        const qInfo = await pool.query('SELECT * FROM gamepost.game_info WHERE game_post_id = $1', [id]);
        result.game_info = qInfo.rows[0];

        const qStory = await pool.query('SELECT * FROM gamepost.storyline WHERE game_post_id = $1', [id]);
        result.storyline = qStory.rows[0];

        const qGameplay = await pool.query('SELECT * FROM gamepost.gameplay WHERE game_post_id = $1', [id]);
        result.gameplay = qGameplay.rows[0];

        const qQco = await pool.query('SELECT * FROM gamepost.quick_control_overview WHERE game_post_id = $1', [id]);
        result.quick_control_overview = qQco.rows[0];

        const qSys = await pool.query('SELECT * FROM gamepost.system_requirement WHERE game_post_id = $1', [id]);
        result.system_requirement = qSys.rows[0];

        const qGetGame = await pool.query('SELECT * FROM gamepost.get_game WHERE game_post_id = $1', [id]);
        result.get_game = qGetGame.rows;

        const qCarousel = await pool.query('SELECT * FROM gamepost.carousel WHERE game_post_id = $1', [id]);
        result.carousel = qCarousel.rows;

        const qModes = await pool.query('SELECT * FROM gamepost.modes WHERE game_post_id = $1', [id]);
        result.modes = qModes.rows;

        const qDlcs = await pool.query('SELECT * FROM gamepost.dlcs WHERE game_post_id = $1', [id]);
        result.dlcs = qDlcs.rows;

        const qAwards = await pool.query('SELECT * FROM gamepost.awards_and_achievements WHERE game_post_id = $1', [id]);
        result.awards_and_achievements = qAwards.rows;

        const qCommunity = await pool.query('SELECT * FROM gamepost.join_our_community WHERE game_post_id = $1', [id]);
        result.join_our_community = qCommunity.rows;

        const qAdmin = await pool.query('SELECT * FROM admin_gamepost.admin WHERE game_post_id = $1', [id]);
        result.admin = qAdmin.rows[0];

        res.json(result);
    } catch (error) {
        console.error('Error fetching game post:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
