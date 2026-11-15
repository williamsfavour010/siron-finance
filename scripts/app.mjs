import { goalPlan, moneyMap, monthlyPlan, wrappers, fx, housing, homePriceAtMonthlyBudget, insurance, healthSwitchPoints, debtComparison } from './math.mjs?v=practical';
import { resultHelp } from '../content/result-help.mjs?v=practical';

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
  wireHelp(row, button, description);
}

function wireHelp(row, button, description) {
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
  const hoverTarget = button.classList.contains('field-help') ? button : row;
  hoverTarget.addEventListener('pointerenter', event => {
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
  if (activeHelp && !activeHelp.button.closest('.metric, .field').contains(event.target)) closeHelp();
});

for (const button of document.querySelectorAll('.field-help')) {
  wireHelp(button.closest('.field'), button, document.getElementById(button.getAttribute('aria-controls')));
}

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
  result.replaceChildren();
  result.hidden = true;
}

// A number input is validated by the browser first. This second check prevents
// a missing, infinite or out-of-range value from reaching a financial model.
function readInputs(form) {
  const data = Object.fromEntries(new FormData(form));
  for (const field of form.querySelectorAll('input[type=number]')) {
    if (field.matches(':disabled')) {
      data[field.name] = Number(field.defaultValue);
      continue;
    }
    if (!field.validity.valid) throw new Error('Check the highlighted input.');
    const value = field.value === '' && !field.required ? 0 : field.valueAsNumber;
    if (!Number.isFinite(value)) throw new Error('Enter a finite number in each required field.');
    data[field.name] = value;
  }
  return data;
}

const formatMonths = months => months === null ? 'Beyond comparison period' : months === 0 ? 'Already paid' : `${months} months`;
const formatGap = (gap, money) => Math.abs(gap) < .005 ? 'On target in this model' : gap > 0 ? `${money(gap)} short` : `${money(Math.abs(gap))} ahead`;
const planForm = document.querySelector('#next-form');

function copyToPlan(currency, values, label) {
  const button = node('button', label);
  button.type = 'button';
  button.className = 'button secondary';
  button.addEventListener('click', () => {
    const disclosure = planForm.closest('details');
    disclosure.open = true;
    const note = document.getElementById('plan-input-note');
    const unit = planForm.elements.currency;
    const untouched = !planForm.dataset.copied && unit.value === unit.options[0].value
      && Array.from(planForm.querySelectorAll('input')).every(input => input.value === input.defaultValue);
    if (untouched) unit.value = currency;
    if (unit.value === currency) {
      for (const [name, value] of Object.entries(values)) planForm.elements[name].value = value;
      planForm.dataset.copied = 'true';
      note.textContent = `Copied your ${currency} amounts. Review the remaining inputs before making a plan.`;
    } else {
      note.textContent = `Your plan uses ${unit.value}. Convert your ${currency} amounts first, or choose the same currency for the whole plan.`;
    }
    hideResult(planForm);
    disclosure.querySelector('summary').focus();
    disclosure.scrollIntoView();
  });
  return button;
}

function comparisonTable(columnLabels, rows) {
  const table = node('table');
  const header = table.createTHead().insertRow();
  for (const label of columnLabels) {
    const cell = node('th', label);
    cell.scope = 'col';
    header.append(cell);
  }
  const body = table.createTBody();
  for (const [label, ...values] of rows) {
    const row = body.insertRow();
    const heading = node('th', label);
    heading.scope = 'row';
    row.append(heading,...values.map(value => node('td', value)));
  }
  const wrapper = node('div');
  wrapper.className = 'comparison-table';
  wrapper.append(table);
  return wrapper;
}

