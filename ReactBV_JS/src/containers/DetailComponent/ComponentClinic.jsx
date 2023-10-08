import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './AlikeComponent.scss';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import {getAllClinic} from '../../services/userService';
import { withRouter } from 'react-router';
class ComponentClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataClinics: [],
        }
    }
    async componentDidMount() {
        let res = await getAllClinic();
        if(res && res.errCode===0){
            this.setState({
                dataClinics: res.data ? res.data : []
            })
        }
    }
    handleViewDetailClinic = (clinic) => {
        if(this.props.history){
            this.props.history.push(`/detail-clinic/${clinic.id}`)
            }
    }
    render() {
        let {dataClinics} = this.state;
        return (
            <>
            <HomeHeader/>
            <div className="section-share section-medical-facility">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section"><FormattedMessage id="component.clinic"/></span>
                </div>
                <div className="section-body body-component">
                        {dataClinics && dataClinics.length>0 &&
                            dataClinics.map((item, index)=>{
                                return(
                                    <div className="section-customize clinic-child content-component" key={index}
                                        onClick={()=>this.handleViewDetailClinic(item)}
                                    >
                                        <div>
                                            <div className="bg-image section-medical-facility"
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentClinic));