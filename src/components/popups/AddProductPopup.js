import React, { useState } from "react";
import "./AddProductPopup.css";

const AddProductPopup = (setProducts) => {
  const [companyname, setCompanyname] = useState("");
  const [category, setCategory] = useState("");
  const [addlogourl, setAddlogourl] = useState("");
  const [linkofproduct, setLinkofproduct] = useState("");
  const [adddescription, setAdddescription] = useState("");
  const [showPopup, setShowPopup] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const addedProduct = {
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

    fetch("https://productlistingproject.onrender.com/api/addproduct", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        token: `${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(addedProduct),
    })
      .then((res) => {
        console.log("Response Headers:", res.headers); // Log response headers
        return res.json();
      })
      .then((data) => {
        console.log(data, "productRegister");
        setShowPopup(false);
        fetch("http://localhost:4000/api/addproduct")
          .then((res) => res.json())
          .then((products) => {
            // Update the state with the fetched products, including the newly added one
            setProducts(products);
          })
          .catch((error) => {
            console.log(error);
          });
      });
  };

  return (
    <>
      {showPopup && (
        <div className="addproductpopup-container">
          <div className="addproduct-popup">
            <h1>Add your product</h1>
            <div className="addproductformpopup">
              <form>
                <div className="companyname">
                  <input
                    type="textbox"
                    name="companyname"
                    placeholder="Name of the company"
                    onChange={(e) => setCompanyname(e.target.value)}
                  ></input>
                </div>
                <div className="category">
                  <input
                    type="textbox"
                    name="category"
                    placeholder="Category"
                    onChange={(e) => setCategory(e.target.value)}
                  ></input>
                </div>
                <div className="addlogourl">
                  <input
                    type="text"
                    name="addlogourl"
                    placeholder="Add logo url"
                    onChange={(e) => setAddlogourl(e.target.value)}
                    required
                  ></input>
                </div>
                <div className="linkofproduct">
                  <input
                    type="textbox"
                    name="linkofproduct"
                    placeholder="Link of product"
                    onChange={(e) => setLinkofproduct(e.target.value)}
                  ></input>
                </div>
                <div className="adddescription">
                  <input
                    type="textbox"
                    name="adddescription"
                    placeholder="Add description"
                    onChange={(e) => setAdddescription(e.target.value)}
                  ></input>
                </div>
                <div className="addproductbuttonpopup">
                  <span onClick={handleSubmit}>+Add</span>
                </div>
              </form>
            </div>
            <div className="text">
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

export default AddProductPopup;
