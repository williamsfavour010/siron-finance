import { goalPlan, moneyMap, compound, wrappers, fx, housing, insurance, debtComparison } from './math.mjs';
import { resultHelp } from '../content/result-help.mjs';

// Rendering helpers create text nodes, including for values entered by visitors.
const node = (tag, text) => Object.assign(document.createElement(tag), { textContent: text });
const paragraph = text => node('p', text);
const percent = value => value === null ? '—' : new Intl.NumberFormat('en', { style: 'percent', maximumFractionDigits: 2 }).format(value);
const amount = (value, currency) => new Intl.NumberFormat('en', { style: 'currency', currency, currencyDisplay: 'code', maximumFractionDigits: 0 }).format(value);

let nextHelpId = 0;
let activeHelp;

function closeHelp() {
  if (!activeHelp) return;
  const { button, description } = activeHelp;
  button.setAttribute('aria-expanded', 'false');
  description.hidden = true;
  activeHelp = undefined;
}

function addResultHelp(row, term, detail, label) {
  const button = node('button', '?');
  button.type = 'button';
  button.className = 'metric-help';
  button.setAttribute('aria-label', 'Explain ' + label);
  button.setAttribute('aria-expanded', 'false');
  const description = node('span', resultHelp[label]);
  description.className = 'metric-description';
  description.id = `metric-description-${++nextHelpId}`;
  description.hidden = true;
  button.setAttribute('aria-controls', description.id);
  button.setAttribute('aria-describedby', description.id);
  term.append(button);
  detail.append(description);

  // Hover and keyboard focus preview the explanation. Clicking pins it.
  function show(pinned = false) {
    if (activeHelp?.button === button) {
      activeHelp.pinned ||= pinned;
      return;
    }
    closeHelp();
    description.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    activeHelp = { button, description, pinned };
  }
  row.addEventListener('pointerenter', event => {
    if (event.pointerType === 'mouse' && !activeHelp?.pinned && !document.activeElement?.matches('.metric-help:focus-visible')) show();
  });
  row.addEventListener('pointerleave', () => {
    if (activeHelp?.button === button && !activeHelp.pinned && !button.matches(':focus-visible')) closeHelp();
  });
  button.addEventListener('focus', () => {
    if (button.matches(':focus-visible')) show();
  });
  button.addEventListener('blur', () => {
    if (activeHelp?.button === button) closeHelp();
  });
  button.addEventListener('click', () => {
    if (activeHelp?.button === button && activeHelp.pinned) closeHelp();
    else show(true);
  });
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && activeHelp) {
    event.preventDefault();
    closeHelp();
  }
});
document.addEventListener('click', event => {
  if (activeHelp && !activeHelp.button.closest('.metric').contains(event.target)) closeHelp();
});

function metrics(rows) {
  const list = document.createElement('dl');
  for (const [label, value] of rows) {
    const row = document.createElement('div');
    row.className = 'metric';
    const term = node('dt', label);
    const detail = node('dd', value);
    row.append(term, detail);
    if (resultHelp[label]) addResultHelp(row, term, detail, label);
    list.append(row);
  }
  return list;
}

function anchor(label, id) {
  const a = node('a', label);
  a.href = '#' + id;
  return a;
}

function render(form, ...children) {
  const result = form.querySelector('.result');
  if (activeHelp && result.contains(activeHelp.button)) closeHelp();
  result.replaceChildren(...children);
  result.hidden = false;
}

function hideResult(form) {
  const result = form.querySelector('.result');
  if (activeHelp && result.contains(activeHelp.button)) closeHelp();
  result.hidden = true;
}

// A number input is validated by the browser first. This second check prevents
// a missing, infinite or out-of-range value from reaching a financial model.
function readInputs(form) {
  const data = Object.fromEntries(new FormData(form));
  for (const field of form.querySelectorAll('input[type=number]')) {
    if (!field.validity.valid) throw new Error('Check the highlighted input.');
    const value = field.value === '' && !field.required ? 0 : field.valueAsNumber;
    if (!Number.isFinite(value)) throw new Error('Enter a finite number in each required field.');
    data[field.name] = value;
  }
  return data;
}

const formatMonths = months => months === null ? 'Beyond comparison period' : months === 0 ? 'Already paid' : `${months} months`;
const formatGap = (gap, money) => Math.abs(gap) < .005 ? 'On target in this model' : gap > 0 ? `${money(gap)} short` : `${money(Math.abs(gap))} ahead`;

