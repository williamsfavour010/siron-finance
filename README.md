# Siron Finance

Siron Finance is a self-guided financial education site. The public GitHub Pages project serves the root of the `main` branch. The site uses plain HTML, CSS and JavaScript, with no application server or package installation.

## Where to make a change

| To change | Open |
| --- | --- |
| Homepage, headings, workbook example or section layout | `site.html` |
| Lesson copy and worked examples | `content/lessons.mjs` or `content/investing.mjs` |
| Country guidance, dated rules and source links | `content/countries.mjs` |
| Checkup questions, workbook URLs or contribution URL | `content/journey.mjs` |
| Calculator labels, defaults, limits and assumptions | `content/tools.mjs` |
| Explanations shown beside calculator results | `content/result-help.mjs` |
| Calculator formulas | `scripts/math.mjs` |
| Calculator output, Checkup routing and other interactions | `scripts/app.mjs` |
| Colors, typography or responsive layout | `assets/site.css` |

`index.html` is generated from the template and content files. Update the source files, then regenerate it. The homepage remains readable if JavaScript is unavailable, and the calculators require a browser with JavaScript enabled.

## Preview and test

From the repository folder, with Node.js and Python installed:

```sh
node scripts/build.mjs
node --test tests/*.test.mjs
python -m http.server 8000
```

Open http://localhost:8000/ in your browser. Use a local HTTP server so the browser can load JavaScript modules. The formulas run on the visitor's device. Inputs are held in page memory and are cleared on reload. The site has no accounts, analytics or bank connection. Workbook views and the contribution form are hosted by Google.

## Review and publish

Make a branch from `main`. Commit your source edits and regenerated `index.html` together. Open a pull request and include the pages or tools someone should try. Merging to `main` publishes through GitHub Pages. Check the live homepage and the tool you edited after Pages finishes. Reverting the release commit through another pull request restores the previous version.

## Update a rule or example

Keep exact tax limits and policy dates in the `rules` entries in `content/countries.mjs`. Include the authority, the effective period and the relevant primary-source link. Check proposed changes separately from rules already in effect. Keep examples synthetic and state their assumptions. Public files should contain only material appropriate for public sharing. Use the site's Corrections and updates section to record material changes.

The decorative hero artwork in `assets/uli-atrium.webp` was generated with ImageGen as an original Afrofuturist architectural illustration inspired by the line and negative space of [Igbo uli art](https://www.si.edu/object/uli-notes%3Anmafa_98-20-1).
