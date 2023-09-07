const today=new Date,day=today.getDate(),month=today.getMonth(),year=today.getFullYear(),stringMonths=["January","February","March","April","May","June","July","August","September","October","November","December"],stringDay=["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];function getSelectMonth(){let a="",t="";for(let e=0;e<stringMonths.length;e++){t=e+1;a+='<option value="'+t+'"'+(e===month?" selected":"")+">"+stringMonths[e]+"</option>"}document.getElementById("month").innerHTML=a,getKota()}function getKota(){let a=fetch("https://api.myquran.com/v1/sholat/kota/semua").then(a=>a.json());a.then(a=>{a.forEach(function(a){let t=`<option value='${a.id}' ${"KOTA JAKARTA"==a.lokasi?"selected":""}>${a.lokasi}</option>`;document.getElementById("idselect").insertAdjacentHTML("beforeend",t)}),getJadwal()})}function getJadwal(){let a=document.getElementById("idselect").value,t=document.getElementById("month").value,e=stringDay[today.getDay()]+", "+day+" "+stringMonths[month]+" "+year,s=fetch("https://api.myquran.com/v1/sholat/jadwal/"+a+"/"+year+"/"+t).then(a=>a.json()),n=fetch("https://api.myquran.com/v1/sholat/jadwal/"+a+"/"+year+"/"+(month+1)+"/"+day).then(a=>a.json());Promise.all([s]).then(([a])=>{let t=a.data,e=t.jadwal,s=(t.lokasi,t.id),n="",l=today.toLocaleDateString();for(var d=0;d<e.length;d++){var o,i=e[d];n+=`<tr class='${s} ${l==new Date(e[d].date).toLocaleDateString()?"table-active":""}'><td>${i.tanggal}</td><td>${i.subuh}</td><td>${i.dhuha}</td><td>${i.dzuhur}</td><td>${i.ashar}</td><td>${i.maghrib}</td><td>${i.isya}</td></tr>`}let h=document.getElementById("data-table");document.getElementById("infosumber").innerHTML="<p><b>Sumber:</b> Bimas Islam Kementerian Agama</p>",h.innerHTML=n}),Promise.all([n]).then(([a])=>{let t=a.data,s=t.jadwal,n=t.lokasi,l="";l+="<div class='jadwal-sholat'>",l+="<span class='name'>Subuh</span>",l+=`<span class='time'>${s.subuh}</span>`,l+="</div>",l+="<div class='jadwal-sholat'>",l+="<span class='name'>Duha</span>",l+=`<span class='time'>${s.dhuha}</span>`,l+="</div>",l+="<div class='jadwal-sholat'>",l+="<span class='name'>Dzuhur</span>",l+=`<span class='time'>${s.dzuhur}</span>`,l+="</div>",l+="<div class='jadwal-sholat'>",l+="<span class='name'>Ashar</span>",l+=`<span class='time'>${s.ashar}</span>`,l+="</div>",l+="<div class='jadwal-sholat'>",l+="<span class='name'>Magrib</span>",l+=`<span class='time'>${s.maghrib}</span>`,l+="</div>",l+="<div class='jadwal-sholat'>",l+="<span class='name'>Isya</span>",l+=`<span class='time'>${s.isya}</span>`;let d=l+="</div>",o='<span class="titleh">Jadwal sholat untuk wilayah '+n+" dan Sekitarnya. </span>";o+='<span class="tanggal">'+e+"</span>";let i=document.getElementById("headertitle"),h=document.getElementById("jadwal-sholat");i.innerHTML=o,h.innerHTML=d}).catch(a=>console.log(a))}getSelectMonth(),getKota();
