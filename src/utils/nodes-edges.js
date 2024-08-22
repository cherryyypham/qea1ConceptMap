import parseCSV from './parseCSV';

export const initialNodes = [];
export const initialEdges = [];

(async () => {
  const data = await parseCSV('/qea1ConceptMap/csvGen.csv');

  data.forEach((item, index) => {
    initialNodes.push({
      id: item.lgLabel,
      position: { x: 0, y: index * 100 },
      data: { 
        label: item.lgLabel,
        preReqs: item.preReqs,
        conPostReqs: item.conPostReqs,
        lessons: item.lessons
      },
    });

    item.conPostReqs.forEach((conPostReq) => {
      initialEdges.push({
        id: `${item.lgLabel}-${conPostReq}`,
        source: item.lgLabel,
        target: conPostReq,
        animated: true,
      });
    });
  });
})();
