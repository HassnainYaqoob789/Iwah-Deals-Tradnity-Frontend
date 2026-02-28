import React from 'react'
import SocialLogin from 'react-social-login'

class SocialButton extends React.Component {
    render() {
        return (
            <a onClick={this.props.triggerLogin} {...this.props} className="social-icon">
            { this.props.children }
         </a>
        );
    }
}
export default SocialLogin(SocialButton);