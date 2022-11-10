import React from "react";

class ProfileStatus extends React.Component {
  state = {
    editMode: false
  }

  // либо создаем метод и байндим, либо за нас это сделает стрелочная функция :)
  activeEditMode = () => {
    this.setState({editMode: !this.state.editMode})
  }

  render(){
    return (
      <div>
        {this.state.editMode
          ? <div>
              <input autoFocus onBlur={this.activeEditMode} value={this.props.status}></input>
            </div>
          : <span onDoubleClick={this.activeEditMode}>{this.props.status}</span>
        }
      </div>
    );
  }
};

export default ProfileStatus;