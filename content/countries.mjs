// Edit the country guides here. Each example uses fictional people and inputs.
// Keep dated amounts in rules so a future editor can update each amount and source together.
// Country figures are educational reference points. The site never calculates personal eligibility from them.

const sources = {
  usRetirement: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
  usAggregate: "https://www.irs.gov/retirement-plans/cola-increases-for-dollar-limitations-on-benefits-and-contributions",
  usPresence: "https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test",
  usHsa: "https://www.irs.gov/irb/2025-21_IRB",
  ukIsa: "https://www.gov.uk/individual-savings-accounts",
  ukLifetime: "https://www.gov.uk/guidance/lifetime-isa-withdrawals-for-a-first-time-residential-purchase",
  ukIsaUpdate: "https://www.gov.uk/government/publications/tax-free-savings-newsletter-24/tax-free-savings-newsletter-24-october-2026",
  caTfsa: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/contributing/calculate-room.html",
  caFhsa: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account/contributing-your-fhsa.html",
  ngPension: "https://www.pencom.gov.ng/wp-content/uploads/2018/01/PRA_2014.pdf",
  ngDeposits: "https://ndic.gov.ng/news-detail?slug=ndic-highlights-expanded-deposit-protection-and-accelerated-reimbursement-systems",
  ngOperator: "https://sec.gov.ng/for-investors/find-a-registered-operator/",
  ieAuto: "https://www.gov.ie/en/department-of-social-protection/campaigns/auto-enrolment/",
  ieContributions: "https://www.gov.ie/en/department-of-social-protection/publications/myfuturefund-contribution-examples-for-employees/",
  ieRelief: "https://www.revenue.ie/en/jobs-and-pensions/pension/relief/tax-relief-limits.aspx",
  ieDeposit: "https://www.centralbank.ie/consumer-hub/deposit-guarantee-scheme",
  ghBills: "https://www.bog.gov.gh/treasury-and-the-markets/treasury-bill-rates/",
  ghDeposits: "https://www.gdpc.gov.gh/deposit-insurance/deposit-coverage",
  seIsk: "https://www.skatteverket.se/investeringssparkonto",
  seDeposit: "https://www.riksgalden.se/en/our-operations/deposit-insurance/how-the-deposit-insurance-works/",
};

