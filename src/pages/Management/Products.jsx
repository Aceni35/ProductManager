import React, { useEffect, useState } from "react";
import EditModal from "../../components/EditModal";
import AddProductsModal from "../../components/AddProductModal";
import { useDispatch, useSelector } from "react-redux";
import { changeSort, getProducts } from "../../slices/ManagementSlice";
import { ToastContainer } from "react-toastify";

const Products = () => {
  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [selected, setSelected] = useState(null);

  const dispatch = useDispatch();
  const { access, products, sort } = useSelector((store) => store.manage);

  useEffect(() => {
    if (access === null || access === true) {
      dispatch(getProducts());
    }
  }, []);

  return (
    <>
      <ToastContainer />
      {selected != null && (
        <EditModal show={showEdit} setShow={setShowEdit} selected={selected} />
      )}
      <AddProductsModal show={showAdd} setShow={setShowAdd} />
      <div className="row bg-white mt-3 py-2">
        <div className="col-6 fs-4rounded my-auto fs-4">
          All products ({products.length})
        </div>
        <div className="col-3">
          <button
            className="btn btn-outline-dark text-center"
            onClick={() => setShowAdd(true)}
          >
            Add product
          </button>
        </div>
        <div className="col-3 fs-6 text-center my-auto">
          Sort by{" "}
          <select
            name=""
            id=""
            value={sort}
            onChange={(e) => dispatch(changeSort(e.target.value))}
          >
            {" "}
            <option value="none">None</option>
            <option value="from-lowest">Price lowest to highest</option>
            <option value="from-highest">Price highest to lowest</option>
          </select>{" "}
        </div>
        <div className="col-3 mt-2 ">Name :</div>
        <div className="col-3 mt-2">Price :</div>
        <div className="col-3 mt-2">Weight :</div>
        {products.map((x) => {
          return (
            <SingleProduct
              key={x.id}
              setShow={setShowEdit}
              product={x}
              setSelected={setSelected}
            />
          );
        })}
      </div>
    </>
  );
};

const SingleProduct = ({ setShow, product, setSelected }) => {
  const { name, price, weight, id } = product;

  return (
    <>
      <div className="col-12 my-2 px-4">
        <div
          className="row fs-4 rounded text-white text1"
          style={{ background: "#fca311" }}
        >
          <div className="col-3 text-break">{name}</div>
          <div className="col-3">{price} $</div>
          <div className="col-3">{weight}g</div>
          <div
            className="col-3 text-dark fs-6 text-center my-auto"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setSelected(product);
              console.log(product);
              setShow(true);
            }}
          >
            Edit Product
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
