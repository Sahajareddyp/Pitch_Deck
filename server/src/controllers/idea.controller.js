const { supabase } = require("../supabaseClient");

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
  console.log(idea);
  if (error) {
    res
      .status(500)
      .send({ message: "Could not fetch Data. Please try again later" });
  } else {
    res.status(200).send({ message: "Successfully fetched data", data: idea });
  }
};

module.exports = { createNewPitch, getAllPitch };