export const countries = {
  us: {
    name: "United States",
    currency: "USD",
    summary: "Start with the cash that actually hits your account. A paycheck, an annual bonus and stock that has yet to vest each have a different job.",
    actions: [
      "On your first payslip, mark base pay, federal and state withholding, payroll taxes, benefits and actual take-home. Keep unvested equity and irregular bonuses out of the recurring rent budget.",
      "Ask HR for the retirement match formula, vesting schedule, fund fees and plan options. Compare enough to earn the available match with a smaller contribution if you need cash for essential bills or costly debt.",
      "Compare pre-tax and Roth dollars using the same pre-tax budget. Ask what tax rate would apply to the next dollar now and to the withdrawal later. Check whether you qualify for an IRA or HSA before funding it.",
    ],
    example: "A new hire earns $130,000 in base pay, has a $20,000 target bonus and a $100,000 stock grant vesting evenly over four years. That is about $10,833 monthly gross base pay. The target bonus is uncertain and the grant would vest at roughly $25,000 per year at its grant-date price under this schedule. Build fixed expenses from actual net base pay, then decide how to use cash from each vest or bonus as it arrives. Holding vested shares also concentrates your job and investment risk in the same employer.",
    checks: [
      "If you are on F-1 or OPT, keep your immigration authorization, federal tax-residency test and state tax rules separate. Some qualifying students can exclude days for the federal presence test, and Form 8843 may apply. Confirm the tax outcome using your own facts.",
      "An IRA limit is shared across traditional and Roth IRAs. Backdoor Roth conversions can include a taxable share if you have pre-tax IRA balances. Read the Form 8606 instructions before moving money.",
      "For cash you need soon, compare insured deposits, CDs and Treasury bills by maturity, early access and tax. Compare individual bond maturity with the changing market price of a bond fund.",
    ],
    sources: [
      { label: "IRS substantial presence test and excluded days", url: sources.usPresence },
      { label: "IRS nondeductible IRA and conversion instructions", url: "https://www.irs.gov/instructions/i8606" },
      { label: "TreasuryDirect Treasury bills", url: "https://www.treasurydirect.gov/marketable-securities/treasury-bills/" },
      { label: "FDIC deposit insurance", url: "https://www.fdic.gov/resources/deposit-insurance" },
    ],
    rules: [
      { label: "401(k) employee deferral and IRA contribution limits", value: "$24,500 and $7,500, respectively, before age-based catch-ups", period: "2026 tax year", url: sources.usRetirement },
      { label: "Defined-contribution annual additions limit", value: "$72,000, excluding catch-up contributions and subject to compensation and plan rules", period: "2026 tax year", url: sources.usAggregate },
      { label: "HSA contribution limits for eligible coverage", value: "$4,400 self-only or $8,750 family, before any age-based catch-up", period: "2026 calendar year", url: sources.usHsa },
    ],
  },
  uk: {
    name: "United Kingdom",
    currency: "GBP",
    summary: "Separate retirement money, a first-home deposit and the cash that keeps a move affordable. They can each need a different account.",
    actions: [
      "Ask payroll what earnings your pension uses, how much your employer pays, and whether salary sacrifice applies. Price the effect on take-home before raising contributions.",
      "Compare a Cash ISA, an ordinary savings account and a Stocks and Shares ISA for the goal you have. A cash reserve solves an access problem. An invested account has a different time horizon and can fall.",
      "Before opening or funding a Lifetime ISA, check residence and age eligibility, the first-payment date, purchase price, mortgage and main-residence tests, and your likely need for early access.",
    ],
    example: "A qualifying first-time buyer has £5,000 in a Lifetime ISA and is comparing a £420,000 home with a £470,000 home. Assuming all other withdrawal conditions are met, the £420,000 purchase can use the full £5,000. Under HMRC's October 2026 update, the £470,000 purchase leaves £4,000 after a 20% charge. If the deposit also has to cover a move or a purchase within 12 months of the first payment, flexible cash savings may serve a different purpose.",
    checks: [
      "A qualifying house purchase normally needs at least 12 months since the first Lifetime ISA payment. Ask the manager and conveyancer to confirm how the conditions apply before committing.",
      "If you move in or out of the UK, use the statutory residence test and current ISA subscription rules. For side work, check the conditions of your actual immigration permission, including any restriction on self-employment.",
      "If you are considering a lodger, check mortgage or lease permissions, insurance and local rules before counting rent. The Rent a Room Scheme has its own tax conditions.",
    ],
    sources: [
      { label: "GOV.UK workplace pensions", url: "https://www.gov.uk/workplace-pensions" },
      { label: "HMRC residence guidance", url: "https://www.gov.uk/tax-foreign-income/residence" },
      { label: "Student route conditions", url: "https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-student" },
      { label: "GOV.UK Rent a Room Scheme", url: "https://www.gov.uk/rent-room-in-your-home/the-rent-a-room-scheme" },
    ],
    rules: [
      { label: "Overall ISA annual subscription allowance", value: "£20,000", period: "2026–27 UK tax year", url: sources.ukIsa },
      { label: "Cash ISA limit", value: "£20,000 retained under the October 2026 update. This supersedes the £12,000 limit previously scheduled for April 2027.", period: "HMRC update for 6 April 2027", url: sources.ukIsaUpdate },
      { label: "Lifetime ISA first-home charge", value: "Charge-free at £450,000 or less when eligible. 20% charge above £450,000 when the other first-home conditions are met.", period: "Above-cap change effective 29 October 2026", url: sources.ukLifetime },
    ],
  },
  ng: {
    name: "Nigeria",
    currency: "NGN",
    summary: "Start by naming the currency you will spend. A naira rent goal and a dollar tuition goal can make the same investment look very different.",
    actions: [
      "Separate emergency deposits, bills with a maturity date, tradable bonds, listed shares and managed funds. Write down the legal issuer, what pays you, who holds the asset, how you exit and when you need the money.",
      "For Treasury bills, read the CBN auction record and ask for the cash purchase price, face value and days to maturity. For FGN Savings Bonds, check the current DMO offer for coupons, eligibility, maturity and access. Compare sovereign dollar debt and a dollar fund by custody, FX, duration, fees and actual redemption terms.",
      "Verify the exact operator in the SEC register and independently confirm the product, custody and receiving account. Check the issuer even if the intermediary is licensed. For land, use an independent local lawyer to verify title and the path to registration before paying.",
    ],
    example: "You pay ₦950,000 for a fictional bill that pays ₦1,000,000 after 182 days. The gain is ₦50,000, or 5.26% of your actual outlay before fees and tax. That is a holding-period return. For a dollar or pound goal, compare what you could actually buy in the goal currency at entry and maturity, after the executable spread and transfer fee. A positive naira gain can coexist with a loss in the goal currency.",
    checks: [
      "For a dollar investment, verify whether distributions and withdrawals settle in dollars, and ask what happens when you try to repatriate the money. Confirm taxes and reporting with a qualified professional in your tax residence.",
      "Deposit protection depends on institution type and eligible deposits. A fund, private note or fixed-return real estate scheme has different rights and risks.",
      "If you work under the contributory pension scheme, reconcile the amounts on your payslip with your Retirement Savings Account statement and check how the employer defines monthly emoluments.",
    ],
    sources: [
      { label: "CBN Treasury bill auction records", url: "https://www.cbn.gov.ng/rates/GovtSecuritiesDrillDown.html?market=NTB" },
      { label: "DMO Savings Bond offers", url: "https://www.dmo.gov.ng/fgn-bonds/savings-bond" },
      { label: "SEC Nigeria registered operators", url: sources.ngOperator },
      { label: "CBN exchange-rate records", url: "https://www.cbn.gov.ng/rates/exchratebycurrency.html" },
    ],
    rules: [
      { label: "NDIC limits by institution type", value: "₦5 million at deposit money banks and ₦2 million at microfinance and primary mortgage banks, subject to eligibility", period: "2024 revision, reaffirmed 30 June 2026", url: sources.ngDeposits },
      { label: "Contributory pension statutory minima", value: "10% employer and 8% employee for covered employment, subject to scheme scope", period: "Pension Reform Act 2014, section 4", url: sources.ngPension },
    ],
  },
  ca: {
    name: "Canada",
    currency: "CAD",
    summary: "Start with your province, residence history and account records. Contribution room is personal, even when two people earn the same salary.",
    actions: [
      "Use the pay statement to distinguish province-specific withholding, pension or workplace contributions and actual take-home. Ask what your employer pays and when it vests.",
      "Use your records to reconcile TFSA contributions and withdrawals across all providers. Compare an RRSP contribution using the deduction room on your notice of assessment and the tax trade-off when you withdraw.",
      "If a first home in Canada is a realistic goal, check FHSA residence and first-time-buyer tests. Compare it with keeping part of the deposit accessible for a move, rent or another near-term need.",
    ],
    example: "You withdraw C$2,000 from a TFSA in October and plan to replace it in November. A withdrawal generally restores room in the following calendar year. A November redeposit requires separate unused room now. Check your records across institutions, especially if you recently arrived or changed tax residence.",
    checks: [
      "Temporary immigration status and Canadian tax residence answer different questions. CRA describes separate rules for non-resident TFSA contributions and FHSA opening eligibility.",
      "An FHSA can hold assets with different risk levels. The home purchase date determines whether you can afford a decline before closing. Verify the qualifying withdrawal conditions and required paperwork.",
      "Eligible deposits at a CDIC member are subject to its coverage categories. Shares, ETFs and mutual funds fall outside CDIC deposit insurance.",
    ],
    sources: [
      { label: "CRA TFSA rules when non-resident", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account/non-resident.html" },
      { label: "CRA FHSA opening eligibility", url: "https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account/opening-your-fhsas.html" },
      { label: "CRA RRSP and registered retirement plans", url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/publications/t4040/rrsps-other-registered-plans-retirement.html" },
      { label: "CDIC eligible deposits and coverage", url: "https://www.cdic.ca/your-coverage/" },
    ],
    rules: [
      { label: "TFSA annual dollar limit", value: "C$7,000 added for an eligible year. Your available room depends on your own history.", period: "2026 calendar year", url: sources.caTfsa },
      { label: "FHSA first-year participation room", value: "C$8,000 in the year your first FHSA opens, subject to eligibility", period: "CRA guidance, checked November 2026", url: sources.caFhsa },
    ],
  },
  ie: {
    name: "Ireland",
    currency: "EUR",
    summary: "Protect rent and tuition first if income is irregular. When work becomes steady, compare the workplace pension, MyFutureFund and what you need to keep accessible.",
    actions: [
      "Ask payroll whether your job has a qualifying pension contribution and whether MyFutureFund applies. Compare the employer or State contribution, fees and access conditions.",
      "Compare personal pension or PRSA relief using your age, earnings and existing contributions. If you are investing outside a pension, check Revenue's fund-specific tax and reporting treatment before assuming familiar UK or US rules apply.",
      "If you are studying or moving between jobs, check the work permissions on your current stamp before accepting shifts or self-employment. Keep school, relocation and immigration expenses in their own cash budget.",
    ],
    example: "A qualifying employee on €36,000 with no eligible payroll pension contributes €540 per year at the initial MyFutureFund rate. On the same illustrative pay, employer contributions add €540 and the State adds €180, for €1,260 in total before growth and any fees. When comparing another workplace plan, also check employer terms and the effect on take-home.",
    checks: [
      "Check the official eligibility guidance if you have multiple jobs, irregular earnings or existing payroll pension contributions.",
      "Use separate accounts or a written ledger for rent, tuition and emergency reserves. Verify whether a deposit provider is covered and under which country's scheme.",
      "Compare accessible bank savings after Deposit Interest Retention Tax when applicable. Check Revenue's rule for your situation and the product's actual rate.",
    ],
    sources: [
      { label: "Irish government MyFutureFund eligibility", url: sources.ieAuto },
      { label: "Revenue Ireland deposit interest taxation", url: "https://www.revenue.ie/en/additional-incomes/dirt/what-dirt-rate-is-applicable.aspx" },
      { label: "Ireland employment permit and permission guidance", url: "https://enterprise.gov.ie/en/what-we-do/workplace-and-skills/employment-permits/employment-permit-eligibility/who-needs-an-employment-permit-/" },
    ],
    rules: [
      { label: "MyFutureFund initial contributions", value: "1.5% employee, 1.5% employer and 0.5% State top-up on eligible earnings", period: "2026–28 scheduled rates", url: sources.ieContributions },
      { label: "Personal pension contribution relief for under-30s", value: "15% age-related limit, with an annual earnings ceiling of €115,000", period: "Revenue guidance, October 2026", url: sources.ieRelief },
      { label: "Deposit Guarantee Scheme", value: "Up to €100,000 for eligible deposits per person per institution", period: "Central Bank guidance, checked November 2026", url: sources.ieDeposit },
    ],
  },
  gh: {
    name: "Ghana",
    currency: "GHS",
    summary: "Read past the headline yield. For a cedi goal, the cash available on the day you need it matters. For a foreign-currency goal, the conversion matters as well.",
    actions: [
      "Read the Bank of Ghana auction by issue date, tenor, discount rate and interest rate. Ask for the amount you pay, the amount paid at maturity and any fees before comparing two offers.",
      "For bank savings, check the institution and deposit protection. For a fund or unit trust, verify its exact legal name and manager in the SEC directory and read the redemption terms.",
      "If you are employed, ask for the payroll pension split and confirm that contributions appear on your statements. For take-home comparisons, use GRA's effective PAYE rules and your own payroll data.",
    ],
    example: "A fictional 91-day bill costs GH₵9,890 and pays GH₵10,000 at maturity. That is GH₵110, about 1.11% of the outlay over the holding period before fees and tax. An annualized auction quote will use a different measurement period. If your next bill is a dollar expense, also compare the amount of dollars the proceeds would buy after transfer costs.",
    checks: [
      "A prior auction records what happened on that date. Reinvestment can happen at a different rate. Plan the liquidity you need before choosing a maturity.",
      "Ask a remittance provider what the recipient gets after the spread and transfer fee. Independently check whether the provider appears on the Bank of Ghana register.",
      "Ask what a policy or public scheme actually covers and which providers accept it. Current NHIS benefit detail is outside this guide's verified figures.",
    ],
    sources: [
      { label: "Bank of Ghana Treasury bill rates", url: sources.ghBills },
      { label: "SEC Ghana licensed unit trusts", url: "https://licensees.sec.gov.gh/licensees/UnitTrust.php" },
      { label: "Ghana Revenue Authority income tax changes", url: "https://gra.gov.gh/news/portfolio/amendments-income-tax-act-2026-act-1178/" },
      { label: "Bank of Ghana registered transfer operators", url: "https://www.bog.gov.gh/notice/notice-no-42-registered-international-money-transfer-operators-imtos-in-ghana/" },
    ],
    rules: [
      { label: "Historical 91-day Treasury bill, tender 2032", value: "4.5109% discount rate and 4.5624% interest rate as quoted by Bank of Ghana", period: "Issue date 9 November 2026", url: sources.ghBills },
      { label: "Deposit protection maximum compensation", value: "GH₵6,250 for a bank depositor and GH₵1,250 at a specialized deposit-taking institution, subject to eligibility", period: "GDPC guidance, checked November 2026", url: sources.ghDeposits },
    ],
  },
  se: {
    name: "Sweden",
    currency: "SEK",
    summary: "Find out what your employer already contributes. Then choose where to put short-term cash and how you want long-term investments taxed.",
    actions: [
      "Read your employment terms for occupational pension and the relevant collective agreement. Confirm how the contributions are calculated and any insurance that comes with the plan.",
      "Compare an insured savings account and an investment savings account (ISK) by what you hold, when you need it and how the tax is calculated. An ISK applies a notional return to a defined capital base, so tax can apply during a down year.",
      "If you arrived recently, check registration, tax obligations and permit conditions separately. The Swedish Migration Agency has updated rules for higher education permits, including work alongside study.",
    ],
    example: "Assume a simplified 2026 ISK capital base of SEK 350,000 and no other savings using the combined allowance. SEK 50,000 sits above the baseline. Applying 1.065% gives about SEK 533 in illustrative tax. The actual capital base follows Skatteverket's rules for balances and deposits and can differ from the balance you see today.",
    checks: [
      "An ISK is a wrapper. Look through it to the actual funds, fees and investment risk. Track other qualifying products that share the tax-free baseline.",
      "For money you need shortly, confirm the financial institution and product are covered by the deposit guarantee. Check when term savings can be withdrawn.",
      "For a move or a student job, check current permissions and healthcare registration before budgeting work hours or assuming regional fees.",
    ],
    sources: [
      { label: "Skatteverket ISK tax calculation", url: sources.seIsk },
      { label: "Swedish Pensions Agency occupational pensions", url: "https://www.pensionsmyndigheten.se/forsta-din-pension/tjanstepension/rakna-ut-din-tjanstepension" },
      { label: "Swedish Migration Agency higher education permits", url: "https://www.migrationsverket.se/en/you-want-to-apply/study/higher-education" },
    ],
    rules: [
      { label: "ISK and related products combined tax-free capital baseline", value: "SEK 300,000. Tax of 1.065% applies to the applicable base above it in 2026.", period: "2026 income year", url: sources.seIsk },
      { label: "Deposit guarantee maximum", value: "SEK 1,150,000 per person and institution under ordinary coverage", period: "Effective 1 January 2026", url: sources.seDeposit },
    ],
  },
};
