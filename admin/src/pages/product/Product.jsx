import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {addProduct, updateProduct} from "../../redux/apiCalls";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import app from "../../firebase";

export default function Product() {

    const [file, setFile] = useState(null);
    const location = useLocation();
    const productId = location.pathname.split("/")[2];

    const [pStats, setPStats] = useState([]);
    const dispatch = useDispatch();

    const product = useSelector((state) =>
        state.product.products.find((product) => product._id === productId)
    );
    const [inputs, setInputs] = useState(product);
    const [cat, setCat] = useState(product.categories);
    const [siz, setSiz] = useState(product.sizes);
    const [col, setCol] = useState(product.color);
    console.log(product);

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    const handleChange = (e) => {
        setInputs((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("orders/income?pid=" + productId);
                const list = res.data.sort((a,b)=>{
                    return a._id - b._id
                })
                list.map((item) =>
                    setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [productId, MONTHS]);

    const handleCat = (e) => {
        setCat(e.target.value.split(","));
    };

    const handleSiz = (e) => {
        setSiz(e.target.value.split(","));
    };

    const handleCol = (e) => {
        setCol(e.target.value.split(","));
    };

    const handleUpdate= (e) => {
        e.preventDefault();
        console.log(inputs);
        if (file) {
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                        default:
                    }
                },
                (error) => {
                    // Handle unsuccessful uploads
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        const newProduct = { ...inputs, image: downloadURL, categories: cat, sizes: siz, color: col };
                        updateProduct(productId, newProduct, dispatch);
                    });
                }
            );
        }
        else {
            const newProduct = { ...inputs, categories: cat, sizes: siz, color: col };
            updateProduct(productId, newProduct, dispatch);
        }
    }

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product</h1>
                <Link to="/newproduct">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
           {/* <div className="productTop">
                <div className="productTopLeft">
                    <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
                </div>
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img src={product.image} alt="" className="productInfoImg" />
                        <span className="productName">{product.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">{product._id}</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">sales:</span>
                            <span className="productInfoValue">5123</span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">in stock:</span>
                            <span className="productInfoValue">{product.inStock}</span>
                        </div>
                    </div>
                </div>
            </div>*/}
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input name="title" type="text"
                               placeholder={product.title}
                               defaultValue={product.title}
                               onChange={handleChange}/>
                        <label>Product Description</label>
                        <input name="description" type="text"
                               placeholder={product.description}
                               defaultValue={product.description}
                               onChange={handleChange}
                        />
                        <label>Price</label>
                        <input name="price" type="text"
                               placeholder={product.price}
                               defaultValue={product.price}
                               onChange={handleChange}/>
                        <label>Categories</label>
                        <input type="text"
                               placeholder={product.categories.join(",")}
                               defaultValue={product.categories.join(",")}
                               onChange={handleCat}/>
                        <input type="text"
                               placeholder={product.sizes.join(",")}
                               defaultValue={product.sizes.join(",")}
                               onChange={handleSiz}/>
                        <input type="text"
                               placeholder={product.color.join(",")}
                               defaultValue={product.color.join(",")}
                               onChange={handleCol}/>
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img src={product.image} alt="" className="productUploadImg" />
                            <label for="file">
                                <Publish />
                            </label>
                            <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])}/>
                        </div>
                        <button onClick={handleUpdate} className="productButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    );
}