import React from "react";
import { connect } from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      // console.log('getting')
      window.gapi.client
        .init({
          clientId:
            "942521834635-s8oqo72lha9a507bf2dqqur3r7agpfj4.apps.googleusercontent.com",
          scope: "email",
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          // console.log('got status')
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  onAuthChange = (isSignedIn) => {
    // console.log(isSignedIn)
    if (isSignedIn) {
      //   console.log(this.auth.currentUser.get().getId());
      this.props.signIn(this.auth.currentUser.get().getId());
    } else {
      this.props.signOut();
    }
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  renderAuthButton() {
    // console.log('then this is executes')
    if (this.props.isSignedIn === null) {
      // console.log("Function", this.props.isSignedIn)
      return null;
    } else if (this.props.isSignedIn) {
      // console.log('its True')
      return (
        <button className="ui red google button" onClick={this.onSignOutClick}>
          <i className="google icon" />
          Sign out
        </button>
      );
    } else {
      return (
        <button className="ui green google button" onClick={this.onSignInClick}>
          <i className="google icon" />
          Sign In
        </button>
      );
    }
  }

  render() {
    return <div>{this.renderAuthButton()}</div>;
  }
}

const mapStatetoProp = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(mapStatetoProp, { signIn, signOut })(GoogleAuth);
