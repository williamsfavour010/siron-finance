# Siron Finance

Siron Finance helps readers make concrete money decisions through worked examples, simple comparisons and country playbooks. The public GitHub Pages project serves the root of `main`. The site uses plain HTML, CSS and JavaScript.

## Where to make a change

| To change | Open |
| --- | --- |
| Homepage, headings and section layout | `site.html` |
| Starting points, worked cases, action steps and case sources | `content/cases.mjs` |
| Guides inside each decision | `content/lessons.mjs` and `content/investing.mjs` |
| Country guidance, dated rules and source links | `content/countries.mjs` |
| Workbook descriptions, links and contribution form URL | `content/journey.mjs` |
| Calculator labels, defaults, limits and assumptions | `content/tools.mjs` |
| Explanations shown beside calculator results | `content/result-help.mjs` |
| Calculator formulas | `scripts/math.mjs` |
| Calculator output, planning flow and other interactions | `scripts/app.mjs` |
| Where decisions, calculators and guides appear | `scripts/build.mjs` |
| Colors, typography or responsive layout | `assets/site.css` |

`index.html` is generated from the template and content files. Update the source files, then regenerate it. The homepage remains readable if JavaScript is unavailable, and the calculators require a browser with JavaScript enabled.

## Preview and test

From the repository folder, with Node.js and Python installed:

```sh
node scripts/build.mjs
node --test tests/*.test.mjs
python -m http.server 8000
```

Open http://localhost:8000/ in your browser. Use a local HTTP server so the browser can load JavaScript modules. Calculators and the plan run in memory in `scripts/app.mjs` and use formulas from `scripts/math.mjs`. Reloading or restoring the page clears answers and results. A Content Security Policy blocks native form submissions. The app has no database, browser storage, analytics or bank connection. Workbook views and the contribution form open on Google.

## Review and publish

1. Clone the repository, then branch from current `main`, for example `git switch -c docs/ghana-first-step`.
2. Edit the source files, rebuild, and run the commands above. Commit the source edits and regenerated `index.html` together. If you change browser JavaScript or CSS, bump the version on its URL in `site.html` before rebuilding so returning readers get it.
3. Push the branch and open a pull request into `main`. Describe the reader’s decision, the pages or figures to check, and the test result. Include primary sources for any changed financial rule.
4. After review, squash and merge. GitHub Pages publishes from `main`. Open the live page and try the affected flow after deployment.

## Update a rule or example

Start with a person, a decision, and a set of numbers a reader can follow. Use fictional examples and show any assumed rates, fees and timing. Keep field labels plain and place industry terms in the field’s help text. Put case reading links in `sources` so they appear under Check the sources. Keep country rules in `content/countries.mjs` with the effective period and primary-source link. Check proposed changes separately from rules already in effect. Use material appropriate for public sharing.

The decorative hero artwork in `assets/uli-atrium.webp` was generated with ImageGen as an original Afrofuturist architectural illustration inspired by the line and negative space of [Igbo uli art](https://www.si.edu/object/uli-notes%3Anmafa_98-20-1).
