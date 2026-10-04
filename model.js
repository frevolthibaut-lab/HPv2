export const dims={Human:'Humain',Performance:'Performance',Growth:'Croissance',Operations:'Opérations',Systems:'Systèmes'};
export const actionSuggestions={
 H1:['Clarifier les responsabilités','Définir les responsabilités, les décisions déléguées et les relais en l’absence du dirigeant.','Nombre de sollicitations du dirigeant par semaine'],
 H2:['Installer une routine de management','Mettre en place un brief régulier et un point hebdomadaire avec objectifs et suivi des décisions.','Part des points de suivi tenus'],
 H3:['Fiabiliser la communication interne','Choisir un canal commun et formaliser la transmission des consignes entre les équipes.','Nombre de consignes manquées par semaine'],
 H4:['Structurer l’intégration','Créer un parcours d’accueil avec étapes, référent et vérification des compétences clés.','Part des intégrations suivant le parcours'],
 P1:['Suivre le chiffre d’affaires','Construire un suivi régulier du chiffre d’affaires et du ticket moyen, avec une période comparable.','Fréquence de mise à jour du suivi'],
 P2:['Suivre les coûts matière','Formaliser le suivi des achats, des coûts matière et des marges des offres principales.','Part des offres dont le coût matière est renseigné'],
 P3:['Rapprocher les heures et l’activité','Suivre les heures travaillées et l’activité sur la même période, puis ajuster les plannings.','Régularité du suivi CA par heure travaillée'],
 P4:['Concentrer le pilotage sur quelques indicateurs','Choisir les indicateurs utiles et organiser une revue avec décisions et responsables.','Nombre de revues de pilotage réalisées'],
 G1:['Structurer l’acquisition','Choisir les canaux prioritaires et mesurer les demandes qualifiées générées par chacun.','Demandes qualifiées par canal'],
 G2:['Améliorer le suivi commercial','Formaliser les délais de réponse, les étapes de relance et le suivi des devis.','Taux de transformation et délai de réponse'],
 G3:['Revoir les offres et les prix','Comparer les offres, leurs coûts et la demande avant d’ajuster leur présentation ou leur prix.','Part des offres revues avec données de coût'],
 G4:['Organiser la fidélisation','Structurer le suivi client et planifier des actions adaptées aux clients récurrents.','Part des clients récurrents'],
 O1:['Documenter les procédures clés','Rédiger les procédures prioritaires et vérifier leur appropriation en service.','Part des procédures prioritaires utilisées'],
 O2:['Fluidifier le service','Observer un service, identifier les attentes et clarifier les transitions entre les postes.','Temps d’attente sur le point de friction retenu'],
 O3:['Adapter les plannings à l’activité','Construire les plannings à partir des prévisions d’activité et revoir les écarts.','Écart entre heures prévues et heures réalisées'],
 O4:['Fiabiliser la qualité d’exécution','Définir les standards prioritaires et observer leur application sur plusieurs services.','Part des standards respectés lors des observations'],
 S1:['Clarifier l’usage des outils','Recenser les usages, supprimer les doublons et définir un responsable par outil.','Nombre d’usages sans outil ou responsable identifié'],
 S2:['Fiabiliser les données de pilotage','Définir une source de référence et une routine de mise à jour pour chaque indicateur.','Part des indicateurs mis à jour à temps'],
 S3:['Réduire les doubles saisies','Lister les doubles saisies et traiter les plus fréquentes avec une connexion ou un processus commun.','Temps hebdomadaire consacré aux doubles saisies'],
 S4:['Automatiser une tâche répétitive','Choisir une tâche fréquente, tester son automatisation et contrôler les erreurs avant généralisation.','Temps économisé et taux d’erreur sur la tâche']
};
export const esc=s=>String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
export function scoreSummary(scores){
 const filled=scores.filter(s=>s.score!==null&&s.score!==undefined);
 const points=filled.reduce((t,s)=>t+Number(s.score),0);
 return {count:filled.length,reviewed:filled.filter(s=>s.reviewed).length,score:filled.length===20?points:null,provisional:filled.length?Math.round(points/(filled.length*5)*100):null};
}
export function missingReport(d,scores,priorities){
 const missing=[];const s=scoreSummary(scores);
 if(s.count<20)missing.push(`${20-s.count} critère(s) à noter`);
 if(s.reviewed<20)missing.push(`${20-s.reviewed} critère(s) à vérifier`);
 if(!d.client_summary?.trim())missing.push('synthèse client à rédiger');
 for(let rank=1;rank<=3;rank++){
  const p=priorities.find(x=>Number(x.rank)===rank);
  if(!p||['title','finding','action','success_indicator'].some(k=>!p[k]?.trim()))missing.push(`priorité ${rank} à compléter`);
 }
 return missing;
}

