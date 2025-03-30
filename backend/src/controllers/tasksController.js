// /src/controllers/tasksController.js
import pool from '../config/db.js';

// Retrieve all tasks for the authenticated user
export const getTasks = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const result = await pool.query('SELECT * FROM tasks WHERE uid = $1', [uid]);
    res.status(200).json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Create a new task for the authenticated user
export const createTask = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const { title, description, due_date, category } = req.body;
    // status defaults to in_progress (DB default)
    const result = await pool.query(
      'INSERT INTO tasks (uid, title, description, due_date, category) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [uid, title, description, due_date, category]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Update an existing task if it belongs to the authenticated user
export const updateTask = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const { id } = req.params;
    const { title, description, due_date, category, status } = req.body; // status included
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, category = $4, status = $5, updated_at = NOW() WHERE id = $6 AND uid = $7 RETURNING *',
      [title, description, due_date, category, status, id, uid]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Delete a task if it belongs to the authenticated user
export const deleteTask = async (req, res, next) => {
  try {
    const uid = req.user.uid;
    const { id } = req.params;
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND uid = $2',
      [id, uid]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};
