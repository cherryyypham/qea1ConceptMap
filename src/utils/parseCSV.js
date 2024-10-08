import Papa from 'papaparse';

const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    Papa.parse(filePath, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        try {
          const data = result.data.map((row) => ({
            lgLabel: row.learningGoals,
            preReqs: row.preReqs ? row.preReqs.split(',').map((item) => item.trim()) : [],
            conPostReqs: row.conPostReqs ? row.conPostReqs.split(',').map((item) => item.trim()) : [],
            lessons: row.lessons ? row.lessons.split(',').map((item) => item.trim()) : [],
          }));
          resolve(data);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

export default parseCSV;
