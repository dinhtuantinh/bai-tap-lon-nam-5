import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './HomeFooter.scss';
import logo from '../../assets/TUANTINH.svg';
import facebook from '../../assets/facebook.png';
import youtube from '../../assets/youtube.png';
import {withRouter} from 'react-router';
// Import css files
class HomeFooter extends Component {
    returnToHome=()=> {
        if(this.props.history){
            this.props.history.push(`/home`)
        }
    }
    render() {
        
        return (
            <React.Fragment>
                <div className="home-footer-up">
                        <div className="footer-left">
                            <img className="footer-logo" src={logo} onClick={()=>this.returnToHome()}/>
                            <div className="left-content cty">Công ty Cổ phần Công nghệ Tuấn Tỉnh</div>
                            <div className="left-content">
                                <i className="fas fa-map"></i>
                                Km11, Nguyễn Trãi, Hà Đông, Hà Nội</div>
                            <div className="left-content">
                                <i className="fas fa-check"></i>
                                ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 22/02/2022</div>
                        </div>
                        <div className="footer-right">
                            <div className="right-content">
                                <div className="right-content-up">Trụ sở tại Hà Nội</div>
                                <div className="right-content-down">Km11, Nguyễn Trãi, Hà Đông, Hà Nội</div>
                            </div>
                            <div className="right-content">
                                <div className="right-content-up">Trụ sở tại New York</div>
                                <div className="right-content-down">Phố Wall, tiểu bang New York, Hoa Kỳ</div>
                            </div>
                            <div className="right-content">
                                <div className="right-content-up">Hỗ trợ khách hàng</div>
                                <div className="right-content-down">tinhchuai12345@gmail.com (7h - 18h)</div>
                            </div>
                            <div className="right-link">
                                <div className="link">
                                    <a href="https://www.facebook.com/tinh.dinh.1806/" ><img className="link-icon" src={facebook} /></a>
                                    <a href="https://www.youtube.com/channel/UCtda3BADeg1LRooqlqmsztg" ><img className="link-icon" src={youtube} /></a>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="home-footer-down">
                    <p>&copy; 2022 Đinh Tuấn Tỉnh. More information, please visit my youtube channel.
                        <a target="_blank" href="https://www.youtube.com/channel/UCtda3BADeg1LRooqlqmsztg">
                            &#8594; Click here &#8592;</a></p>
                </div>
            </React.Fragment>
            
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.user.language,
        userInfo:state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFooter));