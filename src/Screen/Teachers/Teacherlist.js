import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import {teacherStore} from '../../Store/TeacherStore'



const TeacherList = observer(() => {
  const teachers = toJS(teacherStore.teacherData);
  console.log(teachers)
  return (
    <div className="teacher-list">
      <h2>Teacher List</h2>
      <ul>
        {teachers.map((teacher, index) => (
          <li key={index}>
            <strong>Name:</strong> {teacher.name}, <strong>Email:</strong> {teacher.email}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default TeacherList;
