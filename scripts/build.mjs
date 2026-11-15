// Run "node scripts/build.mjs" after editing content. The generated index.html
// is checked in so GitHub Pages can publish it without a build service.
import { readFile, writeFile } from 'node:fs/promises';
import { countries, localStarts } from '../content/countries.mjs';
import { lessons } from '../content/lessons.mjs';
import { investing } from '../content/investing.mjs';
import { tools } from '../content/tools.mjs';
import { cases } from '../content/cases.mjs';
import { workbookLinks, contributionUrl } from '../content/journey.mjs';

const html = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[char]);
const link = (label, url) => `<a href="${html(url)}">${html(label)}</a>`;
const links = sources => sources?.length ? `<ul class="source-links">${sources.map(({label,url})=>`<li>${link(label,url)}</li>`).join('')}</ul>` : '';
const paragraphs = value => (Array.isArray(value) ? value : String(value ?? '').split(/\n\n+/)).filter(Boolean).map(p=>`<p>${html(p)}</p>`).join('');
const toolkit = Object.fromEntries(tools.map(tool=>[tool.id,tool]));
const articles = [...lessons,...investing];
const currencies = ['USD','GBP','NGN','CAD','EUR','GHS','SEK'];
const currencySelect = (label = 'Currency', current = 'USD', id = 'currency') => `<label>${label}<select name="${id}">${currencies.map(currency=>`<option${currency === current ? ' selected' : ''}>${currency}</option>`).join('')}</select></label>`;

function fields(list, scope) {
  const controls = list.map(([id,label,value,min,max,step='any',hint]) => `<div class="field">
    <label for="${scope}-field-${id}">${html(label)}</label>
    <input type="number" id="${scope}-field-${id}" name="${id}" value="${value}" min="${min}" max="${max}" step="${step}"${id === 'gross' ? '' : ' required'}${hint ? ` aria-describedby="${scope}-hint-${id}"` : ''}>
    ${hint ? `<button type="button" class="metric-help field-help" aria-expanded="false" aria-controls="${scope}-hint-${id}" aria-describedby="${scope}-hint-${id}" aria-label="Explain ${html(label)}">?</button>
    <small id="${scope}-hint-${id}" class="metric-description" hidden>${html(hint)}</small>` : ''}
  </div>`);
  return `<div class="field-grid">${controls.join('')}</div>`;
}

const monthlyClose = `<section class="monthly-close" id="workbook-downloads" aria-label="Example workbooks">
  <h3>Plan it, then track it</h3>
  <div class="pair">${workbookLinks.map(([title,description,url])=>`<div><h4>${html(title)}</h4><p>${html(description)}</p>${link('View example workbook ↗',url)}</div>`).join('')}</div>
</section>`;
const budgetExample = `<div class="example"><strong>Close the month with the Queens analyst</strong>
  <p>The analyst took home $5,900. Essentials ran $70 over plan and flexible spending ran $160 over, including a $35 renewal. Keeping the planned savings left a $230 shortfall. Use those numbers below, then compare the budget plan and tracker to decide what to change next month.</p>
</div>`;

function caseStudy(id) {
  const story = cases[id];
  return `<div class="example" id="case-${id}"><h3>${html(story.title)}</h3>${paragraphs(story.example)}
    <ol>${story.steps.map(step => `<li>${html(step)}</li>`).join('')}</ol>
    ${story.sources.length ? link('Reading and tools for this example', '#source-' + id) : ''}
  </div>`;
}

function extraReading(id) {
  const originalIds = { 'fund-basics': 'investing-foundations', 'budget-basics': 'cash-flow' };
  const article = articles.find(item => item.id === (originalIds[id] ?? id));
  if (!article) throw new Error(`Missing guide: ${id}`);
  const repeatedTopics = {
    'cash-flow': ['One month in the Queens analyst’s budget'],
    protection: ['Compare health plans at three levels of use', 'An HSA and a health FSA solve different problems'],
    housing: ['Compare monthly costs, cash to close and exit equity', 'House hacking only works if you can carry the empty month'],
    'retirement-decisions': ['Traditional and Roth on the same pay budget'],
    'bonds-and-currency': ['Work backward from the goal currency'],
  };
  return `<details class="disclosure" id="learn-${html(id)}"><summary><strong>${html(article.title)}</strong></summary>
    <div class="detail-body lesson-body">${article.sections.filter(section => !repeatedTopics[article.id]?.includes(section.title)).map(section => `<section><h3>${html(section.title)}</h3>${paragraphs(section.body)}
      ${section.example ? `<div class="example"><strong>Worked example</strong>${paragraphs(section.example)}</div>` : ''}
      ${section.action ? `<div class="action"><strong>Try this</strong>${paragraphs(section.action)}</div>` : ''}
    </section>`).join('')}</div>
  </details>`;
}

