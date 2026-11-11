// Investing lessons. Keep scenario inputs fictional and put original references
// beside the examples they support. Dates and annual limits live in country data.
export const investing = [
  {
    id: "investing-foundations",
    title: "Choose what to own",
    summary: "Start with what the money is for. Then compare cash, bonds, funds and stocks by the job each can do.",
    sections: [
      {
        title: "The account and the investment are separate choices",
        body: "A 401(k), ISA or TFSA sets rules for taxes, contributions and access. Inside an eligible account, you choose what to hold. A cash deposit earns interest. A bond pays according to its terms and can change in price. A stock gives you a share of one business. A diversified fund can spread risk across many holdings, while still falling with the market. Property adds rent and resale exposure, plus costs and a potentially slow exit.",
        example: "Imagine £6,000 for a move next spring and £6,000 for a goal in 25 years. A 30% fall leaves either pot at £4,200. The first deadline gives you little time to recover. The second gives you more time, provided you can pay your bills without selling. That difference can change the asset choice even when both pots start at the same size.",
        action: "Label each pot with amount, date, currency and the earliest date you might need it. Write down where it sits, what it holds and how quickly you could get it back.",
        sources: [
          { label: "SEC guide to asset allocation", url: "https://www.investor.gov/additional-resources/general-resources/publications-research/info-sheets/beginners-guide-asset" },
          { label: "Investor.gov investing basics", url: "https://www.investor.gov/introduction-investing" },
        ],
      },
      {
        title: "Read the fund before comparing the fee",
        body: "An ETF trades on an exchange. An index fund tries to track a benchmark and can be an ETF or a mutual fund. Read the benchmark, geography, top holdings, fund domicile and distribution policy. Then check the expense ratio, tracking difference, bid-ask spread, platform charge, FX and applicable taxes. Owning several funds can still leave you holding much of the same thing.",
        example: "Two hypothetical funds track the same benchmark. An assumed 4% annual return on $100,000 becomes about $209,000 after 20 years at a flat 0.25 percentage-point fee drag, versus about $181,000 at a 1 percentage-point drag. This simple illustration subtracts the fee from each year's return and assumes no other costs or tax.",
        action: "Open two prospectuses. Put the benchmark, top ten weight, annual fee and one-time trading cost side by side. Check whether the price difference buys you anything you actually want.",
        sources: [
          { label: "SEC guide to index funds", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-26" },
          { label: "SEC guide to ETF structure and fees", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-24" },
          { label: "SEC fee and compounding examples", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/updated" },
        ],
      },
      {
        title: "Read 10, 15 and 20 years of market history",
        body: "Here is one historical comparison using the S&P 500 annual USD total-return series through December 31, 2025. The figures reinvest dividends and exclude fund fees, trading costs, tax, inflation and currency conversion. An index is a benchmark. Your fund and personal return can differ. Starting and ending dates also matter.",
        example: "A hypothetical $10,000 tracking the published annual index series grew to about $39,833 over 2016–2025 (14.82% annualized), $71,994 over 2011–2025 (14.07%), or $80,612 over 2006–2025 (11.00%). Those three windows share an end date. The 20-year path included a 37.00% calendar-year loss in 2008. To reproduce any window, start with $10,000, multiply by one plus each calendar year's return in decimal form, then take the nth root of ending value divided by starting value and subtract one to annualize.",
        action: "Try a different end date or compare several rolling windows. To show U.S. purchasing power, divide the ending balance by the ratio of ending to starting CPI-U. For a goal outside the U.S., translate into the goal currency first, then use that goal's local inflation measure.",
        sources: [
          { label: "S&P Dow Jones Indices annual return table", url: "https://www.spglobal.com/spdji/en/documents/additionalinfo/sp-3ai-indices-deck-20260302.pdf" },
          { label: "S&P December 2025 index performance report", url: "https://www.spglobal.com/spdji/en/documents/commentary/market-attributes-us-equities-202512.pdf" },
          { label: "BLS CPI-U inflation data", url: "https://www.bls.gov/data/inflation_calculator.htm" },
        ],
      },
      {
        title: "If you want to own an individual business",
        body: "Start with how the company earns money. Read its annual report for revenue sources, risks, debt, cash flow and share count. Check recent filings for what changed. Then ask how much growth the price already assumes, what could break your thesis, and how much of your job, equity pay and portfolio depend on the same employer or industry.",
        example: "A fictional business earns $2 per share and trades at $40, or 20 times earnings. If earnings grow to $2.40 but investors later pay 15 times earnings, the price is $36. The company grew earnings 20% and the share price still fell 10%, before dividends and costs.",
        action: "Write a three-line investment case: where the cash comes from, what would prove the case wrong, and how much you could lose without interrupting the plan. If you already hold the stock through work, count it in the same exposure.",
        sources: [
          { label: "SEC guide to reading a 10-K", url: "https://www.investor.gov/introduction-investing/getting-started/researching-investments/how-read-10-k" },
          { label: "SEC guide to researching investments in EDGAR", url: "https://www.investor.gov/introduction-investing/getting-started/researching-investments/using-edgar-research-investments" },
        ],
      },
    ],
  },
  {
    id: "retirement-decisions",
    title: "Read your retirement benefits",
    summary: "Find the match, understand when it belongs to you, and compare the tax you save today with what you might pay later.",
    sections: [
      {
        title: "A match has a formula and may have a vesting clock",
        body: "Ask the plan administrator for the match percentage, eligible pay, waiting period, vesting, per-pay-period calculation and whether there is a year-end true-up. Vesting tells you how much of the employer's contribution you can keep if you leave. Check how a contribution affects the cash you need for essentials and minimum payments.",
        example: "On $60,000 of eligible pay, a match of 50% on the first 6% gives $1,800 in employer contributions when you put in $3,600 across the year, assuming the plan counts all that pay and each contribution qualifies. If the example plan has 50% vesting when you leave, you keep $900 of that employer contribution before market gains or losses. Your own $3,600 remains yours.",
        action: "Look for the plan's summary plan description and fee disclosure. Verify the match in your pay statement and the vested amount in the plan portal.",
        sources: [
          { label: "U.S. Department of Labor retirement plan guide", url: "https://www.dol.gov/sites/dolgov/files/ebsa/about-ebsa/our-activities/resource-center/publications/your-retirement-benefits.pdf" },
          { label: "IRS on employee and employer contribution limits", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits" },
        ],
      },
      {
        title: "Traditional and Roth on the same pay budget",
        body: "Traditional pre-tax 401(k) deferrals generally defer federal income tax until withdrawal. Roth 401(k) deferrals use after-tax pay and qualified withdrawals can be federal income-tax free. A Roth IRA is a separate account with its own contribution and income rules. Traditional IRA deductibility can also depend on income and workplace coverage.",
        example: "Start with $1,000 of gross pay, an assumed 22% federal tax on the last dollars earned, and 2× growth. A traditional contribution puts in $1,000 and reaches $2,000. After a hypothetical 15% tax on withdrawal, it leaves $1,700. Roth puts in the $780 left after today's tax and reaches $1,560 after a qualified withdrawal. At a 30% withdrawal tax, traditional instead leaves $1,400. This omits payroll and state tax, fees, and any employer match.",
        action: "Compare equal reductions in today's take-home pay. Run more than one future tax assumption and check when the money can come out.",
        sources: [
          { label: "IRS Roth account guidance", url: "https://www.irs.gov/retirement-plans/roth-acct-in-your-retirement-plan" },
          { label: "IRS IRA contributions and deductions", url: "https://www.irs.gov/publications/p590a" },
        ],
      },
      {
        title: "Backdoor Roth and the pro-rata calculation",
        body: "The usual backdoor Roth discussion involves a nondeductible traditional IRA contribution followed by a Roth conversion. Federal reporting uses Form 8606. When you also hold pretax traditional, SEP or SIMPLE IRA money, the calculation considers the combined accounts, including the relevant year-end values and distributions. A workplace plan's after-tax conversion, often called mega backdoor Roth, is a different arrangement that depends on plan features and applicable limits.",
        example: "In a simplified case, you have $93,000 pretax and $7,000 of nondeductible basis in your traditional IRAs. If the only event is a $7,000 conversion, with no market movement and $93,000 left at year end, roughly 7% of the conversion is nontaxable. About $490 is basis and about $6,510 is generally taxable. The account you convert from does not isolate the basis.",
        action: "List every traditional, SEP and SIMPLE IRA and locate prior Forms 8606 before acting. Confirm plan features, eligibility and reporting with the administrator and a qualified tax professional if your situation is complex.",
        sources: [
          { label: "IRS Form 8606 instructions", url: "https://www.irs.gov/instructions/i8606" },
          { label: "IRS 401(k) contribution limits", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits" },
        ],
      },
    ],
  },
  {
    id: "bonds-and-currency",
    title: "Compare yield in the currency you will spend",
    summary: "Read the cash flows behind a quoted rate, then account for fees, inflation, currency and the date you need the money.",
    sections: [
      {
        title: "Treasury bills, bonds, savings bonds and funds",
        body: "A bill typically pays face value at maturity and is commonly bought below that amount. A fixed-rate bond pays coupons and returns principal according to its terms. If you sell a marketable bond early, its price can change when rates move. Bond funds hold a portfolio and can fluctuate with rates and credit conditions. In the U.S., marketable TIPS adjust principal with the specified inflation index, while Series I savings bonds have different accrual and redemption rules.",
        example: "A fictional 90-day bill costs $970 and pays $1,000. The $30 gain is 3.09% of your $970 outlay over the holding period before fees and tax. A discount quote expressed against face value starts from $30 divided by $1,000 and may annualize on a different day count. Neither figure tells you the rate at the next auction.",
        action: "Write down amount paid, amount received, dates, fees and the source's exact rate label. Confirm the day count before using a quoted annual yield to infer the price.",
        sources: [
          { label: "TreasuryDirect marketable securities", url: "https://www.treasurydirect.gov/marketable-securities/" },
          { label: "TreasuryDirect TIPS and I bond comparison", url: "https://www.treasurydirect.gov/research-center/history-of-savings-bond/comparing-tips-to-i/" },
        ],
      },
      {
        title: "Read the Nigerian or Ghanaian auction row",
        body: "CBN publishes Nigerian Treasury bill auction results with tenor, dates and rates. The Debt Management Office separately publishes FGN bond and savings bond terms. Bank of Ghana Treasury bill tables distinguish a discount rate from an interest-rate quote. Start with the actual terms of your trade. A government bill, an international USD sovereign bond and a dollar mutual fund can have different issuers, fee layers, access and exit routes.",
        example: "CBN's October 28, 2026 Nigerian auction table shows a 91-day bill and a 15.40% Issue rate. That dated quote is not a 15.40% gain in 91 days or an executable quote today. For an unrelated fictional Ghana bill, if GH₵960 paid today buys GH₵1,000 at maturity, the period gain is GH₵40 ÷ GH₵960, or 4.17%, before fees and taxes. Use the issue date and rate label when reading a real auction.",
        action: "Ask for your actual purchase price, exact cash flows, custodian, fees and early-exit terms. For a managed fund, read the prospectus for holdings, redemption and who bears a default or currency loss. Verify the operator independently.",
        sources: [
          { label: "CBN Treasury bill auction data", url: "https://www.cbn.gov.ng/rates/GovtSecuritiesDrillDown.html?market=NTB" },
          { label: "Nigeria Debt Management Office FGN bonds", url: "https://www.dmo.gov.ng/fgn-bonds?lang=en" },
          { label: "Bank of Ghana Treasury bill auction data", url: "https://www.bog.gov.gh/treasury-and%20-the-markets/treasury-bill-rates/" },
          { label: "SEC Nigeria operator directory", url: "https://sec.gov.ng/for-investors/find-a-registered-operator/" },
          { label: "SEC Ghana licensed unit trusts", url: "https://licensees.sec.gov.gh/licensees/UnitTrust.php" },
        ],
      },
      {
        title: "Work backward from the goal currency",
        body: "Separate tax residence, citizenship, where the investment is held and the currency in which you will spend. A quoted exchange rate is only one input. Compare what you actually receive after the provider's spread, transfer fees and taxes, and check what happens if getting the money out takes longer than planned.",
        example: "Illustration: $1,000 less a $10 entry fee converts at ₦1,500 per dollar to ₦1,485,000. After 20% local growth the balance is ₦1,782,000. Converting at a hypothetical ₦1,875 per dollar and paying a $10 exit fee leaves $940.40, or −5.96%. If the exit rate were ₦2,000, you would receive $881, or −11.90%. These are hypothetical rates with spread assumed to be included in each quote. Tax is omitted.",
        action: "Get quotes at the same time and compare delivered amounts. Stress-test a weaker local currency, a delayed payout and any withholding tax. Keep records of both conversions and check reporting rules in the relevant jurisdictions.",
        sources: [
          { label: "CBN reference exchange rate series", url: "https://www.cbn.gov.ng/rates/exchratebycurrency.html" },
          { label: "CFPB remittance disclosures and delivered amounts", url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-remittance-transfer-and-what-are-my-rights-en-1161/" },
        ],
      },
    ],
  },
  {
    id: "higher-risk",
    title: "Slow down on the complicated stuff",
    summary: "Know what you could lose, who holds the money and what rights you have before sizing a trade or putting money into a friend's deal.",
    sections: [
      {
        title: "Options, short selling, margin and stop orders",
        body: "A call gives its buyer the right to buy at the strike, and a put gives the right to sell. Options expire and contract size matters. A long option can lose its entire premium. An uncovered short call can generate losses beyond the premium it earned. Shorting stock can have theoretically unlimited loss, and margin can leave you owing money after a forced sale. A stop order triggers a market order and its execution price can move past the stop. A stop-limit order can remain unfilled.",
        example: "One fictional call with a $50 strike, a $2 premium and a 100-share multiplier costs $200. At expiry, a $48 share price produces a $200 loss. At $53, the $300 intrinsic value leaves $100 of profit before costs. A share price of $52 breaks even at expiry. That expiry math does not describe the option's price before expiry.",
        action: "Before evaluating any leveraged trade, write down contract size, expiry, cash at risk, assignment or liquidation mechanics, and what a gap in price could do.",
        sources: [
          { label: "SEC introduction to options", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-63" },
          { label: "SEC on stop and stop-limit orders", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15" },
          { label: "FINRA margin account guidance", url: "https://www.finra.org/investors/investing/investment-accounts/brokerage-accounts/margin-accounts" },
        ],
      },
      {
        title: "A friend's deal still needs an independent check",
        body: "Get the issuer's legal name, what you own, how returns are generated, existing senior debt, and who holds client money. Ask how the business can pay in a bad year, what makes any collateral enforceable, whether you can exit, and who is paid to bring you in. For a pool or club, establish who votes, values the assets, signs transfers and takes over if someone leaves. Registration and offering obligations depend on jurisdiction and facts.",
        example: "Four friends put $2,500 each into an asset. If it sells for $8,000 and $3,000 of senior costs and obligations are paid first, $5,000 remains, or $1,250 each under an equal split. Each lost half before tax. If proceeds do not cover senior obligations, equity can go to zero. A separate personal guarantee could create further liability.",
        action: "Ask for contracts and financial statements, then verify claims with the relevant regulator or a qualified professional outside the deal. Pause when the cash flow, repayment priority or legal rights are unclear. A research-only club can share the work while each person keeps control of their own money.",
        sources: [
          { label: "SEC private placement bulletin", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/private" },
          { label: "SEC investment clubs bulletin", url: "https://www.sec.gov/files/investor/pubs/invclub.htm" },
          { label: "SEC affinity fraud bulletin", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-68" },
        ],
      },
      {
        title: "With crypto, separate the asset from who can move it",
        body: "Self-custody gives you responsibility for keys and backups. With a platform, check who controls the keys, how customer assets are held, whether the platform can lend them out and what rights you have if it fails. A stablecoin adds a separate question about redemption and reserves. A proof-of-reserves report can show some assets at a point in time and still leave questions about liabilities, ownership and what customers could recover.",
        example: "Suppose a fictional $1,000 token holding falls to $600 while the platform pauses withdrawals. The statement displays $600 and you still cannot use it for an urgent bill. A self-custodied token that falls by the same amount can have a different access problem if the keys are lost. In both cases, mark separately what the holding is worth and when you can actually use it.",
        action: "Read the custody and withdrawal terms. Check who can move the funds, what happens in bankruptcy and which recovery options exist. Keep cash needed for a fixed date separate from this risk.",
        sources: [
          { label: "SEC crypto asset custody bulletin", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/crypto-asset-custody-basics-retail-investors-investor-bulletin-0" },
          { label: "SEC on proof-of-reserves reports", url: "https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins/investors" },
        ],
      },
      {
        title: "Check the person, the product and the payment instructions",
        body: "Find the firm using the regulator's own register and compare its exact legal name, permission, contact details and public disciplinary record. Ask whether the person is acting as a broker or investment adviser, who pays them and what the total costs are. Treat pressure to pay, a screenshot of returns, a copied registration number and instructions to send funds to a personal account as reasons to pause.",
        example: "A message says a firm can pay 3% every month with no risk. Monthly compounding at that rate would imply about 42.6% a year before fees. That arithmetic is a reason to ask how the obligation is funded and enforced, and why the issuer needs this financing. It tells you nothing about whether the return can actually be paid.",
        action: "Contact the firm using the number from the official register, then check whether the specific service and payment instructions match. For professional advice, request written fees, conflicts, scope and custody arrangements.",
        sources: [
          { label: "FINRA BrokerCheck", url: "https://brokercheck.finra.org/" },
          { label: "U.S. Investment Adviser Public Disclosure", url: "https://adviserinfo.sec.gov/" },
          { label: "SEC Nigeria operator directory", url: "https://sec.gov.ng/for-investors/find-a-registered-operator/" },
        ],
      },
    ],
  },
];
