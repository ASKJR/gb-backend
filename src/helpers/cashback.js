const computeCashback = (value) => {
  let cashbackPercentage = 0;
  if (value <= 1000) {
    cashbackPercentage = 0.1;
  } else if (value <= 1500) {
    cashbackPercentage = 0.15;
  } else {
    cashbackPercentage = 0.2;
  }
  
  const cashback_percentage = (cashbackPercentage * 100) + '%';
  const cashback_value = cashbackPercentage * value;
  
  return {cashback_percentage, cashback_value}; 
}

module.exports = {
  computeCashback,
}
