import React, { useState } from "react";
import "./EditProductPopup.css";

const EditProductPopup = () => {
  const [companyname, setCompanyname] = useState("");
  const [category, setCategory] = useState("");
  const [addlogourl, setAddlogourl] = useState("");
  const [linkofproduct, setLinkofproduct] = useState("");
  const [adddescription, setAdddescription] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = {
      companyname,
      category,
      addlogourl,
      linkofproduct,
      adddescription,
    };
    console.log(
      companyname,
      category,
      addlogourl,
      linkofproduct,
      adddescription
    );
    const token = localStorage.getItem("token");
    const productId = localStorage.getItem("productId");
    fetch(`https://productlistingproject.onrender.com/api/editproduct/${productId}`, {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: `${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "productUpdate");
        const productId = data.productId;
        localStorage.setItem("productId", productId);
        setShowPopup(false);
      });
  };

  return (
    <>
      {!showPopup && (
        <div className="editproductpopup-container">
          <div className="editproduct-popup">
            <h1>Add your product</h1>
            <div className="editproductformpopup">
              <form>
                <div className="editcompanyname">
                  <input
                    type="textbox"
                    name="companyname"
                    placeholder="Edit name of the company"
                    onChange={(e) => setCompanyname(e.target.value)}
                  ></input>
                </div>
                <div className="editcategory">
                  <input
                    type="textbox"
                    name="category"
                    placeholder="Edit category"
                    onChange={(e) => setCategory(e.target.value)}
                  ></input>
                </div>
                <div className="editaddlogourl">
                  <input
                    type="textbox"
                    name="addlogourl"
                    placeholder="Edit logo url"
                    onChange={(e) => setAddlogourl(e.target.value)}
                  ></input>
                </div>
                <div className="editlinkofproduct">
                  <input
                    type="textbox"
                    name="linkofproduct"
                    placeholder="Edit link of product"
                    onChange={(e) => setLinkofproduct(e.target.value)}
                  ></input>
                </div>
                <div className="editadddescription">
                  <input
                    type="textbox"
                    name="adddescription"
                    placeholder="Edit description"
                    onChange={(e) => setAdddescription(e.target.value)}
                  ></input>
                </div>
                <div className="editproductbuttonpopup">
                  <span onClick={handleSubmit}>+Update</span>
                </div>
              </form>
            </div>
            <div className="editproducttext">
              <h1> Feedback</h1>
              <p>
                Add your <br></br>products and <br></br>rate other <br></br>item
                here.........
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProductPopup;