const calculate = {
  goal(v, money) {
    const base = goalPlan(v);
    const lower = goalPlan({ ...v, returnRate: v.returnRate - 2 });
    const upper = goalPlan({ ...v, returnRate: v.returnRate + 2 });
    return [
      metrics([['Target balance', money(base.target)], ['Projected balance', money(base.projected)], ['Monthly contribution needed', money(base.required)], ['Gap to target', formatGap(base.gap, money)], ['Net annual return after inflation', percent(base.realReturn)], ['Years of spending modeled', base.drawYears]]),
      paragraph(`Monthly contribution under the lower return: ${money(lower.required)}. Under the higher return: ${money(upper.required)}. A steady return also hides the risk of bad years early in retirement.`),
      anchor('Check your monthly contribution against actual spending →', 'budget'),
    ];
  },
  budget(v, money) {
    const r = moneyMap(v);
    return [
      metrics([['Cash left this month', money(r.remainder)], ['Emergency cover', r.cover === null ? 'Add essential spending' : `${r.cover.toFixed(1)} months`], ['Net worth', money(r.netWorth)], ['Saving / take-home pay', percent(r.netRate)], ['Saving / gross cash pay', percent(r.grossRate)]]),
      paragraph(r.remainder < 0 ? 'This month needs a change. Check for a one-off expense, a missed bill category, or a contribution you can temporarily adjust.' : 'Check whether this remainder has a job. An upcoming bill, a reserve or a dated goal can each make sense.'),
      anchor('Work through the example monthly close →', 'workbook-downloads'),
    ];
  },
  compound(v, money) {
    const r = compound(v);
    return [metrics([['Projected future balance', money(r.total)], ['Total put in', money(r.contributed)], ['Growth after fee', money(r.total-r.contributed)], ['In today’s money', money(r.real)], ['Gap to target', formatGap(v.target - r.real, money)]])];
  },
  wrappers(v, money) {
    if (v.currency !== 'USD') throw new Error('Use USD for the US Traditional and Roth example.');
    const r = wrappers(v);
    return [metrics([['Traditional after withdrawal tax', money(r.traditional)], ['Roth after a qualified withdrawal', money(r.roth)]]),
      paragraph(Math.abs(r.traditional-r.roth)<.005 ? 'Same tax rates, same result in this model.' : 'Try moving the withdrawal tax rate toward the current rate. That is the point at which the model’s advantage disappears.'),
      anchor('Review the US retirement rules →', 'country-us')];
  },
  fx(v, money) {
    const r = fx(v);
    return [metrics([['Entry cost in goal currency', money(r.initial)], ['Exit proceeds in goal currency', money(r.goalProceeds)], ['Goal-currency return', percent(r.goalReturn)], ['Stress exit return', percent(r.stressReturn)], ['Annualized local return after costs', percent(r.annualLocal)], ['Local real holding-period return', percent(r.localReal)]]),
      paragraph(`Quotes were entered as ${v.currency} per ${v.localCurrency}. The goal-currency returns are for the full holding period.`)];
  },
  housing(v, money) {
    const r = housing(v);
    return [metrics([['Cash to close', money(r.cashToClose)], ['Monthly principal and interest', money(r.payment)], ['Starting owner outlay after room rent', money(r.outlay)], ['Owner equity at sale, after selling costs', money(r.equity)], ['Renter investment balance at exit', money(r.renterPortfolio)], ['Owner investment balance at exit', money(r.ownerPortfolio)], ['Owner minus renter wealth at exit', money(r.advantage)], ['First year owner catches up', r.firstBreakEven ?? 'Beyond comparison period']]),
      paragraph('Try setting room vacancy to 100%, home price growth to zero, or selling earlier. If one change reverses the result, that assumption deserves more attention.')];
  },
  insurance(v, money) {
    if (v.low > v.medium || v.medium > v.high) throw new Error('Enter claims in order from low to high.');
    const plan = prefix => Object.fromEntries(['premium','deductible','coinsurance','maximum','copays','uncovered'].map(k=>[k,v[prefix+k[0].toUpperCase()+k.slice(1)]]));
    const a = plan('a'), b = plan('b');
    if (a.maximum < a.deductible || b.maximum < b.deductible) throw new Error('The out-of-pocket maximum must cover at least the deductible in this simplified model.');
    return [metrics([
      ...['low','medium','high'].flatMap(use=>[['Plan A · '+use+' use', money(insurance(a,v[use]).cost)],['Plan B · '+use+' use', money(insurance(b,v[use]).cost)]]),
      ['A · Premium plus covered ceiling', money(insurance(a,0).coveredCeiling)], ['B · Premium plus covered ceiling', money(insurance(b,0).coveredCeiling)],
    ]), paragraph('Check doctors, hospitals, medications and exclusions separately. The model cannot tell whether a specific claim will be covered.')];
  },
  debt(v, money) {
    const r = debtComparison(v);
    return [metrics([['Modeled interest avoided by prepaying', money(r.invest.interest-r.prepay.interest)], ['Payoff with prepayment', formatMonths(r.prepay.paidAt)], ['Payoff without prepayment', formatMonths(r.invest.paidAt)], ['Prepay path net position', money(r.prepay.net)], ['Invest path net position', money(r.invest.net)], ['Accessible cash after committing lump sum', money(r.cashLeft)]]),
      paragraph(r.belowFloor ? 'Either use of the lump sum would take accessible cash below your reserve floor. Compare a smaller amount or waiting.' : 'Try a low or negative investment return. The repayment schedule stays fixed here while the investment outcome changes.')];
  },
};

