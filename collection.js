import {createClient} from 'https://esm.sh/@supabase/supabase-js@2.116.0';
import {SUPABASE_URL,SUPABASE_KEY} from './config.js';
import {esc} from './model.js';
import {employeeQuestions,openQuestions,summarizeEmployee,summarizeCurrentEmployee,surveyFields,questionnaireVersion} from './employee-model.js';
const sb=createClient(SUPABASE_URL,SUPABASE_KEY,{auth:{storageKey:'hp-v2-auth'}}),$=id=>document.getElementById(id);
const id=new URLSearchParams(location.search).get('diagnostic');
const link=file=>id?`${file}?diagnostic=${encodeURIComponent(id)}`:file;
let campaign,rows=[],user,invitationCount=0,linkOperationPending=false;
const localLinks=new Map();
function result(r){if(r.error)throw Error(r.error.message);return r.data;}
function msg(t,error=false){$('message').textContent=t;$('message').classList.toggle('error',error);}
function date(t){return new Date(t).toLocaleDateString('fr-FR');}
$('nav').innerHTML=[['dashboard.html','Établissements'],['admin.html','Diagnostic'],['collection.html','Écoute salariés'],['synthese.html','Synthèse et priorités'],['report.html','Rapport client']].map(([f,t])=>`<a class="navItem ${f==='collection.html'?'active':''}" href="${link(f)}">${t}</a>`).join('');
$('signupBtn').classList.add('hide');
$('loginForm').addEventListener('submit',async e=>{e.preventDefault();$('loginBtn').disabled=true;try{const a=result(await sb.auth.signInWithPassword({email:$('email').value.trim(),password:$('password').value}));user=a.user;await enter();}catch(e){$('loginMsg').textContent=e.message;}finally{$('loginBtn').disabled=false;}});
async function enter(){document.body.classList.remove('authOnly');$('loginView').classList.add('hide');$('appView').classList.remove('hide');$('userName').textContent=user.email;try{await load();}catch(e){msg(e.message,true);}}
async function load(){
 if(!id){$('content').innerHTML='<section class="card"><h2>Choisissez un établissement</h2><a class="btn" href="dashboard.html">Voir les établissements</a></section>';return;}
 const d=result(await sb.from('hp_diagnostics').select('id,establishment_name').eq('id',id).single());$('estName').textContent=d.establishment_name;
 const campaigns=result(await sb.from('hp_employee_campaigns').select('*').eq('diagnostic_id',id).order('created_at',{ascending:false}));
 campaign=campaigns[0];
 if(!campaign){$('content').innerHTML='<section class="card"><h2>Écoute salariés</h2><p>Une collecte distincte conserve les perceptions des équipes hors du score HP.</p><button class="btn" id="newCampaign">Préparer le diagnostic initial</button></section>'; $('newCampaign').onclick=async()=>{try{result(await sb.from('hp_employee_campaigns').insert({diagnostic_id:id}));await load();}catch(e){msg(e.message,true);}};return;}
 rows=result(await sb.from('hp_employee_responses').select('answers,comments').eq('campaign_id',campaign.id));
 const invites=result(await sb.from('hp_employee_invitations').select('id,used_at').eq('campaign_id',campaign.id));
 invitationCount=invites.length;
 const remaining=Math.max(0,(campaign.expected_count||0)-rows.length);
 const legacyRows=rows.filter(r=>!r.answers?._version);
 const summary=summarizeEmployee(legacyRows);
 const liveCurrent=summarizeCurrentEmployee(rows);
 const frozen=campaign.status==='closed';
 const count=frozen?campaign.snapshot.count:rows.length;
 const legacyCount=frozen?(campaign.snapshot.legacy?.count??campaign.snapshot.count):legacyRows.length;
 const current=frozen?(campaign.snapshot.current||{count:0,suppressed:true,items:[]}):liveCurrent;
 const items=frozen?employeeQuestions.map(([key,theme,label])=>({key,theme,label,n:campaign.snapshot.items[key]?.n||0,mean:campaign.snapshot.items[key]?.mean??null})):summary.items;
 $('content').innerHTML=`<section class="card"><h2>${esc(campaign.title)}</h2><span class="pill">${campaign.status==='draft'?'Brouillon':frozen?'Clôturée — état figé':'Ouverte'}</span><p>${count} réponse(s)${campaign.expected_count?' / '+campaign.expected_count+' personnes prévues':''} · Fermeture prévue : ${date(campaign.closes_at)} · ${invites.length} lien(s) préparé(s).</p><p class="small">Les réponses salariés restent distinctes du score HP et du questionnaire dirigeant. Une moyenne décrit une perception ; elle demande une vérification terrain. « Non concerné » est exclu des calculs.</p>${campaign.status==='draft'?`<label class="field"><span>Nombre de participants / liens (sans nom)</span><input id="expected" type="number" min="1" max="100" value="${localLinks.get(campaign.id)?.length||invites.length||campaign.expected_count||10}"></label><label class="field"><span>Date de fin</span><input id="closes" type="date" value="${campaign.closes_at.slice(0,10)}"></label><div class="actions"><button class="btn secondary" id="generate">${invites.length?'Régénérer les liens du brouillon':'Préparer les liens individuels'}</button><button class="btn" id="open" ${!localLinks.has(campaign.id)?'disabled':''}>Ouvrir la collecte</button></div><p class="small">Les liens sont affichés uniquement pendant cette session. Conservez-les avant de quitter la page. Le bouton de régénération permet de remplacer un lot déjà créé, même après avoir quitté la page. Les anciens liens du brouillon deviennent alors inutilisables. Distribuez-les au hasard, sans liste associant une personne à un lien. Ouvrez la collecte après avoir informé les équipes.</p>`:''}${campaign.status==='open'?`<section aria-labelledby="relaunchTitle"><h3 id="relaunchTitle">Relancer la collecte</h3><p>${remaining} réponse(s) encore attendue(s). Les réponses déjà reçues sont conservées.</p>${remaining?`<label class="field"><span>Date de fin après relance</span><input id="relaunchCloses" type="date" value="${relaunchDate(campaign.closes_at)}"></label><button class="btn secondary" id="regenerate">Régénérer les ${remaining} liens restants</button><p class="small">Les anciens liens non utilisés seront désactivés. Téléchargez le nouveau lot et distribuez-le uniquement aux personnes qui n’ont pas encore répondu, sans registre nominatif. Aucun message n’est envoyé automatiquement.</p>`:'<p>Toutes les réponses prévues ont été reçues. Aucun nouveau lien n’est nécessaire.</p>'}</section><button class="btn secondary" id="close">Clôturer et figer la synthèse</button>`:''}<div id="links"></div></section>
 <section class="card" id="collective"><h2>Synthèse collective${frozen?' figée':''}</h2><p>${count} réponse(s) · seuil : 5 réponses applicables par question et par version.</p>
 ${current.count?renderCurrent(current):''}
 ${legacyCount?`<h3>Ancien questionnaire · ${legacyCount} réponse(s)</h3>${legacyCount<5?'<p>Résultats masqués : moins de cinq réponses.</p>':`<div class="tableWrap"><table><thead><tr><th>Thème / question</th><th>Réponses applicables</th><th>Moyenne / 5</th></tr></thead><tbody>${items.map(q=>`<tr><td><strong>${esc(q.theme)}</strong><div>${esc(q.label)}</div></td><td>${q.n}</td><td>${q.mean==null?'Masquée (< 5)':Number(q.mean).toFixed(1)}</td></tr>`).join('')}</tbody></table></div>`}`:''}
 ${!count?'<p>Aucune réponse enregistrée.</p>':''}
 <p class="small">Les versions sont analysées séparément. Les réponses « Je ne sais pas » et « Non concerné » sont exclues des résultats applicables. Aucun score global ni verbatim individuel. ${frozen?'Clôturée le '+date(campaign.closed_at)+'.':'État provisoire tant que la collecte est ouverte.'}</p><button class="btn secondary" id="export">Télécharger la synthèse collective</button></section>
 <section class="card"><h2>Analyse interne et actions des trois premiers mois</h2><p>Les commentaires détaillés sont réservés à votre compte. Reformulez les thèmes sans éléments identifiants avant toute restitution.</p><details><summary>Consulter les réponses libres internes (${rows.length} réponse(s))</summary>${renderInternal(rows)}${openQuestions.map(([k,label])=>`<h3>${esc(label)}</h3>${rows.map(r=>r.comments?.[k]).filter(Boolean).map(v=>`<p class="response">${esc(v)}</p>`).join('')||'<p>Aucun commentaire.</p>'}`).join('')}</details><ol><li>J1–J3 : expliquer les objectifs, les accès aux données et le calendrier.</li><li>J4–J10 : recueillir les réponses et rencontrer les responsables.</li><li>J11–J15 : croiser les perceptions avec les observations et les indicateurs.</li><li>J16–J30 : retenir trois priorités avec un responsable, une échéance et une mesure de résultat.</li></ol><a class="btn secondary" href="${link('synthese.html')}">Renseigner les priorités et leur indicateur</a></section>`;
 showLinks();
 if($('generate'))$('generate').onclick=generate;
 if($('regenerate'))$('regenerate').onclick=regenerate;
 if($('open'))$('open').onclick=async()=>{try{const n=Number($('expected').value);if(n!==localLinks.get(campaign.id)?.length)throw Error('Le nombre de participants doit correspondre au lot de liens préparé.');const end=new Date($('closes').value+'T23:59:59');result(await sb.rpc('hp_employee_open',{p_id:campaign.id,p_expected:n,p_closes:end.toISOString()}));await load();msg('Collecte ouverte. Vous pouvez distribuer les liens préparés.');}catch(e){msg(e.message,true);}};
 if($('close'))$('close').onclick=async()=>{if(!confirm('Clôturer ? Les liens seront désactivés et la synthèse sera figée.'))return;try{result(await sb.rpc('hp_employee_close',{p_id:campaign.id}));await load();msg('Collecte clôturée et synthèse figée.');}catch(e){msg(e.message,true);}};
 $('export').onclick=()=>{
 const lines=[d.establishment_name,campaign.title,frozen?'État figé':'État provisoire',`${count} réponses`,...currentText(current)];
 if(legacyCount){lines.push(`Ancien questionnaire : ${legacyCount} réponses`);if(legacyCount<5)lines.push('Résultats masqués : moins de cinq réponses.');else lines.push(...items.map(q=>`${q.theme} — ${q.label} : ${q.mean==null?'masqué':Number(q.mean).toFixed(1)+'/5'} (${q.n} réponses applicables)`));}
 lines.push('Versions séparées. Aucun commentaire individuel inclus.');download(lines.join('\n'),'Synthese_collective_Chez_Carlo.txt');};
}

