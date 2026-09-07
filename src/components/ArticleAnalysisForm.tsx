'use client';

import { useEffect, useMemo, useState } from 'react';
import { Send, RotateCcw, BookOpenText, GitCompareArrows, Lightbulb } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { api } from '@/lib/api';

type ArticleFields = {
  title:string; authors:string; journal:string; year:string; volumeIssue:string; doiUrl:string;
  trend:string; problem:string; objective:string; method:string; contextSample:string; findings:string; strengths:string; limitations:string;
  physicsImplications:string; trainingPotential:string;
};

type Answers = {
  article1:ArticleFields; article2:ArticleFields;
  similarities:string; differences:string; criticalSynthesis:string; trendConclusion:string; curriculumImplications:string; finalReflection:string;
};

const blankArticle=():ArticleFields=>({
  title:'',authors:'',journal:'',year:'',volumeIssue:'',doiUrl:'',trend:'',problem:'',objective:'',method:'',contextSample:'',findings:'',strengths:'',limitations:'',physicsImplications:'',trainingPotential:''
});
const blankAnswers=():Answers=>({article1:blankArticle(),article2:blankArticle(),similarities:'',differences:'',criticalSynthesis:'',trendConclusion:'',curriculumImplications:'',finalReflection:''});

function esc(v:string){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]||c)).replace(/\n/g,'<br>')}
function marker(a:Answers){return encodeURIComponent(JSON.stringify(a))}
function fromHtml(html:string):Answers|null{
  const m=String(html||'').match(/data-article-analysis="([^"]+)"/);if(!m)return null;
  try{return {...blankAnswers(),...JSON.parse(decodeURIComponent(m[1]))} as Answers}catch{return null}
}
function articleHtml(label:string,a:ArticleFields){return `<section><h3>${label}</h3><table><tbody>
<tr><th>Judul</th><td>${esc(a.title)}</td></tr><tr><th>Penulis</th><td>${esc(a.authors)}</td></tr><tr><th>Jurnal</th><td>${esc(a.journal)}</td></tr><tr><th>Tahun</th><td>${esc(a.year)}</td></tr><tr><th>Volume/Nomor</th><td>${esc(a.volumeIssue)}</td></tr><tr><th>DOI/URL</th><td>${esc(a.doiUrl)}</td></tr><tr><th>Tren yang dibahas</th><td>${esc(a.trend)}</td></tr></tbody></table>
<h4>Masalah penelitian</h4><p>${esc(a.problem)}</p><h4>Tujuan penelitian</h4><p>${esc(a.objective)}</p><h4>Metode penelitian</h4><p>${esc(a.method)}</p><h4>Konteks/Subjek/Sampel</h4><p>${esc(a.contextSample)}</p><h4>Temuan utama</h4><p>${esc(a.findings)}</p><h4>Kekuatan artikel</h4><p>${esc(a.strengths)}</p><h4>Keterbatasan artikel</h4><p>${esc(a.limitations)}</p><h4>Implikasi bagi pendidikan fisika</h4><p>${esc(a.physicsImplications)}</p><h4>Potensi menjadi tema/komponen pelatihan</h4><p>${esc(a.trainingPotential)}</p></section>`}
function toHtml(a:Answers){return `<div data-article-analysis="${marker(a)}"></div><div class="article-analysis-result"><h2>Analisis Kritis Dua Artikel Tren Pendidikan Fisika</h2>${articleHtml('Artikel 1',a.article1)}${articleHtml('Artikel 2',a.article2)}<section><h3>Analisis Komparatif dan Sintesis</h3><h4>Persamaan kedua artikel</h4><p>${esc(a.similarities)}</p><h4>Perbedaan kedua artikel</h4><p>${esc(a.differences)}</p><h4>Critical synthesis</h4><p>${esc(a.criticalSynthesis)}</p><h4>Kesimpulan tentang tren</h4><p>${esc(a.trendConclusion)}</p><h4>Implikasi bagi rancangan kurikulum pelatihan</h4><p>${esc(a.curriculumImplications)}</p><h4>Refleksi/kesimpulan akhir</h4><p>${esc(a.finalReflection)}</p></section></div>`}

