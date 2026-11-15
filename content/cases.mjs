// Examples are illustrative. Put reading links in sources so the source desk can collect them.
const source = (label, url) => ({ label, url });

export const cases = {
  housing: {
    choice: 'Buy a home in the US',
    title: 'Andy, 23, wants a home with room to rent',
    example: 'Andy takes home $5,500 a month and pays $1,800 in rent. A $350,000 home with 20% down and $10,500 in closing costs takes $80,500 upfront. At 6.5% over 30 years, the mortgage is about $1,770 a month. With taxes, insurance, and a repair allowance, the monthly cost is about $2,511 before any rent.',
    steps: [
      'Check what you could pay every month if both rooms sat empty. Keep cash for repairs and emergencies after closing.',
      'Ask multiple lenders for Loan Estimates on the same terms. Check cash to close, the full monthly payment, and whether projected rent can count toward qualifying. Confirm that your lease plan is allowed by local rules, your lender, and your insurer.',
      'Andy compares two rooms at $700 each. With 10% vacancy, the rent averages $1,260 and his monthly housing cost falls to about $1,251. At the example’s growth rates, buying with roommates catches up to renting in year three. Buying alone is still behind in year seven. Try one empty room or zero home price growth and see how the decision changes.',
    ],
    sources: [source('Compare mortgage Loan Estimates', 'https://www.consumerfinance.gov/owning-a-home/compare/request-and-review-multiple-loan-estimates/'), source('FHA handbook and occupancy rules', 'https://www.hud.gov/hudclips/handbooks/housing')],
  },
  'learn-investing-foundations': {
    choice: 'Start investing',
    title: 'Maya, 23, can invest $100 a month',
    example: 'Maya keeps her rent and emergency savings accessible. She wants to invest $100 a month for a goal at least ten years away. She starts by checking her workplace match and reading how a broad index fund works.',
    steps: [
      'Ask your employer what it matches, when the match becomes yours, and what the investment options cost.',
      'Compare a workplace account and a regulated brokerage available where you live. In the US, Fidelity and Vanguard are examples to research. Check registration, account fees, fund fees, minimums, and whether you can buy in small amounts.',
      'Read a broad fund’s factsheet and check what it owns, how much it costs, and how much it can fall. If it fits, buy the fund and set a recurring amount you can sustain. Check the first deposit actually got invested.',
    ],
    sources: [source('Fidelity’s beginner lessons', 'https://www.fidelity.com/learning-center/trading-investing/investing-for-beginners'), source('FINRA guide to getting started', 'https://syndication.finra.org/content/getting-started-investor'), source('Check a US broker’s registration', 'https://brokercheck.finra.org/'), source('Vanguard’s guide to index investing', 'https://corporate.vanguard.com/content/dam/corp/research/pdf/indexing_benefits.pdf')],
  },
  debt: {
    choice: 'Pay off student debt',
    title: 'Andy has $2,000 and a $9,000 student loan',
    example: 'Andy could put $2,000 toward a fixed 9% loan, invest it at an assumed 5% after fees, or keep it for a home deposit. At his usual $275 monthly payment, the upfront payment clears the loan in 29 months instead of 38 and saves about $569 in interest. Either choice leaves him $5,500 in cash. Keeping the full $7,500 may matter more if he expects to move soon.',
    steps: [
      'Make a list with each loan’s balance, rate, minimum payment, and whether it’s federal or private. If the minimums are hard to afford, contact your servicer about repayment options.',
      'For US federal loans, compare repayment plans and check forgiveness eligibility before making extra payments or refinancing. Private refinancing can give up federal protections.',
      'If faster payoff fits, keep minimums current and put extra money toward the highest-rate loan. Ask how to direct the payment, then check your next statement to see how it was applied.',
    ],
    sources: [source('Student loan repayment calculator', 'https://studentaid.gov/loan-simulator/'), source('How to pay student loans faster', 'https://studentaid.gov/articles/pay-off-student-loans-faster/'), source('What refinancing can change', 'https://www.consumerfinance.gov/ask-cfpb/should-i-consolidate-refinance-student-loans-en-561/')],
  },
  'learn-cash-flow': {
    choice: 'Build some savings',
    title: 'Amara, 23, has a different paycheck every month',
    example: 'Amara earns between $1,700 and $2,400. Rent and essentials total $1,550. In a $1,700 month, she has $150 left. She sets aside $50 for a known bill and adds $100 to a cash cushion. In stronger months she adds more.',
    steps: [
      'Use a quieter month to set a savings amount you can keep. If your next bill is at risk, cover it first.',
      'Give near-term goals their own pots. If a $300 bill is due in six months, that’s $50 a month. Keep the cash somewhere you can reach when the bill is due.',
      'Compare savings accounts on access, fees, minimum balances, and deposit protection. Set your transfer for after payday and adjust it when your income changes.',
    ],
    sources: [source('MoneyHelper guide to building an emergency fund', 'https://www.moneyhelper.org.uk/en/savings/types-of-savings/emergency-savings-how-much-is-enough'), source('US deposit protection and eligible accounts', 'https://www.fdic.gov/resources/deposit-insurance/faq')],
  },
  alternatives: {
    choice: 'Explore investments beyond stocks and property',
    title: 'Ade needs half his money in six months',
    example: 'Ade has ₦300,000. He needs ₦150,000 for a bill in six months and could leave the rest alone longer. He compares an accessible deposit for the bill, a short Treasury bill that matures before the due date, and a money market fund with a clear withdrawal timeline.',
    steps: [
      'Ask what pays you, what it costs, and when you can get the cash back. Compare the cash you actually receive after fees and taxes.',
      'Check the provider’s registered name and who holds the money. A fund, a bank deposit, and a government bill have different protections and ways to get your money out.',
      'Ask what happens if you need to sell early, the currency falls, or the provider fails. In Nigeria, start with the local playbook to find the relevant register and bill information.',
      'If the goal is earning more, compare a small business or training expense as its own decision. For example, spend ₦25,000 on a trial only after estimating the net profit per customer and how many sales would pay it back.',
    ],
    sources: [source('Check a Nigerian investment provider', 'https://sec.gov.ng/for-investors/find-a-registered-operator/'), source('Nigeria Treasury bill auction results', 'https://www.cbn.gov.ng/rates/GovtSecuritiesDrillDown.html?market=NTB')],
  },
  insurance: {
    choice: 'Choose a health plan',
    title: 'Jordan compares an HMO and a PPO',
    example: 'Jordan can pay $140 a month for an HMO or $260 for a PPO. With no care that costs extra, that’s $1,680 versus $3,120 a year. The PPO becomes cheaper at about $2,444 in covered in-network bills under these assumptions. At $6,000 in bills, annual costs are about $4,880 versus $4,658 including premiums.',
    steps: [
      'Check your doctors, medicines and hospitals first. HMOs generally limit non-emergency care to their network. PPOs usually offer more flexibility and can charge more out of network.',
      'Compare a no-care year, the care you expect, and the most you could owe for covered in-network care. The model uses the insurer’s allowed bill amount. Enter flat visit charges and uncovered costs under plan details.',
      'If eligible for an HSA, $1,000 left invested would grow to about $1,629 in ten years at an illustrative 5% before fees. Keep cash for care you expect soon. An FSA can help with known expenses, but check the plan’s carryover or grace period before choosing how much to set aside.',
    ],
    sources: [source('Compare health plan networks', 'https://www.healthcare.gov/choose-a-plan/plan-types/'), source('HSA and FSA eligibility and rules', 'https://www.irs.gov/publications/p969')],
  },
  fx: {
    choice: 'Invest in one currency and spend in another',
    title: 'Tomi earns naira and has a dollar bill due',
    example: 'Tomi invests ₦1,000,000 and gets ₦1,200,000 back a year later. At ₦1,500 per $1 at the start and ₦2,000 per $1 at the end, about $667 becomes $600. That’s a 20% gain in naira and a 10% loss in dollars before fees.',
    steps: [
      'Use the rate you can actually get from your provider. Check how much lands after fees at both ends.',
      'Try a worse exchange rate. If you need a set amount in dollars on a set date, compare how much of the bill you could cover by keeping part of the money in dollars.',
    ],
    sources: [source('World Bank remittance price comparisons', 'https://remittanceprices.worldbank.org/')],
  },
  wrappers: {
    choice: 'Decide when to pay retirement taxes',
    title: 'Nia compares paying US retirement taxes now or later',
    example: 'Nia starts with $10,000 of pay before taxes. In this example she pays 22% today or 12% at withdrawal. With 30 years of growth at an assumed 7%, Traditional leaves about $66,988 after withdrawal tax. Roth starts with $7,800 after today’s tax and grows to about $59,376 if the withdrawal qualifies.',
    steps: [
      'Compare the same amount of pay before taxes. Check your employer’s match, vesting, and what options the plan offers.',
      'Try the same tax rate now and later. In this model the results match. A higher tax rate later can favor Roth. Paying tax now also changes what’s left in your paycheck.',
      'Take a historical example. Including dividends, the S&P 500 turned $10,000 into about $80,612 over 2006–2025 before any fees or taxes. Apply Nia’s fictional tax rates to that same growth and she keeps about $70,939 in Traditional or $62,877 in Roth. That’s one historical window with made-up tax rates, separate from the 7% calculator example.',
    ],
    sources: [source('Roth in a workplace retirement plan', 'https://www.irs.gov/retirement-plans/roth-acct-in-your-retirement-plan'), source('S&P Dow Jones Indices annual return table', 'https://www.spglobal.com/spdji/en/documents/additionalinfo/sp-3ai-indices-deck-20260302.pdf')],
  },
};
