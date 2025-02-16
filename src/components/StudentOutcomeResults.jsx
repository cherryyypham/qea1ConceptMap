import React, { useEffect, useState } from 'react';
import { getStudentOutcomeResults } from '../api/canvasAPI';

const StudentOutcomeResults = ({ courseId, studentId }) => {
  const [outcomeResults, setOutcomeResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOutcomeResults = async () => {
      try {
        const results = await getStudentOutcomeResults(courseId, studentId);
        setOutcomeResults(results || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOutcomeResults();
  }, [courseId, studentId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading outcome results: {error.message}</p>;

  return (
    <div>
      <h2>Student Outcome Results</h2>
      <ul>
        {outcomeResults.length > 0 ? (
          outcomeResults.map((result) => (
            <li key={result.id}>
              <p><strong>Score:</strong> {result.score}</p>
              <p><strong>Percent:</strong> {result.percent}</p>
              <p><strong>Submitted/Assessed At:</strong> {new Date(result.submitted_or_assessed_at).toLocaleString()}</p>
              {result.alignment_description && (
                <p><strong>Alignment Description:</strong> {result.alignment_description}</p>
              )}
              <p><strong>Outcome ID:</strong> {result.links.learning_outcome}</p>
              <p><strong>User ID:</strong> {result.links.user}</p>
              <p><strong>Alignment ID:</strong> {result.links.alignment}</p>
            </li>
          ))
        ) : (
          <p>No outcome results found.</p>
        )}
      </ul>
    </div>
  );
};

export default StudentOutcomeResults;
