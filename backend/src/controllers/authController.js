// /src/controllers/authController.js
import pool from '../config/db.js';

export const syncUser = async (req, res, next) => {
  try {
    // Decoded token from verifyFirebaseToken
    const { uid, email } = req.user;
    // Suppose your frontend sends firstName, lastName in req.body
    const { firstName, lastName } = req.body;

    // Generate a dynamic avatar URL
    const avatarURL = `https://avatar.iran.liara.run/username?username=${encodeURIComponent(
      `${firstName} ${lastName}`
    )}`;

    // Check if user exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE uid = $1',
      [uid]
    );

    if (existingUser.rowCount === 0) {
      // Create new user
      await pool.query(
        `INSERT INTO users (uid, email, first_name, last_name, avatar_url)
         VALUES ($1, $2, $3, $4, $5)`,
        [uid, email, firstName, lastName, avatarURL]
      );
    } else {
      // Optionally update existing user (name, avatar, etc.)
      await pool.query(
        `UPDATE users
         SET first_name = $1, last_name = $2, avatar_url = $3
         WHERE uid = $4`,
        [firstName, lastName, avatarURL, uid]
      );
    }

    return res.status(200).json({ message: 'User synced successfully', avatarURL });
  } catch (error) {
    next(error);
  }
};
