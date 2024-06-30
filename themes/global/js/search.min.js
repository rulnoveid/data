const dataJSON = "/feeds/posts/summary?alt=json",
	iconJSON = "https://cdn.jsdelivr.net/npm/meteor-icons@3/variants/icons.json",
	dataConfig = {
		cache: !0
	},
	input = document.getElementById("search-input"),
	results = document.getElementById("search-results"),
	indexConfig = Object.assign(dataConfig, {
		doc: {
			id: "id",
			field: ["title", "summary"],
			store: ["title", "url", "summary", "icon", "labels"]
		}
	}),
	stringToHTML = e => (new DOMParser).parseFromString(e, "text/html").body.firstChild;
let iconData = {},
	docsIndex, displayedArticles = new Set;

function parseFeed(e) {
	return e.feed.entry.map(e => ({
		id: e.id.$t,
		title: e.title.$t,
		summary: e.summary ? e.summary.$t : "",
		url: e.link.find(e => "alternate" === e.rel).href,
		labels: e.category ? e.category.map(e => e.term) : [],
		icon: e.category && e.category.length > 0 ? e.category[0].term : "default-icon"
	}))
}

function getIcon(e) {
	let t = {
		android: "android",
		blogger: "blogger",
		css: "brackets-curly",
		javascript: "brackets",
		widgets: "grid-plus",
		default: "folder-search"
	};
	return t[e.toLowerCase()] || t.default
}

function init() {
	input.removeEventListener("focus", init), input.required = !0, fetch("/feeds/posts/summary?alt=json").then(e => e.json()).then(e => {
		let t = parseFeed(e);
		(docsIndex = FlexSearch.create("balance", indexConfig)).add(t)
	}).then(() => input.required = !1)
}

function truncate(e, t) {
	return e.length > t ? e.slice(0, t) + "..." : e
}

function search() {
	if (!docsIndex) return;
	results.innerHTML = "";
	let e = input.value.trim().toLowerCase();
	if (!e) return;
	let t = docsIndex.search(e, 10),
		s = new Set;
	t.forEach(e => {
		e.labels.forEach(e => {
			s.add(e)
		})
	}), s.forEach(e => {
		let s = t.filter(t => t.labels.includes(e)),
			r = getIcon(e),
			n = `<div class="search-group">
      <div class="search-group-title capitalize fs-6 fw-500 has-icon">
        <svg class="i i-${r} flex-none" viewBox="0 0 24 24">${iconData[r]}</svg>
        <h3 class="">${e}</h3>
      </div>
      <ul class="search-group-list"></ul>
    </div>`,
			i = stringToHTML(n),
			a = i.querySelector(".search-group-list");
		s.forEach(e => {
			let t = truncate(e.summary, 100),
				s = `<li class="search-item">
        <a class="search-link" href="${e.url}">
          <div class="search-title fs-6 fw-500">${e.title}</div>
          ${t?`<p class="search-summary">${t}</p>`:""}
        </a>
      </li>`;
			a.insertAdjacentHTML("beforeend", s), displayedArticles.add(e.id)
		}), results.appendChild(i)
	})
}

function initSearch(e, t) {
	e && t && (e.addEventListener("focus", init), e.addEventListener("keyup", search))
}
fetch("https://cdn.jsdelivr.net/npm/meteor-icons@3/variants/icons.json").then(e => e.json()).then(e => {
	iconData = e, initSearch(input, results)
});
