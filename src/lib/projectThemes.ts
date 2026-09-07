export type ProjectField={key:string;label:string;hint?:string};
export type ProjectTheme={code:string;name:string;description:string;fields:ProjectField[]};
export type ProjectDefinition={code:string;name:string;group:boolean;short:string;description:string;warning?:string;fields:ProjectField[]};
const f=(key:string,label:string,hint=''):ProjectField=>({key,label,hint});

export const PROJECTS:ProjectDefinition[]=[
  {
    code:'STUDENT_LED',
    name:'Pembelajaran Dipandu Mahasiswa',
    short:'7 sesi • 2 mahasiswa per kelompok',
    group:true,
    description:'Rancang dan fasilitasi pengalaman belajar aktif untuk topik kurikulum atau tren pendidikan fisika. Strategi pembelajaran dipilih bebas oleh mahasiswa.',
    warning:'Metode ceramah tidak diperbolehkan sebagai strategi utama. PowerPoint boleh digunakan sebagai media pendukung, tetapi peserta kelas harus melakukan aktivitas belajar yang nyata.',
    fields:[
      f('learning_objectives','Tujuan pembelajaran sesi','Nyatakan kemampuan yang harus dapat dilakukan peserta setelah sesi.'),
      f('strategy','Strategi pembelajaran yang dipilih','Bebas: case method, PBL, jigsaw, station learning, simulation, debate, inquiry, gallery walk, game-based learning, workshop mini, dan lain-lain.'),
      f('rationale','Alasan memilih strategi','Jelaskan kesesuaiannya dengan tujuan, materi, karakter peserta, dan waktu.'),
      f('opening','Opening / stimulus','Jelaskan stimulus awal yang digunakan untuk mengaktifkan pengetahuan awal.'),
      f('main_activity','Aktivitas inti dan alur fasilitasi'),
      f('class_involvement','Cara melibatkan seluruh kelas','Pastikan tidak hanya fasilitator yang aktif.'),
      f('media_resources','Media, bahan, data, aplikasi, atau sumber yang digunakan'),
      f('assessment','Cara mengecek pemahaman peserta'),
      f('curriculum_link','Kaitan materi dengan kurikulum pelatihan','Jelaskan bagaimana topik sesi dapat memperkaya proyek kurikulum pelatihan.'),
      f('references','Referensi akademik dan dokumen kebijakan yang digunakan')
    ]
  },
  {
    code:'UTS_BLUEPRINT',
    name:'UTS — Training Needs Analysis & Curriculum Blueprint',
    short:'Pertemuan 6–8 • kelompok 4–5 mahasiswa',
    group:true,
    description:'Rancang fondasi kurikulum pelatihan pendidikan fisika berdasarkan kebutuhan nyata, competency gap, learning outcomes, dan alignment antarkomponen.',
    fields:[
      f('training_context','Konteks dan judul pelatihan','Jelaskan jenis pelatihan, konteks lembaga, dan fokus utama.'),
      f('target_participants','Target peserta dan karakteristiknya'),
      f('problem_statement','Masalah/kebutuhan utama yang hendak dijawab'),
      f('evidence','Evidence kebutuhan','Gunakan data, artikel, laporan, hasil observasi/wawancara, atau dokumen relevan.'),
      f('competency_gap','Competency gap','Jelaskan kesenjangan antara kompetensi yang dimiliki dan kompetensi yang dibutuhkan.'),
      f('priority_needs','Prioritas kebutuhan pelatihan','Jelaskan prioritas dan alasan pemilihannya.'),
      f('training_goals','Tujuan umum pelatihan'),
      f('learning_outcomes','Learning outcomes / capaian pelatihan','Gunakan rumusan yang terukur dan selaras dengan kebutuhan.'),
      f('curriculum_structure','Struktur kurikulum awal','Urutan modul/topik dan estimasi durasi.'),
      f('learning_strategy','Strategi pembelajaran/pelatihan utama'),
      f('assessment_plan','Rencana asesmen','Pre-assessment, formative, performance/project, post-assessment, atau bentuk lain.'),
      f('curriculum_map','Curriculum Map','Jelaskan alignment Need → Competency → LO → Module → Activity → Assessment.'),
      f('references','Referensi dan evidence utama')
    ]
  },
  {
    code:'UAS_CURRICULUM',
    name:'UAS — Final Training Curriculum Design',
    short:'Pertemuan 14–16 • kelompok 4–5 mahasiswa',
    group:true,
    description:'Kembangkan blueprint menjadi kurikulum pelatihan pendidikan fisika yang lengkap, relevan, berbasis evidence, inovatif, dan implementatif.',
    fields:[
      f('rationale','Rasional program','Mengapa program ini diperlukan dan mengapa desain yang dipilih tepat?'),
      f('needs_summary','Ringkasan Training Needs Analysis'),
      f('participant_profile','Profil dan prasyarat peserta'),
      f('program_objectives','Tujuan program'),
      f('learning_outcomes','Capaian pembelajaran pelatihan'),
      f('curriculum_structure','Struktur kurikulum','Modul, urutan, JP/durasi, proporsi teori dan praktik.'),
      f('module_descriptions','Deskripsi setiap modul','LO modul, materi, aktivitas, strategi, media, dan asesmen.'),
      f('learning_strategies','Strategi pembelajaran/pelatihan'),
      f('media_technology','Media dan teknologi','Jelaskan teknologi/tren pendidikan fisika yang diintegrasikan dan alasannya.'),
      f('assessment_system','Sistem asesmen peserta'),
      f('implementation_plan','Rencana implementasi','Jadwal, fasilitator, sarana, sumber daya, dan mekanisme pelaksanaan.'),
      f('program_evaluation','Evaluasi program','Bagaimana efektivitas pelatihan dievaluasi?'),
      f('risks_mitigation','Risiko dan mitigasi'),
      f('success_indicators','Indikator keberhasilan'),
      f('sustainability','Rencana tindak lanjut dan keberlanjutan'),
      f('references','Referensi dan evidence pendukung')
    ]
  }
];

export function projectByCode(code:string){return PROJECTS.find(p=>p.code===String(code||'').toUpperCase());}
