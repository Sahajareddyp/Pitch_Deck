const bcrypt = require("bcrypt");
const { supabase } = require("../supabaseClient");

const registerNewUser = async (req, res) => {
  console.log(req.body);
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    console.log(hash);
    const { data, error } = await supabase
      .from("user")
      .insert([{ ...req.body, password: hash }]);

    if (error) {
      res
        .status(500)
        .send({ message: "There was some issue with registration" });
    } else {
      res.status(200).send({ message: "Successfully Registered." });
    }
  });
};

module.exports = { registerNewUser };
