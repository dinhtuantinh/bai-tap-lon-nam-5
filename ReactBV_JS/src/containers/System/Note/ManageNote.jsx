import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageNote.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import {
  createNewNote,
  deleteNote,
  editNote,
  getAllNote,
} from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      dataNote: [],
      checkUpdate: false,
    };
  }
  async componentDidMount() {
    let res = await getAllNote();
    if (res && res.errCode === 0) {
      this.setState({
        dataNote: res.data ? res.data : [],
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

  handleSaveNewNote = async () => {
    let res = await createNewNote(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new Note succeeds!");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
        dataNote: [
          ...this.state.dataNote,
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

  handleUpdateNote = async () => {
    let dataUpdate = {
      id: this.state.id,
      name: this.state.name,
      address: this.state.address,
      imageBase64: this.state.imageBase64,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
    };
    let res = await editNote(dataUpdate);
    if (res && res.errCode === 0) {
      toast.success("Add new Note succeeds!");
      let dataAll = await getAllNote();
      if (dataAll && dataAll.errCode === 0) {
        this.setState({
          dataNote: dataAll.data ? dataAll.data : [],
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
  handleEditNote = (item) => {
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
  handleDeleteNote = async (item) => {
    try {
      let res = await deleteNote(item.id);
      if (res && res.errCode === 0) {
        toast.success("Delete Note succeeds!");
        let dataAll = await getAllNote();
        if (dataAll && dataAll.errCode === 0) {
          this.setState({
            dataNote: dataAll.data ? dataAll.data : [],
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
    let dataNote = this.state.dataNote;
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Quản lý cẩm nang</div>
        <div className="all-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên danh mục</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
            <label>Ảnh về danh mục</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnchangeImage(event)}
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
                onClick={() => this.handleSaveNewNote()}
              >
                Save
              </button>
            ) : (
              <button
                className="btn-update-specialty"
                onClick={() => this.handleUpdateNote()}
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
              {dataNote &&
                dataNote.length > 0 &&
                dataNote.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>{item.descriptionMarkdown}</td>
                      <td>
                        <button
                          onClick={() => this.handleEditNote(item)}
                          className="btn-edit"
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          onClick={() => this.handleDeleteNote(item)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageNote);
