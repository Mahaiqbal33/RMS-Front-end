import React from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import {teacherStore} from '../../Store/TeacherStore'


import axios from 'axios';
import "./Newteacher.css"


const NewTeacher = observer(() => {
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('https://jsonplaceholder.typicode.com/posts', teacherStore.data)
      .then((response) => {
        // Handle API response here

        // Add the new teacher to the store
        teacherStore.addTeacher();
        console.log(toJS(teacherStore.teacherData));


        teacherStore.resetForm();

      })
      .catch((error) => {
        // Handle API error here
      });
  };

  const handleRefresh = () => {
    teacherStore.resetForm();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    teacherStore.setData(name, value);
   
  };

  return (
    <div className="new-teacher">
      <div className="section-header">
        <h2>New Teacher</h2>
        <button className="refresh-btn" onClick={handleRefresh}>
          Reset Form
        </button>
      </div>

      <form className="teacher-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">
            Name:
            <input
              type="text"
              name="name"
              className="form-input"
              value={teacherStore.data.name}
              onChange={handleChange}
            />
          </label>

          <label className="form-label">
            Email Address:
            <input
              type="email"
              name="email"
              className="form-input"
              value={teacherStore.data.email}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            Class:
            <select
              name="className"
              className="form-input"
              value={teacherStore.data.className}
              onChange={handleChange}
            >
              <option value="">Select Class</option>
              <option value="1st year">1st year</option>
              <option value="2nd year">2nd year</option>
            </select>
          </label>

          <label className="form-label">
          Gender:
            <select
              name="gender"
              className="form-input"
              value={teacherStore.data.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="1st year">male</option>
              <option value="2nd year">Female</option>
            </select>
          </label>

        </div>

        <div className="form-row">
          <label className="form-label">
            Password:
            <input
              type="password"
              name="password"
              className="form-input"
              value={teacherStore.data.password}
              onChange={handleChange}
            />
          </label>

          <label className="form-label">
            Phone Number:
            <input
              type="text"
              name="phoneNumber"
              className="form-input"
              value={teacherStore.data.phoneNumber}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-row">
          <label className="form-label">
            Subject:
            <input
              type="text"
              name="subject"
              className="form-input"
              value={teacherStore.data.subject}
              onChange={handleChange}
            />
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Add to Teacher
        </button>
      </form>
    </div>
  );
});

export default NewTeacher;
