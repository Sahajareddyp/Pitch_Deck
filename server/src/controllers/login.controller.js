const bcrypt = require("bcrypt");
const { supabase } = require("../supabaseClient");

const loginUser = async (req, res) => {
  const { user, session, error } = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });
  console.log("Signed IN");
  console.log(user);
  console.log(error);
  console.log(session);
  console.log("Signed IN Done");
  if (error) {
    res.status(500).send({ message: "Invalid Email/Password" });
  } else {
    res.status(200).send(user);
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Inside first");
      console.log(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Inside second");
      console.log(session);
    });
  }
};

const logoutUser = async (req, res) => {
  const { error } = await supabase.auth.signOut();
  console.log(error);
  if (error) {
    res.status(500).send({ message: "Unable to log out" });
  } else {
    res.status(200).send({ message: "Logged out" });
  }
};

module.exports = { loginUser, logoutUser };
