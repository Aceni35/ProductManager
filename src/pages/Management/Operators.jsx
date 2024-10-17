import React, { useEffect, useState } from "react";
import MyModal from "../../components/MyModal";
import EditOperator from "../../components/EditOperator";
import AddOperatorModal from "../../components/AddOperatorModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteOperator, getOperators } from "../../slices/ManagementSlice";
import MySpinner from "../../components/MySpinner";

const Operators = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setAdd] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(null);
  const [editSelected, setEditSelected] = useState(null);
  const { operatorAccess, operators, username } = useSelector(
    (store) => store.manage
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (operatorAccess === null || operatorAccess === true) {
      dispatch(getOperators());
    }
  }, []);
  return (
    <>
      {deleteSelected != null && (
        <MyModal
          show={showModal}
          setShow={setShowModal}
          title={"Delete User?"}
          Body={<ModalBody deleteSelected={deleteSelected} />}
          Buttons={
            <ModalButtons
              deleteSelected={deleteSelected}
              setShow={setShowModal}
            />
          }
        />
      )}
      {editSelected != null && (
        <EditOperator
          show={showEdit}
          setShow={setShowEdit}
          selected={editSelected}
        />
      )}
      <AddOperatorModal show={showAdd} setShow={setAdd} />
      <div className="row  bg-white my-2 rounded">
        <div className="col-8 fs-4">All operators ({operators.length})</div>
        <div
          className="col-4 text-primary fs-6 text-center my-auto"
          onClick={() => setAdd(true)}
          role="button"
        >
          Add operator
        </div>
        <div className="col-3">Name : </div>
        {operators.map((x) => {
          return (
            <div className="col-12 my-2 px-4 rounded">
              <SingleOperator
                setShow={setShowModal}
                setEdit={setShowEdit}
                setDeleteSelected={setDeleteSelected}
                key={x.name}
                user={x}
                name={username}
                setEditSelected={setEditSelected}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const SingleOperator = ({
  setShow,
  setEdit,
  user,
  setDeleteSelected,
  setEditSelected,
  name,
}) => {
  return (
    <>
      <div
        className="row text-white rounded fs-4 py-1"
        style={{ background: "#1f7a8c" }}
      >
        <div className="col-sm-6 col-4 text1 my-auto">{user.name}</div>
        {name != user.name && (
          <>
            <div className="col-sm-3 col-4 my-auto text-center">
              <button
                className="btn btn-danger text1"
                onClick={() => {
                  setDeleteSelected(user);
                  setShow(true);
                }}
              >
                Remove Operator
              </button>
            </div>
            <div className="col-sm-3 col-4 text-primary text-center my-auto">
              <button
                className="btn btn-light text1"
                onClick={() => {
                  setEditSelected(user);
                  setEdit(true);
                }}
              >
                Edit Access
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

const ModalBody = ({ deleteSelected }) => {
  return (
    <div className="row">
      <div className="col-12">
        Are you sure you want to remove {deleteSelected.name}?
      </div>
    </div>
  );
};
const ModalButtons = ({ deleteSelected, setShow }) => {
  const dispatch = useDispatch();
  const { deleteOperatorLoading } = useSelector((store) => store.manage);
  return (
    <>
      <button
        className="btn btn-danger"
        disabled={deleteOperatorLoading}
        onClick={() => dispatch(deleteOperator({ deleteSelected, setShow }))}
      >
        {deleteOperatorLoading ? <MySpinner /> : "Delete User"}
      </button>
      <button className="btn btn-primary" onClick={() => setShow(false)}>
        Close
      </button>
    </>
  );
};

export default Operators;
