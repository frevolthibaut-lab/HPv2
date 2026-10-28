import {questionnaireVersion,surveyFields} from './employee-schema.js';
export {questionnaireVersion,surveyFields,surveyQuestions} from './employee-schema.js';
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
function validateLegacyEmployee(input){
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

const exclusions=new Set(['Je ne sais pas','Non concerné','Aucune perte de temps importante','Aucun obstacle identifié','Aucun critère clairement identifié','Raison inconnue']);
const nonApplicable=new Set(['Je ne sais pas','Non concerné','Je ne sais plus']);
const gates={
 org_workload_peaks:'Des difficultés observées',org_available_time:'Des moments identifiés',org_improvement:'Une proposition',offer_unmet_requests:'Des demandes identifiées',offer_test_proposal:'Une offre à proposer',onboarding_difficult_tasks:'Des difficultés observées',customer_main_issue:'Un problème identifié',customer_strengths:'Un point fort identifié',priority_first_action:'Une action à proposer'
};
export function fieldApplicable(key,fields){
 const root=key.split('.')[0];
 if(['onboarding_steps','onboarding_difficult_tasks','onboarding_autonomy_criteria','onboarding_support_priorities'].includes(root)&&fields.onboarding_reference==='Aucune intégration observée')return false;
 if(key.endsWith('.status')||key==='onboarding_reference')return true;
 if(gates[root]&&fields[root+'.status']!==gates[root])return false;
 if(root==='org_overtime'&&key!==root+'.count'&&!['Une fois','Deux ou trois fois','Quatre fois ou plus'].includes(fields[root+'.count']))return false;
 if(root==='offer_lost_opportunities'&&key!==root+'.frequency'&&!['Une fois','Plusieurs fois'].includes(fields[root+'.frequency']))return false;
 if(root==='org_time_losses'&&(key.endsWith('.priority')||key.endsWith('.example'))&&!(fields[root+'.causes']||[]).some(v=>!exclusions.has(v)))return false;
 if(key==='customer_reported_problems.other')return fields['customer_reported_problems.rows.9']&&!['Aucun signalement','Je ne sais pas','Non concerné'].includes(fields['customer_reported_problems.rows.9']);
 if(key.endsWith('.other'))return (fields[key.slice(0,-6)]||[]).includes('Autre');
 if(key.startsWith('onboarding_support_priorities.details.')){
  const opts=['Référent disponible','Fiche de poste ou liste de tâches','Présentation des produits','Démonstration pratique','Service en binôme','Point de suivi','Autre'];
  return (fields['onboarding_support_priorities.supports']||[]).includes(opts[Number(key.split('.').at(-1))]);
 }
 return true;
}
export function validateEmployee(input){
 if(input?.questionnaire_version===undefined)return validateLegacyEmployee(input);
 if(!input||typeof input!=='object'||Array.isArray(input)||input.questionnaire_version!==questionnaireVersion)return {error:'Version du questionnaire inconnue. Rechargez la page.'};
 if(input.notice!==true||input.website)return {error:'Veuillez prendre connaissance des informations sur la collecte.'};
 const raw=input.fields;
 if(!raw||typeof raw!=='object'||Array.isArray(raw))return {error:'Réponses invalides.'};
 const definitions=new Map(surveyFields.map(f=>[f.key,f]));
 if(Object.keys(raw).some(key=>!definitions.has(key)))return {error:'Le questionnaire contient un champ inconnu.'};
 const clean={};
 for(const def of surveyFields){
  let v=raw[def.key];if(v===undefined||v===null||v===''||(Array.isArray(v)&&v.length===0))continue;
  if(def.type==='multi'){
   if(!Array.isArray(v)||v.length>def.max||new Set(v).size!==v.length||v.some(x=>!def.options.includes(x))||(v.length>1&&v.some(x=>exclusions.has(x))))return {error:'Vérifiez les choix multiples et les limites de sélection.'};
   clean[def.key]=v.slice();
  }else if(def.type==='select'||def.type==='radio'){
   if(typeof v!=='string'||!def.options.includes(v))return {error:'Une réponse ne correspond pas aux choix proposés.'};clean[def.key]=v;
  }else{
   if(typeof v!=='string'||v.length>def.maxLength)return {error:'Un texte dépasse la longueur autorisée.'};if(v.trim())clean[def.key]=v.trim();
  }
 }
 for(const key of Object.keys(clean))if(!fieldApplicable(key,clean))delete clean[key];
 if(clean['org_time_losses.priority']&&!(clean['org_time_losses.causes']||[]).includes(clean['org_time_losses.priority']))return {error:'Choisissez la cause prioritaire parmi les causes sélectionnées.'};
 if(!Object.keys(clean).length)return {error:'Renseignez au moins une réponse avant de transmettre.'};
 const answers={_version:questionnaireVersion,fields:clean};
 if(JSON.stringify(answers).length>50000)return {error:'Vos réponses sont trop volumineuses. Raccourcissez les textes.'};
 return {data:{answers,comments:{}}};
}
export function summarizeCurrentEmployee(rows,threshold=5){
 const current=rows.filter(r=>r.answers?._version===questionnaireVersion),count=current.length;
 if(count<threshold)return {version:questionnaireVersion,suppressed:true,count,items:[]};
 return {version:questionnaireVersion,suppressed:false,count,items:surveyFields.filter(f=>f.type!=='text').map(f=>{
  const values=current.map(r=>r.answers.fields?.[f.key]).map(v=>Array.isArray(v)?v.filter(x=>!nonApplicable.has(x)):nonApplicable.has(v)||v==null?[]:[v]).filter(v=>v.length);
  const n=values.length;return {key:f.key,theme:f.theme,label:f.label,n,counts:n>=threshold?Object.fromEntries(f.options.filter(o=>!nonApplicable.has(o)).map(o=>[o,values.filter(v=>v.includes(o)).length])):null};
 }).filter(f=>f.n>0)};
}
