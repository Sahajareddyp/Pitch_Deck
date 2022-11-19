const bcrypt = require("bcrypt");
const { supabase } = require("../supabaseClient");

const registerNewUser = async (req, res) => {
  // console.log(req.body);
  // bcrypt.hash(req.body.password, 10, async (err, hash) => {
  //   // console.log(hash);
  //   // const { data, error } = await supabase
  //   //   .from("user")
  //   //   .insert([{ ...req.body, password: hash }]);

  // });
  const existingUser = await supabase
    .from("user")
    .select("*")
    .eq("email", req.body.emailId);

  console.log(existingUser);

  const { data, error } = await supabase.auth.signUp({
    email: req.body.emailId,
    password: req.body.password,
  });

  if (error) {
    res.status(500).send({ message: "There was some issue with registration" });
  } else {
    const userProfile = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roleid: req.body.roleid,
      company: req.body.company,
    };
    const { userData, registrationError } = await supabase
      .from("user")
      .update(userProfile)
      .eq("id", data.user.id);

    if (registrationError) {
      res
        .status(500)
        .send({ message: "There was some issue with registration" });
    } else {
      res.status(200).send({ message: "Successfully Registered." });
    }
  }
};

module.exports = { registerNewUser };
