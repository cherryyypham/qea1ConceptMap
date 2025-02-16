import axiosInstance from './axiosConfig';

export const getStudentOutcomeResults = async (courseId, studentId) => {
  try {
    const response = await axiosInstance.get(`/courses/${courseId}/outcome_results`, {
      params: {
        user_ids: [studentId],
      },
    });

    return response.data.outcome_results;
  } catch (error) {
    console.error('Error fetching student outcome results:', error);
    throw error;
  }
};
