import React, { Component } from 'react';
import { connect } from "react-redux";
import {FormattedMessage} from 'react-intl';
import './DetailNote.scss';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import {getDetailNoteById, getAllCodeService} from '../../../services/userService';
import _ from 'lodash';
import {LANGUAGES} from '../../../utils';


class DetailNote extends Component {
    constructor(props) {
        super(props);
        this.state={
            arrDoctorId:[],
            dataDetailNote:{},
        };
    }
    async componentDidMount() {
        if(this.props.match&& this.props.match.params&&this.props.match.params.id){
            let id=this.props.match.params.id;
            let res=await getDetailNoteById({
                id:id,
            });
            if(res && res.errCode===0){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorClinic;
                    if(arr && arr.length>0){
                        arr.map(item=>{
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }
                this.setState({
                    dataDetailNote:res.data,
                    arrDoctorId:arrDoctorId,
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState,snapshot) {
        if(this.props.language !== prevProps.language){

        }
    }
    render() {
        let{arrDoctorId, dataDetailNote} = this.state;
        let {language} = this.props;
        return (
            <div className="detail-specialty-container">
                <HomeHeader/>
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailNote && !_.isEmpty(dataDetailNote) &&
                            <>
                            <div className="clinic-name">{dataDetailNote.name}</div>
                            <div dangerouslySetInnerHTML={{__html: dataDetailNote.descriptionHTML}}>
                            </div>
                            </>
                        }
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 && 
                        arrDoctorId.map((item,index)=>{
                        return(
                            <div className="each-doctor" key={index}>
                                <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                                //dataTime={dataTime}
                                            />
                                        </div>
                                </div>
                                <div className="dt-content-right">
                                    <div className="doctor-schedule">
                                        <DoctorSchedule
                                            doctorIdFromParent={item}
                                        />
                                    </div>
                                    <div className="doctor-extra-infor">
                                        <DoctorExtraInfor
                                            doctorIdFromParent={item}
                                        />
                                    </div>
                                </div>
                            </div>
                        
                    )
                        })
                    }
                </div>
                <HomeFooter/>
            </div>
            
        );
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailNote);