const calculate = {
  goal(v, money) {
    v.years = v.stopAge - v.age;
    if (v.years < 1) throw new Error('Choose an age for work to become optional that is later than your current age.');
    if (v.endAge <= v.stopAge) throw new Error('Choose a later age for how long you want your money to last.');
    const base = goalPlan(v);
    const lowerRate = v.returnRate - 2;
    const higherRate = v.returnRate + 2;
    const lower = goalPlan({ ...v, returnRate: lowerRate });
    const upper = goalPlan({ ...v, returnRate: higherRate });
    const annualReturn = rate => percent(rate / 100);
    return [
      metrics([['Target balance', money(base.target)], ['Projected balance', money(base.projected)], ['Monthly contribution needed', money(base.required)], ['Gap to target', formatGap(base.gap, money)], ['Net annual return after inflation', percent(base.realReturn)], ['Years of spending modeled', base.drawYears]]),
      paragraph(`Assumed annual investment return before fees and inflation is ${annualReturn(v.returnRate)}. At ${annualReturn(lowerRate)} a year, you’d need to save ${money(lower.required)} per month. At ${annualReturn(higherRate)} a year, you’d need ${money(upper.required)} per month.`),
      paragraph('These scenarios assume steady returns. Bad years early in retirement can change how long your money lasts.'),
      anchor('Check your monthly contribution against actual spending →', 'budget'),
      copyToPlan(v.currency, { target: base.required, already: v.monthly }, 'Use this savings target in my plan'),
    ];
  },
  budget(v, money) {
    const r = moneyMap(v);
    return [
      metrics([['Cash left this month', money(r.remainder)], ['Emergency cover', r.cover === null ? 'Add essential spending' : `${r.cover.toFixed(1)} months`], ['Net worth', money(r.netWorth)], ['Saving / take-home pay', percent(r.netRate)], ['Saving / gross cash pay', percent(r.grossRate)]]),
      paragraph(r.remainder < 0 ? 'This month needs a change. Check for a one-off expense, a missed bill category, or a contribution you can temporarily adjust.' : 'Check whether this remainder has a job. An upcoming bill, a reserve or a dated goal can each make sense.'),
      anchor('Work through the example monthly close →', 'workbook-downloads'),
      copyToPlan(v.currency, { left: r.remainder }, 'Use this monthly balance in my plan'),
    ];
  },
  wrappers(v, money) {
    if (v.currency !== 'USD') throw new Error('Use USD for the US Traditional and Roth example.');
    const r = wrappers(v);
    return [metrics([['Traditional after withdrawal tax', money(r.traditional)], ['Roth after a qualified withdrawal', money(r.roth)]]),
      paragraph(Math.abs(r.traditional-r.roth)<.005 ? 'Same tax rates, same result in this model.' : 'Try moving the withdrawal tax rate toward the current rate. That is the point at which the model’s advantage disappears.'),
      anchor('Review the US retirement rules →', 'country-us')];
  },
  fx(v, money) {
    if (v.currency === v.localCurrency) throw new Error('Choose two different currencies for this comparison.');
    const r = fx({ ...v, entry: 1 / v.entry, exit: 1 / v.exit, stress: 1 / v.stress });
    const rows = [['What you put in, converted', money(r.initial)], ['What you get back, converted', money(r.goalProceeds)], ['Gain or loss in the money you’ll spend', percent(r.goalReturn)], ['Gain or loss before conversion', percent((v.proceeds - v.localCosts) / v.cost - 1)]];
    if (v.advanced) rows.push(['Gain or loss at the worse rate', percent(r.stressReturn)], ['Local buying power after inflation', percent(r.localReal)]);
    return [metrics(rows), paragraph(`You entered ${v.localCurrency} per 1 ${v.currency}. Gains and losses cover the full time you hold the investment.`)];
  },
  housing(v, money) {
    const buy = housing({ ...v, roomRent: 0 });
    const share = housing({ ...v, roomRent: v.rooms * v.roomRent });
    const catchUp = result => result.firstBreakEven ? `Year ${result.firstBreakEven}` : 'Beyond this period';
    const occupiedRooms = v.rooms * (1 - v.vacancy / 100);
    const targetRent = cost => occupiedRooms > 0 ? money(Math.ceil(Math.max(0, cost) / occupiedRooms)) + ' per room' : 'No occupied rooms';
    const rows = [
      ['Cash needed to buy', '—', money(buy.cashToClose), money(share.cashToClose)],
      ['Monthly cost at the start', money(v.rent), money(buy.outlay), money(share.outlay)],
      ['First year at least as well off as renting', '—', catchUp(buy), catchUp(share)],
      ['Ahead or behind renting when you move', '—', formatGap(-buy.advantage,money), formatGap(-share.advantage,money)],
    ];
    if (v.advanced && v.income > 0) rows.splice(2, 0, ['Share of take-home pay', ...[v.rent,buy.outlay,share.outlay].map(cost=>percent(cost / v.income))]);
    const priceLimit = roomIncome => {
      const price = homePriceAtMonthlyBudget(v, roomIncome);
      return price === null ? 'No price limit from these monthly costs' : money(Math.floor(price));
    };
    const affordable = v.advanced ? paragraph(`With a monthly budget of ${money(v.housingBudget)}, the estimated home price ceiling is ${priceLimit(0)} without room rent and ${priceLimit(share.roomIncome)} with it. This holds the rate and fixed costs steady. Check upfront cash and lender requirements separately.`) : null;
    return [comparisonTable(['Compare','Rent','Buy','Buy + rent rooms'],rows),
      metrics([['Monthly mortgage payment',money(buy.payment)], ['Expected monthly room rent',money(share.roomIncome)], ['Rent needed to match your current rent',targetRent(buy.outlay - v.rent)], ['Rent needed to cover the whole monthly cost',targetRent(buy.outlay)]]),
      ...(affordable ? [affordable] : []),
      paragraph('Buying can build equity but ties up cash. Room rent can lower the bill, and you still owe the full amount when rooms are empty. Try less room rent, zero home price growth, or a shorter stay.')];
  },
  insurance(v, money) {
    const plan = prefix => Object.fromEntries(['premium','deductible','coinsurance','maximum','copays','uncovered'].map(k=>[k,v[prefix+k[0].toUpperCase()+k.slice(1)]]));
    const a = plan('a'), b = plan('b');
    if (a.maximum < a.deductible || b.maximum < b.deductible) throw new Error('The out-of-pocket maximum must cover at least the deductible in this simplified model.');
    const plans = [a,b];
    const switches = healthSwitchPoints(a,b);
    const costs = plans.map(plan => insurance(plan,v.claims).cost);
    const diff = costs[0] - costs[1];
    return [comparisonTable(['Yearly cost','Plan A','Plan B'],[
      ['No care costs · plan payments only', ...plans.map(plan=>money(12 * plan.premium))],
      ['Your estimated year', ...costs.map(money)],
      ['Most for covered care + plan payments', ...plans.map(plan=>money(insurance(plan,0).coveredCeiling))],
    ]), paragraph(Math.abs(diff) < .005 ? 'Both plans cost the same at the level of care you entered.' : `Plan ${diff < 0 ? 'A' : 'B'} costs about ${money(Math.abs(diff))} less at that level of care.`),
    paragraph(switches.length ? `The lower-cost plan changes around ${switches.map(money).join(' and ')} in covered bills, with the other costs you entered held constant.` : 'The lower-cost plan does not switch in this model as covered bills rise. Check network access and uncovered costs before choosing.')];
  },
  debt(v, money) {
    const r = debtComparison(v);
    return [metrics([['Interest saved by paying extra', money(r.invest.interest-r.prepay.interest)], ['Time to pay off the loan with extra payments', formatMonths(r.prepay.paidAt)], ['Time to pay off the loan on schedule', formatMonths(r.invest.paidAt)], ['What you’d have after debt if you pay extra', money(r.prepay.net)], ['What you’d have after debt if you invest', money(r.invest.net)], ['Cash you’d still have on hand', money(r.cashLeft)]]),
      paragraph(r.belowFloor ? 'Either use of the lump sum would take accessible cash below your reserve floor. Compare a smaller amount or waiting.' : 'Try a low or negative investment return. The repayment schedule stays fixed here while the investment outcome changes.')];
  },
};

