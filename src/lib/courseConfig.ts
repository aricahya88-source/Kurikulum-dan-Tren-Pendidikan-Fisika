export type CourseMeeting = {
  no:number;
  phase:number;
  phaseLabel:string;
  title:string;
  mode:string;
  cpmk:string[];
  objectives:string[];
  before:string[];
  during:string[];
  after:string[];
  outputs:string[];
  activityHref?:string;
  activityLabel?:string;
};

export const APP_NAME='Edu Curicula';
export const COURSE_NAME='Kurikulum dan Tren Pendidikan Fisika';
export const COURSE_CODE='PFS125018';
export const COURSE_SEMESTER='III';
export const COURSE_TAGLINE='Explore • Analyze • Design • Innovate';
export const COURSE_SKS=2;

export const PHASES=[
  {no:1,label:'Understanding & Analysing Curriculum',range:'Pertemuan 1–5',description:'Membangun fondasi kurikulum, membaca perkembangan kebijakan, menganalisis struktur kurikulum fisika, dan memahami dasar perancangan kurikulum pelatihan.'},
  {no:2,label:'Building the Training Curriculum Blueprint',range:'Pertemuan 6–8',description:'UTS berbasis proyek untuk melakukan Training Needs Analysis, merumuskan capaian, dan menyusun Curriculum Blueprint serta Curriculum Map.'},
  {no:3,label:'Exploring Trends & Innovation',range:'Pertemuan 9–13',description:'Menganalisis STEM, AI, machine learning, computer vision, virtual lab, AR/VR, Education 5.0, etika, dan future trends pendidikan fisika.'},
  {no:4,label:'Designing the Final Training Curriculum',range:'Pertemuan 14–16',description:'Mengembangkan blueprint menjadi dokumen kurikulum pelatihan yang lengkap, diaudit, direvisi, dan dipertahankan melalui final pitch serta oral defense.'}
] as const;

export const ASSESSMENT_WEIGHTS=[
  {code:'STUDENT_LED',label:'Pembelajaran Dipandu Mahasiswa',weight:15},
  {code:'ARTICLE_ANALYSIS',label:'Analisis Kritis 2 Artikel',weight:10},
  {code:'PROGRAM_ANALYSIS',label:'Analisis Program/Kurikulum Pelatihan',weight:10},
  {code:'UTS_BLUEPRINT',label:'UTS Training Curriculum Blueprint',weight:25},
  {code:'UAS_CURRICULUM',label:'UAS Final Training Curriculum Design',weight:30},
  {code:'PARTICIPATION',label:'Partisipasi',weight:10}
] as const;

const base=(no:number,phase:number,title:string,mode:string,cpmk:string[],objectives:string[],during:string[],outputs:string[],activityHref?:string,activityLabel?:string):CourseMeeting=>({
  no,phase,phaseLabel:PHASES.find(p=>p.no===phase)?.label||'',title,mode,cpmk,objectives,
  before:['Baca materi pengantar dan sumber yang ditampilkan pada halaman pertemuan.'],
  during,
  after:['Catat insight, pertanyaan, atau keputusan desain yang relevan untuk proyek kurikulum pelatihan.'],outputs,activityHref,activityLabel
});

