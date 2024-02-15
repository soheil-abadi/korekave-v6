import { WarningOutlined } from "@ant-design/icons";
import { ConfigProvider, Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  RsetuserManagmentDeleteModal,
  selectuserManagmentDeleteModal,
} from "../../slices/userManagmentSlices";
import { useEffect, useState } from "react";

const DeleteModal = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectuserManagmentDeleteModal);

  // Function to handle modal close
  const handleClose = () => {
    dispatch(RsetuserManagmentDeleteModal(false)); // Close the modal when clicked outside
  };

  // Function to handle confirm deletion
  const handleDelete = () => {
    // Add logic here to delete the user
    // After deletion logic, close the modal
    handleClose();
  };

  return (
    <ConfigProvider>
      <Modal
        title="Delete Confirmation"
        visible={currentUser}
        closable={false}
        maskClosable={true} // Allow closing when clicking outside the modal
        onCancel={handleClose} // Handle closing when clicking the cancel button or outside the modal
        footer={[
          <Button key="cancel" onClick={handleClose}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" onClick={handleDelete}>
            Delete
          </Button>,
        ]}
      >
        <p>Are you sure you want to delete this user?</p>
      </Modal>
    </ConfigProvider>
  );
};

export default DeleteModal;
