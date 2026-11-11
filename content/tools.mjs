// Each field is [id, label, example value, minimum, maximum, step].
// Change example inputs here. Calculation formulas are in scripts/math.mjs.
export const tools = [
  {
    id: 'goal', title: 'Know your number', summary: 'What would it take for work to become optional?',
    example: 'Say you are 23, want the option to stop working at 40, and want to plan through 100. Start with what a year of the life you want costs today. Then try adding 18 years of extra family costs and see what changes.',
    note: 'All amounts are in today’s purchasing power. Contributions arrive at month-end and keep pace with inflation. The retirement model spends at year-end, with extra costs starting in the first retirement year. Tax is a manual annual estimate. The three paths use a constant base return and returns two percentage points either side of it.',
    fields: [
      ['age','Your age',23,18,99,1], ['years','Years until work is optional',17,1,80,1], ['endAge','Plan through age',100,19,125,1],
      ['spending','Annual lifestyle spending',48000,0,1e10], ['tax','Annual tax paid from your withdrawals',0,0,1e10], ['otherIncome','Annual reliable income during retirement',0,0,1e10],
      ['phaseCost','Extra annual costs in the first phase',12000,0,1e10], ['phaseYears','Years of extra costs',18,0,100,1],
      ['start','Already set aside',10000,0,1e10], ['monthly','Current monthly contribution',650,0,1e9],
      ['returnRate','Assumed annual return (%)',7,-20,35], ['inflation','Annual inflation (%)',3,-5,50], ['fee','Annual investment fee (%)',0.25,0,10],
    ],
    sources: [['Investor.gov compound calculator','https://www.investor.gov/financial-tools-calculators/calculators/compound-interest-calculator']],
  },
  {
    id: 'budget', title: 'Track your spending', summary: 'Get the cash picture, then do one monthly close.',
    example: 'Use the simulated Queens analyst as a starting point. Essentials were 70 over plan and flexible spending was 160 over plan, including a 35 renewal. The month came in 230 short. Check the renewal first, then decide which other differences belong in next month’s plan.',
    note: 'Enter recurring take-home cash. Review bonuses and vested shares separately. Enter minimum debt payments once, outside essentials. For a foreign-currency goal, convert amounts into one currency before combining them.',
    fields: [
      ['net','Monthly take-home cash',5900,0,1e9], ['gross','Monthly gross cash pay (optional)',8750,0,1e9],
      ['essentials','Monthly essentials, excluding debt',3220,0,1e9], ['debt','Monthly minimum debt payments',250,0,1e9],
      ['flex','Monthly flexible spending and giving',1010,0,1e9], ['sinking','Monthly sinking funds',450,0,1e9],
      ['saving','Monthly contributions to savings or investments',1200,0,1e9], ['reserve','Accessible emergency cash',6940,0,1e10],
      ['assets','Total assets',20000,0,1e10], ['liabilities','Total debts',5800,0,1e10],
    ],
    sources: [['CFPB budgeting tools','https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/toolkit/']],
  },
  {
    id: 'compound', title: 'Compound growth and dated goals', summary: 'Compare a target with what your monthly contribution could build.',
    example: 'Try 300 a month for 20 years at 6%, then try 350 or a five-year delay. Put those two differences next to a spending change you could actually keep.',
    note: 'The effective annual return is reduced by the fee, then converted to a monthly rate. Contributions and match arrive at month-end. The target is in today’s money. Growth is hypothetical and excludes taxes. Use the amount your plan actually matches each month.',
    fields: [
      ['start','Starting balance',0,0,1e10], ['monthly','Monthly contribution',300,0,1e9], ['match','Employer contribution per month',0,0,1e9],
      ['years','Years to the goal',20,1,80,1], ['rate','Effective annual return (%)',6,-30,35], ['fee','Annual fee (%)',0,0,10],
      ['inflation','Annual inflation (%)',3,-5,50], ['target','Target in today’s money',100000,0,1e10],
    ],
    sources: [['SEC investment fees bulletin','https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated']],
  },
  {
    id: 'wrappers', title: 'Traditional or Roth?', summary: 'Compare the same pre-tax dollars under two tax assumptions.',
    example: 'At the same 22% tax rate now and later, equal pre-tax dollars and identical growth produce the same after-tax value. Try a lower rate later to see what changes.',
    note: 'A US illustration using one contribution and qualified withdrawals. Confirm tax residence, earned income, plan terms, match, vesting, contribution room and liquidity first. The model excludes fees, match and plan limits. The withdrawal rate is your assumed effective tax rate on this money.',
    fields: [['amount','Pre-tax amount',10000,0,1e10],['now','Marginal tax now (%)',22,0,80],['later','Effective tax on withdrawal (%)',22,0,80],['rate','Effective annual return (%)',7,-30,35],['years','Years invested',30,1,80,1]],
    sources: [['IRS retirement contribution limits','https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500']],
  },
  {
    id: 'fx', title: 'Yield, inflation and FX', summary: 'Compare local purchasing power with the currency your goal uses.',
    example: 'A simulated naira instrument costs ₦1,000,000 and pays ₦1,200,000 at exit. At an entry quote of 0.00065 USD per NGN and an exit quote of 0.0004875, that 20% local gain becomes a 10% USD loss before costs.',
    note: 'Use executable quotes in goal currency per one local currency unit. Spread can be reflected in the two quotes. Use a known price and terminal payout. For a bill, enter its actual purchase price and redemption value. The annualized yield assumes one final payout. Interim coupons need a dated cash-flow model.',
    fields: [
      ['cost','Local purchase cost',1000000,0.01,1e12],['proceeds','Local proceeds at exit',1200000,0,1e12],['localCosts','Local fees and tax at exit',0,0,1e12],
      ['days','Holding period in days',365,1,36500,1],['inflation','Annual local inflation (%)',20,-5,1000],
      ['entry','Entry FX quote',0.00065,0.000000000001,1e8],['exit','Base exit FX quote',0.0004875,0.000000000001,1e8],['stress','Stress exit FX quote',0.00039,0.000000000001,1e8],
      ['sendFee','Transfer fee paid at entry (goal currency)',0,0,1e9],['exitFee','Transfer fee paid at exit (goal currency)',0,0,1e9],
    ],
    sources: [['Central Bank of Nigeria FX reference','https://www.cbn.gov.ng/rates/exchratebycurrency.html'],['World Bank remittance prices','https://remittanceprices.worldbank.org/']],
  },
  {
    id: 'housing', title: 'Rent, buy or rent out a room', summary: 'Compare monthly cash flow and wealth at the same exit date.',
    example: 'A 350,000 property with 20% down and a 6.5% fixed loan costs roughly 1,770 a month in principal and interest. Add the costs you would pay even with an empty room. Then run the room-rent case at 10%, 30% and 100% vacancy.',
    note: 'Fixed-rate loan, nominal dollars, flat operating costs and room rent, annual rent growth, and monthly investment of cash-flow differences. No tax benefits, rental tax, capital gains tax, or local eligibility are assumed. Add known after-tax rental and insurance costs manually.',
    fields: [
      ['rent','Comparable monthly rent',1800,0,1e9], ['price','Property price',350000,1,1e10], ['down','Down payment (%)',20,0,100],
      ['apr','Annual mortgage interest rate (%)',6.5,0,35], ['term','Mortgage term in years',30,1,50,1], ['years','Holding years',7,1,60,1],
      ['closing','Upfront closing costs',10500,0,1e9], ['saleFee','Selling costs (% of sale price)',6,0,100], ['tax','Monthly property tax',300,0,1e9],
      ['insurance','Monthly insurance and mortgage insurance',150,0,1e9], ['hoa','Monthly HOA or other costs',0,0,1e9], ['maintenance','Annual maintenance (% of price)',1,0,40],
      ['roomRent','Monthly room rent at full occupancy',0,0,1e9], ['vacancy','Vacancy allowance (%)',10,0,100], ['rentGrowth','Annual rent growth (%)',3,-30,30],
      ['appreciation','Annual home price change (%)',2,-30,30], ['alternative','Annual after-tax alternative return (%)',5,-30,35],
    ],
    sources: [['CFPB Loan Estimate explainer','https://www.consumerfinance.gov/owning-a-home/loan-estimate/']],
  },
  {
    id: 'insurance', title: 'Compare health plans', summary: 'See what low, medium and high use would actually cost.',
    example: 'One plan saves 120 every month in premiums. Compare the 1,440 yearly saving with the extra cost if you need imaging, prescriptions or a procedure. Check the network before assuming the prices apply.',
    note: 'Enter allowed in-network claims subject to deductible and coinsurance. Enter estimated copays for separate services and uncovered costs per plan, held constant across scenarios. Premiums and uncovered costs sit outside the covered ceiling. Check each actual benefits document.',
    fields: [
      ['low','Low annual allowed claims',500,0,1e9], ['medium','Medium annual allowed claims',6000,0,1e9], ['high','High annual allowed claims',50000,0,1e9],
      ...[['a',140,2500,20,6500],['b',260,750,15,3800]].flatMap(([p,premium,deductible,coinsurance,maximum]) => [
        [p+'Premium','Monthly premium',premium,0,1e9], [p+'Deductible','Annual deductible',deductible,0,1e9],
        [p+'Coinsurance','Coinsurance after deductible (%)',coinsurance,0,100], [p+'Maximum','In-network out-of-pocket maximum',maximum,0,1e9],
        [p+'Copays','Annual copays for other covered services',0,0,1e9], [p+'Uncovered','Annual uncovered spending',0,0,1e9],
      ]),
    ],
    sources: [['HealthCare.gov annual cost guide','https://www.healthcare.gov/choose-a-plan/your-total-costs/']],
  },
  {
    id: 'debt', title: 'Pay down debt or invest?', summary: 'Compare two uses of the same cash with a fixed repayment schedule.',
    example: 'Suppose you have a 9,000 loan at 9% and 2,000 of extra cash. Compare prepaying and investing. Now lower the available cash until the lump sum would put you below your reserve floor.',
    note: 'Fixed APR, monthly amortization, no prepayment charges, forgiveness, taxes or new borrowing. Both paths invest any freed payment at the same hypothetical after-fee return. Check loan protections and actual terms before applying the comparison.',
    fields: [
      ['balance','Current loan balance',9000,0,1e10], ['apr','APR (%)',9,0,100], ['payment','Fixed monthly loan payment',275,0,1e9],
      ['lump','Lump sum to compare',2000,0,1e9], ['cash','Accessible cash before decision',7500,0,1e10], ['floor','Cash reserve floor',4500,0,1e10],
      ['invest','Hypothetical annual after-fee return (%)',5,-30,35], ['years','Comparison years',7,1,60,1],
    ],
    sources: [['CFPB on paying down principal','https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/']],
  },
];

export const diligence = [
  'I can identify the issuer, regulator, custody and applicable offering registration or exemption.',
  'I have independently checked the accounts, valuation, senior debt and who gets paid first.',
  'I have written terms for voting, reporting, disputes, withdrawals and resale.',
  'I know how the organizer gets paid and who benefits if I participate.',
  'I can afford the total loss and a delayed exit without using money needed for another goal.',
  'I have priced currency conversion, tax reporting and enforceability in the relevant jurisdictions.',
];
