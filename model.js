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
