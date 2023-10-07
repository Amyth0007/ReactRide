import React from 'react'
import Styles from '../styles/UserCard.module.css'

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import UpdateUser from "./UpdateUser";

function Cards({ item, index, delet, handleOpen, handleClose, open}) {
  return (
    <>
      <div className={Styles.customCard} key={index}>
        <div className={Styles.cardContent}>
          <div className={Styles.title}>
            <div className={Styles.name}>{item.name}</div>
            <div className={Styles.email}>Email : {item.email}</div>
          </div>
          <div className={Styles.body}>
            Phone : {item.phone ? item.phone : "no data found"}
          </div>
        </div>
        <div className={Styles.cardButtons}>
          <DeleteIcon
            style={{ marginRight: "0.6rem" }}
            onClick={() => delet(item._id)}
          />
          <EditIcon style={{ marginRight: "0.6rem" }} onClick={handleOpen} />
          <div
            className={Styles.modal}
            style={{ display: open ? "block" : "none" }}
          >
            <div className={Styles.modalContent}>
              <button
                className={`${Styles.button} ${Styles.closeButton}`}
                onClick={handleClose}
              >
                Close
              </button>
              <div className={Styles.updateUser}>
                <UpdateUser item={item} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;