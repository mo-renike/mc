var CronJob = require('cron').CronJob;
const { getInstallment, activateInstallmentInterest } = require('../helper/installmentCal');
class JobService {

  constructor() {
    this.job1 = null;
    this.job2 = null;
  }


  initJob = async (time) => {

    const work1 = async () => {

      // const installments = await getInstallment();
      // if (installments) {
      //   installments.forEach((data) => {
      //     //send mail to users
      //     console.log(data)
      //   })
      // }

    }

    const work2 = async () => {
      // await activateInstallmentInterest();
    }

    this.job1 = new CronJob(time, function () {
      work1();
    });

    this.job2 = new CronJob(time, function () {
      work2();
    });

  }

  startJob = async () => {
    this.job1.start();
    this.job2.start();
  }



}

module.exports = new JobService()