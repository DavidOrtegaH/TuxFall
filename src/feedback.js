export function scoreFeedback(previousScore,score,recordAtStart,recordBeaten){
 const milestones=[];
 for(let value=(Math.floor(previousScore/1000)+1)*1000;value<=score;value+=1000)milestones.push(value);
 return {newRecord:!recordBeaten&&recordAtStart>0&&score>recordAtStart&&score>previousScore,milestones};
}
