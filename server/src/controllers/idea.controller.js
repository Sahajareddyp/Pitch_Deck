const { supabase } = require("../supabaseClient");
const CryptoJS = require("crypto-js");
const saltRounds = 10;
const PASSPHRASE = "CS484";

const createNewPitch = async (req, res) => {
  console.log(req.body);
  const newPitch = await supabase
    .from("idea")
    .insert([req.body.newPitch])
    .select();
  console.log(newPitch);
  if (newPitch.error) {
    res.status(500).send("Could not create New Pitch. Please try again later");
  } else {
    const idea_id = newPitch.data[0].idea_id;
    const { data, error } = await supabase
      .from("idea-user")
      .insert([{ ideaId: idea_id, userId: req.body.userId }]);

    if (error) {
      res
        .status(500)
        .send("Could not create New Pitch. Please try again later");
    } else {
      res.status(200).send("Created New Pitch");
    }
  }
};

const getAllPitch = async (req, res) => {
  let { data: idea, error } = await supabase.from("idea").select("*");
  // console.log(idea);
  if (error) {
    res
      .status(500)
      .send({ message: "Could not fetch Data. Please try again later" });
  } else {
    let allPitch = [];
    let investedPitch = [];
    let investedPitchIds = [];
    let fullFilledPitches = [];
    let fullFilledPitchesIds = [];

    let { data: invest, error } = await supabase.from("invest").select("*");
    if (error) {
      console.log(error);
      res
        .status(500)
        .send({ message: "Could not fetch Data. Please try again later" });
    } else {
      for (let i = 0; i < invest.length; i++) {
        // console.log(invest[i].investorId);
        // const bytes = CryptoJS.AES.decrypt(invest[i].investorId, PASSPHRASE);
        // const originalText = bytes.toString(CryptoJS.enc.Utf8);
        // console.log(bytes);
        // console.log(originalText);
        if (
          req.params.userId ===
          CryptoJS.AES.decrypt(invest[i].investorId, PASSPHRASE).toString(
            CryptoJS.enc.Utf8
          )
        ) {
          investedPitchIds.push(
            parseInt(
              CryptoJS.AES.decrypt(invest[i].ideaId, PASSPHRASE).toString(
                CryptoJS.enc.Utf8
              )
            )
          );
        }
      }

      let { data: FullfilledInvestment, error } = await supabase
        .from("FullfilledInvestment")
        .select("*")
        .eq("investorId", req.params.userId);

      if (FullfilledInvestment) {
        FullfilledInvestment.forEach((idea) =>
          fullFilledPitchesIds.push(idea.ideaId)
        );
      }

      allPitch = idea.filter(
        (id) =>
          !investedPitchIds.includes(id.idea_id) &&
          !fullFilledPitchesIds.includes(id.idea_id)
      );
      investedPitch = idea.filter(
        (id) =>
          investedPitchIds.includes(id.idea_id) &&
          !fullFilledPitchesIds.includes(id.idea_id)
      );
      fullFilledPitches = idea.filter((id) =>
        fullFilledPitchesIds.includes(id.idea_id)
      );

      const pitchData = {
        allPitch: allPitch,
        investedPitch: investedPitch,
        fullFilledPitch: fullFilledPitches,
      };
      res
        .status(200)
        .send({ message: "Successfully fetched data", data: pitchData });
    }
  }
};

const getPitchByUser = async (req, res) => {
  let { data: ideas, error } = await supabase
    .from("idea-user")
    .select("*")
    .eq("userId", req.params.userId);

  console.log(ideas);

  if (error) {
    res
      .status(500)
      .send({ message: "Could not fetch Data. Please try again later" });
  } else {
    const ideaIds = ideas.map((i) => i.ideaId);

    let { data: idea, error } = await supabase
      .from("idea")
      .select("*")
      .in("idea_id", ideaIds);

    if (error) {
      res
        .status(500)
        .send({ message: "Could not fetch Data. Please try again later" });
    } else {
      let { data: FullfilledInvestment, fullFilledError } = await supabase
        .from("FullfilledInvestment")
        .select("*")
        .in("ideaId", ideaIds);

      if (fullFilledError) {
        res
          .status(500)
          .send({ message: "Could not fetch Data. Please try again later" });
      } else {
        console.log(FullfilledInvestment);
        const investorIds = FullfilledInvestment.map((i) => i.investorId);
        let { data: user, error } = await supabase
          .from("user")
          .select("*")
          .in("id", investorIds);

        if (error) {
          res
            .status(500)
            .send({ message: "Could not fetch Data. Please try again later" });
        } else {
          const fullfilledData = [];
          const fullFilledIdeaIds = [];
          FullfilledInvestment.forEach((investment) => {
            fullFilledIdeaIds.push(investment.ideaId);
            const tempIdea = idea.filter(
              (id) => id.idea_id === investment.ideaId
            );
            const investor = user.filter((u) => u.id === investment.investorId);
            fullfilledData.push({
              ...tempIdea[0],
              investor,
            });
          });
          // console.log(fullFilledIdeaIds);
          // console.log(fullfilledData);
          const pitches = idea.filter(
            (id) => !fullFilledIdeaIds.includes(id.idea_id)
          );
          res
            .status(200)
            .send({
              message: "Successfully fetched data",
              pitches,
              fullfilledData,
            });
        }
      }
    }
  }
};

const editPitch = async (req, res) => {
  const { data, error } = await supabase
    .from("idea")
    .update(req.body.updatedPitch)
    .eq("idea_id", req.body.updatedPitch.idea_id);

  if (error) {
    res
      .status(500)
      .send({ message: "Could not update the pitch. Please try again later." });
  } else {
    res.status(200).send({ message: "Succesfully Updated" });
  }
};

module.exports = { createNewPitch, getAllPitch, getPitchByUser, editPitch };
