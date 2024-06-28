! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).BloggerJS = t()
}(this, (function() {
	"use strict";
	const e = /s\d{2}(-w\d{3}-h\d{3})?-c/;

	function t(e) {
		for (const t of e)
			if ("alternate" === t.rel) return t.href
	}

	function a(e) {
		const t = null == e ? 0 : e.length;
		if (!t) return [];
		let a = -1;
		const n = t - 1,
			r = function(e, t) {
				let a = -1;
				const n = e.length;
				for (t || (t = new Array(n)); ++a < n;) t[a] = e[a];
				return t
			}(e);
		for (; ++a < t;) {
			const e = a + Math.floor(Math.random() * (n - a + 1)),
				t = r[e];
			r[e] = r[a], r[a] = t
		}
		return r
	}

	function n(e) {
		return e.replace(/<[^>]*>?/g, "")
	}

	function r(e) {
		if (!e) return !1;
		const t = e.querySelector("[data-bjs=template]");
		if (!t) return !1;
		t.removeAttribute("data-bjs");
		const a = t.outerHTML;
		return t.remove(), a.replace(/data-src/g, "src")
	}

	function l(e, t) {
		return e.replace(/\{\{(.*?)\}\}/g, ((e, a) => t[a]))
	}

	function s({
		dataset: e = {}
	}) {
		const t = {};
		return Object.keys(e).forEach((a => {
			var n;
			t[a] = "true" === (n = e[a]) || "false" !== n && (Number(n).toString() === n ? Number(n) : "null" === n || "" === n ? null : n)
		})), t
	}

	function i(e) {
		const t = document.createElement("script");
		t.src = e, document.body.appendChild(t).parentNode.removeChild(t)
	}
	const o = {
			small: "s80-c",
			medium: "s300",
			large: "s500",
			max: "s800"
		},
		c = {
			small: "default",
			medium: "mqdefault",
			large: "hqdefault",
			max: "maxresdefault"
		},
		u = {
			homepage: window.location.origin + "/",
			category: null,
			locale: "es-ES",
			snippet: 100,
			format: {
				month: "long",
				day: "2-digit",
				year: "numeric"
			},
			image: "",
			imageSize: "s300",
			avatarImage: "https://www.gravatar.com/avatar/?d=mm",
			avatarSize: "s80",
			authorName: "Unknown",
			authorUrl: "",
			labels: {}
		};

	function m(e) {
		return null != e && "string" == typeof e && e.includes("img.youtube.com")
	}

	function g(t, a) {
		return m(t) ? t.replace("default", c[a] || a) : t.replace(e, o[a] || a)
	}

	function d(e, t) {
		return (null == e ? 0 : e.length) ? (e = e?.map((e => `<a class='${t.prefixClass}' href='${t.origin}search/label/${e.term}'><span class='${t.labelClassName+e.term}'>${t.before+e.term+t.after}</span></a>`))?.join(""), `<div class='${t.containerClass}'>${e}</div>`) : []
	}

	function p(e, a) {
		const [r] = e.author, l = e.content ? e.content.$t : e.summary.$t, s = {
			...u,
			...a
		}, i = e.id.$t.split(".post-"), o = i[1], c = i[0].split(":blog-")[1], p = e.media$thumbnail ? e.media$thumbnail.url : function(e) {
			const t = document.createElement("div");
			t.innerHTML = e;
			const a = t.querySelector("img");
			return a ? a.src : ""
		}(l) || s.image, f = r.gd$image.src.includes("g/blank.gif") || r.gd$image.src.includes("g/b16-rounded.gif") ? s.avatarImage : r.gd$image.src, b = s.homepage, h = s.labels.length || 10, $ = (null !== e.category && e.category)?.filter((e => !e.term.includes(s.labels.without || "undefined_terms")))?.filter((e => !(s.labels.remove || []).includes(e.term))).slice(0, h), y = e.category?.filter((e => e.term.includes(s.labels.terms || ""))).slice(0, h), x = e.category?.filter((e => (s.labels.filter || []).includes(e.term))).slice(0, h), v = {
			origin: b,
			prefixClass: s.labels.prefixClass || "label-",
			containerClass: s.labels.containerClass || "labels",
			labelClassName: s.labels.labelClassName || "labels",
			before: s.labels.before || "",
			after: s.labels.after || ""
		};
		return {
			blog_id: c,
			post_id: o,
			author_name: "Unknown" !== r.name.$t ? r.name.$t : s.authorName,
			author_url: r.uri ? r.uri.$t : s.authorUrl,
			author_image: f.replace(/s\B\d{2,4}/, s.avatarSize),
			author_email: r.email ? r.email.$t : "#noEmail",
			img: g(p, m(p) ? s.ytThumbnail : s.imageSize),
			img_max: g(p, "max"),
			img_large: g(p, "large"),
			img_medium: g(p, "medium"),
			img_small: g(p, "small"),
			time: (T = e.published.$t, w = {
				locale: s.locale,
				format: s.format
			}, new Date(T).toLocaleDateString(w.locale, w.format)),
			snippet: (C = n(l), P = s.snippet, C.length > P ? `${C.substring(0,P)}...` : C),
			labels: null == $ ? [] : $?.map((e => e.term)),
			labels_links: d($, v),
			labels_filter: d(x, v),
			labels_terms: d(y, v),
			content: n(l),
			url: t(e.link),
			published: new Date(e.published.$t).getTime(),
			title: e.title.$t,
			update: new Date(e.updated.$t).getTime(),
			category: s.category,
			thr: e.thr$total ? e.thr$total.$t : ""
		};
		var C, P, T, w
	}

	function f() {
		const e = new URLSearchParams(window.location.search);
		let t = e.get("page");
		var a;
		return (null === t || (a = t, Number(a).toString() !== a) || Number(t) < 1) && (t = "1"), {
			page: Number(t),
			results: e.get("max-results"),
			label: e.get("label"),
			view: e.get("view")
		}
	}
	const b = {},
		h = (e, t, a) => {
			const {
				homepage: n,
				category: r
			} = t, s = n, o = t.category.replace(/[^A-Z0-9]/gi, "") + a;
			b[o] = a => {
				let n = "";
				a.feed.entry ? a.feed.entry.forEach((e => {
					const a = p(e, t);
					n += l(t.template, a)
				})) : n += t.empty, e.innerHTML = n, e.classList.add("is-loaded")
			}, i(`${s}feeds/posts/default?alt=json-in-script&callback=BloggerJS.sections.${o}&max-results=${t.maxResults}&category=${r}`)
		},
		$ = {
			observer: !0,
			maxResults: 6,
			rootMargin: "200px",
			template: '<div class="bjs-article">\n  <img src="{{img}}"/>\n  <a href="{{url}}">{{title}}</a>\n</div>',
			empty: "<p>No se ha encontrado entradas</p>"
		};
	const y = {},
		x = {
			maxResults: 6,
			template: '<div class="bjs-comments">\n  <img src="{{author_image}}"/>\n  <a href="{{url}}">{{author_name}}</a>\n  <p>{{snippet}}</p>\n</div>',
			empty: "<p>Sin comentarios</p>"
		};
	let v = {
		id: "",
		length: 7,
		maxResults: 8,
		tags: [],
		random: !0,
		template: '<div class="bjs-article">\n  <img src="{{img}}"/>\n  <a href="{{url}}">{{title}}</a>\n</div>'
	};
	const C = document.querySelector("[data-bjs=related]");

	function P({
		number: e,
		label: t,
		perPage: a
	}) {
		let n = `/search?page=${e}`;
		const r = {
			...f()
		};
		return t && (n += `&label=${t}`), r.view && (n += `&view=${r.view}`), n += `&max-results=${r.results??a}`, n
	}

	function T({
		active: e,
		url: t,
		title: a,
		className: n = ""
	}) {
		const r = document.createElement("li"),
			l = document.createElement("a");
		return l.href = t, l.innerHTML = a, l.className = n, e && r.classList.add("is-active"), r.appendChild(l), r
	}

	function w({
		className: e
	}) {
		const t = document.createElement("li"),
			a = document.createElement("span");
		return a.textContent = "...", a.className = e, t.appendChild(a), t
	}

	function M({
		homepage: e,
		firstPage: t,
		perPage: a,
		label: n,
		active: r,
		className: l
	}) {
		return T({
			url: t ? e : P({
				number: "1",
				label: n,
				perPage: a
			}),
			title: "1",
			active: r,
			className: l
		})
	}

	function N({
		container: e,
		page: t,
		results: a,
		perPage: n,
		length: r,
		total: l,
		label: s,
		prevText: i,
		nextText: o,
		lastPageText: c,
		firstPage: u,
		homepage: m,
		numberClass: g,
		nextPageClass: d,
		prevPageClass: p,
		lastPageClass: f,
		firstPageClass: b,
		dotsPageClass: h,
		firstPageVisible: $,
		lastPageVisible: y
	}) {
		const x = document.createDocumentFragment(),
			v = Math.ceil(l / (a ?? n)),
			C = function(e, t, a) {
				const n = [];
				e > a && (e = a);
				let r = 1,
					l = a || 1;
				a >= t && (l = Math.min(Math.max(e + Math.ceil(t / 2) - 1, t), a), r = l - t + 1);
				for (let e = r; e <= l; e++) n.push(e);
				return n
			}(t, r, v);
		if (t - 1 > 0) {
			const e = T({
				url: u && t - 1 == 1 ? m : P({
					number: t - 1,
					label: s,
					perPage: n
				}),
				title: i,
				className: p
			});
			x.appendChild(e)
		}
		if ($ && !C.includes(1)) {
			const e = M({
					firstPage: u,
					homepage: m,
					label: s,
					className: b,
					perPage: n
				}),
				t = w({
					className: h
				});
			x.appendChild(e), x.appendChild(t)
		}
		if (C.forEach((e => {
				let a = null;
				a = 1 === e ? M({
					firstPage: u,
					homepage: m,
					label: s,
					active: e === t,
					className: g,
					perPage: n
				}) : T({
					url: P({
						number: e,
						label: s,
						perPage: n
					}),
					title: e,
					active: e === t,
					className: g
				}), x.appendChild(a)
			})), y && !C.includes(v)) {
			const e = T({
					url: P({
						number: v,
						label: s,
						perPage: n
					}),
					title: c || v,
					className: f
				}),
				t = w({
					className: h
				});
			x.appendChild(t), x.appendChild(e)
		}
		if (t + 1 <= v) {
			const e = T({
				url: P({
					number: t + 1,
					label: s,
					perPage: n
				}),
				title: o,
				className: d
			});
			x.appendChild(e)
		}
		e.innerHTML = "", e.appendChild(x)
	}
	let S = {
		firstPage: !1,
		perPage: 7,
		length: 5,
		label: null,
		prevText: "Anterior",
		nextText: "Siguiente",
		lastPageText: null,
		ytThumbnail: "mqdefault",
		template: '<div><img src="{{img}}"/><a href="{{url}}">{{title}}</a></div>',
		empty: "<p>No se ha encontrado entradas</p>",
		numberClass: "bjs-number",
		nextPageClass: "bjs-next-page",
		prevPageClass: "bjs-prev-page",
		firstPageClass: "bjs-first-page",
		lastPageClass: "bjs-last-page",
		dotsPageClass: "bjs-dots",
		firstPageVisible: !0,
		lastPageVisible: !0,
		infinite: !1,
		withButton: !1,
		buttonClass: "bjs-button-show-more",
		buttonText: "Cargar mas",
		buttonTextLoading: "Cargando",
		rootMargin: "100px"
	};

	function j({
		homepage: e,
		label: t,
		perPage: a,
		page: n
	}) {
		i(`${`${e}feeds/posts/default${t?`/-/${t}`:""}?alt=json-in-script&callback=BloggerJS.entry&max-results=${a}`}&start-index=${(n-1)*a+1}`)
	}
	const E = document.querySelector("[data-bjs=entry]"),
		L = document.querySelector("[data-bjs=pagination]");
	let _, k = 1,
		H = !1;

	function B(e) {
		E.innerHTML += e
	}
	var q = {
		sections: b,
		comments: y,
		related: function(e) {
			if (!e.feed.entry) return;
			let t = "",
				n = e.feed.entry.filter((e => function(e) {
					return e.id.$t.split(".post-")[1]
				}(e) !== v.id));
			v.random && (n = a(n));
			const r = n.length <= v.length ? n.length : v.length;
			Array.from({
				length: r
			}).forEach(((e, a) => {
				t += l(v.template, p(n[a], v))
			})), C.innerHTML = t
		},
		entry: function(e) {
			if (!e.feed.entry) return E.innerHTML = "", B(S.empty), void(S.infinite && L.remove());
			if (S.infinite) {
				const {
					button: t,
					container: a
				} = _;
				H = !1,
					function({
						data: e,
						options: t,
						page: a,
						container: n
					}) {
						t.firstPage || 1 !== a || (n.innerHTML = ""), e.forEach((e => {
							t.firstPage && 1 === a || (n.innerHTML += l(t.template, p(e, t)))
						}))
					}({
						button: t,
						container: a,
						page: k,
						data: e.feed.entry,
						options: S
					}), S.withButton && (t.textContent = S.buttonText);
				const n = Number(e.feed.openSearch$totalResults.$t),
					r = Math.ceil(n / (S.results ?? S.perPage));
				return void(k >= r && L.remove())
			}
			const t = function({
				options: e,
				data: t,
				container: a
			}) {
				let n = "";
				return t.feed.entry.forEach((t => {
					n += l(e.template, p(t, e))
				})), N({
					...e,
					total: Number(t.feed.openSearch$totalResults.$t),
					container: a
				}), n
			}({
				options: S,
				data: e,
				container: L
			});
			E && (E.innerHTML = "", B(t))
		},
		initComments: function(e = {}) {
			Array.from(document.querySelectorAll("[data-bjs=comments]")).forEach(((t, a) => {
				const n = {
						...x,
						...e,
						...s(t)
					},
					o = r(t);
				o && (n.template = o), ((e, t, a) => {
					const n = "comments" + a;
					y[n] = a => {
						let n = "";
						a.feed.entry ? a.feed.entry.forEach((e => {
							const a = p(e, t);
							n += l(t.template, a)
						})) : n += t.empty, e.innerHTML = n
					}, i(`${t.homepage}feeds/comments/default?alt=json-in-script&callback=BloggerJS.comments.${n}&max-results=${t.maxResults}`)
				})(t, n, a)
			}))
		},
		initRelated: function(e = {}) {
			if (!C) return;
			v = {
				...v,
				...e,
				...s(C)
			};
			const t = r(C);
			t && (v.template = t);
			const a = ("string" == typeof v.tags ? JSON.parse(v.tags) : v.tags).map((e => `label:"${e}"`)).join("|");
			i(`${v.homepage}feeds/posts/default?alt=json-in-script&callback=BloggerJS.related&max-results=${v.maxResults}&q=${a}`)
		},
		initEntry: function(e = {}) {
			S = {
				...S,
				...f(),
				...e,
				...s(E || !1),
				...s(L || !1)
			};
			const t = r(E);
			t && (S.template = t);
			const {
				firstPage: a,
				homepage: n,
				page: l,
				label: o,
				withButton: c,
				buttonClass: u,
				buttonText: m,
				rootMargin: g
			} = S, d = S.results ?? S.perPage, p = `${n}feeds/posts/default${o?`/-/${o}`:""}?alt=json-in-script&callback=BloggerJS.entry&max-results=${d}`;
			if (S.infinite) {
				if (!E || !L) return;
				i(`${a?p.replace(/max-results=(.[0-9]*)/,"max-results=1"):p}&start-index=1`), _ = function({
					container: e,
					pagination: t,
					withButton: a = !1,
					buttonClass: n,
					buttonText: r,
					onClick: l = (() => {}),
					onVisible: s = (() => {}),
					rootMargin: i = "100px"
				}) {
					let o = null;
					if (a) o = document.createElement("button"), o.className = n, o.textContent = r, o.addEventListener("click", (() => {
						l({
							button: o,
							container: e
						})
					})), t.innerHTML = "", t.appendChild(o);
					else {
						const e = new IntersectionObserver((e => {
							e.forEach((e => {
								e.isIntersecting && s()
							}))
						}), {
							rootMargin: i
						});
						e.observe(t)
					}
					return {
						container: e,
						button: o
					}
				}({
					buttonClass: u,
					buttonText: m,
					rootMargin: g,
					withButton: c,
					container: E,
					pagination: L,
					onClick({
						button: e
					}) {
						H || (e.textContent = S.buttonTextLoading, H = !0, k++, j({
							label: o,
							perPage: d,
							homepage: n,
							page: k
						}))
					},
					onVisible() {
						k++, j({
							label: o,
							perPage: d,
							homepage: n,
							page: k
						})
					}
				})
			} else {
				i(`${p}&start-index=${(l-1)*d+1}`)
			}
		},
		initSection: function(e = {}) {
			Array.from(document.querySelectorAll("[data-bjs=section]")).forEach(((t, a) => {
				const n = {
						...$,
						...e,
						...s(t)
					},
					l = r(t);
				if (l && (n.template = l), !0 === n.observer) {
					const e = new IntersectionObserver((r => {
						r.forEach((r => {
							r.isIntersecting && (h(t, n, a), e.unobserve(r.target))
						}))
					}), {
						rootMargin: n.rootMargin
					});
					e.observe(t)
				} else h(t, n, a)
			}))
		}
	};
	return q
}));
