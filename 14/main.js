    import {Grid, html} from "https://unpkg.com/gridjs?module";
    new gridjs.Grid({
      search: true,
      sort: true,
	  resizable: true,
	  pagination: true,
      language: {
        'search': {
          'placeholder': '🔍 Cari...'
        },
        'pagination': {
          'previous': 'Sebelumnya',
          'next': 'Berikutnya',
        }
      },
 columns: [
      { 
        name: 'Device',
        formatter: (cell) => html(`<b>${cell}</b>`)
      },
      { 
        name: 'MIUI',
        sort: false
      },
      { 
        name: 'Android',
        sort: false
      },
      { 
        name: 'Release',
      },
      { 
        name: 'Download',
        formatter: (row) => html(`<a class='extL' href='${row}' rel='noreferrer' target='_blank'>Download</a>`),
        sort: false
      },
],
  server: {
    url: 'https://cdn.inputekno.com/data/14/250323.xml',
    url: 'https://cdn.inputekno.com/data/14/120423.xml',
    handle: (res) => {
      return res.text().then(str => (new window.DOMParser()).parseFromString(str, "text/xml"));
    },
    then: data => {
      return Array.from(data.querySelectorAll('record'))
        .map(row => [
          row.querySelector('name').innerHTML,
          row.querySelector ('version').innerHTML,
          row.querySelector('android').innerHTML,
          row.querySelector('date').innerHTML,
          row.querySelector ('link').innerHTML,
        ])  
    }
  },
    }).render(document.getElementById("miui-14"));