'use client';

import { useEffect,useMemo,useState } from 'react';
import { ClipboardSearch, Send, RotateCcw, Lightbulb } from 'lucide-react';
import GlassCard from '@/components/GlassCard';
import { api } from '@/lib/api';

type Answers={
  programName:string; provider:string; targetParticipants:string; duration:string; sourceUrl:string;
  backgroundNeed:string; objectives:string; competencies:string; curriculumStructure:string; modules:string;
  learningStrategies:string; media:string; assessment:string; evaluation:string;
  strengths:string; weaknesses:string; alignment:string; recommendations:string; lessonsForOwnCurriculum:string;
};
const blank=():Answers=>({programName:'',provider:'',targetParticipants:'',duration:'',sourceUrl:'',backgroundNeed:'',objectives:'',competencies:'',curriculumStructure:'',modules:'',learningStrategies:'',media:'',assessment:'',evaluation:'',strengths:'',weaknesses:'',alignment:'',recommendations:'',lessonsForOwnCurriculum:''});
function esc(v:string){return String(v||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]||c)).replace(/\n/g,'<br>')}
function marker(a:Answers){return encodeURIComponent(JSON.stringify(a))}
function fromHtml(html:string):Answers|null{const m=String(html||'').match(/data-program-analysis="([^"]+)"/);if(!m)return null;try{return {...blank(),...JSON.parse(decodeURIComponent(m[1]))}}catch{return null}}
function toHtml(a:Answers){return `<div data-program-analysis="${marker(a)}"></div><div class="article-analysis-result"><h2>Analisis Program/Kurikulum Pelatihan</h2><table><tbody><tr><th>Nama program</th><td>${esc(a.programName)}</td></tr><tr><th>Penyelenggara</th><td>${esc(a.provider)}</td></tr><tr><th>Target peserta</th><td>${esc(a.targetParticipants)}</td></tr><tr><th>Durasi</th><td>${esc(a.duration)}</td></tr><tr><th>Sumber/URL</th><td>${esc(a.sourceUrl)}</td></tr></tbody></table><h3>Analisis Desain</h3><h4>Latar belakang/kebutuhan</h4><p>${esc(a.backgroundNeed)}</p><h4>Tujuan</h4><p>${esc(a.objectives)}</p><h4>Kompetensi yang dikembangkan</h4><p>${esc(a.competencies)}</p><h4>Struktur kurikulum</h4><p>${esc(a.curriculumStructure)}</p><h4>Modul/materi</h4><p>${esc(a.modules)}</p><h4>Strategi pembelajaran</h4><p>${esc(a.learningStrategies)}</p><h4>Media/teknologi</h4><p>${esc(a.media)}</p><h4>Asesmen</h4><p>${esc(a.assessment)}</p><h4>Evaluasi program</h4><p>${esc(a.evaluation)}</p><h3>Evaluasi Kritis</h3><h4>Kekuatan</h4><p>${esc(a.strengths)}</p><h4>Kelemahan/gap</h4><p>${esc(a.weaknesses)}</p><h4>Alignment</h4><p>${esc(a.alignment)}</p><h4>Rekomendasi perbaikan</h4><p>${esc(a.recommendations)}</p><h4>Pelajaran untuk kurikulum pelatihan yang akan dirancang</h4><p>${esc(a.lessonsForOwnCurriculum)}</p></div>`}
function TextArea({label,value,onChange,placeholder}:{label:string;value:string;onChange:(v:string)=>void;placeholder?:string}){return <label className="field"><span>{label} <b className="required-mark">*</b></span><textarea rows={4} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}/></label>}

