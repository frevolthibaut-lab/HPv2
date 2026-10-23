export const employeeQuestions = [
 ['clarity','Repères','Je sais ce qui est attendu de moi pendant le service.'],
 ['support','Repères','Je sais à qui demander de l’aide en cas de difficulté.'],
 ['readiness','Organisation','Les informations, le matériel et la préparation permettent de commencer le service correctement.'],
 ['workload','Organisation','Les effectifs et les compétences présents permettent de réaliser le travail demandé.'],
 ['handover','Coopération','Les informations utiles circulent entre la salle, la cuisine et les responsables.'],
 ['respect','Coopération','Les échanges entre collègues et responsables sont respectueux.'],
 ['onboarding','Intégration','À mon arrivée, j’ai reçu les explications et l’accompagnement nécessaires.'],
 ['training','Intégration','Je dispose de la formation nécessaire pour tenir mon poste.'],
 ['speaking','Expression','Je peux signaler un problème ou demander de l’aide.'],
 ['followup','Expression','Les difficultés signalées font l’objet d’un retour ou d’un suivi.'],
 ['products','Expérience client','Je connais suffisamment la carte pour conseiller les clients dans mon rôle.'],
 ['identity','Expérience client','Je saurais expliquer ce qui distingue Chez Carlo.']
];
export const openQuestions=[['preserve','Que faut-il absolument préserver chez Chez Carlo ?'],['simplify','Qu’est-ce qui vous complique le plus le travail ?'],['priority','Quelle amélioration faudrait-il prioriser ce mois-ci ?']];
export const scale=['Jamais','Rarement','Parfois','Souvent','Toujours'];
export function validateEmployee(input){
 if(!input||typeof input!=='object'||Array.isArray(input)||input.notice!==true||input.website)return {error:'Veuillez prendre connaissance de la notice.'};
 const answers={};
 for(const [key] of employeeQuestions){const v=input.answers?.[key];if(v!==null&&(!Number.isInteger(v)||v<1||v>5))return {error:'Répondez à chaque question ou choisissez « Non concerné ».'};answers[key]=v;}
 if(Object.values(answers).every(v=>v===null))return {error:'Renseignez au moins une réponse applicable.'};
 const comments={};for(const [key] of openQuestions){const v=input.comments?.[key]??'';if(typeof v!=='string'||v.length>1200)return {error:'Les commentaires sont limités à 1 200 caractères.'};comments[key]=v.trim();}
 return {data:{answers,comments}};
}
export function summarizeEmployee(rows,threshold=5){
 if(rows.length<threshold)return {suppressed:true,count:rows.length,items:[]};
 return {suppressed:false,count:rows.length,items:employeeQuestions.map(([key,theme,label])=>{const values=rows.map(r=>r.answers?.[key]).filter(v=>Number.isInteger(v)&&v>=1&&v<=5);return {key,theme,label,n:values.length,mean:values.length>=threshold?values.reduce((a,b)=>a+b,0)/values.length:null};})};
}