function currentText(s){
 if(!s.count)return [];
 if(s.count<5||s.suppressed)return [`Questionnaire 90 jours : ${s.count} réponses. Résultats masqués : moins de cinq réponses.`];
 return [`Questionnaire 90 jours : ${s.count} réponses`,...s.items.map(q=>`${q.theme} — ${q.label} (${q.n} réponses applicables) : ${q.counts?Object.entries(q.counts).filter(([,n])=>n>0).map(([v,n])=>v+' : '+n).join(' ; '):'masqué (< 5)'}`)];
}
function renderCurrent(s){
 if(s.count<5||s.suppressed)return `<h3>Questionnaire 90 jours · ${s.count} réponse(s)</h3><p>Résultats masqués : moins de cinq réponses.</p>`;
 return `<h3>Questionnaire 90 jours · ${s.count} réponse(s)</h3><p class="small">Nombre de répondants par choix. Plusieurs choix sont possibles sur certaines questions ; leur somme peut dépasser le nombre de réponses applicables.</p><div class="tableWrap"><table><thead><tr><th>Thème / question</th><th>Réponses applicables</th><th>Répartition</th></tr></thead><tbody>${s.items.map(q=>`<tr><td><strong>${esc(q.theme)}</strong><div>${esc(q.label)}</div></td><td>${q.n}</td><td>${q.counts?Object.entries(q.counts).filter(([,n])=>n>0).map(([v,n])=>esc(v)+' : '+n).join('<br>'):'Masquée (< 5)'}</td></tr>`).join('')}</tbody></table></div>`;
}
function renderInternal(data){
 return surveyFields.filter(f=>f.type==='text').map(f=>{
 const values=data.filter(r=>r.answers?._version===questionnaireVersion).map(r=>r.answers.fields?.[f.key]).filter(v=>typeof v==='string'&&v.trim());
 return values.length?`<h3>${esc(f.label)}</h3>${values.map(v=>`<p class="response">${esc(v)}</p>`).join('')}`:'';
 }).join('');
}

