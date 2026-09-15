import React, { useState } from 'react';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const [showOptions, setShowOptions] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'No due date';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = task.due_date && new Date(task.due_date) < new Date() && task.status !== 'Completed';

  return (
    <div className={`task-card priority-${task.priority.toLowerCase()}`}>
      <div className="task-header">
        <div className="task-title-section">
          <h3 className={task.status === 'Completed' ? 'completed' : ''}>{task.title}</h3>
          <div className="task-badges">
            <span className={`badge priority-${task.priority.toLowerCase()}`}>
              {task.priority}
            </span>
            <span className={`badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
              {task.status}
            </span>
          </div>
        </div>
        <div className="task-menu">
          <button
            className="menu-btn"
            onClick={() => setShowOptions(!showOptions)}
            aria-label="Task options"
          >
            ⋮
          </button>
          {showOptions && (
            <div className="options-dropdown">
              <button onClick={() => onEdit(task)}>Edit</button>
              <button onClick={() => onStatusChange(task.id, 'Completed')}>Mark Complete</button>
              <button className="delete" onClick={() => onDelete(task.id)}>Delete</button>
            </div>
          )}
        </div>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-footer">
        <div className="due-date" style={isOverdue ? { color: '#ef4444' } : {}}>
          📅 {formatDate(task.due_date)}
        </div>
        <small className="created-date">
          Created {new Date(task.created_at).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};

export default TaskCard;
