import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.116.0';
import { SUPABASE_URL,SUPABASE_KEY } from './config.js';
import { questions } from './questions.js';
import { dims,esc,scoreSummary,missingReport,actionSuggestions } from './model.js';
const sb=createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{storageKey:'hp-v2-auth'}});
const $=id=>document.getElementById(id);
const page=document.body.dataset.page;
let user,diagnostic,criteria=[],scores=[],priorities=[],reportState={},dirty=false,loading=false;
const requested=new URLSearchParams(location.search).get('diagnostic');
const href=(file,id=requested)=>id?`${file}?diagnostic=${encodeURIComponent(id)}`:file;
const date=s=>s?new Date(s).toLocaleDateString('fr-FR'):'—';
const reportLink=()=>href('report.html',diagnostic.id);
function result(r){if(r.error)throw new Error(r.error.message);return r.data;}
function showMessage(text,error=false,id='message'){const el=$(id);if(el){el.textContent=text;el.classList.toggle('error',error);}}
function options(items,current){return items.map(x=>`<option value="${esc(x)}" ${x===current?'selected':''}>${esc(x)}</option>`).join('');}
function bind(id,event,handler){const el=$(id);if(el)el.addEventListener(event,handler);}
function shell(){
 const links=[['dashboard.html','Établissements','⌂','dashboard'],['admin.html','Diagnostic','▥','admin'],['synthese.html','Synthèse et priorités','◇','synthese'],['report.html','Rapport client','↗','report']];
 $('nav').innerHTML=links.map(([file,title,icon,key])=>`<a class="navItem ${page===key?'active':''}" href="${href(file)}"><span class="navIcon">${icon}</span>${title}</a>`).join('');
 bind('loginForm','submit',async e=>{
  e.preventDefault();$('loginBtn').disabled=true;showMessage('Connexion…',false,'loginMsg');
  try{const data=result(await sb.auth.signInWithPassword({email:$('email').value.trim(),password:$('password').value}));user=data.user;await enter();}
  catch(e){showMessage(e.message,true,'loginMsg');}finally{$('loginBtn').disabled=false;}
 });
 bind('signupBtn','click',async()=>{
  if(!$('loginForm').reportValidity())return;
  if($('password').value.length<10){showMessage('Choisissez un mot de passe d’au moins 10 caractères.',true,'loginMsg');return;}
  $('signupBtn').disabled=true;
  try{const data=result(await sb.auth.signUp({email:$('email').value.trim(),password:$('password').value,options:{emailRedirectTo:new URL('dashboard.html',location.href).href}}));
   if(data.session){user=data.user;await enter();}else showMessage('Confirmez votre adresse avec l’email reçu, puis revenez ici pour vous connecter.',false,'loginMsg');
  }catch(e){showMessage(e.message,true,'loginMsg');}finally{$('signupBtn').disabled=false;}
 });
}
async function enter(){
 document.body.classList.remove('authOnly');$('loginView').classList.add('hide');$('appView').classList.remove('hide');
 $('userName').textContent=user.email;showMessage('Chargement…');
 try{if(page==='dashboard')await dashboard();else await loadDiagnostic();showMessage('');}
 catch(e){showMessage(e.message,true);}
}
async function dashboard(){
 const [ds,ss,states]=await Promise.all([sb.from('hp_diagnostics').select('*').order('created_at',{ascending:false}),sb.from('hp_score_summary').select('*'),sb.from('hp_report_state').select('*')]);
 const diagnostics=result(ds),summaries=result(ss),reportStates=result(states);
 const render=()=>{
  const filtered=diagnostics.filter(d=>d.establishment_name.toLowerCase().includes($('search').value.toLowerCase())&&(!$('statusFilter').value||d.status===$('statusFilter').value));
  $('list').innerHTML=filtered.length?`<div class="tableWrap"><table><thead><tr><th>Établissement</th><th>Statut</th><th>HP Score</th><th>Rapport</th><th>Date</th></tr></thead><tbody>${filtered.map(d=>{
   const s=summaries.find(s=>s.diagnostic_id===d.id)||{},r=reportStates.find(x=>x.diagnostic_id===d.id)||{};
   return `<tr><td><a class="rowLink" href="${href('admin.html',d.id)}">${esc(d.establishment_name)}</a><div class="small">${esc(d.establishment_type||'Type à préciser')}</div></td><td><span class="pill">${esc(d.status)}</span></td><td>${s.hp_score??s.preliminary_score_100??'—'}${s.criteria_scored?'/100':''}<div class="small">${s.criteria_scored||0}/20 critères · ${r.ready?'Vérifié':'Provisoire'}</div></td><td><a href="${href('report.html',d.id)}">${r.ready?'Validé':'À préparer'} →</a></td><td>${date(d.created_at)}</td></tr>`;
  }).join('')}</tbody></table></div>`:'<div class="empty">Aucun établissement. Créez votre premier diagnostic.</div>';
  $('total').textContent=`${diagnostics.length} établissement${diagnostics.length>1?'s':''}`;
 };
 bind('search','input',render);bind('statusFilter','change',render);render();
 bind('newForm','submit',async e=>{
  e.preventDefault();$('createBtn').disabled=true;showMessage('Création…');
  try{const d=result(await sb.from('hp_diagnostics').insert({establishment_name:$('newName').value.trim(),establishment_type:$('newType').value||null}).select().single());location.href=href('admin.html',d.id);}
  catch(e){showMessage(e.message,true);$('createBtn').disabled=false;}
 });
}
async function loadDiagnostic(){
 if(!requested){$('content').innerHTML='<div class="card empty">Choisissez un établissement pour poursuivre.<br><a class="btn" href="dashboard.html">Voir les établissements</a></div>';return;}
 const [d,c,s,p,r]=await Promise.all([
  sb.from('hp_diagnostics').select('*').eq('id',requested).maybeSingle(),sb.from('hp_criteria').select('*').order('sort_order'),
  sb.from('hp_diagnostic_scores').select('*').eq('diagnostic_id',requested),sb.from('hp_priorities').select('*').eq('diagnostic_id',requested).order('rank'),sb.from('hp_report_state').select('*').eq('diagnostic_id',requested).maybeSingle()
 ]);
 diagnostic=result(d);if(!diagnostic)throw new Error('Établissement indisponible. Retournez à la liste des établissements.');
 criteria=result(c);scores=result(s);priorities=result(p);reportState=result(r)||{};
 $('estName').textContent=diagnostic.establishment_name;
 if(page==='admin')renderAdmin();else if(page==='synthese')renderSynthesis();else renderReport();
}
function scoreCard(){
 const s=scoreSummary(scores);return `<div class="card"><div class="scoreHero"><div><strong>${s.score??s.provisional??'—'}</strong><small> /100</small></div><div><span class="pill">${reportState.ready?'Diagnostic validé':'Score provisoire'}</span><p class="small">${s.count}/20 critères renseignés · ${s.reviewed}/20 vérifiés</p></div></div>${dimensions()}<p class="small">Le HP Score évalue la maturité de l’organisation et de ses pratiques de pilotage. Il ne mesure pas sa santé financière.</p></div>`;
}
function dimensions(){return `<div class="dimensions">${Object.entries(dims).map(([key,label])=>{
 const codes=criteria.filter(c=>c.dimension===key).map(c=>c.code),rows=scores.filter(s=>codes.includes(s.criterion_code)&&s.score!==null),points=rows.reduce((t,s)=>t+Number(s.score),0);
 return `<div class="dimCard"><span>${label}</span><b>${rows.length===4?points:'—'}<small>/20</small></b><div class="track"><i style="width:${rows.length===4?points*5:0}%"></i></div><span class="small">${rows.length}/4 critères</span></div>`;
 }).join('')}</div>`;}
