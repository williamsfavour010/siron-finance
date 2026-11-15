// Financial math lives here so it can be tested independently of the website.
// Rates passed to these functions are decimals. Money stays in the chosen currency.
export const monthlyRate = annual => Math.expm1(Math.log1p(annual) / 12);

export function futureValue(principal, contribution, rate, months) {
  const growth = Math.expm1(months * Math.log1p(rate));
  return principal * (1 + growth) + contribution * (rate === 0 ? months : growth / rate);
}

export function presentValue(payment, rate, periods) {
  return rate === 0 ? payment * periods : -payment * Math.expm1(-periods * Math.log1p(rate)) / rate;
}

export function goalPlan(v) {
  const realReturn = (1 + v.returnRate / 100) * (1 - v.fee / 100) / (1 + v.inflation / 100) - 1;
  const rate = monthlyRate(realReturn);
  const months = v.years * 12;
  const drawYears = v.endAge - v.age - v.years;
  if (drawYears <= 0) throw new Error('Plan through an age later than your age at the goal date.');
  if (v.phaseYears > drawYears) throw new Error('The extra-expense period must fit inside the spending years.');
  const annualDraw = Math.max(0, v.spending + v.tax - v.otherIncome);
  const target = presentValue(annualDraw, realReturn, drawYears) + presentValue(v.phaseCost, realReturn, v.phaseYears);
  const projected = futureValue(v.start, v.monthly, rate, months);
  const required = Math.max(0, (target - futureValue(v.start, 0, rate, months)) / futureValue(0, 1, rate, months));
  return { target, projected, required, realReturn, drawYears, annualDraw, gap: target - projected };
}

export function moneyMap(v) {
  const essentials = v.essentials + v.debt;
  return {
    remainder: v.net - essentials - v.flex - v.sinking - v.saving,
    cover: essentials > 0 ? v.reserve / essentials : null,
    netWorth: v.assets - v.liabilities,
    netRate: v.net > 0 ? v.saving / v.net : null,
    grossRate: v.gross > 0 ? v.saving / v.gross : null,
  };
}

export function monthlyPlan(target, already, left) {
  const gap = Math.max(0, target - already);
  const available = Math.max(0, left);
  const canAdd = Math.min(gap, available);
  return { gap, canAdd, shortfall: gap - canAdd };
}

export function wrappers(v) {
  const growth = (1 + v.rate / 100) ** v.years;
  return { traditional: v.amount * growth * (1 - v.later / 100), roth: v.amount * (1 - v.now / 100) * growth };
}

export function insurance(plan, claims) {
  const deductible = Math.min(plan.deductible, claims);
  const coveredCost = Math.min(plan.maximum, deductible + (claims - deductible) * plan.coinsurance / 100 + plan.copays);
  return { cost: 12 * plan.premium + coveredCost + plan.uncovered, coveredCeiling: 12 * plan.premium + plan.maximum };
}

// Each plan's cost is linear between its deductible and its spending cap.
export function healthSwitchPoints(a, b) {
  const breaks = new Set([0]);
  for (const plan of [a,b]) {
    const cap = Math.max(0, plan.maximum - plan.copays);
    breaks.add(Math.min(plan.deductible, cap));
    if (plan.coinsurance > 0 && cap > plan.deductible) {
      breaks.add(plan.deductible + (cap - plan.deductible) * 100 / plan.coinsurance);
    }
  }
  const points = [...breaks].sort((x,y) => x-y);
  const difference = claims => insurance(a, claims).cost - insurance(b, claims).cost;
  const crossings = [];
  let previousNonzero;
  for (const [index, claims] of points.entries()) {
    const cost = difference(claims);
    if (Math.abs(cost) < 1e-8) continue;
    if (previousNonzero && Math.sign(cost) !== Math.sign(previousNonzero.cost)) {
      const low = points[index - 1];
      const lowCost = difference(low);
      crossings.push(low - lowCost * (claims - low) / (cost - lowCost));
    }
    previousNonzero = { cost };
  }
  return crossings;
}

