export function scoreFeedback(previousScore,score,recordAtStart,recordBeaten){
 const milestones=[];
 for(let value=(Math.floor(previousScore/500)+1)*500;value<=score;value+=500)milestones.push(value);
 return {newRecord:!recordBeaten&&recordAtStart>0&&score>recordAtStart&&score>previousScore,milestones};
}
