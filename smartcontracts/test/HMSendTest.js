const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("HMSend Contract", function () {
    let hmsend;
    let add1;
    let add2;

    beforeEach(async function () {
        [add1, add2] = await ethers.getSigners();
        const HMSend = await ethers.getContractFactory("HMSend");
        hmsend = await HMSend.deploy();
    });


    describe("HMSend", function () {

        it("Should create proposal", async function () {
            await hmsend.connect(add1).logPayment(add2.address, 100, "message", "gif");
            const payment = await hmsend.payments([0]);
            const from = await payment.from;
            expect(from).to.equal(add1.address);
            const to = await payment.to;
            expect(to).to.equal(add2.address);
            const paymentAmount = await payment.amount;
            expect(paymentAmount).to.equal(100);
            const message = await payment.message;
            expect(message).to.equal("message");
            const gif = await payment.gif;
            expect(gif).to.equal("gif");
        });
        it('Should get and increase transaction count', async () => {
            let txCount = await hmsend.getTxSentCount();
            expect(txCount).to.equal(0);
            await hmsend.connect(add1).logPayment(add2.address, 100, "message", "gif");
            txCount = await hmsend.getTxSentCount();
            expect(txCount).to.equal(1);
        });
        it('Should get all payments', async () => {
            let payments = await hmsend.getAllPayments();
            let length = payments.length;
            expect(length).to.equal(0);
            await hmsend.connect(add1).logPayment(add2.address, 100, "message", "gif");
            payments = await hmsend.getAllPayments();
            length = payments.length;
            expect(length).to.equal(1);
            const from = await payments[0].from;
            expect(from).to.equal(add1.address);
            const to = await payments[0].to;
            expect(to).to.equal(add2.address);

        });




    });
});



