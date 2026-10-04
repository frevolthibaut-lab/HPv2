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
export function legacyDiagnosticDraft(d,criteria,scores){
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

// Lecture métier du niveau de maturité. Les effets décrits sont des risques ou des
// leviers à vérifier, jamais des pertes financières ou des incidents supposés.
const consultantReadings={
 H1:['La note signale une délégation peu structurée.','La délégation existe mais son périmètre reste à fiabiliser.','La répartition des responsabilités constitue un point d’appui.', 'Des décisions insuffisamment cadrées peuvent accroître les sollicitations du dirigeant et ralentir le service.','Une délégation claire facilite la continuité en l’absence du dirigeant.'],
 H2:['Les routines de management apparaissent insuffisamment installées.','Le management dispose de routines dont la régularité reste à consolider.','Les routines de management offrent un cadre structuré.', 'Sans suivi régulier des décisions, les mêmes difficultés peuvent revenir d’un service à l’autre.','Ces routines facilitent la traduction des objectifs en décisions suivies.'],
 H3:['La transmission des consignes apparaît peu sécurisée.','La communication interne fonctionne mais reste à rendre plus systématique.','La communication interne présente un niveau de structuration élevé.', 'Une consigne mal transmise peut créer des écarts d’exécution entre équipes ou entre services.','Une transmission organisée favorise une exécution cohérente entre les équipes.'],
 H4:['L’intégration des nouveaux collaborateurs apparaît peu structurée.','Un cadre d’intégration existe mais reste à consolider.','L’intégration des collaborateurs constitue un point d’appui.', 'L’apprentissage peut alors dépendre des personnes présentes, avec une autonomie et des pratiques inégales.','Un parcours organisé facilite l’autonomie et la transmission des standards.'],
 P1:['La visibilité sur le chiffre d’affaires et le ticket moyen apparaît insuffisante.','Le suivi de l’activité existe mais reste à rendre plus exploitable.','Le suivi du chiffre d’affaires offre une base de pilotage solide.', 'Il devient plus difficile de distinguer une variation de fréquentation d’un changement du panier moyen.','Ce suivi aide à distinguer les leviers de volume et de panier moyen.'],
 P2:['Le pilotage des coûts matière apparaît insuffisamment structuré.','Les coûts matière sont partiellement suivis et restent à fiabiliser.','Le suivi des coûts matière constitue un point d’appui.', 'Une hausse des achats ou un écart de portion peut échapper au suivi et fragiliser la marge sans être identifié.', 'La connaissance des coûts permet d’arbitrer les achats, les portions et les offres.'],
 P3:['Le rapprochement entre heures travaillées et activité apparaît insuffisant.','Le suivi des heures existe mais son lien avec l’activité reste à consolider.','Le rapprochement des heures et de l’activité offre un repère utile.', 'L’ajustement des effectifs risque de reposer davantage sur l’habitude que sur la charge réelle.','Ce repère facilite des arbitrages d’effectifs adaptés à la charge de travail.'],
 P4:['Le pilotage par indicateurs apparaît peu structuré.','Des indicateurs existent mais leur traduction en décisions reste à renforcer.','Le pilotage par indicateurs présente une maturité élevée.', 'Collecter des chiffres sans revue ni décision peut retarder la détection et le traitement des écarts.','Une revue régulière aide à transformer les écarts observés en actions suivies.'],
 G1:['L’acquisition de nouveaux clients apparaît peu pilotée.','Les canaux d’acquisition sont partiellement structurés.','L’acquisition dispose de pratiques structurées.', 'Sans suivi par canal, il est difficile de savoir où concentrer le temps et le budget commercial.','Un suivi par canal facilite l’allocation des efforts commerciaux.'],
 G2:['Le suivi des demandes et des devis apparaît peu sécurisé.','Le suivi commercial existe mais sa régularité reste à fiabiliser.','Le suivi commercial constitue un point d’appui.', 'Des demandes peuvent perdre en potentiel si les délais de réponse et les relances restent irréguliers.','Un suivi organisé aide à exploiter les demandes reçues et à mesurer leur conversion.'],
 G3:['Le pilotage des offres et des prix apparaît insuffisamment structuré.','Les offres et les prix sont travaillés mais leurs arbitrages restent à étayer.','Les offres et les prix disposent d’un cadre de pilotage structuré.', 'Un prix ou une offre ajustés sans données de coût et de demande peuvent dégrader l’équilibre commercial.','Ce cadre aide à concilier attractivité de l’offre et cohérence économique.'],
 G4:['La fidélisation apparaît peu organisée.','Des pratiques de fidélisation existent mais restent à rendre régulières.','La fidélisation constitue un point d’appui commercial.', 'La relation après la visite peut rester ponctuelle, limitant les occasions de retour et de recommandation.','Un suivi client organisé soutient les occasions de retour et de recommandation.'],
 O1:['Les procédures opérationnelles apparaissent peu formalisées.','Des procédures existent mais leur usage reste à homogénéiser.','Les procédures offrent un cadre opérationnel structuré.', 'L’exécution peut dépendre du savoir individuel et varier lorsque l’équipe change.','Des procédures appropriées facilitent la continuité et la transmission du savoir-faire.'],
 O2:['La fluidité du service apparaît insuffisamment maîtrisée.','Le service fonctionne mais certains enchaînements restent à fiabiliser.','La fluidité du service constitue un point d’appui.', 'Des transitions mal coordonnées peuvent créer de l’attente, surtout lorsque la charge augmente.','Une coordination claire facilite l’absorption des pics d’activité.'],
 O3:['L’adaptation des plannings à l’activité apparaît peu structurée.','Les plannings intègrent l’activité mais les écarts restent à mieux anticiper.','La construction des plannings dispose de repères structurés.', 'Une couverture mal ajustée peut créer une tension en service ou mobiliser des heures peu utiles.','L’anticipation des besoins aide à équilibrer qualité de service et mobilisation des équipes.'],
 O4:['La maîtrise des standards d’exécution apparaît insuffisante.','Les standards sont partiellement maîtrisés et restent à stabiliser.','La qualité d’exécution constitue un point d’appui.', 'Des pratiques variables peuvent rendre l’expérience client moins régulière entre les services.','Des standards suivis favorisent une expérience client constante.'],
 S1:['L’usage des outils apparaît insuffisamment organisé.','Les outils sont utilisés mais leur rôle et leur appropriation restent à clarifier.','L’usage des outils présente une maturité élevée.', 'Des usages dispersés peuvent multiplier les contournements et les informations difficiles à retrouver.','Des usages clairs facilitent l’accès à l’information et la coordination.'],
 S2:['La fiabilité des données de pilotage apparaît insuffisante.','Les données sont disponibles mais leur actualisation reste à fiabiliser.','Les données offrent une base de pilotage structurée.', 'Des chiffres incomplets ou non actualisés peuvent orienter une décision sur une lecture dépassée de l’activité.','Des données suivies permettent de comparer les périodes et de décider sur une base cohérente.'],
 S3:['La circulation de l’information entre outils apparaît peu structurée.','Les échanges entre outils restent partiellement à fiabiliser.','La circulation de l’information entre outils constitue un point d’appui.', 'Les ressaisies peuvent mobiliser du temps et créer des écarts entre les sources.','Une information cohérente entre outils limite les ressaisies et facilite le suivi.'],
 S4:['L’automatisation des tâches récurrentes apparaît peu développée.','Des automatisations existent mais leur périmètre reste à consolider.','L’automatisation constitue un levier déjà structuré.', 'Le temps consacré aux tâches répétitives peut réduire la disponibilité pour le service et le pilotage.','Des automatisations contrôlées libèrent de la disponibilité pour les tâches à valeur ajoutée.']
};
export function consultantFinding(code,score){
 const reading=consultantReadings[code];if(!reading||score===null||score===undefined)return '';
 const level=Number(score)<=1?0:Number(score)<=3?1:2;
 return `${reading[level]} ${reading[level===2?4:3]}`;
}
export function diagnosticDraft(d,criteria,scores){
 const draft=legacyDiagnosticDraft(d,criteria,scores);if(!draft)return null;
 const rows=criteria.map(c=>({...c,...scores.find(s=>s.criterion_code===c.code)})).filter(s=>s.score!==null&&s.score!==undefined);
 const summary=scoreSummary(rows);
 draft.priorities=draft.priorities.map(p=>({...p,finding:consultantFinding(p.criterion_code,rows.find(s=>s.code===p.criterion_code).score).slice(0,400)}));
 const weakest=draft.priorities.map(p=>consultantFinding(p.criterion_code,rows.find(s=>s.code===p.criterion_code).score));
 const gaps=summary.count<20?` La lecture reste partielle : ${20-summary.count} critères sont encore à renseigner.`:'';
 const validation=summary.reviewed<summary.count?' Les interprétations restent à vérifier par le consultant.':'';
 const opening=`${d.establishment_name} obtient ${summary.score??summary.provisional}/100${summary.score===null?' à titre provisoire':''}, sur ${summary.count}/20 critères renseignés. `;
 draft.client_summary=(opening+weakest.join(' ')+gaps+validation).slice(0,1200);
 const strong=[...rows].filter(s=>Number(s.score)>=4).sort((a,b)=>Number(b.score)-Number(a.score)||Number(a.sort_order??0)-Number(b.sort_order??0)).slice(0,3);
 if(strong.length)draft.strengths=strong.map(s=>consultantFinding(s.code,s.score)).join('\n').slice(0,700);
 return draft;
}

export function mergeDiagnosticDraft(d,priorities,next,previous=null,legacy=null){
 const fields=['criterion_code','title','finding','action','success_indicator'];
 const owns=(value,old,older)=>!String(value??'').trim()||[old,older].some(v=>v!==undefined&&String(value??'')===String(v??''));
 return {client_summary:owns(d.client_summary,previous?.client_summary,legacy?.client_summary)?next.client_summary:d.client_summary,
  strengths:owns(d.strengths,previous?.strengths,legacy?.strengths)?next.strengths:d.strengths,
  priorities:[1,2,3].map(rank=>{
   const current=priorities.find(p=>Number(p.rank)===rank),old=previous?.priorities.find(p=>p.rank===rank),generated=next.priorities.find(p=>p.rank===rank);
   const empty=!current||fields.every(k=>!String(current[k]??'').trim());
   const older=legacy?.priorities.find(p=>p.rank===rank);
   const automatic=current&&[old,older].some(candidate=>candidate&&fields.every(k=>String(current[k]??'')===String(candidate[k]??'')));
   const chosen=(empty||automatic)?generated:current;
   return {rank,...Object.fromEntries(fields.map(k=>[k,chosen?.[k]??(k==='criterion_code'?null:'')]))};
  })};
}
