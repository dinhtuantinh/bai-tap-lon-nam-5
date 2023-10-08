import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './AlikeComponent.scss';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import * as actions from '../../store/actions';
import { withRouter } from 'react-router';
import {LANGUAGES} from '../../utils';
class ComponentDoctor extends Component {
    constructor(props) {
        super(props);
        this.state={
            arrDoctors:[]
        };
    }
    componentDidUpdate(prevProps,prevState,snapshot) {
        if(prevProps.topDoctorsRedux!==this.props.topDoctorsRedux){
            this.setState({
                arrDoctors:this.props.topDoctorsRedux
            })
        }
    }
    componentDidMount() {
        this.props.loadTopDoctors();
    }
    handleViewDetailDoctor=(doctor)=>{
        if(this.props.history){
            this.props.history.push(`/detail-doctor/${doctor.id}`)
        }
    }
    render() {
        let arrDoctors=this.state.arrDoctors;
        let {language}=this.props;
        return (
            <>
            <HomeHeader/>
            <div className="section-share section-outstanding-doctor">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section">
                        <FormattedMessage id="component.doctor"/>
                    </span>
                </div>
                <div className="section-body body-component">
                        {arrDoctors && arrDoctors.length > 0 && 
                        arrDoctors.map((item,index)=>{
                            let imageBase64='';
                            if(item.image){
                                imageBase64=new Buffer(item.image,'base64').toString('binary');
                            }
                            let nameVi = `${item.positionData.valueVi},${item.firstName} ${item.lastName}`;
                            let nameEn = `${item.positionData.valueEn},${item.firstName} ${item.lastName}`;
                            return(
                                <div className="section-customize content-component" key={index} onClick={()=>this.handleViewDetailDoctor(item)}>
                                    <div className="customize-border">
                                        <div>
                                        <div className="outer-bg">
                                            <div className="bg-image section-outstanding-doctor"
                                                style={{backgroundImage:`url(${imageBase64})`}}
                                            />
                                        </div>
                                        </div>
                                        <div className="name-component-doctor">
                                            <div>{language===LANGUAGES.VI ? nameVi:nameEn}</div>
                                        </div>
                                    </div>
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
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorsRedux: state.admin.alltopDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors:()=>dispatch(actions.fetchAllTopDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ComponentDoctor));