function download(text,name){const a=document.createElement('a'),url=URL.createObjectURL(new Blob([text],{type:'text/plain;charset=utf-8'}));a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function showLinks(){const links=localLinks.get(campaign.id);if(!links)return;$('links').innerHTML=`<h3>Liens à distribuer sans registre nominatif</h3><p class="small">Ces liens donnent accès au formulaire uniquement. Ils ne permettent pas de lire les réponses.</p><button class="btn secondary" id="downloadLinks">Télécharger le lot de liens</button><div>${links.map((l,i)=>`<label class="field"><span>Lien ${i+1}</span><input readonly value="${esc(l)}"></label>`).join('')}</div>`;$('downloadLinks').onclick=()=>download(links.join('\n'),'Liens_collecte_Chez_Carlo.txt');if($('open'))$('open').disabled=false;}
function relaunchDate(closes){
 const existing=new Date(closes);const chosen=existing.getTime()>Date.now()?existing:new Date(Date.now()+7*86400000);
 return [chosen.getFullYear(),String(chosen.getMonth()+1).padStart(2,'0'),String(chosen.getDate()).padStart(2,'0')].join('-');
}
function relaunchDeadline(value){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(value))throw Error('Choisissez une date de fin valide.');
 const end=new Date(value+'T23:59:59');
 if(!Number.isFinite(end.getTime())||end<=new Date()||end.getTime()>Date.now()+60*86400000)throw Error('La date de fin doit être à venir et dans les 60 prochains jours.');
 return end.toISOString();
}
async function makeLinks(n){
 const links=[],hashes=[];
 for(let i=0;i<n;i++){
  const token=Array.from(crypto.getRandomValues(new Uint8Array(32))).map(x=>x.toString(16).padStart(2,'0')).join('');
  const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token)))).map(x=>x.toString(16).padStart(2,'0')).join('');
  hashes.push(hash);const u=new URL('employee.html',location.href);u.search='';u.hash='invitation='+token;links.push(u.href);
 }
 return {links,hashes};
}
async function generate(){
 if(linkOperationPending)return;
 const btn=$('generate');
 try{
  const n=Number($('expected').value);if(!Number.isInteger(n)||n<1||n>100)throw Error('Choisissez entre 1 et 100 participants.');
  if((invitationCount||localLinks.has(campaign.id))&&!confirm('Régénérer le lot du brouillon ? Tous les anciens liens seront désactivés. Téléchargez et conservez ensuite le nouveau lot.'))return;
  linkOperationPending=true;btn.disabled=true;
  const {links,hashes}=await makeLinks(n);
  result(await sb.rpc('hp_employee_prepare_links',{p_id:campaign.id,p_hashes:hashes}));
  localLinks.set(campaign.id,links);invitationCount=n;showLinks();btn.textContent='Régénérer les liens du brouillon';msg('Nouveau lot préparé. Téléchargez-le avant de quitter cette page.');
 }catch(e){msg(e.message,true);}finally{linkOperationPending=false;btn.disabled=false;}
}
async function regenerate(){
 if(linkOperationPending)return;
 const btn=$('regenerate');
 try{
  const n=Math.max(0,(campaign.expected_count||0)-rows.length);
  if(n<1||n>100)throw Error('La relance doit concerner entre 1 et 100 réponses encore attendues.');
  const closes=relaunchDeadline($('relaunchCloses').value);
  if(!confirm('Régénérer les '+n+' liens restants ? Les anciens liens non utilisés seront désactivés. Les réponses déjà reçues seront conservées. Distribuez les nouveaux liens uniquement aux non-répondants.'))return;
  linkOperationPending=true;btn.disabled=true;
  const {links,hashes}=await makeLinks(n);
  result(await sb.rpc('hp_employee_regenerate_links',{p_id:campaign.id,p_hashes:hashes,p_closes:closes}));
  localLinks.set(campaign.id,links);
  // Display the newly issued links before any follow-up request so a load failure cannot hide them.
  showLinks();btn.textContent='Régénérer à nouveau les liens restants';
  msg(n+' nouveaux liens créés. Les anciens liens non utilisés sont désactivés. Téléchargez ce lot avant de quitter la page.');
  await load();
 }catch(e){msg(e.message,true);}finally{linkOperationPending=false;if(btn.isConnected)btn.disabled=false;}
}
const {data:{session},error}=await sb.auth.getSession();if(error)$('loginMsg').textContent=error.message;else if(session){user=session.user;await enter();}
