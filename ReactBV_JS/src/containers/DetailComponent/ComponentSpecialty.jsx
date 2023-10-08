import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl';
import './AlikeComponent.scss';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import {getAllSpecialty} from '../../services/userService';
import { withRouter } from 'react-router';
import Slider from 'react-slick';
// Import css files
class ComponentSpecialty extends Component {
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
    handleViewComponentSpecialty = (item) =>{
        if(this.props.history){
        this.props.history.push(`/detail-specialty/${item.id}`)
        }
    }
    render() {
        let {dataSpecially} = this.state;
        return (
            <>
            <HomeHeader/>
            <div className="section-share section-specialty">

                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            <FormattedMessage id="component.specialty"/>
                        </span>
                        
                    </div>
                    <div className="section-body body-component">
                        
                            {dataSpecially && dataSpecially.length > 0 && 
                            dataSpecially.map((item, index)=>{
                                return (
                                    <div className="section-customize specialty-child content-component"
                                        key={index}
                                        onClick={()=>this.handleViewComponentSpecialty(item)}
                                        >
                                            <div>
                                                <div className="bg-image section-specialty"
                                                    style={{backgroundImage:`url(${item.image})`}}
                                                />
                                            </div>
                                        
                                        <div className="name-component">{item.name}</div>
                                    </div>
                                )
                            })
                            }
                            
                        
                    </div>
                    
                </div>
            </div>
            <HomeFooter/>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentSpecialty));