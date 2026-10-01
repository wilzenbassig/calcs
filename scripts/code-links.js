(function () {
	const codeLinkData = {
		currentCalifornia: [
			{
				label: "2025 California Building Code",
				url: "https://up.codes/viewer/california/ca-building-code-2025"
			},
			{
				label: "2025 California Residential Code",
				url: "https://up.codes/viewer/california/ca-residential-code-2025"
			}
		],
		modelCodes: [
			{
				label: "2024 International Building Code",
				url: "https://up.codes/viewer/california/ibc-2024"
			},
			{
				label: "2024 International Residential Code",
				url: "https://up.codes/viewer/california/irc-2024"
			}
		],
		localAmendments: [
			{
				label: "Berkeley Building Codes",
				url: "https://berkeleyca.gov/construction-development/permits-design-parameters/design-parameters/berkeley-requirements-building"
			},
			{
				label: "Oakland Building Codes",
				url: "https://www.oaklandca.gov/Planning-Building/Building-Construction-Permits-Inspections/Building-Codes"
			},
			{
				label: "San Francisco Building Codes",
				url: "https://codelibrary.amlegal.com/codes/san_francisco/latest/sf_building/0-0-0-91586"
			}
		],
		previousEditions: [
			{
				family: "CBC",
				years: [
					{ year: "2022", url: "https://up.codes/viewer/california/ca-building-code-2022" },
					{ year: "2019", url: "https://up.codes/viewer/california/ca-building-code-2019" }
				]
			},
			{
				family: "CRC",
				years: [
					{ year: "2022", url: "https://up.codes/viewer/california/ca-residential-code-2022" },
					{ year: "2019", url: "https://up.codes/viewer/california/ca-residential-code-2019" }
				]
			},
			{
				family: "IBC",
				years: [
					{ year: "2021", url: "https://up.codes/viewer/california/ibc-2021" },
					{ year: "2018", url: "https://up.codes/viewer/california/ibc-2018" }
				]
			},
			{
				family: "IRC",
				years: [
					{ year: "2021", url: "https://up.codes/viewer/california/irc-2021" },
					{ year: "2018", url: "https://up.codes/viewer/california/irc-2018" }
				]
			}
		]
	};

	const root = document.getElementById("building-code-links");
	if (!root) return;

	function makeElement(tagName, className, text) {
		const element = document.createElement(tagName);
		if (className) element.className = className;
		if (text) element.textContent = text;
		return element;
	}

	function makeExternalLink(label, url, className) {
		const link = makeElement("a", className, label);
		link.href = url;
		const mark = makeElement("span", "code-external-mark", " ↗");
		mark.setAttribute("aria-hidden", "true");
		link.appendChild(mark);
		return link;
	}

	function addSection(title, codes) {
		const section = makeElement("section", "code-nav-section");
		const heading = makeElement("h4", "code-nav-label", title);
		const list = makeElement("ul", "bullets code-nav-list");
		section.appendChild(heading);
		codes.forEach(function (code) {
			const item = makeElement("li");
			item.appendChild(makeExternalLink(code.label, code.url, "code-link-primary"));
			list.appendChild(item);
		});
		section.appendChild(list);
		root.appendChild(section);
	}

	const title = makeElement("h3", "", "City and County Building Codes");
	root.appendChild(title);
	addSection("Current California", codeLinkData.currentCalifornia);
	addSection("Model Codes", codeLinkData.modelCodes);
	addSection("Local Amendments", codeLinkData.localAmendments);

	const previous = makeElement("details", "code-previous-editions");
	previous.id = "previous-code-editions";
	const summary = makeElement("summary", "", "Previous Editions");
	previous.appendChild(summary);

	const editionRows = makeElement("div", "code-edition-rows");
	codeLinkData.previousEditions.forEach(function (family) {
		const row = makeElement("div", "code-edition-row");
		row.appendChild(makeElement("strong", "code-edition-family", family.family));
		const years = makeElement("div", "code-edition-years");
		family.years.forEach(function (edition) {
			years.appendChild(makeExternalLink(edition.year, edition.url, ""));
		});
		row.appendChild(years);
		editionRows.appendChild(row);
	});
	previous.appendChild(editionRows);
	root.appendChild(previous);

	const storageKey = "structural-calcs-previous-code-editions-open";
	try {
		previous.open = window.localStorage.getItem(storageKey) === "open";
	} catch (error) {
		previous.open = false;
	}
	previous.addEventListener("toggle", function () {
		try {
			window.localStorage.setItem(storageKey, previous.open ? "open" : "closed");
		} catch (error) {
			// The disclosure still works when browser storage is unavailable.
		}
	});
})();
