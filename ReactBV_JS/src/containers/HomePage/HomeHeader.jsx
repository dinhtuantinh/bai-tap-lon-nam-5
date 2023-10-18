import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logo from "../../assets/TUANTINH.svg";
import clock from "../../assets/clock.png";
import phone from "../../assets/phone.png";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/";
import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions";
import Select from "react-select";
import { getDetailInforDoctor } from "../../services/userService";
import * as actions from "../../store/actions";
import Specialty from "./Section/Specialty";
import { getAllSpecialty } from "../../services/userService";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowComponent: false,
      keyword: "",
      selectedOption: "",
      listSpecialty: [],
      selectedSpecialty: "",
      specialtyId: "",
    };
    this.handleComponentSpecialty = this.handleComponentSpecialty.bind(this);
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resSpecialty } = this.props.allRequiredDoctorInfor;
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      this.setState({
        listSpecialty: dataSelectSpecialty,
      });
    }
  }
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listSpecialty } = this.state;
    let res = await getDetailInforDoctor(selectedOption.value);
    if (res && res.errCode === 0) {
      let specialtyId = "",
        selectedSpecialty = "";
      if (res.data.Doctor_Infor) {
        specialtyId = res.data.Doctor_Infor.specialtyId;
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
      }
      this.setState({
        selectedSpecialty: selectedSpecialty,
      });
    } else {
      this.setState({
        selectedSpecialty: "",
      });
    }
  };
  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
    this.props.history.push(
      `/detail-specialty/${stateCopy.selectedSpecialty.value}`
    );
  };
  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  handleComponentSpecialty = () => {
    if (this.props.history) {
      this.props.history.push(`/component-specialty`);
    }
  };
  handleComponentClinic = () => {
    if (this.props.history) {
      this.props.history.push(`/component-clinic`);
    }
  };
  handleComponentDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/component-doctor`);
    }
  };
  handleComponentNote = () => {
    if (this.props.history) {
      this.props.history.push(`/component-note`);
    }
  };
  // handleViewComponentSpecialty = (item) =>{
  //     if(this.props.history){
  //     this.props.history.push(`/detail-specialty/${item.id}`)
  //     }
  // }
  render() {
    let language = this.props.language;
    //let {listSpecialty}=this.state;
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              {/* <i className="fas fa-bars"></i> */}
              <img
                className="header-logo"
                src={logo}
                onClick={() => this.returnToHome()}
              />
            </div>
            <div className="top-center-content">
              <div className="content-info">
                <img className="content-info-img" src={clock} />
                <div className="content-info-name">Monday - Friday</div>
                <div className="content-info-note">9AM - 9PM</div>
              </div>
              <div className="content-info">
                <img className="content-info-img" src={phone} />
                <div className="content-info-name">0348807703</div>
                <div className="content-info-note">24/7 - Đặt lịch khám</div>
              </div>
            </div>
          </div>
        </div>

        <div className="home-header-container home-header-container-down">
          <div className="home-header-content">
            <div className="left-content">
              <div className="search">
                <div className="row">
                  <div className="col-10 form-group">
                    <Select
                      value={this.state.selectedSpecialty}
                      onChange={this.handleChangeSelectDoctorInfor}
                      options={this.state.listSpecialty}
                      placeholder={
                        <FormattedMessage id="admin.manage-doctor.search" />
                      }
                      name="selectedSpecialty"
                      className="text-search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="center-content">
              <div
                className="child-content"
                onClick={() => this.returnToHome()}
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "bold",
                    color: "#857f7f",
                  }}
                >
                  TRANG CHỦ
                </div>
              </div>
              <div
                className="child-content"
                onClick={() => this.handleComponentSpecialty()}
              >
                <div className="name-option">
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.speciality" />{" "}
                  </b>
                </div>
                {/* <div className="subs-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div> */}
              </div>
              <div
                className="child-content"
                onClick={() => this.handleComponentDoctor()}
              >
                <div className="name-option">
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                {/* <div className="subs-title">
                  <FormattedMessage id="homeheader.select-doctor" />
                </div> */}
              </div>
              <div
                className="child-content"
                onClick={() => this.handleComponentNote()}
              >
                <div className="name-option">
                  <b>
                    <FormattedMessage id="homeheader.handbook" />
                  </b>
                </div>
                {/* <div className="subs-title">
                  <FormattedMessage id="homeheader.golden-notebook" />
                </div> */}
              </div>
              <div
                className="child-content"
                onClick={() => this.handleComponentClinic()}
              >
                <div className="name-option">
                  <b>
                    <FormattedMessage id="homeheader.health-facility" />
                  </b>
                </div>
                {/* <div className="subs-title">
                  <FormattedMessage id="homeheader.select-room" />
                </div> */}
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <a href="https://www.facebook.com/tinh.dinh.1806/">
                  <i className="fas fa-question-circle"></i>
                  <FormattedMessage id="homeheader.support" />
                </a>
              </div>
              {/* <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div> */}
            </div>
          </div>
        </div>

        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
            </div>
            {/* <div className="content-down">
              <div className="options">
                <div
                  className="option-child"
                  onClick={() => this.handleComponentSpecialty()}
                >
                  <div className="icon-child">
                    <i className="fas fa-hospital"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child1" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child2" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-procedures"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child3" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-flask"></i>
                  </div>
                  <div className="text-child">
                    {" "}
                    <FormattedMessage id="banner.child4" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child5" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.child6" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    lang: state.user.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
