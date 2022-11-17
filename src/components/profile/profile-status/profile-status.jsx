import React from "react";

class ProfileStatus extends React.Component {

  state = {
    editMode: false,
    status: this.props.status
  }

  // либо создаем метод и байндим, либо за нас это сделает стрелочная функция :)
  activeEditMode = () => {
    this.setState({editMode: !this.state.editMode})
    if(this.state.editMode) {
      this.props.updateStatus(this.state.status)
    }
  }

  statusChangeHandler = (e) => {
    this.setState({status: e.target.value});
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.status !== this.props.status) {
      this.setState({status: this.props.status});
    }
  }

  render(){
    return (
      <div>
        {this.state.editMode
          ? <div>
              <input autoFocus className="input" onChange={this.statusChangeHandler} onBlur={this.activeEditMode} value={this.state.status}></input>
            </div>
          : <span onDoubleClick={this.activeEditMode}>{this.props.status || "No status"}</span>
        }
      </div>
    );
  }
};

export default ProfileStatus;