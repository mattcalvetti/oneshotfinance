// oneshotfinance - app.js

// Format number as currency
function formatCurrency(num) {
  if (!num) return '—';
  return '$' + Number(num).toLocaleString();
}

// Handle setup form submission
const setupForm = document.getElementById('setup-form');
if (setupForm) {
  setupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const data = {
      salary: document.getElementById('salary').value,
      cash: document.getElementById('cash').value,
      floor: document.getElementById('floor').value,
      ccBalance: document.getElementById('cc-balance').value,
      ccTarget: document.getElementById('cc-target').value,
      etfValue: document.getElementById('etf-value').value,
      cryptoValue: document.getElementById('crypto-value').value,
      savingsRate: document.getElementById('savings-rate').value,
      investAmount: document.getElementById('invest-amount').value,
      investStart: document.getElementById('invest-start').value,
    budgetHousing: document.getElementById('budget-housing').value,
      budgetFood: document.getElementById('budget-food').value,
      budgetTransport: document.getElementById('budget-transport').value,
      budgetSubscriptions: document.getElementById('budget-subscriptions').value,
      budgetPersonal: document.getElementById('budget-personal').value,
      budgetHealth: document.getElementById('budget-health').value};
    
    localStorage.setItem('oneshotfinance', JSON.stringify(data));
    window.location.href = 'dashboard.html';
  });
}

// Handle landing page button
const startBtn = document.getElementById('start-btn');
if (startBtn) {
  startBtn.addEventListener('click', function() {
    // Check if data exists, go to dashboard; otherwise go to setup
    const stored = localStorage.getItem('oneshotfinance');
    if (stored) {
      window.location.href = 'dashboard.html';
    } else {
      window.location.href = 'setup.html';
    }
  });
}

