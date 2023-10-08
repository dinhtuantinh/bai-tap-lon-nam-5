import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./TableClinic.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { getAllClinic } from "../../../services/userService";
import ListClinic from "../Clinic/ListClinic";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}
class TableClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
      dataClinic: [],
    };
  }
  async componentDidMount() {
    this.props.fetchUserRedux();
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinic: res.data ? res.data : [],
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (user) => {
    this.props.deleteAUserRedux(user.id);
  };
  handleEditClinic = (item) => {
    console.log("ok");
    return <Link to={`/system/manage-clinic`}></Link>;
  };
  render() {
    let dataClinic = this.state.dataClinic;
    console.log("dataClinic: ", dataClinic);
    return (
      <React.Fragment>
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
                      <Link
                        to={`/system/manage-clinic/${item.id}`}
                        className="btn-edit"
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </Link>
                      <button
                        onClick={() => this.handleDeleteUser(item)}
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
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TableClinic)
);
