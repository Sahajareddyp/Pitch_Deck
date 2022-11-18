const { supabase } = require("../supabaseClient");

const getUserDetails = async (req, res) => {
  let { data: user, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", req.params.email);
  //   console.log("In user deatils");
  //   console.log(user);
  //   console.log(error);
    supabase.auth.getSession().then((data) => {
      console.log("Get session");
      console.log(data);
    })
  // //   console.log(supabase.auth.user());
  supabase.auth.getUser(req.params.session).then((data) => {
      console.log("Get User");
      console.log(data);
    })

  res.status(200).send({ message: "Something", data: user });
};

module.exports = { getUserDetails };
