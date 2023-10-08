import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import {getAllSpecialty} from '../../../services/userService';
import { withRouter } from 'react-router';

// Import css files
class Specialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSpecially: [],
        }
    }
    async componentDidMount(){
        let res = await getAllSpecialty();
        if(res && res.errCode===0){
            this.setState({
                dataSpecially: res.data ? res.data : []
            })
        }
    }
    handleViewDetailSpecialty = (item) =>{
        if(this.props.history){
        this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    handleComponentSpecialty = () => {
        if(this.props.history){
            this.props.history.push(`/component-specialty`)
        }
    }
    render() {
        let {dataSpecially} = this.state;
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="homepage.specialty-poplular"/>
                        </span>
                        <button className="btn-section"
                            onClick={()=>this.handleComponentSpecialty()}
                        >
                        <FormattedMessage id="homepage.more-infor"/>
                        </button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            {dataSpecially && dataSpecially.length > 0 && 
                            dataSpecially.map((item, index)=>{
                                return (
                                    <div className="section-customize specialty-child" 
                                    key={index}
                                    onClick={()=>this.handleViewDetailSpecialty(item)}
                                    >
                                    <div className="bg-image section-specialty"
                                    style={{backgroundImage:`url(${item.image})`}}
                                    />
                                    <div className="customize-content specialty-name">{item.name}</div>
                                    </div>
                                )
                            })
                            }
                            
                        </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));