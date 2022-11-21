import React, { useEffect, useState } from "react";

const ProfileStatus = (props) => {
  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect( () => {
    setStatus(props.status);
  }, [props.status]);

  const activeEditMode = () => {
    setEditMode(!editMode);
    if(editMode) {
      props.updateStatus(status)
    }
  }

  const statusChangeHandler = (e) => {
    setStatus(e.target.value);
  }

  return (
    <div>
      {editMode
        ? <div>
            <input autoFocus className="input" onChange={statusChangeHandler} onBlur={activeEditMode} value={status}></input>
          </div>
        : <span onDoubleClick={activeEditMode}>{props.status || "No status"}</span>
      }
    </div>
  );
};

export default ProfileStatus;