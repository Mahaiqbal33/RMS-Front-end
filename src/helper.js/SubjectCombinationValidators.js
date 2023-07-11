import { subjectCombinationStore } from "../Store/SubjectsStore/SubjectCombinationStore";
export const validateSubjectCombinatinForm = () => {
  const { course_code ,name} = subjectCombinationStore.formData;
  
  // Reset errors
  subjectCombinationStore.clearErrors();
  
  // Check if it's a manually filled form
 
  
    if (course_code.trim=== '') {
      subjectCombinationStore.setError('course_code', 'Fields is required');
      return false;
    }


    if (name.trim()=== '') {
      subjectCombinationStore.setError('name', 'try again Something went wrong');
      return false;
    }

  return true;
};