function TextArea({label,value,onChange,placeholder,required=false}:{label:string;value:string;onChange:(v:string)=>void;placeholder?:string;required?:boolean}){
  return <label className="field"><span>{label}{required&&<b className="required-mark"> *</b>}</span><textarea rows={4} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></label>
}

function ArticleBlock({n,value,onChange}:{n:1|2;value:ArticleFields;onChange:(v:ArticleFields)=>void}){
  const set=(k:keyof ArticleFields,v:string)=>onChange({...value,[k]:v});
  return <GlassCard className="article-form-card">
    <div className="row gap"><div className="icon-bubble blue"><BookOpenText/></div><div><span className="eyebrow">ARTIKEL {n}</span><h3>Identitas dan Telaah Artikel {n}</h3></div></div>
    <div className="form-grid two">
      <label className="field full-span"><span>Judul artikel <b className="required-mark">*</b></span><input value={value.title} onChange={e=>set('title',e.target.value)} placeholder="Masukkan judul artikel"/></label>
      <label className="field"><span>Penulis/Pengarang <b className="required-mark">*</b></span><input value={value.authors} onChange={e=>set('authors',e.target.value)} placeholder="Nama penulis"/></label>
      <label className="field"><span>Nama jurnal <b className="required-mark">*</b></span><input value={value.journal} onChange={e=>set('journal',e.target.value)} placeholder="Nama jurnal"/></label>
      <label className="field"><span>Tahun terbit <b className="required-mark">*</b></span><input value={value.year} onChange={e=>set('year',e.target.value)} placeholder="2025" inputMode="numeric"/></label>
      <label className="field"><span>Volume / nomor</span><input value={value.volumeIssue} onChange={e=>set('volumeIssue',e.target.value)} placeholder="Vol. 12 No. 2"/></label>
      <label className="field full-span"><span>DOI / URL artikel</span><input value={value.doiUrl} onChange={e=>set('doiUrl',e.target.value)} placeholder="https://doi.org/..."/></label>
      <label className="field full-span"><span>Tren pendidikan fisika yang dibahas <b className="required-mark">*</b></span><input value={value.trend} onChange={e=>set('trend',e.target.value)} placeholder="Contoh: STEM, GenAI, virtual lab, AR/VR, computational thinking"/></label>
    </div>
    <div className="article-question-grid">
      <TextArea label="Masalah penelitian" required value={value.problem} onChange={v=>set('problem',v)} placeholder="Masalah utama apa yang hendak dijawab penelitian ini?"/>
      <TextArea label="Tujuan penelitian" required value={value.objective} onChange={v=>set('objective',v)} placeholder="Apa tujuan atau pertanyaan penelitian?"/>
      <TextArea label="Metode penelitian" required value={value.method} onChange={v=>set('method',v)} placeholder="Desain, pendekatan, instrumen, dan prosedur yang digunakan."/>
      <TextArea label="Konteks / subjek / sampel" value={value.contextSample} onChange={v=>set('contextSample',v)} placeholder="Lokasi, peserta, ukuran sampel, atau konteks penelitian."/>
      <TextArea label="Temuan utama" required value={value.findings} onChange={v=>set('findings',v)} placeholder="Apa hasil/temuan utama yang paling relevan?"/>
      <TextArea label="Kekuatan artikel" required value={value.strengths} onChange={v=>set('strengths',v)} placeholder="Apa kekuatan argumen, metode, evidence, atau kontribusinya?"/>
      <TextArea label="Keterbatasan artikel" required value={value.limitations} onChange={v=>set('limitations',v)} placeholder="Apa keterbatasan data, metode, konteks, atau generalisasinya?"/>
      <TextArea label="Implikasi bagi pendidikan fisika" required value={value.physicsImplications} onChange={v=>set('physicsImplications',v)} placeholder="Apa maknanya bagi pembelajaran, guru, eksperimen, asesmen, atau kurikulum fisika?"/>
      <TextArea label="Potensi menjadi tema/komponen pelatihan" required value={value.trainingPotential} onChange={v=>set('trainingPotential',v)} placeholder="Kompetensi apa yang layak dikembangkan melalui pelatihan berdasarkan artikel ini?"/>
    </div>
  </GlassCard>
}