for (const form of document.querySelectorAll('form[data-tool]')) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    try {
      const v = readInputs(form);
      render(form, ...calculate[form.dataset.tool](v, value => amount(value,v.currency)));
    } catch (error) {
      const message = paragraph(error.message);
      message.className = 'error';
      render(form, message);
    }
  });
}

const checkup = document.querySelector('#checkup-form');
checkup.addEventListener('submit', event => {
  event.preventDefault();
  const v = Object.fromEntries(new FormData(checkup));
  const choices = new Map();
  const add = (id,label) => choices.set(id,label);
  if (v.work !== 'stable' || v.reserve === 'low' || v.reserve === 'uncertain') add('budget','Work out what an essential month costs');
  if (v.obligation === 'debt') add('debt','Compare debt payments and the cash you can keep');
  if (v.obligation === 'match') add('next-dollar','Check what your employer contributes');
  if (v.obligation === 'family') add('learn-spending','Plan for giving and family support');
  if (v.risk !== 'later') add('learn-cash-flow','Check what needs to stay accessible');
  const labels = { budget:'Track your spending', goal:'Work out your target', housing:'Compare housing options', compound:'Compare a long-term contribution', insurance:'Compare protection costs' };
  if (!choices.has(v.goal)) add(v.goal,labels[v.goal]);
  if (v.currency !== 'same' || v.tax !== 'same') add('fx','Compare the result in your goal currency');
  if (v.tax === 'same' && document.getElementById('country-'+v.live)) add('country-'+v.live,'Open the playbook for the country you selected');
  else add('countries','Check the country rules and resolve tax residence before acting');
  const list = document.createElement('ol');
  for (const [id,label] of choices) {
    const item = document.createElement('li');
    item.append(anchor(label,id));
    list.append(item);
  }
  render(checkup, paragraph('Start with the first item that you can act on this week.'), list);
});

const next = document.querySelector('#next-form');
next.addEventListener('submit', event => {
  event.preventDefault();
  const v = Object.fromEntries(new FormData(next));
  const first = v.bills === 'no' ? 'Make a plan for essentials and minimums due this month. Check dates and contact the provider early if a payment is at risk.'
    : v.buffer === 'no' ? 'Compare keeping some cash accessible with committing all of it now. One new bill can send you back to borrowing.'
    : v.debt === 'yes' && v.match === 'yes' ? 'Run both choices. Compare the borrowing cost and timing with the amount of the match, when it vests and whether you can afford to lock away the contribution.'
    : v.debt === 'yes' ? 'Compare prepaying with preserving cash. Check the APR, fees, loan protections and what the payment actually changes.'
    : v.match === 'yes' ? 'Check the match formula, vesting and what comes out of your pay. Compare the match-only contribution with what your next dated goal needs.'
    : v.debt === 'unknown' || v.match === 'unknown' ? 'Find the APR and employer match terms first. Those two numbers can change the decision.'
    : 'Give the next amount a deadline. Cash for a near-term goal and investments for a later one solve different problems.';
  render(next, paragraph(first), anchor('Compare debt or investing →','debt'));
});

const due = document.querySelector('#diligence-form');
due.addEventListener('submit', event => {
  event.preventDefault();
  const list = document.createElement('ul');
  for (const item of due.querySelectorAll('input:not(:checked)')) list.append(node('li',item.value));
  if (list.children.length) render(due, paragraph('Here is what still needs an independent answer.'), list);
  else render(due, paragraph('You have checked all six prompts. Now test a total loss, a delayed exit and the cost of walking away. Keep the written evidence and get qualified advice when the structure calls for it.'));
});

for (const form of document.querySelectorAll('form')) {
  form.addEventListener('reset', () => hideResult(form));
  form.addEventListener('input', () => hideResult(form));
}

// A link to an expandable section opens it, including when shared directly.
function openFragment(fragment) {
  const id = fragment.slice(1);
  const oldSections = { saving:'learn-cash-flow', investing:'learn-investing-foundations', earning:'learn-career', giving:'learn-spending', diaspora:'fx' };
  const target = document.getElementById(oldSections[id] ?? id);
  if (!target) return;
  const disclosure = target.closest('details') ?? (target.id === 'checkup' ? target.querySelector('details') : null);
  if (disclosure) disclosure.open = true;
  if (oldSections[id]) target.scrollIntoView();
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link) openFragment(link.hash);
});
window.addEventListener('hashchange', () => openFragment(location.hash));
openFragment(location.hash);

const search = document.querySelector('#lesson-search');
const articles = [...document.querySelectorAll('[data-article]')];
document.querySelector('#search-control').hidden = false;
search.addEventListener('input', () => {
  const tokens = search.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
  let found = 0;
  for (const article of articles) {
    const content = article.textContent.toLowerCase();
    const match = tokens.every(token => content.includes(token));
    article.hidden = !match;
    if (match) found++;
  }
  document.querySelector('#search-result').textContent = tokens.length ? `${found} matching guides` : '';
});
