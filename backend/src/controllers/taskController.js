import { query } from '../config/database.js';

export const getTasks = async (req, res) => {
  try {
    const { status, priority, search, sort = 'newest' } = req.query;
    const userId = req.user.id;

    let sql = 'SELECT * FROM tasks WHERE user_id = ?';
    let params = [userId];

    if (status) {
      sql += ' AND status = ?';
      params.push(status);
    }

    if (priority) {
      sql += ' AND priority = ?';
      params.push(priority);
    }

    if (search) {
      sql += ' AND (title LIKE ? OR description LIKE ?)';
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm);
    }

    if (sort === 'newest') {
      sql += ' ORDER BY created_at DESC';
    } else if (sort === 'oldest') {
      sql += ' ORDER BY created_at ASC';
    } else if (sort === 'due_date') {
      sql += ' ORDER BY due_date ASC';
    } else if (sort === 'priority') {
      sql += ' ORDER BY FIELD(priority, "High", "Medium", "Low") ASC';
    }

    const tasks = await query(sql, params);

    res.json({
      success: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tasks',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const tasks = await query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (tasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.json({
      success: true,
      task: tasks[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, priority = 'Medium', status = 'Pending', due_date } = req.body;
    const userId = req.user.id;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    if (!['Low', 'Medium', 'High'].includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority',
      });
    }

    if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    await query(
      'INSERT INTO tasks (user_id, title, description, priority, status, due_date, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())',
      [userId, title, description || null, priority, status, due_date || null]
    );

    const newTask = await query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY id DESC LIMIT 1',
      [userId]
    );

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      task: newTask[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status, due_date } = req.body;
    const userId = req.user.id;

    const existingTasks = await query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (existingTasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    const updateFields = [];
    const updateParams = [];

    if (title !== undefined) {
      updateFields.push('title = ?');
      updateParams.push(title);
    }
    if (description !== undefined) {
      updateFields.push('description = ?');
      updateParams.push(description);
    }
    if (priority !== undefined) {
      updateFields.push('priority = ?');
      updateParams.push(priority);
    }
    if (status !== undefined) {
      updateFields.push('status = ?');
      updateParams.push(status);
    }
    if (due_date !== undefined) {
      updateFields.push('due_date = ?');
      updateParams.push(due_date);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No fields to update',
      });
    }

    updateFields.push('updated_at = NOW()');
    updateParams.push(id, userId);

    await query(
      `UPDATE tasks SET ${updateFields.join(', ')} WHERE id = ? AND user_id = ?`,
      updateParams
    );

    const updatedTask = await query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    res.json({
      success: true,
      message: 'Task updated successfully',
      task: updatedTask[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status',
      });
    }

    const existingTasks = await query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (existingTasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await query(
      'UPDATE tasks SET status = ?, updated_at = NOW() WHERE id = ? AND user_id = ?',
      [status, id, userId]
    );

    const updatedTask = await query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    res.json({
      success: true,
      message: 'Task status updated successfully',
      task: updatedTask[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating task status',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const existingTasks = await query(
      'SELECT * FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (existingTasks.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    await query(
      'DELETE FROM tasks WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    res.json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting task',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

export const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await query(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN status = 'In Progress' THEN 1 ELSE 0 END) as inProgress,
        SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN priority = 'High' THEN 1 ELSE 0 END) as highPriority
      FROM tasks WHERE user_id = ?`,
      [userId]
    );

    res.json({
      success: true,
      stats: stats[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching task stats',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};
