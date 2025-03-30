// /src/controllers/userController.js
import pool from '../config/db.js';

export const getUserInfo = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const result = await pool.query(
      'SELECT first_name, last_name, avatar_url FROM users WHERE uid = $1',
      [uid]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    // e.g. { first_name: 'Alex', last_name: 'Johnson', avatar_url: 'https://...' }
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const getUserStats = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const tasksResult = await pool.query(
      'SELECT status FROM tasks WHERE uid = $1',
      [uid]
    );
    const tasks = tasksResult.rows;

    // Count how many tasks are completed vs in_progress
    const completedTasks = tasks.filter((t) => t.status === 'completed').length;
    const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
    const total = tasks.length;
    // On-time completion is hypothetical; adapt as needed
    const onTimeCompletion =
      total === 0 ? 0 : Math.round((completedTasks / total) * 100);

    res.json({
      completedTasks,
      inProgress,
      onTimeCompletion,
    });
  } catch (error) {
    next(error);
  }
};
