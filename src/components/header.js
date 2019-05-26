import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withRouter
} from 'react-router-dom'


import { Link } from 'react-router-dom';

class Header extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillUnmount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        /*
          if (nextProps.deletedPost.error && nextProps.deletedPost.error.message) { //delete failure
              alert(nextProps.deletedPost.error.message || 'Could not delete. Please try again.');
          } else if (nextProps.deletedPost.post && !nextProps.deletedPost.error) { //delete success
              this.props.history.push('/')

          } else if (this.props.user.user && !nextProps.user.user) { //logout (had user(this.props.user.user) but no loger the case (!nextProps.user.user))
              this.props.history.push('/')

          }*/
    }



    renderSignInLinks() {
        const { type, authenticatedUser } = this.props;
        if (authenticatedUser) {
            return (

                <div />

            );
        } else {
            return (
                <ul className="nav  nav-pills navbar-right">
 
          </ul>
            );
        }
    }

    renderLinks() {
        const { type, authenticatedUser } = this.props;
        if (type === 'posts_index') {
            return (
                <div className="container">
          <ul className="nav  nav-pills navbar-right">
            <li style={{paddingRight: '10px'}} role="presentation">      
              <Link style={{color:'#337ab7',  fontSize: '17px'}} to="/posts/new">
              New Post
              </Link>
            </li>
          </ul>
         {this.renderSignInLinks(authenticatedUser)}

        </div>
            );
        } else if (type === 'posts_new') {
            return (
                <div className="container">
          {this.renderSignInLinks(authenticatedUser)}
          <ul className="nav  nav-pills navbar-left">
            <li style={{paddingRight: '10px'}} role="presentation">      
              <Link className="text-xs-right"  style={{color:'#337ab7',  fontSize: '17px'}}  to="/">Back To Index</Link>
            </li>
          </ul>
        </div>
            );
        } else if (type === 'posts_show') {
            return (
                <div className="container">
          <ul className="nav  nav-pills navbar-left">
            <li style={{paddingRight: '10px'}} style={{color:'#337ab7',  fontSize: '17px'}}  role="presentation"><Link to="/">Back To Index</Link></li>
          </ul>
         
          <div className="navbar-form navbar-right" style={{paddingRight: '50px'}}>
            <button className="btn btn-warning pull-xs-right"  onClick={()=> {this.props.onDeleteClick()}}>Delete Post</button>
          </div>
           {this.renderSignInLinks(authenticatedUser)}
         </div>
            );
        }
    };

    render() {
        const { authenticatedUser } = this.props;
        console.log('USER PROPS HEADER', this.props)
        return (
            <nav className="navbar navbar-expand-md home">
        <div className="container">
         <a className="navbar-brand d-flex align-items-center" href="/">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                           width="30.000000pt" height="30.000000pt"  viewBox="0 0 197.000000 197.000000"
                           preserveAspectRatio="xMidYMid meet">
                          <g transform="translate(0.000000,197.000000) scale(0.100000,-0.100000)"
                          fill="#0073E6" stroke="none">
                          <path d="M904 1778 c-122 -86 -221 -191 -289 -307 l-44 -73 -21 43 c-31 61
                          -110 165 -165 219 l-46 45 -66 -68 c-113 -120 -189 -257 -234 -427 -32 -121
                          -33 -336 -1 -465 64 -258 256 -502 494 -625 510 -266 1138 -32 1351 501 41
                          104 59 194 64 324 11 272 -91 531 -282 715 l-47 45 -65 -70 c-35 -38 -88 -106
                          -115 -152 l-51 -83 -43 73 c-45 75 -131 179 -199 239 -56 49 -147 108 -166
                          108 -9 0 -42 -19 -75 -42z m134 -224 c102 -90 197 -251 232 -396 63 -265 -19
                          -547 -218 -742 -46 -45 -64 -57 -80 -52 -33 11 -147 139 -193 218 -23 40 -56
                          113 -73 163 -28 83 -30 101 -30 230 0 119 3 151 23 215 45 145 134 288 229
                          370 26 22 49 40 52 40 3 0 29 -21 58 -46z m-651 -216 c72 -147 80 -179 93
                          -378 18 -290 101 -482 287 -667 46 -46 77 -83 69 -83 -37 0 -178 54 -246 94
                          -193 113 -325 297 -370 517 -25 119 -25 199 0 317 18 90 99 282 119 282 4 0
                          26 -37 48 -82z m1298 -30 c47 -100 65 -175 72 -293 16 -298 -145 -583 -407
                          -723 -69 -37 -193 -82 -226 -82 -8 0 23 37 69 82 185 182 268 372 288 653 5
                          72 13 155 18 187 12 67 53 175 94 241 28 46 30 47 44 28 7 -11 29 -53 48 -93z"/>
                          </g>
                          </svg>
          </a>


           <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              {authenticatedUser && 
                <li className="nav-item">
                  <Link role="presentation" className="nav-link"  to="/admin/studio/new">
                    Studio
                  </Link>
                </li>  
              } 
              
              {authenticatedUser && 
                <li className="nav-item">
                  <a className="nav-link"  onClick={this.props.logout} href="javascript:void(0)">
                    Log out
                  </a>
                </li>
                    }
              {!authenticatedUser &&
                <li className="nav - item">
                <Link className="nav-link" role="presentation" to="/signup">
                          Sign up
                        </Link>
                        </li>
                      }
              {!authenticatedUser &&
                <li className="nav-item">
                <Link className="nav-link" to = "/signin" >
                    Sign in
                    </Link>
                </li>      
                }
            </ul>
            {authenticatedUser &&  
                  <Link className="btn btn-secondary nav-btn" to="/profile">
                    Profile
                    <img src="images/button-arrow-blue.svg" height="9" alt="" />
                  </Link>
 
              }
            
          </div> 
     </div> 
    </nav>

        );
    }
}

export default withRouter(Header)