// Edit these lessons in place. The reader UI renders each section as a disclosure.
// Keep examples hypothetical and add primary sources next to the claims they support.
const source = (label, url) => ({ label, url });

const cashFlowGuide = source("CFPB cash-flow budget worksheet", "https://files.consumerfinance.gov/f/documents/cfpb_your-money-your-goals_cash_flow_budget_tool_2018-11_ADA.pdf");
const emergencyGuide = source("CFPB emergency fund guide", "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/");
const healthCosts = source("HealthCare.gov guide to total plan costs", "https://www.healthcare.gov/choose-a-plan/your-total-costs/");
const planSummary = source("HealthCare.gov Summary of Benefits and Coverage", "https://www.healthcare.gov/health-care-law-protections/summary-of-benefits-and-coverage/");
const loanEstimates = source("CFPB guide to comparing Loan Estimates", "https://www.consumerfinance.gov/owning-a-home/compare/compare-loan-estimates/");
const moneyTransfer = source("CFPB guide to sending money abroad", "https://www.consumerfinance.gov/consumer-tools/money-transfers/send-money-abroad-with-more-confidence/");
const jobScams = source("FTC guide to spotting job scams", "https://consumer.ftc.gov/articles/job-scams");

export const lessons = [
  {
    id: "cash-flow",
    title: "Read your pay and close the month",
    summary: "Make a plan on payday, then use the actual transactions to decide what you’ll change next month.",
    sections: [
      {
        title: "Read the deposit back to the payslip",
        body: "Start with gross cash pay. Trace income tax withholding, social contributions and deductions for benefits or retirement until you get to the deposit. Some lines reduce taxable wages while others are taken after tax. Withholding is a prepayment and the final amount owed is worked out separately. Put payroll retirement savings in your savings total and leave them out of your take-home budget if they are already deducted.",
        example: "A synthetic US payslip shows $4,000 gross, $700 withheld for taxes, $150 for health insurance and $250 for retirement. The deposit is $2,900. A further $200 moved from the bank to savings brings the employee’s total saving to $450. A cash budget that starts at $2,900 only subtracts the $200 bank transfer.",
        action: "Open your last payslip. Circle the amount that landed in your bank and label every line above it. Ask payroll about any line you cannot identify.",
        sources: [source("IRS withholding estimator FAQs", "https://www.irs.gov/individuals/tax-withholding-estimator-faqs")],
      },
      {
        title: "A big offer can have a smaller monthly paycheck",
        body: "Write base pay, possible bonus and restricted stock units on separate lines. Base pay is the useful starting point for monthly commitments. A bonus can vary, and an equity grant has a vesting schedule and share-price risk. Even vested shares may have trading restrictions. In the US, equity compensation can create wage income and withholding. Review the grant, vest and tax records before treating sale proceeds as spendable cash.",
        example: "A hypothetical $250,000 offer includes $160,000 base salary, a $20,000 target bonus and $70,000 in annualized stock value at the grant price. Base gross pay is about $13,333 per month before deductions. If the share price halves before a scheduled vest and units are unchanged, that $70,000 illustration becomes $35,000 of stock value. Model fixed bills from base take-home pay, then decide how much employer stock you are comfortable holding given that your job already depends on the same company.",
        action: "Find the first vest date, the vest schedule, how shares are withheld for taxes, and whether you can sell when you expect to.",
        sources: [source("IRS explanation of restricted stock and RSUs", "https://www.irs.gov/pub/irs-wd/24-0010.pdf")],
      },
      {
        title: "One month in the Queens analyst’s budget",
        body: "On payday, assign the deposit to essentials, debt, flexible spending, irregular bills and goals. At month-end, compare the plan with the transactions. Count purchases made on a credit card when they occur and record the card payoff as a transfer so the spending appears once. Record transfers to your own savings separately from spending. Check categories that keep going over and charges you do not recognize.",
        example: "A simplified month for the simulated Queens analyst starts with $5,900 take-home. Planned essentials of $3,150, minimum debt of $250, flexible spending of $850, sinking funds of $450 and goals of $1,200 use the full deposit. Essentials end up $70 over and flexible spending $160 over, including a $35 subscription renewal. Keeping the other transfers unchanged would leave a $230 shortfall. If the charge was legitimate and useful, budget it explicitly. If it was unwanted, cancel the next renewal and still account for what actually cleared this month.",
        action: "Compare one month in the example Budget Plan and Money Tracker. Pick one recurring charge to confirm, one category to adjust, and one transfer to keep.",
        sources: [cashFlowGuide, source("CFPB guide to assessing spending", "https://www.consumerfinance.gov/owning-a-home/prepare/assess-your-spending/")],
      },
      {
        title: "A bill you expect and a shock you can’t plan",
        body: "A sinking fund is money set aside for a known bill, even if its amount is an estimate. An emergency reserve buys time when something uncertain happens. Size that reserve around obligations you still owe if income stops, including rent, minimum debt payments, and family support you intend to keep paying. Net worth answers a different question: assets minus liabilities. Assets you cannot access easily can increase net worth while leaving your emergency cover unchanged.",
        example: "$840 due in six months needs $140 per month if you have saved nothing. Separately, $3,600 of accessible cash against $1,800 of monthly essentials buys two months of cover. A retirement account can be part of net worth while the $3,600 remains the working emergency reserve.",
        action: "Write the amount and due date for your next three irregular bills. Decide what you will pay from those funds and what would trigger use of the emergency reserve.",
        sources: [emergencyGuide, cashFlowGuide],
      },
      {
        title: "An unfamiliar charge deserves a closer look",
        body: "Check merchant names, receipts, any authorized users, and subscription renewals. An unwanted renewal and unauthorized use need different responses. When you suspect fraud, contact the bank or card issuer promptly using the number on your card or the official app. Ask what steps and deadlines apply to your account. Save confirmation numbers and notices in one place.",
        example: "You find a $24 renewal and a $90 purchase from a merchant you cannot identify. Your email confirms the $24 renewal, so you can decide whether to cancel the next one. The $90 has no match in your records, so you contact the issuer and document the report. Keep the charge in your tracker while a dispute is pending and record any credit when it arrives.",
        action: "Turn on transaction alerts where available. Keep the issuer’s verified contact details and check your statements regularly.",
        sources: [source("CFPB guide to disputing a US credit card charge", "https://www.consumerfinance.gov/ask-cfpb/how-do-i-dispute-a-charge-on-my-credit-card-bill-en-61/"), source("CFPB guide to unauthorized US bank transactions", "https://www.consumerfinance.gov/ask-cfpb/how-do-i-get-my-money-back-after-i-discover-an-unauthorized-transaction-or-money-missing-from-my-bank-account-en-1017/")],
      },
      {
        title: "Choose a time horizon before you choose a tool",
        body: "Give each goal an amount, date and spending currency. If the deadline is fixed, the contribution you can sustain and the downside you can afford matter more than an appealing rate. Split essentials from optional upgrades so you have somewhere to adjust if the plan is tight.",
        example: "A CAD 6,000 move in 18 months with CAD 2,400 already set aside needs CAD 200 per month before interest. If the date moves six months earlier, the same gap needs CAD 300. If CAD 200 is what fits, changing the moving budget or the date may be a stronger lever than reaching for return.",
        action: "Write one goal due this year, one within five years and one further away. Give each its own monthly contribution and goal currency.",
        sources: [cashFlowGuide, emergencyGuide],
      },
    ],
  },
  {
    id: "protection",
    title: "Protect the month you can’t afford",
    summary: "Compare health plans, dental coverage and the risks that could undo your progress.",
    sections: [
      {
        title: "Compare health plans at three levels of use",
        body: "Add 12 months of premiums to your estimated cost sharing. A deductible is what you pay for many covered services before the plan starts paying its share. A copay is a fixed amount, and coinsurance is a percentage of the allowed charge. The out-of-pocket maximum is a cap on qualifying cost sharing for covered in-network care, and premiums and uncovered care sit outside it. HMOs commonly restrict nonemergency care to their network. PPOs typically allow out-of-network care at additional cost. Check the actual network, referrals and covered drugs.",
        example: "Two hypothetical plans with your providers in network. Plan A costs $120 monthly with $200, $1,600 or $4,000 in cost sharing across three use levels, for totals of $1,640, $3,040 or $5,440. Plan B costs $225 monthly with $80, $700 or $2,500 in cost sharing, for totals of $2,780, $3,400 or $5,200. A costs less in the light and moderate examples, while B costs less in the heavy one. An excluded medication or provider could reverse the result.",
        action: "Get the plan summaries and compare your two likely providers, recurring prescriptions, and your ability to cover a large bill early in the year.",
        sources: [healthCosts, planSummary, source("HealthCare.gov network and plan types", "https://www.healthcare.gov/choose-a-plan/plan-types/")],
      },
      {
        title: "An HSA and a health FSA solve different problems",
        body: "In the US, HSA contributions require qualifying coverage and eligibility under the rules for the year. HSA funds can generally carry forward and stay with you when you change jobs. A health FSA is an employer arrangement for eligible expenses with plan-year deadlines and possible carryover or a grace period. A general-purpose health FSA may affect HSA eligibility. Ask about limited-purpose arrangements if both appear in your benefits portal.",
        example: "You expect $400 of eligible expenses and are deciding whether to elect $400 or $1,000 in a health FSA. With no carryover or grace period and no additional eligible claims, the larger election risks forfeiting $600. If you also have an HSA option, confirm compatibility before making either election.",
        action: "Ask benefits for the plan’s eligibility language, reimbursement deadline, carryover or grace-period rule, and any employer HSA contribution.",
        sources: [source("IRS Publication 969 on HSAs and FSAs", "https://www.irs.gov/publications/p969")],
      },
      {
        title: "Follow one medical bill through the plan",
        body: "Find the plan’s allowed amount and the deductible already satisfied. Some services use a copay or have special rules, so start with the applicable benefit. If the deductible applies, subtract the remaining deductible from the allowed charge before applying coinsurance to the rest. Then check what counts toward your out-of-pocket maximum.",
        example: "For a hypothetical in-network procedure with a $1,200 allowed charge, a $500 remaining deductible and 20% coinsurance, the patient pays $500 plus $140, or $640, assuming no cap has been reached and no other plan rules apply. With the deductible already satisfied, the same charge would cost $240 under those assumptions.",
        action: "Ask the insurer for a written estimate using the procedure code, facility and clinician, including whether each bills separately.",
        sources: [healthCosts, planSummary],
      },
      {
        title: "Run the dental numbers before you commit",
        body: "Check waiting periods, what the plan classifies as major care, its allowed fee, participating dentists, annual benefit maximum and exclusions. A dental benefit maximum commonly caps what the insurer pays. A sinking fund can help cover predictable work or the share the plan leaves to you.",
        example: "A hypothetical $2,400 procedure is fully eligible at the allowed price. With a $50 deductible, 50% coverage after the deductible, a $1,000 plan benefit maximum and $360 annual premiums, the plan pays $1,000. You pay $1,760 including premiums. If a waiting period excludes the procedure, the same plan would leave $2,760 at that price. If paying $2,400 directly in 12 months, a $200 monthly sinking fund would cover that modeled bill.",
        action: "Ask the dentist for procedure codes and a written cost estimate. Ask the insurer how it applies those codes, then compare with the self-pay quote and payment timing.",
        sources: [source("HealthCare.gov adult dental coverage and waiting periods", "https://www.healthcare.gov/coverage/dental-coverage/"), source("HealthCare.gov dental plan information", "https://www.healthcare.gov/dental-plan-information/")],
      },
      {
        title: "Audit the losses you could struggle to absorb",
        body: "Start with a major liability claim, lost earnings, theft or loss at home, and financial obligations people depend on you to cover. Review auto liability limits and deductibles, renters replacement cost versus depreciated value, disability waiting periods and benefit definitions, term life needs if someone depends on your income, and travel medical or evacuation limits. Read exclusions and whether cover ends when a job or residency changes.",
        example: "Two hypothetical auto quotes differ by $600 a year. The cheaper one has a $1,500 collision deductible versus $500, and lower liability limits. If you could not find the extra $1,000 after a collision, the monthly saving comes with a real cash-flow trade-off. Get both quotes at the same limits and deductibles before comparing price.",
        action: "Make a one-page policy list with premium, deductible, limit, exclusion and renewal date. Identify one large loss you could not cover yourself.",
        sources: [source("State insurance regulators’ consumer auto guide", "https://content.naic.org/consumer/auto-insurance.htm"), source("State insurance regulators’ renters policy guide", "https://content.naic.org/article/consumer-insight-understanding-your-homeowners-or-renters-policy"), source("State insurance regulators’ disability insurance guide", "https://content.naic.org/article/consumer_insight_simplifying_complications_disability_insurance.htm"), source("US State Department guide to travel insurance", "https://travel.state.gov/en/international-travel/planning/guidance/insurance.html")],
      },
    ],
  },
  {
    id: "housing",
    title: "Rent, buy or share",
    summary: "Compare the cost of a place to live and the equity you may build, with room for the possibility that life moves you first.",
    sections: [
      {
        title: "Compare monthly costs, cash to close and exit equity",
        body: "Rent buys shelter and flexibility. Ownership adds loan costs, property tax, insurance, repairs and sale costs, and payments can also build equity. Compare similar places, and use the same timeline and return assumptions on both sides. Make room for the renter’s ability to invest any up-front or monthly savings.",
        example: "A hypothetical $320,000 home with 10% down and a 30-year loan at 6.5% starts with about $1,820 of monthly principal and interest. Add $300 tax, $120 insurance, $250 maintenance reserve, $120 mortgage insurance and $110 association charges for about $2,720. At $2,100 rent with comparable utilities, renting frees about $620 monthly in this example. Ownership could build equity, and a sale within a few years could use much of that equity for transaction costs.",
        action: "Put one actual rental and one comparable home listing side by side. Ask lenders for comparable Loan Estimates and get a local insurance estimate before modeling the exit.",
        sources: [loanEstimates, source("CFPB guide to mortgage amortization", "https://www.consumerfinance.gov/ask-cfpb/how-does-paying-down-a-mortgage-work-en-1943/")],
      },
      {
        title: "House hacking only works if you can carry the empty month",
        body: "Separate rental income from the housing cost you still owe if a tenant leaves. Check owner-occupancy rules with the lender, legal permission to rent, insurance terms, tax treatment, and the work of being a landlord. Budget for vacancy, repair, turnover and collection. An insured owner-occupied loan requires genuine occupancy under its rules.",
        example: "At $500,000 with 5% down and a 30-year 6.5% mortgage, principal and interest are about $3,002 monthly. Two $1,000 rooms at a 10% vacancy allowance bring in $1,800 on average. A $5,000 annual maintenance reserve brings the remaining monthly cost to roughly $1,619, before tax, insurance, utilities, closing costs and other expenses. If both rooms are empty, the same subtotal rises to about $3,419. The incomplete subtotal is a resilience test.",
        action: "Run a no-rent month and a major-repair year on the same sheet. Confirm occupancy and lease rules before treating any rent as part of the financing.",
        sources: [source("HUD FHA Single Family Housing Policy Handbook", "https://www.hud.gov/hudclips/handbooks/housing"), loanEstimates],
      },
      {
        title: "Taking in a UK lodger",
        body: "Taking a lodger in the home you occupy can reduce your own housing cost. Ask whether your mortgage or tenancy permits it and whether you need consent, whether insurance covers the arrangement, what legal duties apply, and how the furnished room income is treated. Tax relief and legal permission are separate checks.",
        example: "A room let for £550 per month for ten occupied months brings in £5,500. An extra £65 in bills for those months and a £300 turnover allowance reduce cash income to £4,550 before any applicable tax. If the lender, landlord or insurer withholds required permission, remove the income from your budget.",
        action: "Read your mortgage or tenancy agreement and the official resident-landlord guide, then put permission and expected net proceeds on separate lines.",
        sources: [source("GOV.UK guide to letting rooms in your home", "https://www.gov.uk/government/publications/letting-rooms-in-your-home-a-guide-for-resident-landlords/letting-rooms-in-your-home-a-guide-for-resident-landlords"), source("HMRC Rent a Room helpsheet", "https://www.gov.uk/government/publications/rent-a-room-for-traders-hs223-self-assessment-helpsheet/hs223-rent-a-room-scheme-2026")],
      },
      {
        title: "Verify Nigerian land before you pay",
        body: "Have an independent local lawyer and surveyor verify the seller’s identity and authority, the chain of title, the land registry search, registered charges and disputes, the survey and boundaries, any government acquisition, and the consent and registration steps that apply. Ask what the seller’s document actually grants and who can legally transfer that interest. Use the relevant state or FCT authority rather than assuming one jurisdiction’s process applies everywhere.",
        example: "A hypothetical plot is quoted at ₦15 million. If your independent survey, consent and registration budget is ₦1.5 million and basic site work is ₦2 million, your working budget is ₦18.5 million before delays. If the documents and plot identifiers do not match, the next step is verification with the registry and surveyor before any deposit.",
        action: "Ask your own lawyer for a written list of searches, their results, and the conditions to clear before releasing money.",
        sources: [source("Lagos State e-GIS land portal", "https://landonline.lagosstate.gov.ng/"), source("Land Use Act text from Bayelsa State", "https://www.investbayelsa.by.gov.ng/wp-content/uploads/2016/10/LAND-USE-ACT.pdf"), source("Abuja Geographic Information Systems right-of-occupancy guide", "https://www.agis.fcta.gov.ng/right-of-occupancy/")],
      },
      {
        title: "House deposit or student loan?",
        body: "List the loan type, rate, minimum payment, forgiveness or income-based terms, any prepayment costs, and the cash you need for a deposit and moving. An extra loan payment reduces future interest on some loans and is hard to reverse. Cash for a move keeps options open. A loan with forgiveness or income-based terms needs its own comparison.",
        example: "You have $4,000 in savings, a $3,000 cash floor and a $10,000 deposit goal. Sending $3,000 to the loan leaves $1,000 cash and breaks the floor. Keeping $3,000 as the reserve and splitting the other $1,000 keeps the move viable while you verify the loan terms.",
        action: "Check the current rules with the loan servicer or official student aid office and ask how extra payments are applied.",
        sources: [source("CFPB guidance on additional student loan payments", "https://www.consumerfinance.gov/ask-cfpb/can-i-make-additional-payments-on-my-student-loan-en-607/"), source("Federal Student Aid guide to comparing repayment plans", "https://studentaid.gov/articles/repayment-calculator/")],
      },
    ],
  },
  {
    id: "career",
    title: "Make a plan when work is changing",
    summary: "Build around the income you can count on while you job hunt, study, move, or test a second income.",
    sections: [
      {
        title: "Job hunting with a runway",
        body: "Runway is accessible cash divided by the monthly amount you spend beyond dependable income. Budget for search expenses, deposits and the gap between accepting a job and receiving the first paycheck. If you are planning two timelines, use the slower one to decide which costs you can commit to now.",
        example: "With £4,000 cash, £1,150 of monthly essentials and £350 of reliable monthly income, you use £800 per month and have five months of runway. A £1,200 move leaves £2,800, or three and a half months at the same pace. If the move also changes your rent, rerun the model with the new monthly cost.",
        action: "Give yourself a date to reassess housing and spending, then price out a slower job-search scenario.",
        sources: [cashFlowGuide, emergencyGuide, jobScams],
      },
      {
        title: "First job benefits are part of the offer",
        body: "Ask when health coverage starts, when you can enroll, what the employer contributes, when matching contributions vest, and whether there are fees or enrollment defaults. Review what happens if you leave early. Build a short cash reserve for the first month, when travel, a deposit or work equipment can arrive before pay.",
        example: "A hypothetical employer matches 50% of the first 6% contributed on $60,000 eligible pay. At a 6% employee contribution, you contribute $3,600 annually and the employer adds $1,800 before any vesting conditions. Contributing 3% would capture $900 under the same formula. Check the actual pay-period rules before making an annual assumption.",
        action: "Ask HR for the written match formula, the vesting schedule and the health plan start date. Mark the dates on your first-month calendar.",
        sources: [source("US Department of Labor retirement benefits guide", "https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/publications/your-retirement-benefits.pdf"), planSummary],
      },
      {
        title: "Student work and tax residence are separate checks",
        body: "Check whether your permission covers the exact work, hours, employer and start date. Remote freelancing and self-employment can have different treatment from payroll work. UK Student permission generally restricts self-employment. Irish student stamps have different conditions. Sweden changed higher-education permit rules in June 2026, with transitions and exceptions. In the US, F-1 practical training has its own authorization rules. Tax residence and payroll-tax treatment depend on separate tests.",
        example: "A student is offered eight hours of payroll work and four hours of remote contracting. Even if twelve hours fits a work-hours cap, the contract can be a separate permission question. Run your cash budget with the confirmed income only until the international office or immigration authority clarifies the rest.",
        action: "Use your actual permission and course dates to ask the international office for written guidance. For a US paycheck, check tax residence and Social Security/Medicare treatment with the appropriate tax resources separately.",
        sources: [source("UK Student visa work conditions", "https://www.gov.uk/student-visa"), source("Ireland Immigration Service Delivery permission stamps", "https://www.irishimmigration.ie/registering-your-immigration-permission/information-on-registering/immigration-permission-Stamps/"), source("Swedish Migration Agency higher-education permit rule changes", "https://www.migrationsverket.se/en/newsarchive/newrulesforresidencepermitsforstudiesinhighereducation.5.7e7ff7f619e5ace55a714.html"), source("US ICE practical training overview", "https://www.ice.gov/doclib/sevis/pdf/SEVPPracticalTrainingOverview.pdf"), source("IRS substantial presence test", "https://www.irs.gov/individuals/international-taxpayers/substantial-presence-test"), source("IRS foreign-student Social Security and Medicare rules", "https://www.irs.gov/individuals/international-taxpayers/foreign-student-liability-for-social-security-and-medicare-taxes")],
      },
      {
        title: "A side income has costs before it pays you",
        body: "Price one small offer and track how many paid hours turn into unpaid admin, travel, sales and revisions. Take out direct expenses and reserve for tax under your local rules. Check any employer policy and your work authorization. Keep the money you need for rent and taxes outside the money you are prepared to risk on the idea.",
        example: "Four tutoring sessions at $50 produce $200. Materials and travel cost $28, leaving $172 before tax. Four teaching hours plus two hours of preparation mean about $28.67 per total hour before tax. If a nearby client removes one hour of travel or prep, the same $172 over five hours is $34.40. Compare that with other uses of the time.",
        action: "Test one paid offer with a fixed cost and time limit. Keep receipts, record time and review whether you would do it again at that net rate.",
        sources: [source("IRS gig economy tax center", "https://www.irs.gov/businesses/gig-economy-tax-center"), source("US Small Business Administration break-even calculator", "https://bec.www.sba.gov/"), jobScams],
      },
      {
        title: "Move countries with a cash plan first",
        body: "Plan deposits, rent overlap, transportation, currency conversion and any gap in income or health cover. Keep track of where you live, where you are tax resident, which jurisdiction holds your investments, and the currency you will spend. Before you move, ask account providers what changes when your address or tax residence changes.",
        example: "You expect €1,400 for a deposit and €1,000 for first-month costs. Another €450 for transport, temporary accommodation and paperwork makes €2,850. A separate €600 buffer puts your working target at €3,450. Check the cash amount you actually receive after FX and fees when funding from another currency.",
        action: "Put the move costs on a calendar, mark which ones must be paid before the first salary, and ask about account and health-coverage continuity.",
        sources: [moneyTransfer, emergencyGuide],
      },
    ],
  },
  {
    id: "spending",
    title: "Spend deliberately, give deliberately",
    summary: "Decide when paying for convenience is worth it and make room for the people and causes you care about.",
    sections: [
      {
        title: "What would you do with the time you buy back?",
        body: "Divide the extra cost by the hours you genuinely get back. Then decide what those hours mean for you. Earning potential is one comparison, and rest, study and time with people count too. Look at the repeat cost if it becomes a habit and try a reversible version first.",
        example: "A service costs ₦24,000 more than doing the job yourself and frees three hours. That is ₦8,000 per hour. If it only saves an hour after coordination and travel, the price is ₦24,000 per hour. You might happily pay during a busy month and make a different decision once your schedule eases.",
        action: "Try one purchase that saves time. Track what it actually cost and how you used the time before you repeat it.",
        sources: [source("CFPB guide to assessing spending", "https://www.consumerfinance.gov/owning-a-home/prepare/assess-your-spending/")],
      },
      {
        title: "Compare subscriptions and recurring bills over a full year",
        body: "Put the total annual cost side by side. Check expiry dates, equipment, setup and early termination fees, and what each option actually provides. Before switching coverage, verify that the cheaper option still meets the need.",
        example: "A plan costs $60 monthly. An alternative costs $45 for six months and then $55, with a $40 setup fee. The annual comparison is $720 versus $640, a first-year saving of $80. If you would pay $100 to exit the old plan early, switching now costs $20 more over that period.",
        action: "Pick one recurring bill. Request the full first-year and renewal costs in writing, then set a reminder before the next price change.",
        sources: [cashFlowGuide],
      },
      {
        title: "Make family support a line you can keep funding",
        body: "Decide how much support can be recurring and what would count as an emergency request. Set the amount in the recipient’s currency when that is how bills are paid. Compare the amount delivered after fees and FX, the delivery time, and whether the recipient can access the funds.",
        example: "With a £200 total budget, one transfer costs £2 and converts the remaining £198 at an illustrative ₦1,900 per £1, delivering ₦376,200. Another charges no stated fee and uses ₦1,850 per £1, delivering ₦370,000. Compare recipient proceeds using quotes taken at the same time.",
        action: "Set a regular amount you can sustain. Agree on the recipient’s preferred timing and what you will do if their need or your pay changes.",
        sources: [moneyTransfer, cashFlowGuide],
      },
      {
        title: "Give around the outcome you care about",
        body: "Pick a goal for the gift before you choose an organization. Look for evidence of outcomes, what an additional contribution would fund, transparency and any values you want the giving to reflect. For tax purposes, verify eligibility independently in your jurisdiction. Track charitable donations and direct family support separately if their reporting differs.",
        example: "You budget $80 a month for giving. You might give $50 consistently to a community you know and reserve $30 for a program with published evidence you can review. If income drops, decide up front whether you prefer to pause both commitments or protect one and adjust the other.",
        action: "Write one sentence about what you want your next gift to change. Check the recipient’s evidence and registration, then pick an amount that fits the rest of your plan.",
        sources: [source("GiveWell’s research criteria", "https://www.givewell.org/how-we-work"), source("IRS US tax-exempt organization search", "https://www.irs.gov/charities-non-profits/tax-exempt-organization-search")],
      },
    ],
  },
];
