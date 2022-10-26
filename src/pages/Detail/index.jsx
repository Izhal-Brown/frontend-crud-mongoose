import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";
import './index.scss';

const Detail = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();

  useEffect(() =>{
    getProductById();
    // eslint-disable-next-line 
  },[])

  const getProductById = async (e) => {
    const response = await axios.get(`https://backend-crud-m.herokuapp.com/api/v2/product/${id}`);
    setProduct(response.data)
  }

  const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <div className="main">
      <Link to="/" className="btn btn-primary">Kembali</Link>
      <table className="table">
        <tbody>
            <tr>
              <td>ID</td>
              <td>: {product._id}</td>
            </tr>
            <tr>
              <td>Name</td>
              <td>: {product.name}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>: {rupiah(product.price)}</td>
            </tr>
            <tr>
              <td>Stock</td>
              <td>: {product.stock}</td>
            </tr>
            <tr>
              <td>Image</td>
              <td>
                {product.image_url ? (
                <figure>
                  { /* eslint-disable-next-line */ }
                  <img src={product.image_url} alt="Preview Image" width={128}/>
                </figure>
              ) : (
                ""
              )
              }
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Detail;