// Restitution déterministe : les constats proviennent uniquement des données du diagnostic.
export function diagnosticDraft(d,criteria,scores){
 const rows=criteria.map(c=>({...c,...scores.find(s=>s.criterion_code===c.code)}))
  .filter(s=>s.score!==null&&s.score!==undefined&&Number.isFinite(Number(s.score)));
 if(!rows.length)return null;
 const ordered=[...rows].sort((a,b)=>Number(a.score)-Number(b.score)||Number(a.sort_order??0)-Number(b.sort_order??0)||a.code.localeCompare(b.code));
 const selected=ordered.slice(0,3),summary=scoreSummary(rows);
 const level=summary.provisional<40?'Les pratiques de pilotage et d’organisation nécessitent une structuration prioritaire.':summary.provisional<60?'Les pratiques sont partiellement structurées et leur régularité reste à consolider.':summary.provisional<80?'Les pratiques sont globalement structurées ; les écarts ciblés constituent les prochains axes de progrès.':'Les pratiques présentent un niveau de maturité élevé ; les priorités visent leur maintien et leur amélioration continue.';
 const pillars=Object.entries(dims).map(([key,label])=>{
  const items=rows.filter(s=>s.dimension===key);
  return items.length?`${label} : ${items.reduce((n,s)=>n+Number(s.score),0)}/${items.length*5}${items.length<4?' (partiel)':''}`:null;
 }).filter(Boolean).join(' ; ');
 const priorityRows=selected.map((s,i)=>{
  const [title,action,indicator]=actionSuggestions[s.code];
  const evidence=String(s.observed_evidence||s.auto_evidence||'').trim();
  return {rank:i+1,criterion_code:s.code,title:(Number(s.score)>=4?'Consolider : '+title:title).slice(0,90),
   finding:`${s.label} : ${s.score}/5. ${evidence||'Constat à préciser lors de la revue consultant.'}`.slice(0,400),action:action.slice(0,400),success_indicator:indicator.slice(0,150)};
 });
 const strong=[...rows].filter(s=>Number(s.score)>=4).sort((a,b)=>Number(b.score)-Number(a.score)||Number(a.sort_order??0)-Number(b.sort_order??0)).slice(0,3);
 return {client_summary:`${d.establishment_name} obtient ${summary.score??summary.provisional}/100${summary.score===null?' à titre provisoire':''}, sur ${summary.count}/20 critères renseignés et ${summary.reviewed}/20 vérifiés. ${level} ${pillars}. Les priorités proposées portent sur : ${selected.map(s=>s.label).join(', ')}.`.slice(0,1200),
  strengths:(strong.length?strong.map(s=>`${s.label} (${s.score}/5)${s.observed_evidence?` : ${s.observed_evidence}`:''}`).join('\n'):'Aucun critère renseigné n’atteint actuellement 4/5. Les points d’appui à valoriser restent à préciser avec le dirigeant.').slice(0,700),priorities:priorityRows};
}

export function mergeDiagnosticDraft(d,priorities,next,previous=null){
 const fields=['criterion_code','title','finding','action','success_indicator'];
 const owns=(value,old)=>!String(value??'').trim()||(old!==undefined&&String(value??'')===String(old??''));
 return {client_summary:owns(d.client_summary,previous?.client_summary)?next.client_summary:d.client_summary,
  strengths:owns(d.strengths,previous?.strengths)?next.strengths:d.strengths,
  priorities:[1,2,3].map(rank=>{
   const current=priorities.find(p=>Number(p.rank)===rank),old=previous?.priorities.find(p=>p.rank===rank),generated=next.priorities.find(p=>p.rank===rank);
   const empty=!current||fields.every(k=>!String(current[k]??'').trim());
   const automatic=current&&old&&fields.every(k=>String(current[k]??'')===String(old[k]??''));
   const chosen=(empty||automatic)?generated:current;
   return {rank,...Object.fromEntries(fields.map(k=>[k,chosen?.[k]??(k==='criterion_code'?null:'')]))};
  })};
}
