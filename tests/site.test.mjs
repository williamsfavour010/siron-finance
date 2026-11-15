import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { debtComparison, futureValue, fx, goalPlan, healthSwitchPoints, homePriceAtMonthlyBudget, housing, insurance, moneyMap, monthlyPlan, presentValue, wrappers } from '../scripts/math.mjs';
import { countries } from '../content/countries.mjs';
import { tools } from '../content/tools.mjs';

const close = (actual, expected, tolerance = .01) => assert.ok(Math.abs(actual - expected) < tolerance, `${actual} should be close to ${expected}`);

test('zero-rate growth and withdrawals', () => {
  close(futureValue(1000, 100, 0, 12), 2200);
  close(presentValue(1200, 0, 10), 12000);
  const input = { age:30, years:10, endAge:50, spending:12000, tax:0, otherIncome:0, phaseCost:1000, phaseYears:2, start:2000, monthly:1000, returnRate:0, fee:0, inflation:0 };
  const result = goalPlan(input);
  close(result.target, 122000);
  close(result.projected, 122000);
  close(result.required, 1000);
  assert.throws(() => goalPlan({ ...input, endAge:40 }));
  assert.throws(() => goalPlan({ ...input, phaseYears:11 }));
  close(goalPlan({ ...input, start:130000 }).required, 0);
});

test('Queens month reconciles to a 230 shortfall', () => {
  const result = moneyMap({ net:5900, gross:8750, essentials:3220, debt:250, flex:1010, sinking:450, saving:1200, reserve:6940, assets:20000, liabilities:5800 });
  close(result.remainder, -230);
  close(result.cover, 2);
  close(result.netWorth, 14200);
});

test('Traditional and Roth are equivalent at the same tax rate', () => {
  const equal = wrappers({ amount:10000, now:22, later:22, rate:7, years:30 });
  close(equal.traditional, equal.roth);
});

test('monthly plan only assigns cash that is available', () => {
  assert.deepEqual(monthlyPlan(300,100,50), { gap:200, canAdd:50, shortfall:150 });
  assert.deepEqual(monthlyPlan(300,100,-50), { gap:200, canAdd:0, shortfall:200 });
  assert.deepEqual(monthlyPlan(300,350,50), { gap:0, canAdd:0, shortfall:0 });
});

test('currency depreciation can reverse local gains', () => {
  const result = fx({ cost:1000000, proceeds:1200000, localCosts:0, days:365, inflation:20, entry:.00065, exit:.0004875, stress:.00039, sendFee:0, exitFee:0 });
  close(result.annualLocal, .20);
  close(result.localReal, 0);
  close(result.goalReturn, -.10);
  close(result.stressReturn, -.28);
});

test('mortgage payments stop at term and 100% cash purchase has zero payment', () => {
  const input = { rent:0, price:120000, down:0, apr:0, term:1, years:3, closing:0, saleFee:0, tax:0, insurance:0, hoa:0, maintenance:0, roomRent:0, vacancy:0, rentGrowth:0, appreciation:0, alternative:0 };
  const result = housing(input);
  close(result.payment, 10000);
  close(result.equity, 120000);
  close(result.renterPortfolio, 120000);
  close(housing({ ...input, down:100 }).payment, 0);
  close(homePriceAtMonthlyBudget({ ...input, housingBudget:1000 },500), 18000);
});

test('insurance counts premiums and uncovered expenses outside the covered limit', () => {
  const plan = { premium:100, deductible:500, coinsurance:20, maximum:1000, copays:0, uncovered:200 };
  assert.deepEqual(insurance(plan, 10000), { cost:2400, coveredCeiling:2200 });
  close(insurance(plan, 750).cost, 1950);
});

test('health comparison finds the bill amount where the cheaper plan changes', () => {
  const a = { premium:140, deductible:2500, coinsurance:20, maximum:6500, copays:0, uncovered:0 };
  const b = { premium:260, deductible:750, coinsurance:15, maximum:3800, copays:0, uncovered:0 };
  const [crossing] = healthSwitchPoints(a,b);
  close(crossing, 2444.12);
  close(insurance(a,crossing).cost, insurance(b,crossing).cost);
  assert.deepEqual(healthSwitchPoints(a,a), []);
});

test('debt follows the repayment schedule and flags a cash floor breach', () => {
  const input = { balance:1200, apr:0, payment:100, lump:600, cash:1500, floor:1000, invest:0, years:2 };
  const result = debtComparison(input);
  assert.equal(result.prepay.paidAt, 6);
  assert.equal(result.invest.paidAt, 12);
  assert.equal(result.belowFloor, true);
  close(result.invest.net, result.prepay.net);
  assert.equal(debtComparison({ ...input, extra:100 }).prepay.paidAt, 3);
  assert.throws(() => debtComparison({ ...input, apr:100, payment:90 }));
});

test('generated site retains all public anchors and links each country rule', async () => {
  const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const ids = [...page.matchAll(/ id="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, id] of page.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), `Missing fragment: ${id}`);
  for (const id of ['start','checkup','budget','goal','next-dollar','countries','housing','debt','insurance','fx','wrappers','tools','contribute','about','workbook-downloads']) assert.ok(ids.includes(id));
  for (const tool of tools) {
    const fields = [...tool.fields, ...(tool.advancedFields ?? []), ...(tool.planFields ?? []).flatMap(([, fields]) => fields)];
    for (const [id,,,,,step='any',hint] of fields) {
      assert.ok(step === 'any' || Number(step) > 0, `Invalid step for ${tool.id}/${id}`);
      if (hint) assert.ok(ids.includes(`${tool.id}-hint-${id}`), `Missing field help for ${tool.id}/${id}`);
    }
  }
  for (const country of Object.values(countries)) {
    assert.ok(country.sources.length && country.rules.length);
    for (const rule of country.rules) assert.ok(rule.label && rule.value && rule.period && rule.url.startsWith('https://'));
  }
  assert.doesNotMatch(page, /INSERT:|@gmail\.com|@icloud\.com/);
});