// FX inputs quote units of goal currency per one unit of investment currency.
export function fx(v) {
  const initial = v.cost * v.entry + v.sendFee;
  const localProceeds = v.proceeds - v.localCosts;
  const goalProceeds = localProceeds * v.exit - v.exitFee;
  const stressProceeds = localProceeds * v.stress - v.exitFee;
  if (localProceeds < 0) throw new Error('Local costs cannot exceed proceeds in this example.');
  return {
    initial, goalProceeds, stressProceeds,
    annualLocal: (localProceeds / v.cost) ** (365 / v.days) - 1,
    localReal: localProceeds / v.cost / (1 + v.inflation / 100) ** (v.days / 365) - 1,
    goalReturn: goalProceeds / initial - 1,
    stressReturn: stressProceeds / initial - 1,
  };
}

export function housing(v) {
  const down = v.price * v.down / 100;
  const cashToClose = down + v.closing;
  const loan = v.price - down;
  const rate = v.apr / 1200;
  const term = v.term * 12;
  const payment = loan / presentValue(1, rate, term);
  const upkeep = v.maintenance / 1200 * v.price + v.tax + v.insurance + v.hoa;
  const roomIncome = v.roomRent * (1 - v.vacancy / 100);
  const outlay = payment + upkeep - roomIncome;
  const opportunity = monthlyRate(v.alternative / 100);
  let balance = loan, renterPortfolio = cashToClose, ownerPortfolio = 0, result, firstBreakEven = null;
  for (let month = 1; month <= v.years * 12; month++) {
    const rent = v.rent * (1 + v.rentGrowth / 100) ** Math.floor((month - 1) / 12);
    const actualPayment = Math.min(payment, balance * (1 + rate));
    balance = Math.max(0, balance * (1 + rate) - actualPayment);
    const difference = actualPayment + upkeep - roomIncome - rent;
    renterPortfolio = renterPortfolio * (1 + opportunity) + Math.max(0, difference);
    ownerPortfolio = ownerPortfolio * (1 + opportunity) + Math.max(0, -difference);
    const equity = v.price * (1 + v.appreciation / 100) ** (month / 12) * (1 - v.saleFee / 100) - balance;
    result = { equity, ownerPortfolio, renterPortfolio, advantage: equity + ownerPortfolio - renterPortfolio };
    if (month % 12 === 0 && result.advantage >= 0 && firstBreakEven === null) firstBreakEven = month / 12;
  }
  return { ...result, cashToClose, payment, outlay, roomIncome, firstBreakEven };
}

export function homePriceAtMonthlyBudget(v, roomIncome) {
  const borrowedShare = 1 - v.down / 100;
  const perUnit = borrowedShare / presentValue(1, v.apr / 1200, v.term * 12) + v.maintenance / 1200;
  const forLoanAndRepairs = v.housingBudget + roomIncome - v.tax - v.insurance - v.hoa;
  if (forLoanAndRepairs < 0) return 0;
  return perUnit > 0 ? forLoanAndRepairs / perUnit : null;
}

export function debtComparison(v) {
  if (v.lump > v.balance) throw new Error('Enter a lump sum no larger than the debt balance.');
  if (v.lump > v.cash) throw new Error('Available cash must cover the lump sum.');
  const rate = v.apr / 1200;
  if (v.balance > 0 && v.payment <= v.balance * rate) throw new Error('The monthly payment must cover more than the first month’s interest.');
  const growth = monthlyRate(v.invest / 100);
  const extra = v.extra ?? 0;
  const monthlyCash = v.payment + extra;
  function run(balance, portfolio, scheduledPayment) {
    let interest = 0, paidAt = balance === 0 ? 0 : null;
    for (let month = 1; month <= v.years * 12; month++) {
      const charge = balance * rate;
      const paid = Math.min(scheduledPayment, balance + charge);
      interest += charge;
      balance = Math.max(0, balance + charge - paid);
      portfolio = portfolio * (1 + growth) + monthlyCash - paid;
      if (balance < 0.000001 && paidAt === null) paidAt = month;
    }
    return { interest, paidAt, net: portfolio - balance };
  }
  const prepay = run(v.balance - v.lump, 0, monthlyCash);
  const invest = run(v.balance, v.lump, v.payment);
  return { prepay, invest, cashLeft: v.cash - v.lump, belowFloor: v.cash - v.lump < v.floor };
}
