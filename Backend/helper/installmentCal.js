const moment = require('moment')
const db = require('../src/lib/database/query');


const calYears = (months) => {
  let years = null;
  const month = years = months % 12;
  years = parseInt(months / 12);
  if (month === 0) return { years };
  return { years, month }
}

const activateInstallmentInterest = async () => {
  console.log("job1")
  const paid_months = 6;
  let installmentPayments = await db.select_one_with_2conditions('Land_installmental_payments', paid_months, 'paid_months');
  if (installmentPayments) {
    installmentPayments.forEach(async (data) => {
      const condition = 6;
      const { payment_interest, payment } = installmentPayment(Number(data.price_per_plot), 0.5, Number(data.installment_months));
      const update = [payment, payment_interest];
      await db.update_with_2condition('Land_installmental_payments', update, 'paid_months', condition, 'monthly_installmental_pay', 'interest', '_id_user', data._id_user)
    })
  }


}

const getInstallment = async () => {
  console.log("job2")
  const now_time = moment().format("YYYY-MM-Do h:mm:ss")
  let installments = await db.select_with_date_2conditions('Land_installmental_payments', now_time, 'matured_date');
  return installments;
}

const installmentPayment = (per_price, interest, months) => {

  const per_interest = interest / 100;
  let payment_interest = null;
  let payment = null
  const g = 1 + per_interest;
  let equated_monthly_installment = null;

  equated_monthly_installment = (per_interest * (g ** months)) / ((g ** months) - 1);
  equated_monthly_installment = Math.floor(equated_monthly_installment * per_price);

  payment_interest = per_price * per_interest;
  payment = equated_monthly_installment - payment_interest;
  return { payment_interest, payment };
}

const getNewPayment = (per_price, paid, interest) => {
  const interestRate = interest / 100;
  let result = null;
  result = (per_price - paid) * interestRate;
  return result;
}



const getMaturedDate = () => {
  const startTime = moment();
  const matured_date = moment()
  return {
    date: startTime,
    matured_time: matured_date.add(5, 'months')
  }
}

module.exports = {
  installmentPayment,
  getNewPayment,
  getMaturedDate,
  getInstallment,
  activateInstallmentInterest
}