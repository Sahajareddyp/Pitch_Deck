const bcrypt = require("bcrypt");
const { supabase } = require("../supabaseClient");
const { createClient } = require("@supabase/supabase-js");

const loginUser = async (req, res) => {
  const user = await supabase.auth.signInWithPassword({
    email: req.body.email,
    password: req.body.password,
  });
  console.log("Signed IN");
  console.log(user);
  console.log(user.error);
  // console.log("Signed IN Done");
  if (user.error) {
    res.status(500).send({ message: "Invalid Email/Password" });
  } else {
    res.status(200).send({
      message: "logged In successfully",
      session: user.data.session,
      user: user.data.user,
    });
    supabase.auth.getSession().then((data) => {
      console.log("Inside first");
      console.log(data);
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

const forgotPassword = async (req, res) => {
  let userData = await supabase
    .from("user")
    .select("*")
    .eq("email", req.body.email);

  console.log(userData);
  const response = await supabase.auth.resetPasswordForEmail(req.body.email, {
    redirectTo: `${req.body.location}/passwordRecovery`,
  });
  console.log(response);
  if (response.error) {
    res.status(400).send({
      message: "There was some issue in the server. Please try again later.",
    });
  } else {
    res
      .status(200)
      .send({ message: "Password Recovery link has been sent to your email" });
  }
};

const resetPassword = async (req, res) => {
  const password = req.body.password;
  const accessToken = req.body.accessToken;
  const supabaseUsingToken = createClient(
    process.env.VITE_APP_SUPABASE_URL,
    "",
    {
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        auth: {
          persistSession: true,
        },
      },
    }
  );
  // const intialize = await supabaseUsingToken.auth.initialize();
  // console.log(intialize);
  const setSession = await supabaseUsingToken.auth.setSession({
    access_token: accessToken,
  });
  // console.log(setSession);
  // const refreshSession = await supabaseUsingToken.auth.refreshSession(
  //   setSession.data.session
  // );
  // console.log(refreshSession);
  const userSession = await supabaseUsingToken.auth.getUser();
  console.log(userSession);

  // let response = await supabaseUsingToken.auth.admin.updateUserById(
  //   userSession.data.user.id,
  //   {
  //     password,
  //   }
  // );
  // let response = await supabaseUsingToken.auth.updateUser({ password });
  let response = await  supabase.auth.admin.listUsers()
  console.log(response);
  if (response.error) {
    res
      .status(400)
      .send({ message: "Could not change password. Please try again later." });
  } else {
    res.status(200).send({ message: "Password changed successfully" });
  }
};
module.exports = { loginUser, logoutUser, forgotPassword, resetPassword };