for (const form of document.querySelectorAll('form[data-tool]')) {
  form.addEventListener('submit', event => {
    event.preventDefault();
    try {
      const v = readInputs(form);
      v.currency ??= 'USD';
      v.advanced = form.querySelector('[data-advanced]')?.open ?? false;
      render(form, ...calculate[form.dataset.tool](v, value => amount(value,v.currency)));
    } catch (error) {
      const message = paragraph(error.message);
      message.className = 'error';
      render(form, message);
    }
  });
}

planForm.addEventListener('submit', event => {
  event.preventDefault();
  const v = readInputs(planForm);
  const money = value => amount(value,v.currency);
  const r = monthlyPlan(v.target,v.already,v.left);
  const nextSteps = {
    cash: ['Pick a first cash cushion, such as one month of must-pay bills. Decide how much to move after each payday.', 'See how Amara builds a cushion', 'learn-cash-flow'],
    debt: ['Gather the balances and rates. Compare paying extra on the highest-rate loan with keeping cash for an upcoming bill.', 'Work through Andy’s loan', 'debt'],
    match: ['Ask what your employer matches, how much you need to contribute, and when the match becomes yours.', 'Compare your first investing steps', 'learn-investing-foundations'],
    goal: ['Pick a date. Keep money you’ll need soon accessible. For longer goals, compare an amount you can invest automatically.', 'Start with Maya’s investing plan', 'learn-investing-foundations'],
  };
  const [action,label,id] = nextSteps[v.priority];
  const cashMessage = v.left < 0
    ? 'Start by covering this month’s shortfall. Check bills, timing, and savings contributions you could temporarily adjust.'
    : r.shortfall > 0
      ? 'Your budget cannot cover the full gap yet. Pick one bill to reduce or one way to raise income, or try a later goal date.'
      : r.gap > 0 ? 'Your budget can cover the gap. Try setting a transfer for just after payday.' : 'Your current monthly savings meet the target you entered.';
  render(planForm, metrics([['Extra you’d need to save each month',money(r.gap)], ['What your budget could spare for the goal',money(r.canAdd)], ['Monthly gap still to close',money(r.shortfall)]]),
    paragraph(cashMessage), paragraph(action), anchor(label,id));
});

