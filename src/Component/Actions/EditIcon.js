import React from 'react';
import { FaEdit } from 'react-icons/fa';

const EditIcon = ({ onClick }) => {
  return (
    <button className="edit-button" onClick={onClick}>
      <FaEdit />
    </button>
  );
};

export default EditIcon;