// Load data on dashboard
function loadDashboard() {
  const stored = localStorage.getItem('oneshotfinance');
  if (!stored) {
    // No data, redirect to setup
    window.location.href = 'setup.html';
    return;
  }
  
  const data = JSON.parse(stored);
  
  // Cash
  const cashVal = document.getElementById('cash-value');
  const cashFloor = document.getElementById('cash-floor');
  const cashCard = document.getElementById('cash-card');
  if (cashVal) cashVal.textContent = formatCurrency(data.cash);
  if (cashFloor) cashFloor.textContent = 'Floor: ' + formatCurrency(data.floor);
  if (cashCard && data.cash && data.floor) {
    if (Number(data.cash) < Number(data.floor)) {
      cashCard.classList.add('status-danger');
    } else if (Number(data.cash) < Number(data.floor) * 1.1) {
      cashCard.classList.add('status-warn');
    }
  }
  
  // Credit Card
  const ccVal = document.getElementById('cc-value');
  const ccTarget = document.getElementById('cc-target');
  const ccCard = document.getElementById('cc-card');
  if (ccVal) ccVal.textContent = formatCurrency(data.ccBalance);
  if (ccTarget) ccTarget.textContent = 'Target: ≤' + formatCurrency(data.ccTarget);
  if (ccCard && data.ccBalance && data.ccTarget) {
    if (Number(data.ccBalance) > Number(data.ccTarget) * 1.1) {
      ccCard.classList.add('status-danger');
    } else if (Number(data.ccBalance) > Number(data.ccTarget)) {
      ccCard.classList.add('status-warn');
    }
  }
  
  // Salary
  const salaryVal = document.getElementById('salary-value');
  if (salaryVal) salaryVal.textContent = formatCurrency(data.salary);
  
  // Savings Rate
  const savingsVal = document.getElementById('savings-value');
  if (savingsVal) savingsVal.textContent = data.savingsRate ? data.savingsRate + '%' : '—';
  
  // Investments
  const etfVal = document.getElementById('etf-value');
  const cryptoVal = document.getElementById('crypto-value');
  const investAmt = document.getElementById('invest-amount');
  const totalInvested = document.getElementById('total-invested');
  
  if (etfVal) etfVal.textContent = formatCurrency(data.etfValue);
  if (cryptoVal) cryptoVal.textContent = formatCurrency(data.cryptoValue);
  if (investAmt) investAmt.textContent = formatCurrency(data.investAmount);
  if (totalInvested) {
    const total = (Number(data.etfValue) || 0) + (Number(data.cryptoValue) || 0);
    totalInvested.textContent = formatCurrency(total);
  }
  
  // Rules status
  const ruleCash = document.getElementById('rule-cash');
  const ruleCashVal = document.getElementById('rule-cash-val');
  if (ruleCashVal) ruleCashVal.textContent = formatCurrency(data.floor);
  if (ruleCash && data.cash && data.floor) {
    ruleCash.classList.add(Number(data.cash) >= Number(data.floor) ? 'ok' : 'warn');
  }
  
  const ruleCC = document.getElementById('rule-cc');
  const ruleCCVal = document.getElementById('rule-cc-val');
  if (ruleCCVal) ruleCCVal.textContent = '≤' + formatCurrency(data.ccTarget) + '/mo';
  if (ruleCC && data.ccBalance && data.ccTarget) {
    ruleCC.classList.add(Number(data.ccBalance) <= Number(data.ccTarget) ? 'ok' : 'warn');
  }
  
  const ruleSavings = document.getElementById('rule-savings');
  const ruleSavingsVal = document.getElementById('rule-savings-val');
  if (ruleSavingsVal) ruleSavingsVal.textContent = data.savingsRate ? data.savingsRate + '%' : '—';
  if (ruleSavings) ruleSavings.classList.add('ok');
  
  const ruleInvest = document.getElementById('rule-invest');
  const ruleInvestVal = document.getElementById('rule-invest-val');
  if (ruleInvestVal) ruleInvestVal.textContent = formatCurrency(data.investAmount) + '/fortnight';
  if (ruleInvest) ruleInvest.classList.add('pending');
  // Budget
  const budgetHousingVal = document.getElementById('budget-housing-val');
  const budgetFoodVal = document.getElementById('budget-food-val');
  const budgetTransportVal = document.getElementById('budget-transport-val');
  const budgetSubscriptionsVal = document.getElementById('budget-subscriptions-val');
  const budgetPersonalVal = document.getElementById('budget-personal-val');
  const budgetHealthVal = document.getElementById('budget-health-val');
  const budgetTotalVal = document.getElementById('budget-total-val');
  
  if (budgetHousingVal) budgetHousingVal.textContent = formatCurrency(data.budgetHousing);
  if (budgetFoodVal) budgetFoodVal.textContent = formatCurrency(data.budgetFood);
  if (budgetTransportVal) budgetTransportVal.textContent = formatCurrency(data.budgetTransport);
  if (budgetSubscriptionsVal) budgetSubscriptionsVal.textContent = formatCurrency(data.budgetSubscriptions);
  if (budgetPersonalVal) budgetPersonalVal.textContent = formatCurrency(data.budgetPersonal);
  if (budgetHealthVal) budgetHealthVal.textContent = formatCurrency(data.budgetHealth);
  
  if (budgetTotalVal) {
    const budgetTotal = (Number(data.budgetHousing) || 0) + 
                        (Number(data.budgetFood) || 0) + 
                        (Number(data.budgetTransport) || 0) + 
                        (Number(data.budgetSubscriptions) || 0) + 
                        (Number(data.budgetPersonal) || 0) + 
                        (Number(data.budgetHealth) || 0);
    budgetTotalVal.textContent = formatCurrency(budgetTotal);
  }
}

// Clear all data
function clearData() {
  if (confirm('This will delete all your data. Are you sure?')) {
    localStorage.removeItem('oneshotfinance');
    window.location.href = 'index.html';
  }
}

// Run on page load
if (document.getElementById('cash-value')) {
  loadDashboard();
}