function calculator(tool) {
  const guide = { housing:'housing', insurance:'protection', wrappers:'retirement-decisions', fx:'bonds-and-currency' }[tool.id];
  return `<details id="${tool.id}" class="disclosure calculator"><summary><span><strong>${html(tool.title)}</strong><small>${html(tool.summary)}</small></span></summary>
    <div class="detail-body">
      ${cases[tool.id] ? caseStudy(tool.id) : tool.id === 'budget' ? budgetExample : `<p class="example">${html(tool.example)}</p>`}
      <form data-tool="${tool.id}" autocomplete="off" inert>
        ${tool.id === 'wrappers' || tool.id === 'insurance' ? '' : `<div class="currency-row">${tool.id === 'fx' ? currencySelect('Money you invest in','NGN','localCurrency') + currencySelect('Money you’ll spend') : currencySelect()}</div>`}
        ${fields(tool.fields, tool.id)}
        ${tool.planFields ? `<div class="pair health-plans">${tool.planFields.map(([name,inputs]) => `<fieldset><legend>${html(name)}</legend>${fields(inputs, tool.id)}</fieldset>`).join('')}</div>` : ''}
        ${tool.advancedFields ? `<p class="note" data-quick-note>${html(tool.quickNote)}</p>
        <details class="advanced" data-advanced><summary>${tool.id === 'goal' ? 'Fine-tune the estimate' : 'Add more details'}</summary>
          <fieldset disabled aria-label="Advanced assumptions">${fields(tool.advancedFields, tool.id)}</fieldset>
        </details>` : ''}
        <p class="note">${html(tool.note)}</p>
        <div class="form-actions"><button class="button" type="submit">Calculate</button><button class="button secondary" type="reset">Reset example</button></div>
        <div class="result" role="status" aria-live="polite" hidden></div>
      </form>
      ${tool.id === 'budget' ? monthlyClose : ''}
      ${guide ? extraReading(guide) : ''}
    </div>
  </details>`;
}

function decision(id, guides = []) {
  const title = cases[id].choice;
  return `<details class="disclosure" id="${id}"><summary><strong>${html(title)}</strong></summary>
    <div class="detail-body">${caseStudy(id)}${guides.map(extraReading).join('')}</div></details>`;
}

function playbook(code, country) {
  const [action,label,url] = localStarts[code];
  return `<details id="country-${code}" class="disclosure"><summary><span><strong>${html(country.name)}</strong><small>${html(country.currency)}</small></span></summary><div class="detail-body">
    ${paragraphs(country.summary)}
    <div class="example"><strong>One thing to do this week</strong>${paragraphs(action)}${link(label,url)}</div>
    <h3>What to check first</h3><ol>${country.actions.map(a=>`<li>${html(a)}</li>`).join('')}</ol>
    <div class="example"><strong>Worked example</strong>${paragraphs(country.example)}</div>
    <h3>Before you act</h3><ul>${country.checks.map(a=>`<li>${html(a)}</li>`).join('')}</ul>
    <details class="advanced"><summary>Local rules and sources</summary>
      <ul class="rules">${country.rules.map(rule=>`<li><strong>${html(rule.label)}</strong> <span>${html(rule.value)}</span> <small>${html(rule.period)} · ${link('Primary source',rule.url)}</small></li>`).join('')}</ul>
      ${links(country.sources)}
    </details>
  </div></details>`;
}

const caseSources = new Set(Object.values(cases).flatMap(story => story.sources.map(item => item.url)));
const generalSources = [...new Map(articles.flatMap(a=>a.sections.flatMap(s=>s.sources ?? []))
  .filter(item => !caseSources.has(item.url)).map(item => [item.url,item])).values()].sort((a,b)=>a.label.localeCompare(b.label));
const sources = Object.entries(cases).map(([id,story]) => `<details class="disclosure" id="source-${id}"><summary><strong>${html(story.choice)}</strong></summary><div class="detail-body">${links(story.sources)}</div></details>`).join('')
  + `<details class="disclosure"><summary><strong>Other references</strong></summary><div class="detail-body">${links(generalSources)}</div></details>`;
const blocks = {
  START_CASES: `<div class="chips starting-points">${Object.entries(cases).map(([id,story]) => `<a class="chip" href="#${id}">${html(story.choice)} <span aria-hidden="true">↗</span></a>`).join('')}</div>`,
  GOAL: calculator(toolkit.goal),
  BUDGET: calculator(toolkit.budget),
  PLAN_CURRENCY: `<div class="currency-row">${currencySelect()}</div>`,
  DECISIONS: [
    calculator(toolkit.housing), decision('learn-investing-foundations', ['fund-basics']), calculator(toolkit.debt),
    decision('learn-cash-flow', ['budget-basics','career','spending']), decision('alternatives'),
    calculator(toolkit.insurance), calculator(toolkit.fx), calculator(toolkit.wrappers),
  ].join('\n'),
  COUNTRIES: Object.entries(countries).map(([code,country])=>playbook(code,country)).join('\n'),
  COUNTRY_LINKS: Object.entries(countries).map(([code,country])=>`<a class="chip" href="#country-${code}">${html(country.name)}</a>`).join(''),
  SOURCES: sources,
  CONTRIBUTE: html(contributionUrl),
};

const template = await readFile(new URL('../site.html',import.meta.url),'utf8');
const output = template.replace(/<!-- INSERT: ([A-Z_]+) -->/g, (_,key)=>{
  if (!(key in blocks)) throw new Error(`Unknown template slot: ${key}`);
  return blocks[key];
});
await writeFile(new URL('../index.html',import.meta.url),'<!-- Generated from site.html and content/ by scripts/build.mjs. -->\n'+output);
