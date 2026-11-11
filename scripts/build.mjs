// Run "node scripts/build.mjs" after editing content. The generated index.html
// is checked in so GitHub Pages can publish it without a build service.
import { readFile, writeFile } from 'node:fs/promises';
import { countries } from '../content/countries.mjs';
import { lessons } from '../content/lessons.mjs';
import { investing } from '../content/investing.mjs';
import { tools, diligence } from '../content/tools.mjs';
import { questions, workbookLinks, contributionUrl } from '../content/journey.mjs';

const html = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
const link = (label, url) => `<a href="${html(url)}">${html(label)}</a>`;
const links = sources => sources?.length ? `<ul class="source-links">${sources.map(({label,url})=>`<li>${link(label,url)}</li>`).join('')}</ul>` : '';
const paragraphs = value => (Array.isArray(value) ? value : String(value ?? '').split(/\n\n+/)).filter(Boolean).map(p=>`<p>${html(p)}</p>`).join('');
const toolkit = Object.fromEntries(tools.map(tool=>[tool.id,tool]));
const articles = [...lessons,...investing];
const currencies = ['USD','GBP','NGN','CAD','EUR','GHS','SEK'];
const currencySelect = (label = 'Currency', current = 'USD', id = 'currency') => `<label>${label}<select name="${id}">${currencies.map(currency=>`<option${currency === current ? ' selected' : ''}>${currency}</option>`).join('')}</select></label>`;

function fields(list) {
  return `<div class="field-grid">${list.map(([id,label,value,min,max,step='any'])=>`<label>${html(label)}<input type="number" name="${id}" value="${value}" min="${min}" max="${max}" step="${step}"${id === 'gross' ? '' : ' required'}></label>`).join('')}</div>`;
}

function calculator(tool) {
  const insurance = tool.id === 'insurance';
  const body = insurance
    ? `${fields(tool.fields.slice(0,3))}<fieldset><legend>Plan A</legend>${fields(tool.fields.slice(3,9))}</fieldset><fieldset><legend>Plan B</legend>${fields(tool.fields.slice(9))}</fieldset>`
    : fields(tool.fields);
  return `<details id="${tool.id}" class="disclosure calculator"><summary><span><strong>${html(tool.title)}</strong><small>${html(tool.summary)}</small></span></summary>
    <div class="detail-body">
      <p class="example">${html(tool.example)}</p>
      <form data-tool="${tool.id}">
        <div class="currency-row">${tool.id === 'fx' ? currencySelect('Investment currency','NGN','localCurrency') + currencySelect('Goal currency') : currencySelect()}</div>
        ${body}
        <p class="note">${html(tool.note)}</p>
        <div class="form-actions"><button class="button" type="submit">Calculate</button><button class="button secondary" type="reset">Reset example</button></div>
        <div class="result" role="status" aria-live="polite" hidden></div>
      </form>
      ${links(tool.sources?.map(([label,url])=>({label,url})))}
    </div>
  </details>`;
}

function lesson(article) {
  return `<details class="disclosure article" data-article id="learn-${html(article.id)}"><summary><span><strong>${html(article.title)}</strong><small>${html(article.summary)}</small></span></summary>
    <div class="detail-body lesson-body">${article.sections.map(section=>`<section><h3>${html(section.title)}</h3>${paragraphs(section.body)}
      ${section.example ? `<div class="example"><strong>Worked example</strong>${paragraphs(section.example)}</div>` : ''}
      ${section.action ? `<div class="action"><strong>Try this</strong>${paragraphs(section.action)}</div>` : ''}${links(section.sources)}
    </section>`).join('')}</div></details>`;
}

function playbook(code, country) {
  return `<details id="country-${code}" class="disclosure"><summary><span><strong>${html(country.name)}</strong><small>${html(country.currency)}</small></span></summary><div class="detail-body">
    ${paragraphs(country.summary)}
    <h3>What to check first</h3><ol>${country.actions.map(a=>`<li>${html(a)}</li>`).join('')}</ol>
    <div class="example"><strong>Worked example</strong>${paragraphs(country.example)}</div>
    <h3>Before you act</h3><ul>${country.checks.map(a=>`<li>${html(a)}</li>`).join('')}</ul>
    ${country.rules.length ? `<h3>Dated rules</h3><ul class="rules">${country.rules.map(rule=>`<li><strong>${html(rule.label)}</strong> <span>${html(rule.value)}</span> <small>${html(rule.period)} · ${link('Primary source',rule.url)}</small></li>`).join('')}</ul>` : ''}
    ${links(country.sources)}
  </div></details>`;
}

const checkup = `<form id="checkup-form"><div class="field-grid">${questions.map(([id,question,options])=>`<label>${html(question)}<select name="${id}" required><option value="">Choose an answer</option>${options.split('|').map(option=>{const [value,label]=option.split(':');return `<option value="${value}">${html(label)}</option>`;}).join('')}</select></label>`).join('')}</div>
<div class="form-actions"><button type="submit" class="button">Show my starting points</button><button type="reset" class="button secondary">Reset</button></div><div class="result" role="status" aria-live="polite" hidden></div></form>`;

const sourceMap = new Map();
for (const item of [...articles.flatMap(a=>a.sections.flatMap(s=>s.sources ?? [])), ...Object.values(countries).flatMap(c=>[...c.sources, ...c.rules.map(r=>({label:r.label,url:r.url}))]), ...tools.flatMap(t=>t.sources.map(([label,url])=>({label,url})))]) {
  if (!sourceMap.has(item.url)) sourceMap.set(item.url,item);
}
const sources = [...sourceMap.values()].sort((a,b)=>a.label.localeCompare(b.label));
const blocks = {
  CHECKUP: checkup,
  GOAL: calculator(toolkit.goal),
  BUDGET: calculator(toolkit.budget),
  TOOLS: tools.filter(t=>!['goal','budget'].includes(t.id)).map(tool => (tool.id === 'fx' ? '<span id="diaspora"></span>' : '') + calculator(tool)).join('\n'),
  LESSONS: articles.map(lesson).join('\n'),
  COUNTRIES: Object.entries(countries).map(([code,country])=>playbook(code,country)).join('\n'),
  COUNTRY_LINKS: Object.entries(countries).map(([code,country])=>`<a class="chip" href="#country-${code}">${html(country.name)}</a>`).join(''),
  SOURCES: links(sources),
  WORKBOOKS: workbookLinks.map(([title,description,url])=>`<div><h3>${html(title)}</h3><p>${html(description)}</p>${link('View example workbook ↗',url)}</div>`).join(''),
  DILIGENCE: diligence.map(prompt=>`<label class="checkbox"><input type="checkbox" name="checks" value="${html(prompt)}"><span>${html(prompt)}</span></label>`).join(''),
  CONTRIBUTE: html(contributionUrl),
};

const template = await readFile(new URL('../site.html',import.meta.url),'utf8');
const output = template.replace(/<!-- INSERT: ([A-Z_]+) -->/g, (_,key)=>{
  if (!(key in blocks)) throw new Error(`Unknown template slot: ${key}`);
  return blocks[key];
});
await writeFile(new URL('../index.html',import.meta.url),'<!-- Generated from site.html and content/ by scripts/build.mjs. -->\n'+output);
