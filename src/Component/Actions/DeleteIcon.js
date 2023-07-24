import React from 'react';
import { FaTrash } from 'react-icons/fa';

const DeleteIcon = ({ onClick }) => {
  return (
    <button onClick={onClick} className="delete-button">
      <FaTrash />
    </button>
  );
};

export default DeleteIcon;
