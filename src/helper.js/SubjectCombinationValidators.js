import { subjectCombinationStore } from "../Store/SubjectsStore/SubjectCombinationStore";
export const validateSubjectCombinatinForm = () => {
  const { course_code ,name} = subjectCombinationStore.formData;
  
  // Reset errors
  subjectCombinationStore.clearErrors();
  
  // Check if it's a manually filled form
  const regex = /^[A-Z]{3}-\d{3}$/;
  const isValidFormat = regex.test(course_code);
  if (!isValidFormat) {
    subjectCombinationStore.setError('course_code','Invalid Format');
    // Invalid format, handle the error (e.g., display an error message)
    // console.log('Invalid format');
    return false;
  }
  
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
