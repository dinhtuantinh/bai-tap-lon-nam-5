import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClinic, deleteClinic } from "../../../services/userService";
import { toast } from "react-toastify";
import TableClinic from "../Admin/TableClinic";
import { getAllClinic, editClinic } from "../../../services/userService";
import { Link } from "react-router-dom";
import { update } from "lodash";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      dataClinic: [],
      checkUpdate: false,
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new clinic succeeds!");
      this.setState({
        name: "",
        address: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        dataClinic: [
          ...this.state.dataClinic,
          {
            name: this.state.name,
            address: this.state.address,
            imageBase64: this.state.imageBase64,
            descriptionHTML: this.state.descriptionHTML,
            descriptionMarkdown: this.state.descriptionMarkdown,
          },
        ],
      });
    } else {
      toast.error("Something wrongs...!");
      console.log("check error: ", res);
    }
  };
  handleUpdateClinic = async () => {
    let dataUpdate = {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address,
      imageBase64: this.state.imageBase64,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
    };
    let res = await editClinic(dataUpdate);
    if (res && res.errCode === 0) {
      toast.success("Add new clinic succeeds!");
      let dataAll = await getAllClinic();
      if (dataAll && dataAll.errCode === 0) {
        this.setState({
          dataClinic: dataAll.data ? dataAll.data : [],
        });
      }
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        checkUpdate: false,
      });
    } else {
      toast.error("Something wrongs...!");
      console.log("check error: ", res);
    }
  };
  handleEditClinic = (item) => {
    this.setState({
      id: item.id,
      name: item.name,
      address: item.address,
      imageBase64: item.imageBase64,
      descriptionHTML: item.descriptionHTML,
      descriptionMarkdown: item.descriptionHTML,
      checkUpdate: true,
    });
  };
  handleDeleteClinic = async (item) => {
    try {
      let res = await deleteClinic(item.id);
      if (res && res.errCode === 0) {
        toast.success("Delete clinic succeeds!");
        let dataAll = await getAllClinic();
        if (dataAll && dataAll.errCode === 0) {
          this.setState({
            dataClinic: dataAll.data ? dataAll.data : [],
          });
        }
      } else {
        toast.error(res.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let dataClinic = this.state.dataClinic;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý phòng khám</div>
        <div className="all-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh phòng khám</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnchangeImage(event)}
            />
          </div>
          <div className="col-6 form-group">
            <label>Địa chỉ phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeInput(event, "address")}
            />
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            {this.state.checkUpdate === false ? (
              <button
                className="btn-save-specialty"
                onClick={() => this.handleSaveNewClinic()}
              >
                Save
              </button>
            ) : (
              <button
                className="btn-update-specialty"
                onClick={() => this.handleUpdateClinic()}
              >
                Update
              </button>
            )}
          </div>
          <table id="TableClinic">
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor: "#04AA6D",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  No.
                </td>
                <th>Tên</th>
                <th>Địa chỉ</th>
                <th>Giới thiệu</th>
                <th>Actions</th>
              </tr>
              {dataClinic &&
                dataClinic.length > 0 &&
                dataClinic.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>{item.descriptionMarkdown}</td>
                      <td>
                        <button
                          onClick={() => this.handleEditClinic(item)}
                          className="btn-edit"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          onClick={() => this.handleDeleteClinic(item)}
                          className="btn-delete"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