function trackDirty(){
 dirty=false;document.querySelectorAll('#content input,#content textarea,#content select').forEach(el=>el.addEventListener('input',()=>{dirty=true;showMessage('Modifications non enregistrées.');}));
}
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
function renderAdmin(){
 const answered=questions.filter(q=>String(diagnostic.answers?.[q[0]]??'').trim());
 $('content').innerHTML=scoreCard()+`<section class="card"><h2>Fiche établissement</h2><div class="grid2">
 <label class="field"><span>Nom de l’établissement</span><input id="establishmentName" value="${esc(diagnostic.establishment_name)}" maxlength="180" required></label>
 <label class="field"><span>Statut</span><select id="status">${options(['Nouveau','Pris en charge','Clos'],diagnostic.status)}</select></label>
 </div><div class="small">${esc(diagnostic.respondent_name||'Contact à renseigner dans le questionnaire')} · ${esc(diagnostic.respondent_email||'')}</div><div class="actions"><button class="btn secondary" id="inviteBtn" type="button">${diagnostic.consent_at?'Créer un nouveau lien de questionnaire':'Créer le lien du questionnaire dirigeant'}</button></div><div id="inviteResult" class="message"></div>
 <details><summary>Réponses du dirigeant (${answered.length}/${questions.length})</summary><p class="small">Réponses déclaratives recueillies le ${date(diagnostic.consent_at)}.</p><div class="responses">${answered.map(q=>`<div class="response"><strong>${esc(q[1])}</strong><span>${esc(diagnostic.answers[q[0]])}</span></div>`).join('')||'<p>Aucune réponse reçue. Transmettez le lien du questionnaire.</p>'}</div></details></section>
 <section class="card"><h2>Vérifier les cinq piliers</h2><p class="small">Les propositions automatiques viennent du questionnaire. Ajustez la note, précisez sa source et confirmez chaque critère. 5/5 demande une pratique optimisée démontrée.</p>
 ${Object.entries(dims).map(([key,label],i)=>`<details ${i===0?'open':''}><summary>${label} · ${scores.filter(s=>criteria.find(c=>c.code===s.criterion_code)?.dimension===key&&s.reviewed).length}/4 vérifiés</summary>${criteria.filter(c=>c.dimension===key).map(c=>{
 const s=scores.find(x=>x.criterion_code===c.code)||{};
 return `<div class="criterion" data-code="${esc(c.code)}"><div class="criterionHead"><h3>${esc(c.code)} · ${esc(c.label)}</h3><select class="scoreInput" aria-label="Note ${esc(c.label)}"><option value="">À noter</option>${[0,1,2,3,4,5].map(n=>`<option value="${n}" ${s.score===n?'selected':''}>${n}/5</option>`).join('')}</select></div><p class="small">Proposition questionnaire : ${s.auto_score??'—'}/5. ${esc(s.auto_evidence||'À vérifier avec le dirigeant.')}</p><div class="grid2"><label class="field"><span>Constat / élément vérifié</span><textarea class="evidenceInput" maxlength="2000">${esc(s.observed_evidence||'')}</textarea></label><label class="field"><span>Source du constat</span><select class="sourceInput">${options(['Déclaration dirigeant','Observation consultant','Élément documenté'],s.evidence_source||'Déclaration dirigeant')}</select></label></div><label class="check"><input class="reviewedInput" type="checkbox" ${s.reviewed?'checked':''}><span>J’ai vérifié ce critère et sa source.</span></label></div>`;
 }).join('')}</details>`).join('')}</section>
 <section class="card"><h2>Notes internes</h2><p class="small">Ces notes restent dans l’espace consultant.</p><label class="field"><span>Notes de mission</span><textarea id="internalNotes" maxlength="10000">${esc(diagnostic.internal_notes)}</textarea></label></section>
 <div class="saveBar"><button class="btn" id="saveAdmin">Enregistrer le diagnostic</button><a class="btn secondary" href="${href('synthese.html')}">Préparer la synthèse →</a><span id="saveStatus" class="small"></span></div>`;
 bind('inviteBtn','click',createInvitation);bind('saveAdmin','click',saveAdmin);trackDirty();
 document.querySelectorAll('.criterion').forEach(el=>el.querySelectorAll('.scoreInput,.evidenceInput,.sourceInput').forEach(input=>input.addEventListener('input',()=>{el.querySelector('.reviewedInput').checked=false;})));
}
async function createInvitation(){
 const btn=$('inviteBtn');btn.disabled=true;showMessage('Création du lien…',false,'inviteResult');
 try{
  const token=Array.from(crypto.getRandomValues(new Uint8Array(32))).map(x=>x.toString(16).padStart(2,'0')).join('');
  const digest=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token));
  const hash=Array.from(new Uint8Array(digest)).map(x=>x.toString(16).padStart(2,'0')).join('');
  result(await sb.rpc('hp_create_invitation',{p_id:diagnostic.id,p_hash:hash}));
  const link=new URL('questionnaire.html',location.href);link.hash='invitation='+token;
  $('inviteResult').innerHTML=`<div class="notice">Lien valable 14 jours, pour un seul envoi. Un nouveau questionnaire demandera une nouvelle vérification du diagnostic.<label class="field"><span>Lien à transmettre au dirigeant</span><input id="invitationURL" readonly value="${esc(link.href)}"></label><div class="actions"><button class="btn secondary" id="copyInvite">Copier le lien</button><a class="btn secondary" target="_blank" rel="noopener noreferrer" href="${esc(link.href)}">Ouvrir le questionnaire</a></div><p class="small">Le lien complet reste visible pendant cette session. Conservez-le avant de quitter la page.</p></div>`;
  bind('copyInvite','click',async()=>{try{await navigator.clipboard.writeText(link.href);$('copyInvite').textContent='Lien copié';}catch{$('invitationURL').select();$('copyInvite').textContent='Lien sélectionné : copiez-le';}});
 }catch(e){showMessage(e.message,true,'inviteResult');}finally{btn.disabled=false;}
}
async function saveAdmin(){
 if(!$('establishmentName').reportValidity())return;
 const rows=[...document.querySelectorAll('.criterion')].map(el=>{
  const old=scores.find(s=>s.criterion_code===el.dataset.code)||{},score=el.querySelector('.scoreInput').value;
  return {diagnostic_id:diagnostic.id,criterion_code:el.dataset.code,score:score===''?null:Number(score),score_source:old.score_source==='manual'||(score!==''&&Number(score)!==old.auto_score)?'manual':'auto',observed_evidence:el.querySelector('.evidenceInput').value.trim(),evidence_source:el.querySelector('.sourceInput').value,reviewed:el.querySelector('.reviewedInput').checked};
 });
 if(rows.some(s=>s.reviewed&&(s.score===null||!s.observed_evidence))){showMessage('Chaque critère vérifié doit avoir une note et un constat.',true);return;}
 $('saveAdmin').disabled=true;showMessage('Enregistrement…');
 try{result(await sb.rpc('hp_save_diagnostic',{p_id:diagnostic.id,p_name:$('establishmentName').value.trim(),p_status:$('status').value,p_notes:$('internalNotes').value,p_scores:rows}));dirty=false;await loadDiagnostic();showMessage('Diagnostic enregistré.');}
 catch(e){showMessage(e.message,true);}finally{if($('saveAdmin'))$('saveAdmin').disabled=false;}
}
function renderSynthesis(){
 const suggestions=scores.filter(s=>s.score!==null&&s.score<=3).sort((a,b)=>a.score-b.score).slice(0,5);
 $('content').innerHTML=scoreCard()+`<section class="card"><h2>Synthèse pour le client</h2><label class="field"><span>Lecture du diagnostic (1 200 caractères maximum)</span><textarea id="clientSummary" maxlength="1200">${esc(diagnostic.client_summary)}</textarea></label><label class="field"><span>Points forts (700 caractères maximum)</span><textarea id="strengths" maxlength="700">${esc(diagnostic.strengths)}</textarea></label></section>
 ${suggestions.length?`<section class="card"><h2>Suggestions à adapter</h2><p class="small">Issues des critères les moins bien notés. Choisissez les actions pertinentes, puis ajustez le constat et l’indicateur.</p><div class="actions">${suggestions.map(s=>`<button type="button" class="btn secondary suggestion" data-code="${esc(s.criterion_code)}">${esc(s.criterion_code)} · ${esc(actionSuggestions[s.criterion_code][0])}</button>`).join('')}</div></section>`:''}
 ${[1,2,3].map(rank=>{const p=priorities.find(x=>Number(x.rank)===rank)||{};return `<section class="card priority" data-rank="${rank}"><h3><span class="rank">0${rank}</span>Priorité ${rank}</h3><div class="grid2"><label class="field"><span>Titre</span><input class="titleInput" maxlength="90" value="${esc(p.title)}"></label><label class="field"><span>Critère associé (facultatif)</span><select class="criterionInput"><option value="">Choisir un critère</option>${criteria.map(c=>`<option value="${esc(c.code)}" ${p.criterion_code===c.code?'selected':''}>${esc(c.code+' · '+c.label)}</option>`).join('')}</select></label></div><label class="field"><span>Constat retenu</span><textarea class="findingInput" maxlength="400">${esc(p.finding)}</textarea></label><label class="field"><span>Action concrète</span><textarea class="actionInput" maxlength="400">${esc(p.action)}</textarea></label><label class="field"><span>Comment mesurer la réussite ?</span><input class="indicatorInput" maxlength="150" value="${esc(p.success_indicator)}"></label></section>`;}).join('')}
 <div class="saveBar"><button class="btn" id="saveSynthesis">Enregistrer la synthèse</button><a class="btn secondary" href="${reportLink()}">Voir le rapport →</a></div>`;
 bind('saveSynthesis','click',saveSynthesis);trackDirty();
 document.querySelectorAll('.suggestion').forEach(btn=>btn.onclick=()=>{
  const target=[...document.querySelectorAll('.priority')].find(el=>!el.querySelector('.titleInput').value.trim());
  if(!target){showMessage('Les trois priorités sont renseignées. Modifiez une priorité pour choisir une autre action.',true);return;}
  const code=btn.dataset.code,s=scores.find(s=>s.criterion_code===code),[title,action,indicator]=actionSuggestions[code];
  target.querySelector('.titleInput').value=title;target.querySelector('.criterionInput').value=code;
  target.querySelector('.findingInput').value=(s.observed_evidence||s.auto_evidence||'').slice(0,400);
  target.querySelector('.actionInput').value=action;target.querySelector('.indicatorInput').value=indicator;
  dirty=true;showMessage('Suggestion ajoutée. Ajustez-la puis enregistrez la synthèse.');target.scrollIntoView({behavior:'smooth',block:'center'});
 });
}
async function saveSynthesis(){
 const rows=[...document.querySelectorAll('.priority')].map(el=>({rank:Number(el.dataset.rank),criterion_code:el.querySelector('.criterionInput').value||null,title:el.querySelector('.titleInput').value.trim(),finding:el.querySelector('.findingInput').value.trim(),action:el.querySelector('.actionInput').value.trim(),success_indicator:el.querySelector('.indicatorInput').value.trim()}));
 $('saveSynthesis').disabled=true;showMessage('Enregistrement…');
 try{result(await sb.rpc('hp_save_synthesis',{p_id:diagnostic.id,p_summary:$('clientSummary').value.trim(),p_strengths:$('strengths').value.trim(),p_priorities:rows}));dirty=false;await loadDiagnostic();showMessage('Synthèse et priorités enregistrées.');}
 catch(e){showMessage(e.message,true);}finally{if($('saveSynthesis'))$('saveSynthesis').disabled=false;}
}
function renderReport(){
 const missing=missingReport(diagnostic,scores,priorities),ready=reportState.ready;
 $('content').innerHTML=`<section class="card screenOnly"><h2>${ready?'Rapport validé':'Rapport à valider'}</h2><p class="small">${missing.length?esc(missing.join(' · ')):'Le diagnostic est complet. Relisez le rapport puis confirmez sa validation.'}</p><div class="actions"><button class="btn" id="validateBtn" ${missing.length?'disabled':''}>Valider ce rapport</button><button class="btn secondary" id="printBtn" ${!ready?'disabled':''}>Exporter en PDF</button><a class="btn secondary" href="${href('synthese.html')}">Modifier la synthèse</a></div><p class="small">${ready?'Validé le '+date(reportState.validated_at)+'.':'Toute modification du diagnostic ou de la synthèse impose une nouvelle validation.'} Pour le PDF, choisissez « Enregistrer au format PDF » dans la fenêtre d’impression.</p></section>
 <div class="report" id="reportDocument">
 <section class="reportPage reportCover"><div><div class="reportBrand">HP</div><div>Hospitality Performance</div></div><div><div class="eyebrow">Diagnostic initial</div><h1>Rapport de<br>diagnostic</h1><div class="reportName">${esc(diagnostic.establishment_name)}</div><p>${esc(diagnostic.establishment_type||'Établissement CHR')} · ${date(diagnostic.created_at)}</p><p>${ready?'Diagnostic validé par le consultant':'Brouillon — à valider'}</p></div><div><p style="font-family:Georgia,serif;font-style:italic;font-size:20px">« Il n’est de richesse que d’hommes. »</p><p class="small" style="color:#ffffffb0">Jean Bodin</p><p>Des lieux d’exception plus performants demain.</p></div></section>
 <section class="reportPage"><div class="eyebrow">01 · Comprendre</div><h2>Votre diagnostic en un regard</h2><div class="scoreHero"><div><strong>${scoreSummary(scores).score??scoreSummary(scores).provisional??'—'}</strong><small> /100</small></div><span class="pill">${ready?'Diagnostic validé':'Score provisoire'}</span></div>${dimensions()}<h3>Lecture du diagnostic</h3><div class="textBlock">${esc(diagnostic.client_summary||'Synthèse à rédiger.')}</div><h3 style="margin-top:24px">Vos points forts</h3><div class="textBlock">${esc(diagnostic.strengths||'Points forts à préciser avec le consultant.')}</div><div class="notice">Le score évalue la maturité de l’organisation et de ses pratiques de pilotage. Les constats reposent sur les déclarations du dirigeant et les vérifications du consultant. Les résultats financiers ne sont pas audités.</div><div class="reportNo">Hospitality Performance · ${esc(diagnostic.establishment_name)} · 2</div></section>
 <section class="reportPage"><div class="eyebrow">02 · Agir</div><h2>Trois priorités concrètes</h2>${[1,2,3].map(rank=>{
 const p=priorities.find(x=>Number(x.rank)===rank)||{};const s=scores.find(s=>s.criterion_code===p.criterion_code);
 return `<div class="reportPriority"><h3>${rank}. ${esc(p.title||'Priorité à compléter')}</h3>${s?`<div class="small">${esc(p.criterion_code)} · ${esc(s.evidence_source)}</div>`:''}<p><b>Constat</b></p><div class="textBlock">${esc(p.finding||'—')}</div><p><b>Action</b></p><div class="textBlock">${esc(p.action||'—')}</div><p><b>Indicateur de réussite</b></p><div class="textBlock">${esc(p.success_indicator||'—')}</div></div>`;
 }).join('')}<div class="reportNo">Hospitality Performance · ${esc(diagnostic.establishment_name)} · 3</div></section></div>`;
 bind('validateBtn','click',async()=>{if(loading)return;loading=true;$('validateBtn').disabled=true;
  try{result(await sb.from('hp_report_validations').insert({diagnostic_id:diagnostic.id}));await loadDiagnostic();showMessage('Rapport validé.');}catch(e){showMessage(e.message,true);}finally{loading=false;if($('validateBtn'))$('validateBtn').disabled=missing.length>0;}
 });
 bind('printBtn','click',async()=>{
  if(loading)return;loading=true;$('printBtn').disabled=true;
  try{const state=result(await sb.from('hp_report_state').select('*').eq('diagnostic_id',diagnostic.id).single());if(!state.ready){await loadDiagnostic();throw new Error('Le rapport a changé. Relisez-le et validez-le à nouveau.');}
   // Recharge aussi le contenu validé pour éviter l’export d’un aperçu devenu ancien dans un autre onglet.
   await loadDiagnostic();if(!reportState.ready)throw new Error('Rapport à valider.');
   const previous=document.title;document.title='HP_Diagnostic_'+diagnostic.establishment_name.replace(/[^a-zA-Z0-9À-ÿ_-]/g,'_');await document.fonts.ready;window.print();document.title=previous;
  }catch(e){showMessage(e.message,true);}finally{loading=false;if($('printBtn'))$('printBtn').disabled=!reportState.ready;}
 });
}
shell();
try{const {data:{session},error}=await sb.auth.getSession();if(error)throw error;if(session){user=session.user;await enter();}}
catch(e){showMessage('Connexion indisponible : '+e.message,true,'loginMsg');}
