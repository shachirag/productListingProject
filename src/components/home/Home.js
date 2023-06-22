import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import designimage from "../../assets/designimage.png";
import commentsign from "../../assets/commentsign.png";
import upsign from "../../assets/upsign.png";
import commentsign2 from "../../assets/commentsign2.png";
import SignupPopup from "../popups/SignupPopup.js";
import arrowsign from "../../assets/arrowsign.png";
import dummyimage from "../../assets/dummyimage.png";
import AddProductPopup from "../popups/AddProductPopup.js";
import EditProductPopup from "../popups/EditProductPopup.js";

const Home = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({});
  const [isCommentVisible, setCommentVisible] = useState({});
  const loggedIn = localStorage.getItem("loggedIn");
  const navigate = useNavigate();
  const [isAddProductPopupOpen, setAddProductPopupOpen] = useState(false);
  const [isSignupPopupOpen, setSignupPopupOpen] = useState(false);
  const [isEditProductPopupOpen, setEditProductPopupOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedProductEditId, setSelectedProductEditId] = useState(null);
  const [upvotesSortOption, setUpvotesSortOption] = useState("dropupvotes");
  const [commentsSortOption, setCommentsSortOption] = useState("dropcomments");

  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }

    const storedVisibility = localStorage.getItem("isCommentVisible");
    if (storedVisibility) {
      setCommentVisible(JSON.parse(storedVisibility));
    }
  }, []);

  useEffect(() => {
    fetch("http://localhost:4000/api/addproduct")
      .then((res) => res.json())
      .then((products) => {
        const productsWithUpvotes = products.map((product) => ({
          ...product,
          upvotes: 0,
          commentsCount: 0,
        }));
        setProducts(productsWithUpvotes);
        localStorage.setItem(
          "products",
          JSON.stringify(removeCircularReferences(productsWithUpvotes))
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const removeCircularReferences = (obj) => {
    const cache = new WeakSet();
    return JSON.parse(
      JSON.stringify(obj, (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (cache.has(value)) {
            return; // Remove circular reference
          }
          cache.add(value);
        }
        return value;
      })
    );
  };
  useEffect(() => {
    localStorage.setItem(
      "comments",
      JSON.stringify(removeCircularReferences(comments))
    );
  }, [comments]);
  useEffect(() => {
    localStorage.setItem(
      "isCommentVisible",
      JSON.stringify(removeCircularReferences(isCommentVisible))
    );
  }, [isCommentVisible]);

  const handleUpvotesClick = (productId) => {
    // Find the product by ID
    const updatedProducts = products.map((product) => {
      if (product._id === productId) {
        return {
          ...product,
          upvotes: product.upvotes + 1,
        };
      }
      return product;
    });

    // Update the products state with the incremented upvotes count
    setProducts(updatedProducts);
    localStorage.setItem(
      "products",
      JSON.stringify(removeCircularReferences(updatedProducts))
    );
  };

  const handleAddProducts = (newProduct) => {
    if (loggedIn) {
      setAddProductPopupOpen(true);
      newProduct.upvotes = 0;
      newProduct.commentsCount = 0;
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem(
        "products",
        JSON.stringify(removeCircularReferences(updatedProducts))
      );
    } else {
      setSignupPopupOpen(true);
    }
  };

  const handleEditProducts = (productId) => {
    if (loggedIn) {
      setSelectedProductEditId(productId);
      setEditProductPopupOpen(true);

      setEditProductPopupOpen(!isEditProductPopupOpen);
    }
  };

  const toggleCommentSection = (productId, e) => {
    setSelectedProductId((prevSelectedProductId) => {
      if (prevSelectedProductId === productId) {
        setCommentVisible((prevIsCommentVisible) => {
          const updatedVisibleComments = { ...prevIsCommentVisible };
          delete updatedVisibleComments[productId];
          localStorage.setItem(
            "isCommentVisible",
            JSON.stringify(removeCircularReferences(updatedVisibleComments))
          );
          return updatedVisibleComments;
        });
        return null;
      } else {
        setCommentVisible((prevIsCommentVisible) => ({
          ...prevIsCommentVisible,
          [productId]: true,
        }));
        localStorage.setItem(
          "isCommentVisible",
          JSON.stringify({ ...isCommentVisible, [productId]: true })
        );
        handleCommentChange(productId, e);
        return productId;
      }
    });
  };

  const handleCommentChange = (productId, e) => {
    const { value } = e.target;
    setNewComment((prevNewComment) => ({
      ...prevNewComment,
      [productId]: value,
    }));
  };

  const addComment = (productId) => {
    if (newComment[productId] && newComment[productId].trim() !== "") {
      setComments((prevComments) => {
        const updatedComments = { ...prevComments };
        const commentsForProduct = updatedComments[productId] || [];
        updatedComments[productId] = [
          ...commentsForProduct,
          newComment[productId],
        ];
        return updatedComments;
      });
      setProducts((prevProducts) => {
        const updatedProducts = prevProducts.map((product) => {
          if (product._id === productId) {
            return {
              ...product,
              commentsCount: product.commentsCount + 1,
            };
          }
          return product;
        });
        localStorage.setItem(
          "products",
          JSON.stringify(removeCircularReferences(updatedProducts))
        );
        return updatedProducts;
      });
      setNewComment((prevNewComment) => ({
        ...prevNewComment,
        [productId]: "",
      }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <div className="homecontainer">
      <div className="homenavbar">
        <nav>
          <h1>Feedback</h1>
          {loggedIn ? (
            <>
              <div className="logoutdetails">
                <span id="logout" onClick={handleLogout}>
                  Logout
                </span>
                <span id="hello">Hello!</span>
                <img src={dummyimage} alt=""></img>
              </div>
            </>
          ) : (
            <>
              <span>
                <Link to="/login" id="login">
                  Log in
                </Link>
              </span>
              <span>
                <Link to="/signup" id="signup">
                  Sign up
                </Link>
              </span>
            </>
          )}
        </nav>
      </div>
      <div className="mainpagedesign">
        <div className="designimage">
          <img src={designimage} alt=""></img>
        </div>
        <div className="designtext">
          <h1>
            Add your products and give<br></br> your valuable feedback
          </h1>
          <p>
            Easily give your feedback in a matter of minutes. Access your{" "}
            <br></br>audience on all plaforms. Observe result manually in real
            time.
          </p>
        </div>
      </div>
      <div className="maincontent">
        <div className="filtercontainer">
          <div className="filtertext">
            <h1>Feedback</h1>
            <span>Apply Filter</span>
          </div>
          <div className="filters">
            <div className="all">
              <span>All</span>
            </div>
            <div className="fintech">
              <span>Fintech</span>
            </div>
            <div className="medtech">
              <span>Medtech</span>
            </div>
            <div className="b2b">
              <span>B2B</span>
            </div>
            <div className="b2c">
              <span>B2C</span>
            </div>
          </div>
        </div>
        <div className="productscontainer">
          <div className="addproductsarea">
            <span id="suggestions">
              {products.length}{" "}
              {products.length === 1 ? "suggestion" : "suggestions"}
            </span>

            <span id="sortby">Sort by:</span>
            <select>
              <option
                value={upvotesSortOption}
                onChange={(e) => setUpvotesSortOption(e.target.value)}
              >
                upvotes
              </option>
              <option
                value={commentsSortOption}
                onChange={(e) => setCommentsSortOption(e.target.value)}
              >
                comments
              </option>
            </select>
            <button onClick={handleAddProducts}>
              <span>+Add Products</span>
            </button>
            {isAddProductPopupOpen && loggedIn && (
              <AddProductPopup setProducts={setProducts} />
            )}
            {isSignupPopupOpen && !loggedIn && <SignupPopup />}
          </div>
          {products.map((product) => (
            <div className="displayedproducts" key={product._id}>
              <div className="producturl">
                <img src={product.addlogourl} alt=""></img>
              </div>
              <div className="productdetails">
                <h1>{product.companyname}</h1>
                <p>{product.adddescription}</p>
                <div className="filtersandcomments">
                  <div className="appliedfilters">
                    <span>{product.category}</span>
                  </div>
                  <div className="comments">
                    <img src={commentsign} alt=""></img>
                    <label
                      onClick={(e) => toggleCommentSection(product._id, e)}
                    >
                      Comments
                    </label>
                  </div>
                  {loggedIn && (
                    <div className="edit">
                      <span onClick={() => handleEditProducts(product._id)}>
                        Edit
                      </span>
                      {isEditProductPopupOpen &&
                        loggedIn &&
                        selectedProductEditId === product._id && (
                          <EditProductPopup />
                        )}
                    </div>
                  )}
                </div>
              </div>
              <div className="upvotes">
                <div className="upvoteslike">
                  <img
                    src={upsign}
                    alt=""
                    onClick={() => handleUpvotesClick(product._id)}
                  ></img>
                  <span>{product.upvotes}</span>
                </div>
                <div className="commentscount">
                  <span>{product.commentsCount}</span>
                  <img src={commentsign2} alt=""></img>
                </div>
              </div>
              {isCommentVisible[product._id] &&
                selectedProductId === product._id && (
                  <div className="commentsection">
                    <div className="commentext">
                      <input
                        type="text"
                        placeholder="Add a comment"
                        value={newComment[product._id] || ""}
                        onChange={(e) => handleCommentChange(product._id, e)}
                      ></input>
                      <img
                        src={arrowsign}
                        alt=""
                        onClick={() => addComment(product._id)}
                      ></img>
                    </div>
                    <div className="displayedcomments">
                      <ul>
                        {comments[selectedProductId] &&
                          comments[selectedProductId].map((comment, index) => (
                            <li key={index}>{comment}</li>
                          ))}
                      </ul>
                    </div>
                  </div>
                )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