export default function ProgramAnalysisForm({activityId,latestHtml,onSubmitted}:{activityId:string;latestHtml?:string;onSubmitted:()=>Promise<void>|void}){
 const[a,setA]=useState<Answers>(blank());const[busy,setBusy]=useState(false);const[msg,setMsg]=useState('');
 useEffect(()=>{const p=fromHtml(latestHtml||'');if(p)setA(p)},[latestHtml]);
 const required=(Object.keys(blank()) as Array<keyof Answers>).filter(k=>k!=='sourceUrl');
 const missing=useMemo(()=>required.filter(k=>!String(a[k]||'').trim()).length,[a]);
 const set=(k:keyof Answers,v:string)=>setA(x=>({...x,[k]:v}));
 const submit=async()=>{if(missing){setMsg(`Lengkapi ${missing} bagian wajib sebelum mengirim.`);return}setBusy(true);setMsg('');try{await api('submitWork',{activity_id:activityId,content_html:toHtml(a),link_url:a.sourceUrl,file_base64:'',file_name:'',file_mime:''});setMsg('Analisis program berhasil dikirim. Revisi tetap dapat dikirim jika diperlukan.');await onSubmitted()}catch(e){setMsg(e instanceof Error?e.message:String(e))}finally{setBusy(false)}};
 return <div className="stack">
   <div className="notice"><Lightbulb size={18}/><div><strong>Gunakan contoh program nyata.</strong> Analisis satu kurikulum, diklat, workshop, atau program pelatihan yang relevan dengan guru, pendidikan sains/fisika, teknologi pembelajaran, laboratorium, atau pengembangan profesional.</div></div>
   <GlassCard><div className="row gap"><div className="icon-bubble teal"><ClipboardSearch/></div><div><span className="eyebrow">IDENTITAS PROGRAM</span><h3>Program/Kurikulum Pelatihan yang Dianalisis</h3></div></div><div className="form-grid two">
     <label className="field full-span"><span>Nama program <b className="required-mark">*</b></span><input value={a.programName} onChange={e=>set('programName',e.target.value)} placeholder="Nama pelatihan/diklat/workshop"/></label>
     <label className="field"><span>Penyelenggara <b className="required-mark">*</b></span><input value={a.provider} onChange={e=>set('provider',e.target.value)} placeholder="Instansi/lembaga"/></label>
     <label className="field"><span>Target peserta <b className="required-mark">*</b></span><input value={a.targetParticipants} onChange={e=>set('targetParticipants',e.target.value)} placeholder="Contoh: Guru Fisika SMA"/></label>
     <label className="field"><span>Durasi/format <b className="required-mark">*</b></span><input value={a.duration} onChange={e=>set('duration',e.target.value)} placeholder="Contoh: 32 JP, blended"/></label>
     <label className="field"><span>URL/sumber dokumen</span><input value={a.sourceUrl} onChange={e=>set('sourceUrl',e.target.value)} placeholder="https://..."/></label>
   </div></GlassCard>
   <GlassCard><span className="eyebrow">ANALISIS DESAIN</span><div className="article-question-grid">
     <TextArea label="Latar belakang dan kebutuhan" value={a.backgroundNeed} onChange={v=>set('backgroundNeed',v)} placeholder="Masalah/kebutuhan apa yang melatarbelakangi program?"/>
     <TextArea label="Tujuan program" value={a.objectives} onChange={v=>set('objectives',v)}/>
     <TextArea label="Kompetensi yang dikembangkan" value={a.competencies} onChange={v=>set('competencies',v)}/>
     <TextArea label="Struktur kurikulum" value={a.curriculumStructure} onChange={v=>set('curriculumStructure',v)} placeholder="Urutan, level, JP/durasi, teori-praktik."/>
     <TextArea label="Modul/materi" value={a.modules} onChange={v=>set('modules',v)}/>
     <TextArea label="Strategi pembelajaran/pelatihan" value={a.learningStrategies} onChange={v=>set('learningStrategies',v)}/>
     <TextArea label="Media dan teknologi" value={a.media} onChange={v=>set('media',v)}/>
     <TextArea label="Asesmen peserta" value={a.assessment} onChange={v=>set('assessment',v)}/>
     <TextArea label="Evaluasi program" value={a.evaluation} onChange={v=>set('evaluation',v)} placeholder="Bagaimana efektivitas program diukur?"/>
   </div></GlassCard>
   <GlassCard><span className="eyebrow">EVALUASI KRITIS</span><div className="article-question-grid">
     <TextArea label="Kekuatan program" value={a.strengths} onChange={v=>set('strengths',v)}/>
     <TextArea label="Kelemahan / gap" value={a.weaknesses} onChange={v=>set('weaknesses',v)}/>
     <TextArea label="Analisis alignment" value={a.alignment} onChange={v=>set('alignment',v)} placeholder="Apakah need, tujuan, kompetensi, modul, strategi, asesmen, dan evaluasi selaras?"/>
     <TextArea label="Rekomendasi perbaikan" value={a.recommendations} onChange={v=>set('recommendations',v)}/>
     <TextArea label="Pelajaran untuk kurikulum pelatihan yang akan Anda rancang" value={a.lessonsForOwnCurriculum} onChange={v=>set('lessonsForOwnCurriculum',v)} placeholder="Apa yang akan dipertahankan, diubah, atau dihindari dalam proyek Anda?"/>
   </div></GlassCard>
   {msg&&<div className="notice selectable">{msg}</div>}
   <div className="sticky-actions"><button className="button soft" onClick={()=>{if(confirm('Kosongkan form?'))setA(blank())}} disabled={busy}><RotateCcw/>Reset</button><span className={missing?'badge':'badge success'}>{missing?`${missing} bagian wajib belum diisi`:'Form lengkap'}</span><button className="button primary" onClick={submit} disabled={busy}><Send/>{busy?'Mengirim...':'Kirim Analisis'}</button></div>
 </div>;
}
