const bcrypt = require("bcrypt");
const { supabase } = require("../supabaseClient");
const CryptoJS = require("crypto-js");
const saltRounds = 10;
const PASSPHRASE = "CS484";

const createInvestment = async (req, res) => {
  console.log(req.body);
  const investorId = CryptoJS.AES.encrypt(
    req.body.newInvestment.investorId,
    PASSPHRASE
  ).toString();
  console.log(investorId);
  //   console.log(CryptoJS.AES.decrypt(investorId, PASSPHRASE).toString(CryptoJS.enc.Utf8))
  const ideaId = CryptoJS.AES.encrypt(
    req.body.newInvestment.ideaId.toString(),
    PASSPHRASE
  ).toString();

  const count = CryptoJS.AES.encrypt(
    req.body.newInvestment.count.toString(),
    PASSPHRASE
  ).toString();

  const comment = CryptoJS.AES.encrypt(
    req.body.newInvestment.comment,
    PASSPHRASE
  ).toString();

  const investment = await supabase
    .from("invest")
    .insert([
      {
        investorId: investorId,
        ideaId: ideaId,
        count: count,
        comment: comment,
      },
    ])
    .select();

  if (investment.error) {
    console.log(investment.error);
    res
      .status(400)
      .send("There was some issue with the server. Please try again later");
  } else {
    res.status(200).send("Successfully added the investment");
  }
};

const getInvestementDetails = async (req, res) => {
  const ideaId = req.params.ideaId;
  const userId = req.params.userId;
  let details = {};
  let isDetailsPresent = false;

  let { data: invest, error } = await supabase.from("invest").select("*");
  if (error) {
    res
      .status(500)
      .send({ message: "Could not fetch Data. Please try again later" });
  } else {
    for (let i = 0; i < invest.length; i++) {
      console.log("Invest");
      console.log(invest[i].investorId);
      console.log(CryptoJS.AES.decrypt(invest[i].investorId, PASSPHRASE));
      if (
        userId ===
          CryptoJS.AES.decrypt(invest[i].investorId, PASSPHRASE).toString(
            CryptoJS.enc.Utf8
          ) &&
        ideaId ===
          CryptoJS.AES.decrypt(invest[i].ideaId, PASSPHRASE).toString(
            CryptoJS.enc.Utf8
          )
      ) {
        details = {
          id: invest[i].id,
          count: CryptoJS.AES.decrypt(invest[i].count, PASSPHRASE).toString(
            CryptoJS.enc.Utf8
          ),
          comment: CryptoJS.AES.decrypt(invest[i].comment, PASSPHRASE).toString(
            CryptoJS.enc.Utf8
          ),
        };
        isDetailsPresent = true;
        break;
      }
    }
    res
      .status(200)
      .send({ message: "Found details", details, isDetailsPresent });
  }
};
module.exports = { createInvestment, getInvestementDetails };
