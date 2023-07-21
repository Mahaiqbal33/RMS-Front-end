import { formStore } from "../Store/TestStore/TestFormStore";
export const FormTestValidator = () => {
  const { subject, name, totalMarks, className } = formStore.formData;
  // Reset errors
  formStore.clearErrors();
  
 

  // Validate subject
  if (!subject) {
    this.setError('subject', 'Subject is required');
    return false;
  }

  // Validate name
  if (!name) {
    this.setError('name', 'Test name is required');
     return false;
  }

  // Validate totalMarks
  if (!totalMarks) {
    this.setError('totalMarks', 'Total Marks is required');
     return false;
  } else if (isNaN(totalMarks) || +totalMarks <= 0) {
    this.setError('totalMarks', 'Total Marks must be a positive number');
     return false;
  }

  // Validate className
  if (!className) {
    this.setError('className', 'Class Name is required');
     return false;
  }

  return true;
};
