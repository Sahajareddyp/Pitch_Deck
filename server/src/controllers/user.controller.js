const { supabase } = require("../supabaseClient");

const getUserDetails = async (req, res) => {
  //   let { data: user, error } = await supabase
  //     .from("user")
  //     .select("*")
  //     .eq("email", req.params.email);
  //   console.log("In user deatils");
  //   console.log(user);
  //   console.log(error);
  supabase.auth.getSession().then((data) => {
    console.log("Get session");
    console.log(data);
  });
  // //   console.log(supabase.auth.user());
  const userSession = await supabase.auth.getUser(req.params.session);
  console.log(userSession);

  if (userSession.error) {
    res.status(500).send({ message: "Could not find the user details" });
  } else {
    let { data: user, error } = await supabase
      .from("user")
      .select("*")
      .eq("email", userSession.data.user.email);

    if (error) {
      console.log(error);
      res.status(500).send({ message: "Could not find the user details" });
    } else {
      res.status(200).send({ message: "Found user", data: user });
    }
  }
};

module.exports = { getUserDetails };
