import { subjectformStore } from '../Store/SubjectsStore/SubjectsFormStore';
export const validateSubjectForm = () => {
  const {student_id,subject_id, username, subject } = subjectformStore.formData;
  
  // Reset errors
  subjectformStore.clearErrors();
  
  // Check if it's a manually filled form
 
  
    if( (student_id=== '')&&(subject_id==='') ){
      subjectformStore.setError('userId', 'Fields is required');
      return false;
    }
    if (username.trim() === '') {
      subjectformStore.setError('username', 'Username is required');
      return false;
    }


    if (subject.trim() === '') {
      subjectformStore.setError('subject', 'try again Something went wrong');
      return false;
    }

  return true;
};
