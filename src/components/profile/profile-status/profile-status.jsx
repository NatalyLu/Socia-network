import React, { useEffect, useState } from "react";

const ProfileStatus = ({status, updateStatus}) => {
  let [editMode, setEditMode] = useState(false);
  let [useStateStatus, setUseStateStatus] = useState(status);

  useEffect( () => {
    setUseStateStatus(status);
  }, [status]);

  const activeEditMode = () => {
    setEditMode(!editMode);
    if(editMode) {
      updateStatus(useStateStatus)
    }
  }

  const statusChangeHandler = (e) => {
    setUseStateStatus(e.target.value);
  }

  return (
    <div>
      {editMode
        ? <div>
            <input autoFocus className="input" onChange={statusChangeHandler} onBlur={activeEditMode} value={useStateStatus}></input>
          </div>
        : <span onDoubleClick={activeEditMode}>{status || "No status"}</span>
      }
    </div>
  );
};

export default ProfileStatus;