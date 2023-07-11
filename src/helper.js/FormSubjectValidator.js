import { subjectformStore } from '../Store/SubjectsStore/SubjectsFormStore';
export const validateSubjectForm = () => {
  const {userId, username, subject } = subjectformStore.formData;
  
  // Reset errors
  subjectformStore.clearErrors();
  
  // Check if it's a manually filled form
 
  
    if (userId === '') {
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
