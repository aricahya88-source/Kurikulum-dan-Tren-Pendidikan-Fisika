/**
 * Instalasi Edu Curicula — Kurikulum dan Tren Pendidikan Fisika.
 * Gunakan Spreadsheet dan folder Drive baru, isi StorageConfig.gs, lalu Run setupLms().
 */
function setupLms() {
  var lock=LockService.getScriptLock();lock.waitLock(30000);
  try{
    var sid=String(LMS_STORAGE_CONFIG.SPREADSHEET_ID||'').trim(),fid=String(LMS_STORAGE_CONFIG.ROOT_FOLDER_ID||'').trim();
    if(!sid||sid.indexOf('PASTE_')===0)throw new Error('Isi SPREADSHEET_ID pada StorageConfig.gs.');
    if(!fid||fid.indexOf('PASTE_')===0)throw new Error('Isi ROOT_FOLDER_ID pada StorageConfig.gs.');
    var ss=SpreadsheetApp.openById(sid);ss.getName();var root=DriveApp.getFolderById(fid);root.getName();
    props_().setProperties({SPREADSHEET_ID:sid,ROOT_FOLDER_ID:fid},false);ensureSecrets_();ensureSchema_();seedSettings_();seedWeeks_();seedCourseContent_();seedCourseActivities_();ensureFolders_();var admin=ensureAdmin_();
    Logger.log('=== EDU CURICULA SIAP ===');Logger.log('Spreadsheet: '+ss.getUrl());Logger.log('Drive: '+root.getUrl());Logger.log('Login admin: ADMIN');if(admin.pin)Logger.log('PIN admin sementara: '+admin.pin);
    return {success:true,spreadsheetUrl:ss.getUrl(),folderUrl:root.getUrl(),adminLogin:'ADMIN',temporaryPin:admin.pin||''};
  }finally{lock.releaseLock();}
}
function ensureSchema_(){var ss=db_();Object.keys(SCHEMA).forEach(function(key){var name=LMS.SHEETS[key],headers=SCHEMA[key],sh=ss.getSheetByName(name)||ss.insertSheet(name);if(sh.getLastRow()===0){sh.getRange(1,1,1,headers.length).setValues([headers]);sh.setFrozenRows(1);sh.getRange(1,1,1,headers.length).setFontWeight('bold').setBackground('#E8F4FB').setFontColor('#064D8D');return;}var current=sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0].map(String);if(current.join('|')!==headers.join('|'))throw new Error('Header sheet '+name+' berbeda. Gunakan Spreadsheet baru untuk Edu Curicula agar data lama tidak tertimpa.');});var d=ss.getSheetByName('Sheet1');if(d&&ss.getSheets().length>1&&d.getLastRow()===0)ss.deleteSheet(d);}
function seedSettings_(){Object.keys(DEFAULT_SETTINGS).forEach(function(k){if(!findOne_(LMS.SHEETS.SETTINGS,'key',k))setSetting_(k,DEFAULT_SETTINGS[k]);});}
function seedWeeks_(){
  var titles=[
    'Hakikat, Fungsi, Prinsip, dan Komponen Kurikulum',
    'Perkembangan Kurikulum Pendidikan di Indonesia',
    'Struktur Kurikulum Pendidikan Fisika, CP, Tujuan Pembelajaran, dan Kompetensi Lulusan',
    'Analisis Kerangka dan Standar Kurikulum Pendidikan Fisika',
    'Kurikulum Pelatihan, Training Needs Analysis, dan Curriculum Mapping',
    'UTS Project I — Training Needs Analysis',
    'UTS Project II — Curriculum Blueprint',
    'UTS Project III — Curriculum Blueprint Forum',
    'STEM dan Tren Pedagogi Kontemporer Pendidikan Fisika',
    'Artificial Intelligence dan Generative AI dalam Pembelajaran Fisika',
    'Machine Learning, Computer Vision, dan Analisis Data Eksperimen',
    'Virtual Laboratory, Simulation, AR/VR, dan Real-Virtual Experiment',
    'Education 5.0, Etika Teknologi, Inklusivitas, dan Future Trends',
    'UAS Project I — Final Training Curriculum Design',
    'UAS Project II — Curriculum Clinic and Alignment Audit',
    'UAS Project III — Final Training Curriculum Design Forum'
  ];
  for(var w=1;w<=16;w++){var id='W'+('0'+w).slice(-2);upsertObj_(LMS.SHEETS.WEEKS,'week_id',{week_id:id,week_no:w,title:titles[w-1],summary_html:'<p>Konten pertemuan dapat diedit dosen melalui WYSIWYG pada menu Kelola Materi.</p>',open_at:'',close_at:'',visible:true,updated_at:nowIso_()});}
}
function seedCourseContent_(){
  var content=[
    ['Hakikat dan Komponen Kurikulum','<h2>Understanding Curriculum</h2><p>Bahas hakikat, fungsi, prinsip, dan komponen kurikulum serta posisinya sebagai sistem yang mengarahkan pengalaman belajar.</p><h3>Pertanyaan pemantik</h3><p>Apakah kurikulum hanya dokumen, atau keseluruhan pengalaman belajar yang dirancang? Bagaimana kurikulum memengaruhi cara fisika diajarkan?</p>'],
    ['Perkembangan Kurikulum Indonesia','<h2>Curriculum Change</h2><p>Analisis tonggak perkembangan kurikulum Indonesia, perubahan paradigma, serta implikasinya bagi pendidikan fisika.</p><h3>Fokus</h3><ul><li>Perubahan tujuan dan struktur</li><li>Perubahan orientasi pembelajaran</li><li>Dokumen kebijakan terkini</li><li>Implikasi bagi pembelajaran fisika</li></ul>'],
    ['Struktur Kurikulum Pendidikan Fisika','<h2>Pembelajaran Dipandu Mahasiswa 1</h2><p>Topik: struktur kurikulum pendidikan fisika, standar lulusan, standar isi, capaian pembelajaran, tujuan pembelajaran, dan kompetensi lulusan.</p><p><strong>Ketentuan:</strong> strategi aktif bebas dipilih mahasiswa; metode ceramah tidak boleh menjadi strategi utama.</p>'],
    ['Analisis Kerangka dan Standar Kurikulum','<h2>Pembelajaran Dipandu Mahasiswa 2</h2><p>Topik: analisis komparatif tujuan, struktur, kompetensi, konten, pedagogi, asesmen, dan konteks kurikulum pendidikan fisika.</p><p>Fasilitator wajib mengajak kelas menghasilkan matriks/temuan analitis.</p>'],
    ['Training Curriculum Design Foundations','<h2>Dari Analisis ke Desain</h2><p>Pertemuan ini memperkenalkan kurikulum pelatihan, Training Needs Analysis, competency gap, participant profile, learning outcomes, curriculum blueprint, curriculum map, dan alignment.</p><p>Mahasiswa juga menganalisis satu program/kurikulum pelatihan yang sudah ada melalui form LMS.</p>'],
    ['UTS — Training Needs Analysis','<h2>Define the Need</h2><p>Kelompok 4–5 mahasiswa menentukan target peserta, problem statement, evidence, competency gap, root cause, serta prioritas kebutuhan pelatihan.</p><p>Desain harus dimulai dari kebutuhan nyata, bukan dari daftar materi yang ingin diajarkan.</p>'],
    ['UTS — Curriculum Blueprint','<h2>Build the Blueprint</h2><p>Susun alignment Need → Competency → Learning Outcome → Module → Learning Activity → Assessment. Lakukan peer review untuk menguji logika dan konsistensi desain.</p>'],
    ['UTS — Curriculum Blueprint Forum','<h2>Defend the Blueprint</h2><p>Kelompok mempresentasikan Training Needs Analysis, Curriculum Blueprint, dan Curriculum Map melalui pitch, questioning, dan oral defense.</p>'],
    ['STEM dan Tren Pedagogi','<h2>Pembelajaran Dipandu Mahasiswa 3</h2><p>Topik: STEM/integrated STEM, inquiry, problem solving, computational thinking, serta implikasinya terhadap desain kurikulum pelatihan pendidikan fisika.</p>'],
    ['AI dan Generative AI','<h2>Pembelajaran Dipandu Mahasiswa 4</h2><p>Topik: AI/GenAI untuk tutor, asesmen, personalisasi, content generation, literasi AI, bias, privasi, dan integritas akademik dalam pendidikan fisika.</p>'],
    ['Machine Learning, Computer Vision, dan Data','<h2>Pembelajaran Dipandu Mahasiswa 5</h2><p>Topik: machine learning, computer vision untuk analisis gerak/eksperimen, data literacy, kesiapan guru, serta prasyarat infrastruktur.</p>'],
    ['Virtual Lab, Simulation, AR/VR','<h2>Pembelajaran Dipandu Mahasiswa 6</h2><p>Topik: virtual laboratory, simulation, real-virtual experiment, AR/VR, pedagogical affordances, aksesibilitas, biaya, dan implementation challenges.</p>'],
    ['Education 5.0 dan Future Trends','<h2>Pembelajaran Dipandu Mahasiswa 7</h2><p>Topik: Education 5.0, human-centered technology, etika, equity, digital divide, inklusivitas, sustainability, dan future scenario pendidikan fisika.</p>'],
    ['UAS — Final Training Curriculum Design','<h2>From Blueprint to Full Curriculum</h2><p>Kelompok 4–5 mahasiswa mengembangkan blueprint menjadi dokumen kurikulum lengkap: rasional, profil peserta, learning outcomes, struktur modul, strategi, media, asesmen, implementasi, evaluasi, dan integrasi tren.</p>'],
    ['UAS — Curriculum Clinic','<h2>Audit the Alignment</h2><p>Uji Needs–Outcome, Outcome–Module, Outcome–Assessment, feasibility, resources, risks, indicators of success, dan sustainability. Setiap kelompok menyusun response-to-review dan revisi.</p>'],
    ['UAS — Final Curriculum Forum','<h2>Defend the Curriculum</h2><p>Final pitch dan oral defense. Produk akhir berupa dokumen kurikulum pelatihan, Curriculum Map/Canvas, Implementation Plan, dan evidence pendukung.</p>']
  ];
  content.forEach(function(x,i){var n=i+1,id='MAT'+('0'+n).slice(-2),wid='W'+('0'+n).slice(-2);upsertObj_(LMS.SHEETS.MATERIALS,'material_id',{material_id:id,week_id:wid,material_no:n,order_no:1,title:x[0],content_html:x[1],resource_url:'',visible:true,updated_at:nowIso_()});});
}
function seedCourseActivities_(){
  var now=nowIso_(),rows=[
    {activity_id:'PRJ_STUDENT_LED',week_id:'W03',type:'project',title:'Pembelajaran Dipandu Mahasiswa',description_html:'<p>Tujuh sesi, masing-masing difasilitasi 2 mahasiswa. Strategi pembelajaran bebas dipilih mahasiswa, tetapi <strong>metode ceramah tidak diperbolehkan sebagai strategi utama</strong>. PowerPoint hanya boleh menjadi media pendukung.</p>',mode:'group',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'STUDENT_LED',created_at:now,updated_at:now},
    {activity_id:'ARTICLE_ANALYSIS',week_id:'W02',type:'assignment',title:'Analisis Kritis 2 Artikel Tren Pendidikan Fisika',description_html:'<p>Tugas individu berbentuk form terstruktur tanpa upload file. Pilih dua artikel ilmiah yang membahas tren sejenis/berdekatan dalam pendidikan fisika. Analisis identitas, masalah, tujuan, metode, temuan, kekuatan, keterbatasan, implikasi, potensi tema pelatihan, perbandingan, critical synthesis, dan implikasi kurikuler.</p>',mode:'individual',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'',created_at:now,updated_at:now},
    {activity_id:'PROGRAM_ANALYSIS',week_id:'W05',type:'assignment',title:'Analisis Program/Kurikulum Pelatihan',description_html:'<p>Analisis satu program pelatihan nyata melalui form LMS: kebutuhan, peserta, tujuan, kompetensi, struktur, modul, strategi, media, asesmen, evaluasi, alignment, kekuatan, kelemahan, dan rekomendasi. Tidak perlu upload file.</p>',mode:'individual',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'',created_at:now,updated_at:now},
    {activity_id:'PRJ_UTS_BLUEPRINT',week_id:'W06',type:'project',title:'UTS — Training Needs Analysis & Curriculum Blueprint',description_html:'<p>Kelompok 4–5 mahasiswa. Lakukan Training Needs Analysis dan susun Curriculum Blueprint serta Curriculum Map yang memperlihatkan alignment Need → Competency → LO → Module → Activity → Assessment.</p>',mode:'group',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'UTS_BLUEPRINT',created_at:now,updated_at:now},
    {activity_id:'PRJ_UAS_CURRICULUM',week_id:'W14',type:'project',title:'UAS — Final Training Curriculum Design',description_html:'<p>Kelompok 4–5 mahasiswa. Kembangkan blueprint menjadi dokumen kurikulum pelatihan lengkap, audit alignment, uji kelayakan, revisi, dan pertahankan melalui final pitch serta oral defense.</p>',mode:'group',max_score:100,due_at:'',visible:true,allow_comments:true,project_code:'UAS_CURRICULUM',created_at:now,updated_at:now},
    {activity_id:'PARTICIPATION',week_id:'W16',type:'participation',title:'Partisipasi dan Kontribusi Kelas',description_html:'<p>Dinilai dosen berdasarkan kontribusi bermakna dalam diskusi, peer review, questioning, feedback, dan aktivitas pembelajaran.</p>',mode:'individual',max_score:100,due_at:'',visible:true,allow_comments:false,project_code:'',created_at:now,updated_at:now}
  ];
  rows.forEach(function(r){upsertObj_(LMS.SHEETS.ACTIVITIES,'activity_id',r);});SpreadsheetApp.flush();
}
function ensureAdmin_(){var users=rows_(LMS.SHEETS.USERS),found=null;for(var i=0;i<users.length;i++)if(String(users[i].role).toLowerCase()==='admin'&&asBool_(users[i].active)){found=users[i];break;}if(found)return {created:false,pin:''};var pin=String(Math.floor(100000+Math.random()*900000)),hp=makeUserPin_(pin);appendObj_(LMS.SHEETS.USERS,{user_id:makeId_('USR'),nim:'ADMIN',name:'Administrator',email:'',role:'admin',class_name:'',pin_salt:hp.salt,pin_hash:hp.hash,active:true,created_at:nowIso_(),updated_at:nowIso_()});return {created:true,pin:pin};}
function repairLms(){ensureSecrets_();ensureSchema_();seedSettings_();seedWeeks_();seedCourseContent_();seedCourseActivities_();ensureFolders_();return {success:true,message:'Edu Curicula diperiksa dan seed inti telah dipasang.'};}
function resetAdminPin(){var pin='123456';if(String(pin).length<6)throw new Error('PIN minimal 6 karakter.');var admin=findUserByIdentity_('ADMIN');if(!admin)throw new Error('Admin tidak ditemukan.');var hp=makeUserPin_(pin);updateRowObj_(LMS.SHEETS.USERS,admin.__row,{pin_salt:hp.salt,pin_hash:hp.hash,updated_at:nowIso_()});Logger.log('PIN admin baru: '+pin);return true;}