export default function ArticleAnalysisForm({activityId,latestHtml,onSubmitted}:{activityId:string;latestHtml?:string;onSubmitted:()=>Promise<void>|void}){
  const[answers,setAnswers]=useState<Answers>(blankAnswers());const[busy,setBusy]=useState(false);const[msg,setMsg]=useState('');
  useEffect(()=>{const parsed=fromHtml(latestHtml||'');if(parsed)setAnswers(parsed)},[latestHtml]);
  const missing=useMemo(()=>{
    let n=0;[answers.article1,answers.article2].forEach(a=>{(['title','authors','journal','year','trend','problem','objective','method','findings','strengths','limitations','physicsImplications','trainingPotential'] as Array<keyof ArticleFields>).forEach(k=>{if(!String(a[k]||'').trim())n++})});
    (['similarities','differences','criticalSynthesis','trendConclusion','curriculumImplications','finalReflection'] as Array<keyof Answers>).forEach(k=>{if(!String(answers[k]||'').trim())n++});return n;
  },[answers]);
  const submit=async()=>{if(missing){setMsg(`Lengkapi ${missing} bagian wajib sebelum mengirim.`);return}setBusy(true);setMsg('');try{await api('submitWork',{activity_id:activityId,content_html:toHtml(answers),link_url:'',file_base64:'',file_name:'',file_mime:''});setMsg('Analisis berhasil dikirim. Anda tetap dapat mengirim revisi.');await onSubmitted()}catch(e){setMsg(e instanceof Error?e.message:String(e))}finally{setBusy(false)}};
  const reset=()=>{if(confirm('Kosongkan form?'))setAnswers(blankAnswers())};
  return <div className="stack">
    <div className="notice"><Lightbulb size={18}/><div><strong>Tanpa upload file.</strong> Pilih dua artikel ilmiah yang membahas tren sejenis/berdekatan dalam pendidikan fisika. Seluruh analisis diisi langsung pada form ini.</div></div>
    <ArticleBlock n={1} value={answers.article1} onChange={v=>setAnswers(a=>({...a,article1:v}))}/>
    <ArticleBlock n={2} value={answers.article2} onChange={v=>setAnswers(a=>({...a,article2:v}))}/>
    <GlassCard><div className="row gap"><div className="icon-bubble teal"><GitCompareArrows/></div><div><span className="eyebrow">SINTESIS</span><h3>Perbandingan, Tren, dan Implikasi Kurikuler</h3></div></div>
      <div className="article-question-grid">
        <TextArea label="Persamaan kedua artikel" required value={answers.similarities} onChange={v=>setAnswers(a=>({...a,similarities:v}))}/>
        <TextArea label="Perbedaan kedua artikel" required value={answers.differences} onChange={v=>setAnswers(a=>({...a,differences:v}))}/>
        <TextArea label="Critical synthesis" required value={answers.criticalSynthesis} onChange={v=>setAnswers(a=>({...a,criticalSynthesis:v}))} placeholder="Apa yang dapat disimpulkan jika kedua artikel dibaca bersama? Apakah temuannya konsisten, saling melengkapi, atau bertentangan?"/>
        <TextArea label="Kesimpulan tentang tren pendidikan fisika" required value={answers.trendConclusion} onChange={v=>setAnswers(a=>({...a,trendConclusion:v}))} placeholder="Seberapa penting, matang, relevan, atau problematis tren tersebut?"/>
        <TextArea label="Implikasi bagi rancangan kurikulum pelatihan" required value={answers.curriculumImplications} onChange={v=>setAnswers(a=>({...a,curriculumImplications:v}))} placeholder="Kompetensi/modul/aktivitas apa yang mungkin perlu masuk ke kurikulum pelatihan?"/>
        <TextArea label="Refleksi / kesimpulan akhir" required value={answers.finalReflection} onChange={v=>setAnswers(a=>({...a,finalReflection:v}))}/>
      </div>
    </GlassCard>
    {msg&&<div className="notice selectable">{msg}</div>}
    <div className="sticky-actions"><button className="button soft" onClick={reset} disabled={busy}><RotateCcw/>Reset</button><span className={missing?'badge':'badge success'}>{missing?`${missing} bagian wajib belum diisi`:'Form lengkap'}</span><button className="button primary" onClick={submit} disabled={busy}><Send/>{busy?'Mengirim...':'Kirim Analisis'}</button></div>
  </div>;
}
