import React, { useEffect, useState } from "react";
import { GrEdit } from "react-icons/gr";
import MyModal from "../../components/MyModal";
import AddCompanyModal from "../../components/AddCompanyModal";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccount,
  RemoveCompany,
  updatePassword,
} from "../../slices/ManagementSlice";
import MySpinner from "../../components/MySpinner";

const Account = () => {
  const [showDelete, setDelete] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [deleteSelected, setDeleteSelected] = useState(null);
  const [showChange, setShowChange] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    oldPass: "",
    newPass: "",
    confirmPass: "",
  });
  const { accountLoading, accountInfo, nameLoading } = useSelector(
    (store) => store.manage
  );

  useEffect(() => {
    dispatch(getAccount());
  }, []);

  if (accountLoading) {
    return (
      <>
        <div className="row">
          <div className="col-12 text-center">
            <MySpinner />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <MyModal
        setShow={setShowChange}
        title={"Change Password"}
        Body={<ChangeBody data={data} setData={setData} />}
        Buttons={
          <ChangeButtons
            setShow={setShowChange}
            data={data}
            setData={setData}
          />
        }
        show={showChange}
      />
      {deleteSelected != null && (
        <MyModal
          show={showDelete}
          setShow={setDelete}
          Body={<ModalBody deleteSelected={deleteSelected} />}
          Buttons={
            <ModalButtons setShow={setDelete} deleteSelected={deleteSelected} />
          }
          title={"Remove Company?"}
        />
      )}
      <AddCompanyModal show={showCompany} setShow={setShowCompany} />
      <div className="row bg-white mt-3 rounded">
        <div className="col-6 fs-4">Company Name</div>
        <div className="col-6 fs-4 my-auto">{accountInfo.name}</div>
        <div className="col-6 fs-4">Account ID</div>
        <div className="col-6 fs-4">{accountInfo.accountID}</div>
        <div className="col-6 fs-4">Owner</div>
        <div className="col-6 fs-4">{accountInfo.owner}</div>
        <div className="col-6 fs-4">Password</div>
        <div className="col-6 fs-4">
          <span>
            <GrEdit
              className="ms-2"
              cursor={"pointer"}
              onClick={() => {
                setShowChange(true);
              }}
            />
          </span>
        </div>

        <div className="col-6 fs-4">Date Created</div>
        <div className="col-6 fs-4">{accountInfo.created}</div>
      </div>
      <div className="row mt-3 bg-white rounded py-2">
        <div className="col-7 fs-3 ">
          Companies ({accountInfo.companies.length})
        </div>

        <div className="col-5 fs-3 text-center my-auto">
          <button
            className="btn btn-outline-dark"
            onClick={() => setShowCompany(true)}
          >
            {" "}
            Add Company
          </button>
        </div>
        <div className="col-6">Company name :</div>
        <div className="col-3 text-center">ID :</div>
        {accountInfo.companies.map((x) => {
          return (
            <div className="col-12 px-4" key={x.accountID}>
              <SingleCompany
                setShow={setDelete}
                company={x}
                setDeleteSelected={setDeleteSelected}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

const SingleCompany = ({ setShow, company, setDeleteSelected }) => {
  return (
    <>
      <div className="row rounded my-2 fs-4" style={{ background: "#9a8f97" }}>
        <div className="col-sm-6 col-5 my-auto">{company.name}</div>
        <div className="col-3 text-center my-auto">{company.accountID}</div>
        <div className="col-sm-3 col-4 text-center py-1">
          <button
            className="btn btn-danger"
            onClick={() => {
              setDeleteSelected(company);
              setShow(true);
            }}
          >
            Remove
          </button>
        </div>
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
const ModalButtons = ({ setShow, deleteSelected }) => {
  const dispatch = useDispatch();
  const { removeCompanyLoading } = useSelector((store) => store.manage);
  return (
    <>
      <button
        className="btn btn-danger"
        disabled={removeCompanyLoading}
        onClick={() =>
          dispatch(
            RemoveCompany({ accountID: deleteSelected.accountID, setShow })
          )
        }
      >
        {removeCompanyLoading ? <MySpinner /> : "Delete Company"}
      </button>
      <button className="btn btn-primary" onClick={() => setShow(false)}>
        Close
      </button>
    </>
  );
};

const ChangeBody = ({ data, setData }) => {
  return (
    <div className="row">
      <div className="col-6 my-2">Enter Old password</div>
      <div className="col-6 my-2">
        <input
          type="text"
          value={data.oldPass}
          onChange={(e) => setData({ ...data, oldPass: e.target.value })}
        />
      </div>
      <div className="col-6 my-2">Enter New password</div>
      <div className="col-6 my-2">
        <input
          type="text"
          value={data.newPass}
          onChange={(e) => {
            setData({ ...data, newPass: e.target.value });
          }}
        />
      </div>
      <div className="col-6 my-2">Confirm Password</div>
      <div className="col-6 my-2 ">
        <input
          type="text"
          value={data.confirmPass}
          onChange={(e) => {
            setData({ ...data, confirmPass: e.target.value });
          }}
        />
      </div>
    </div>
  );
};

const ChangeButtons = ({ data, setShow, setData }) => {
  const dispatch = useDispatch();
  const { passwordLoading } = useSelector((store) => store.manage);
  return (
    <>
      <button className="btn btn-primary" onClick={() => setShow(false)}>
        Close
      </button>
      <button
        className="btn btn-secondary"
        disabled={passwordLoading}
        onClick={() => {
          dispatch(updatePassword({ data, setShow }));
          setData({
            oldPass: "",
            newPass: "",
            confirmPass: "",
          });
        }}
      >
        {" "}
        {passwordLoading ? <MySpinner /> : "Change"}
      </button>
    </>
  );
};

export default Account;
