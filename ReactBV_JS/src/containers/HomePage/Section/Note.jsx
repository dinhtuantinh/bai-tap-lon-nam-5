import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Note.scss';
import { FormattedMessage } from 'react-intl';

import Slider from 'react-slick';
import {getAllNote} from '../../../services/userService';
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
    handleComponentNote = () => {
        if(this.props.history){
            this.props.history.push(`/component-note`)
        }
    }
    render() {
        let {dataNotes} = this.state;
        return (
            <div className="section-share section-medical-facility">
            <div className="section-container">
                <div className="section-header">
                    <span className="title-section"><FormattedMessage id="homepage.note"/></span>
                    <button className="btn-section"
                        onClick={()=>this.handleComponentNote()}
                    ><FormattedMessage id="homepage.more-infor"/></button>
                </div>
                <div className="section-body">
                    <Slider {...this.props.settings}>
                        {dataNotes && dataNotes.length>0 &&
                            dataNotes.map((item, index)=>{
                                return(
                                    <div className="section-customize clinic-child" key={index}
                                        onClick={()=>this.handleViewDetailNote(item)}
                                    >
                                        <div className="bg-image section-medical-facility"
                                            style={{backgroundImage:`url(${item.image})`}}
                                        />
                                        <div className="customize-content clinic-name">{item.name}</div>
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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Note));