const forms = document.querySelectorAll('form');
for (const form of forms) {
  const advanced = form.querySelector('[data-advanced]');
  const assumptions = advanced?.querySelector('fieldset');
  const quickNote = form.querySelector('[data-quick-note]');
  advanced?.addEventListener('toggle', () => {
    assumptions.disabled = !advanced.open;
    quickNote.hidden = advanced.open;
    if (!advanced.open && activeHelp && advanced.contains(activeHelp.button)) closeHelp();
    hideResult(form);
  });
  form.addEventListener('reset', () => {
    if (advanced) {
      advanced.open = false;
      assumptions.disabled = true;
      quickNote.hidden = false;
    }
    hideResult(form);
    if (form === planForm) {
      delete planForm.dataset.copied;
      document.getElementById('plan-input-note').textContent = 'Use the same currency for all three amounts. From the calculators above, you can copy your results into this plan.';
    }
    if (activeHelp && form.contains(activeHelp.button)) closeHelp();
  });
  form.addEventListener('input', () => hideResult(form));
  form.inert = false;
}

// Clear browser-restored form values when someone returns to a cached page.
window.addEventListener('pagehide', () => forms.forEach(form => form.reset()));
window.addEventListener('pageshow', () => forms.forEach(form => form.reset()));

const themeToggle = document.querySelector('.theme-toggle');
themeToggle.hidden = false;
themeToggle.addEventListener('click', () => {
  const light = document.documentElement.dataset.theme !== 'light';
  document.documentElement.dataset.theme = light ? 'light' : 'dark';
  themeToggle.setAttribute('aria-pressed', String(light));
  themeToggle.querySelector('span').textContent = light ? '☾' : '☀';
  document.querySelector('meta[name=theme-color]').content = light ? '#f5f2e8' : '#0b110f';
});

// A link to an expandable section opens it, including when shared directly.
function openFragment(fragment) {
  const id = fragment.slice(1);
  const oldSections = { saving:'learn-cash-flow', investing:'learn-investing-foundations', earning:'learn-career', giving:'learn-spending', diaspora:'fx', learn:'tools', compound:'goal' };
  const target = document.getElementById(oldSections[id] ?? id);
  if (!target) return;
  for (let disclosure = target.closest('details'); disclosure; disclosure = disclosure.parentElement.closest('details')) {
    disclosure.open = true;
  }
  if (oldSections[id]) target.scrollIntoView();
}
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (link) openFragment(link.hash);
});
window.addEventListener('hashchange', () => openFragment(location.hash));
openFragment(location.hash);

// The active link follows the section that has reached the sticky navigation.
const masthead = document.querySelector('.masthead');
const navigation = [...masthead.querySelectorAll('nav a')].map(link => ({
  link,
  section: document.getElementById(link.hash.slice(1)),
}));
let activeNav;
function updateNavigation() {
  const boundary = masthead.getBoundingClientRect().bottom + 48;
  const current = navigation.findLast(({ section }) => section.getBoundingClientRect().top <= boundary) ?? navigation[0];
  if (current === activeNav) return;
  activeNav?.link.removeAttribute('aria-current');
  current.link.setAttribute('aria-current', 'location');
  activeNav = current;
}
window.addEventListener('scroll', updateNavigation, { passive: true });
window.addEventListener('resize', updateNavigation);
updateNavigation();
