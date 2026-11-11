import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { compound, debtComparison, futureValue, fx, goalPlan, housing, insurance, moneyMap, presentValue, wrappers } from '../scripts/math.mjs';
import { countries } from '../content/countries.mjs';

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

test('compound model uses an effective annual return and separates inflation', () => {
  const result = compound({ start:1000, monthly:0, match:0, years:10, rate:7, fee:0, inflation:3 });
  close(result.total, 1967.151357);
  close(result.real, 1000 * (1.07 / 1.03) ** 10);
  const equal = wrappers({ amount:10000, now:22, later:22, rate:7, years:30 });
  close(equal.traditional, equal.roth);
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
});

test('insurance counts premiums and uncovered expenses outside the covered limit', () => {
  const plan = { premium:100, deductible:500, coinsurance:20, maximum:1000, copays:0, uncovered:200 };
  assert.deepEqual(insurance(plan, 10000), { cost:2400, coveredCeiling:2200 });
  close(insurance(plan, 750).cost, 1950);
});

test('debt follows the repayment schedule and flags a cash floor breach', () => {
  const input = { balance:1200, apr:0, payment:100, lump:600, cash:1500, floor:1000, invest:0, years:2 };
  const result = debtComparison(input);
  assert.equal(result.prepay.paidAt, 6);
  assert.equal(result.invest.paidAt, 12);
  assert.equal(result.belowFloor, true);
  close(result.invest.net, result.prepay.net);
  assert.throws(() => debtComparison({ ...input, apr:100, payment:90 }));
});

test('generated site retains all public anchors and links each country rule', async () => {
  const page = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const ids = [...page.matchAll(/ id="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(ids).size, ids.length);
  for (const [, id] of page.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), `Missing fragment: ${id}`);
  for (const id of ['start','checkup','budget','saving','investing','countries','diaspora','housing','earning','giving','insurance','tools','contribute','about','workbook-downloads']) assert.ok(ids.includes(id));
  for (const country of Object.values(countries)) {
    assert.ok(country.sources.length && country.rules.length);
    for (const rule of country.rules) assert.ok(rule.label && rule.value && rule.period && rule.url.startsWith('https://'));
  }
  assert.doesNotMatch(page, /INSERT:|@gmail\.com|@icloud\.com/);
});
