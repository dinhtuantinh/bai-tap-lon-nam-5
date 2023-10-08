import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './About.scss';
// Import css files
class About extends Component {
    
    render() {
        //<iframe width="100%" height="400px" src="https://www.youtube.com/embed/UKQAoFgjs3Q" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        return (
            <div className="section-share section-about">
                <div className="section-about-header">
                    Kênh youtube của Tuấn Tỉnh ❤️
                </div>
                <div className="section-about-content">
                    <div className="content-left">
                        <iframe width="100%" className="about-link" height="400px" src="https://www.youtube.com/embed/UKQAoFgjs3Q" 
                        title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; 
                        encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                    <div className="content-right">
                        <p>
                        ❤️ Kênh youtube chính thức của mình. Mọi người vào ủng hộ cho mình nha. Nếu thấy hay thì like, subscribe và share để kênh mình phát triển hơn ❤️
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.user.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);