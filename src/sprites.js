// Original pixel interpretation of Tux; Larry Ewing / GIMP credits in NOTICE.md.
export const TUX_SPRITE=['.....####.....','....######....','...########...','...##w##w##...','...##w##w##...','...###ww###...','...##wwww##...','..###wwww###..','..##wwwwww##..','.###wwwwww###.','.##wwwwwwww##.','###wwwwwwww###','###wwwwwwww###','.##wwwwwwww##.','..##wwwwww##..','..##########..','.wwww....wwww.'];
export const BIRD_SPRITE=['##..........##','####......####','..####..####..','....######....','.....####.....','......##......'];
export const PLANE_SPRITE=['........##........','.......####.......','.......####.......','##.....####.....##','##################','##################','.......####.......','.......####.......','.....########.....','.....########.....'];
// 40 x 15 pixels at scale 2: the intact and torn canopy share one silhouette rule.
export const CANOPY_SPRITES=[0,1].map(stage=>Array.from({length:15},(_,row)=>Array.from({length:40},(_,column)=>{const segment=Math.floor(column/5),offset=Math.abs(3.5-segment),top=Math.floor(offset*offset)*2,bottom=stage===1&&segment%3===0?top+8:29;return row*2>=top&&row*2<bottom?'#':'.';}).join('')));
