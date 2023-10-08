import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AlikeComponent.scss';
import { FormattedMessage } from 'react-intl';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter';
import {getAllNote} from '../../services/userService';
import { withRouter } from 'react-router';
class Note extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataNotes: [],
        }
    }
    async componentDidMount() {
        let res = await getAllNote();
        if(res && res.errCode===0){
            this.setState({
                dataNotes: res.data ? res.data : []
            })
        }
    }
    handleViewDetailNote = (note) => {
        if(this.props.history){
            this.props.history.push(`/detail-note/${note.id}`)
            }
    }
    render() {
        let {dataNotes} = this.state;
        return (
            <>
            <HomeHeader/>
            <div className="section-share section-medical-facility">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section"><FormattedMessage id="component.note"/></span>
                </div>
                <div className="section-body body-component">
                        {dataNotes && dataNotes.length>0 &&
                            dataNotes.map((item, index)=>{
                                return(
                                    <div className="section-customize clinic-child content-component" key={index}
                                        onClick={()=>this.handleViewDetailNote(item)}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Note));