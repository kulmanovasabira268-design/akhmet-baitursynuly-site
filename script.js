const steps = [
["Топқа бөлу","Оқушыны оқу әрекетіне жұмылдыру","QR арқылы «Әліппе», «Тіл», «Ұстаз» топтарына бөлініңіз."],
["Сабақтың тақырыбы + оқу мақсаты","Бағыт пен күтілетін нәтижені айқындау","Бүгінгі мақсатты оқушы түсінетін тілмен тұжырымдаңыз."],
["Қызығушылықты ояту","Тақырыпқа эмоционалдық және танымдық кіріспе","Қысқа дәйексөз/сұрақ арқылы «Ахмет бүгінгі мектепте болса...» жағдаятын ашыңыз."],
["Жаңа сабақ теориясы","Ғылыми мазмұнды жүйелі түсіндіру","Ахмет еңбегіндегі идеяны қазіргі білім беру ұстанымымен салыстырыңыз."],
["Интерактивті тапсырмалар","Белсенді оқу әрекетін ұйымдастыру","QR, викторина, сәйкестендіру немесе цифрлық карточка қолданыңыз."],
["Функционалдық сауаттылық","Білімді өмірлік жағдаятта қолдану","Оқушыға нақты өмірден алынған тілдік/ақпараттық мәселе беріңіз."],
["Жұптық жұмыс","Диалог, дәлелдеу, бірлескен оқу","«Ахметтің сұрағы — сенің жауабың» форматында пікір алмасыңыз."],
["ЕББҚ оқушылар","Қолжетімді және сараланған оқу","Бір мақсатқа бірнеше деңгейлі: визуалды, тірек сөзді және толық тапсырма жасаңыз."],
["Жеке тапсырма","Өздігінен ойлау және өнім жасау","«Осы идеяны өз сабағымда қалай қолданамын?» мини-жоспарын құрастырыңыз."],
["Оқулықпен жұмыс","Дерекпен жұмыс және дәлел табу","Оқулықтағы мәтіннен негізгі ойды тауып, Ахмет мұрасымен байланыстырыңыз."],
["Қорытынды + тест + автоматты бағалау","Нәтижені өлшеу","Қысқа онлайн тест арқылы білімді жедел тексеріңіз."],
["Рефлексия + үйге тапсырма","Өз оқуын бағалау және жалғастыру","«Ахметке бір сөйлем» рефлексиясы + қолданбалы шағын үй тапсырмасы."]
];

const timeline=document.getElementById("timeline");
steps.forEach((s,i)=>{
  const el=document.createElement("div");
  el.className="step";
  el.innerHTML=`<span class="step-num">${i+1}</span><h3>${s[0]}</h3><p>${s[1]}</p>`;
  el.onclick=()=>goStep(i);
  timeline.appendChild(el);
});

let current=0;
function renderStep(){
  const s=steps[current];
  document.getElementById("demoTitle").textContent=(current+1)+". "+s[0];
  document.getElementById("counter").textContent=(current+1)+" / 12";
  document.getElementById("bar").style.width=((current+1)/12*100)+"%";
  document.querySelectorAll(".step").forEach((x,i)=>x.classList.toggle("active",i===current));
  const card=document.getElementById("demoCard");
  if(current===0){
    card.innerHTML=`<h3>Сіз қай топтасыз?</h3>
      <p>Топ атауын таңдаңыз:</p>
      ${["Әліппе","Тіл","Ұстаз"].map(x=>`<button class="choice" onclick="pickGroup(this)">${x}</button>`).join("")}
      <div id="stepMsg" class="result"></div>`;
  } else if(current===10){
    card.innerHTML=`<h3>Мини-тест</h3><p>Ахмет мұрасын қазіргі сабаққа енгізудің негізгі мақсаты қайсы?</p>
      <button class="choice" onclick="answer(this,true)">Оны оқушы әрекетімен байланыстыру</button>
      <button class="choice" onclick="answer(this,false)">Тек өмірбаянын жаттату</button>
      <button class="choice" onclick="answer(this,false)">Тек презентация көрсету</button>
      <div id="stepMsg" class="result"></div>`;
  } else if(current===11){
    card.innerHTML=`<h3>«Ахметке бір сөйлем»</h3><p>Сөйлемді аяқтаңыз:</p>
      <textarea id="demoReflection" placeholder="Мен оның мұрасын өз сабағымда..."></textarea>
      <button class="btn btn-primary" style="margin-top:12px" onclick="document.getElementById('stepMsg').textContent='Рефлексия қабылданды ✓'">Жіберу</button>
      <div id="stepMsg" class="result"></div>`;
  } else {
    card.innerHTML=`<h3>${s[1]}</h3><p>${s[2]}</p><hr>
      <p><strong>Педагогикалық фокус:</strong> теорияны практикаға айналдыру. Бұл кезеңді өз пәніңізге бейімдеп, нақты оқушы әрекетімен толықтырыңыз.</p>`;
  }
}
function goStep(i){current=i;renderStep();document.getElementById("demo").scrollIntoView({behavior:"smooth",block:"center"})}
function pickGroup(btn){document.querySelectorAll("#demoCard .choice").forEach(x=>x.disabled=true);document.getElementById("stepMsg").textContent=`«${btn.textContent}» тобы таңдалды ✓`}
function answer(btn,ok){btn.classList.add(ok?"correct":"wrong");document.getElementById("stepMsg").textContent=ok?"Дұрыс! ✓":"Қайта ойланып көріңіз."}
renderStep();

const quizData=[
["Ахмет мұрасын сабаққа енгізудің басты қағидасы?","Тарихи идеяны оқушы әрекетімен байланыстыру",["Тек даталарды жаттату","Тек портрет көрсету"]],
["Функционалдық сауаттылық нені көздейді?","Білімді өмірлік жағдаятта қолдану",["Ақпаратты сөзбе-сөз қайталау","Тек тест орындау"]],
["ЕББҚ оқушыға тиімді тәсіл?","Бір мақсатқа қолжетімді әртүрлі тапсырма ұсыну",["Барлығына бірдей күрделі тапсырма беру","Тапсырманы алып тастау"]]
];
const quiz=document.getElementById("quiz");
quizData.forEach((q,i)=>{
 const d=document.createElement("div");d.className="quiz-card";
 const opts=[q[1],...q[2]].sort(()=>Math.random()-.5);
 d.innerHTML=`<h3>${i+1}. ${q[0]}</h3>`+opts.map(o=>`<label class="choice"><input type="radio" name="q${i}" value="${o===q[1]}"> ${o}</label>`).join("");
 quiz.appendChild(d);
});
function gradeQuiz(){
 let score=0;
 quizData.forEach((_,i)=>{const a=document.querySelector(`input[name=q${i}]:checked`);if(a&&a.value==="true")score++});
 document.getElementById("quizResult").textContent=`Нәтиже: ${score} / ${quizData.length}`;
}
function saveReflection(){
 const t=document.getElementById("reflection").value.trim();
 document.getElementById("saved").textContent=t?`Сақталды ✓ «${t}»`:"Алдымен ойыңызды жазыңыз.";
}
function openAbout(){document.getElementById("modal").classList.add("open")}
function closeAbout(){document.getElementById("modal").classList.remove("open")}
