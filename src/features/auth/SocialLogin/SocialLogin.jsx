import React from "react";
import { Button, Icon } from "semantic-ui-react";
import "../../../style/form.css";

const SocialLogin = ({ socialLogin }) => {
  return (
    <div className="socialLogin">
      <Button
        onClick={() => socialLogin("facebook")}
        type="button"
        style={{ marginBottom: "10px", backgroundColor: "#4267B2" }}
        fluid
        color="facebook"
      >
        <Icon name="facebook" /> Login with Facebook
      </Button>

      <Button
        onClick={() => socialLogin("google")}
        type="button"
        style={{ marginBottom: "10px", backgroundColor: "#D84E46" }}
        fluid
        color="google plus"
      >
        <Icon name="google plus" />
        Login with Google
      </Button>
    </div>
  );
};

export default SocialLogin;
