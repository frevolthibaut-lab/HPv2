import {SUPABASE_URL} from './config.js';
import {employeeQuestions,openQuestions,scale,validateEmployee} from './employee-model.js';
const $=id=>document.getElementById(id), token=new URLSearchParams(location.hash.slice(1)).get('invitation')||'';
const endpoint=SUPABASE_URL+'/functions/v1/employee-collection';
const headers={'Content-Type':'application/json','x-hp-invitation':token};
window.addEventListener('hashchange',()=>location.reload());
function done(){ $('survey').classList.add('hide');$('state').textContent='Merci. Vos réponses ont été enregistrées. Un bilan collectif sera présenté après la collecte.'; }
async function start(){
 if(!/^[a-f0-9]{64}$/.test(token))throw Error('Utilisez le lien de collecte qui vous a été remis.');
 const r=await fetch(endpoint,{headers});const d=await r.json();if(!r.ok)throw Error(d.error||'Lien indisponible.');
 if(d.received){done();return;}
 $('state').textContent='';$('site').textContent=d.site+' · '+d.title+' · Réponses jusqu’au '+new Date(d.closes_at).toLocaleDateString('fr-FR');
 $('questions').innerHTML=employeeQuestions.map(([key,theme,label])=>`<section class="card answer"><fieldset><legend>${theme} — ${label}</legend><div class="choices">${[...scale,'Non concerné'].map((text,i)=>`<label><input type="radio" name="${key}" value="${i===5?'na':i+1}" required>${text}</label>`).join('')}</div></fieldset></section>`).join('');
 $('comments').innerHTML=openQuestions.map(([key,label])=>`<label class="field"><span>${label}</span><textarea id="${key}" maxlength="1200"></textarea></label>`).join('');
 $('survey').classList.remove('hide');
 $('form').addEventListener('submit',async e=>{
  e.preventDefault();$('error').textContent='';
  const fd=new FormData($('form'));const input={notice:$('notice').checked,website:$('website').value,answers:Object.fromEntries(employeeQuestions.map(([k])=>[k,fd.get(k)==='na'?null:Number(fd.get(k))])),comments:Object.fromEntries(openQuestions.map(([k])=>[k,$(k).value]))};
  const v=validateEmployee(input);if(v.error){$('error').textContent=v.error;return;}
  $('submit').disabled=true;
  try{const r=await fetch(endpoint,{method:'POST',headers,body:JSON.stringify(input)});const d=await r.json();if(!r.ok)throw Error(d.error||'Enregistrement indisponible.');done();}
  catch(e){$('error').textContent=e.message;$('submit').disabled=false;}
 });
}
start().catch(e=>{$('state').textContent=e.message;});