export const MEETINGS:CourseMeeting[]=[
  base(1,1,'Hakikat, Fungsi, Prinsip, dan Komponen Kurikulum','Dosen-led',['CPMK 1'],['Menjelaskan hakikat, fungsi, prinsip, dan komponen kurikulum serta kaitannya dengan pendidikan fisika.'],['Interactive learning, brainstorming, concept mapping, dan diskusi yang difasilitasi dosen.'],['Concept map kurikulum dan kaitannya dengan pendidikan fisika.']),
  base(2,1,'Perkembangan Kurikulum Pendidikan di Indonesia','Dosen-led',['CPMK 1'],['Menjelaskan perkembangan kurikulum Indonesia dan perubahan paradigma yang memengaruhi pendidikan fisika.'],['Timeline analysis, document-based discussion, dan case discussion.'],['Catatan analitis perkembangan kurikulum dan implikasinya bagi pembelajaran fisika.'],'/tasks/ARTICLE_ANALYSIS','Analisis 2 Artikel'),
  base(3,1,'Struktur Kurikulum Pendidikan Fisika, CP, Tujuan Pembelajaran, dan Kompetensi Lulusan','Pembelajaran Dipandu Mahasiswa 1',['CPMK 2'],['Menganalisis hubungan standar lulusan, standar isi, capaian pembelajaran, tujuan pembelajaran, dan struktur kurikulum fisika.'],['Dua mahasiswa memfasilitasi pengalaman belajar aktif menggunakan strategi pilihan mereka. Metode ceramah tidak diperbolehkan sebagai strategi utama.'],['Realisasi Pembelajaran Dipandu Mahasiswa kelompok 1.'],'/projects/STUDENT_LED','Pembelajaran Dipandu Mahasiswa'),
  base(4,1,'Analisis Kerangka dan Standar Kurikulum Pendidikan Fisika','Pembelajaran Dipandu Mahasiswa 2',['CPMK 2'],['Membandingkan dan mengevaluasi kerangka kurikulum pendidikan fisika berdasarkan tujuan, struktur, kompetensi, konten, pedagogi, asesmen, dan konteks.'],['Dua mahasiswa memfasilitasi analisis komparatif kurikulum dengan strategi aktif pilihan. Metode ceramah tidak diperbolehkan.'],['Matriks analisis kurikulum dan realisasi sesi kelompok 2.'],'/projects/STUDENT_LED','Pembelajaran Dipandu Mahasiswa'),
  base(5,1,'Kurikulum Pelatihan, Training Needs Analysis, dan Curriculum Mapping','Dosen-led Workshop + Project Briefing',['CPMK 2','CPMK 4'],['Menganalisis kebutuhan pelatihan dan menjelaskan prinsip perancangan kurikulum pelatihan di bidang pendidikan fisika.'],['Workshop Training Needs Analysis, competency gap, learning outcomes, curriculum mapping, serta analisis program pelatihan yang sudah ada.'],['Hasil Analisis Program/Kurikulum Pelatihan dan tema awal proyek UTS.'],'/tasks/PROGRAM_ANALYSIS','Analisis Program Pelatihan'),
  base(6,2,'UTS Project I — Training Needs Analysis','Project-Based Learning',['CPMK 2','CPMK 4'],['Merumuskan target peserta, problem statement, evidence, competency gap, root cause, dan prioritas kebutuhan pelatihan.'],['Kelompok 4–5 mahasiswa menyusun Training Needs Analysis dan menerima lecturer clinic.'],['Training Needs Analysis.'],'/projects/UTS_BLUEPRINT','UTS Curriculum Blueprint'),
  base(7,2,'UTS Project II — Curriculum Blueprint','Project Clinic + Peer Review',['CPMK 2','CPMK 4'],['Menyusun learning outcomes, struktur modul, strategi belajar, asesmen, dan Curriculum Map yang selaras dengan hasil analisis kebutuhan.'],['Kelompok menyusun Need → Competency → Learning Outcome → Module → Learning Activity → Assessment, lalu melakukan peer review.'],['Curriculum Blueprint + Curriculum Map.'],'/projects/UTS_BLUEPRINT','UTS Curriculum Blueprint'),
  base(8,2,'UTS Project III — Curriculum Blueprint Forum','Pitch + Oral Defense',['CPMK 2','CPMK 4'],['Mempertahankan Training Needs Analysis dan Curriculum Blueprint melalui argumentasi akademik dan evidence.'],['Curriculum Design Forum: pitch, questioning, oral defense, dan feedback.'],['Final Training Needs Analysis + Curriculum Blueprint + Curriculum Map.'],'/projects/UTS_BLUEPRINT','UTS Curriculum Blueprint'),
  base(9,3,'STEM dan Tren Pedagogi Kontemporer Pendidikan Fisika','Pembelajaran Dipandu Mahasiswa 3',['CPMK 3'],['Menganalisis STEM, inquiry, problem solving, dan computational thinking serta implikasinya terhadap kurikulum pelatihan.'],['Dua mahasiswa memfasilitasi pembelajaran aktif menggunakan strategi pilihan. Metode ceramah tidak diperbolehkan.'],['Realisasi sesi kelompok 3 dan keputusan relevansi tren bagi proyek.'],'/projects/STUDENT_LED','Pembelajaran Dipandu Mahasiswa'),
  base(10,3,'Artificial Intelligence dan Generative AI dalam Pembelajaran Fisika','Pembelajaran Dipandu Mahasiswa 4',['CPMK 3'],['Menganalisis peluang, keterbatasan, literasi AI, bias, privasi, dan integritas akademik dalam pembelajaran fisika.'],['Dua mahasiswa memfasilitasi eksplorasi kasus/penggunaan AI dengan strategi aktif pilihan.'],['Realisasi sesi kelompok 4 dan analisis kompetensi AI yang relevan untuk pelatihan.'],'/projects/STUDENT_LED','Pembelajaran Dipandu Mahasiswa'),
  base(11,3,'Machine Learning, Computer Vision, dan Analisis Data Eksperimen','Pembelajaran Dipandu Mahasiswa 5',['CPMK 3'],['Menganalisis ML, computer vision, data literacy, serta kesiapan guru dan infrastruktur untuk inovasi eksperimen fisika.'],['Fasilitasi berbasis demo, data, case, atau strategi aktif lain yang dipilih mahasiswa.'],['Realisasi sesi kelompok 5 dan evaluasi potensi penerapan.'],'/projects/STUDENT_LED','Pembelajaran Dipandu Mahasiswa'),
  base(12,3,'Virtual Laboratory, Simulation, AR/VR, dan Real-Virtual Experiment','Pembelajaran Dipandu Mahasiswa 6',['CPMK 3'],['Membandingkan eksperimen nyata, virtual, hybrid, simulasi, AR/VR serta menilai affordance pedagogis dan tantangan implementasi.'],['Mahasiswa memfasilitasi eksplorasi/demonstrasi atau analisis skenario dengan strategi aktif.'],['Realisasi sesi kelompok 6 dan kriteria pemilihan teknologi.'],'/projects/STUDENT_LED','Pembelajaran Dipandu Mahasiswa'),
  base(13,3,'Education 5.0, Etika Teknologi, Inklusivitas, dan Future Trends','Pembelajaran Dipandu Mahasiswa 7',['CPMK 3'],['Mengevaluasi Education 5.0, equity, digital divide, etika, sustainability, dan future trends pendidikan fisika.'],['Futures thinking activity dan pembelajaran aktif yang difasilitasi dua mahasiswa. Metode ceramah tidak diperbolehkan.'],['Realisasi sesi kelompok 7 dan future scenario pendidikan fisika.'],'/projects/STUDENT_LED','Pembelajaran Dipandu Mahasiswa'),
  base(14,4,'UAS Project I — Final Training Curriculum Design','Project Design Workshop',['CPMK 4'],['Mengembangkan blueprint menjadi dokumen kurikulum pelatihan yang utuh, aligned, berbasis evidence, inovatif, dan implementatif.'],['Kelompok 4–5 mahasiswa menyusun rasional, participant profile, learning outcomes, struktur modul, strategi, media, asesmen, implementasi, evaluasi, dan integrasi tren.'],['Draft dokumen kurikulum lengkap + Curriculum Canvas.'],'/projects/UAS_CURRICULUM','UAS Final Curriculum'),
  base(15,4,'UAS Project II — Curriculum Clinic and Alignment Audit','Project Clinic + Peer Review',['CPMK 4'],['Mengevaluasi dan merevisi kurikulum melalui alignment audit, feasibility review, risk analysis, indicators, dan sustainability.'],['Peer audit terhadap Needs–Outcome, Outcome–Module, Outcome–Assessment, feasibility, risk, dan keberlanjutan.'],['Revised Training Curriculum + response-to-review.'],'/projects/UAS_CURRICULUM','UAS Final Curriculum'),
  base(16,4,'UAS Project III — Final Training Curriculum Design Forum','Final Pitch + Oral Defense',['CPMK 4'],['Mempresentasikan dan mempertahankan desain kurikulum pelatihan pendidikan fisika secara akademik, relevan, dan implementatif.'],['Final Curriculum Pitch, questioning, oral defense, dan refleksi capaian semester.'],['Final Curriculum Document + Curriculum Map/Canvas + Implementation Plan + Oral Defense.'],'/projects/UAS_CURRICULUM','UAS Final Curriculum')
];

export function meetingByNo(no:number){return MEETINGS.find(m=>m.no===no);}
export function phaseByMeeting(no:number){return MEETINGS.find(m=>m.no===no)?.phase||1;}
