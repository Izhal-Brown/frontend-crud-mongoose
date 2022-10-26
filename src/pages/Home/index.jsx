import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import './index.scss';

const Home = () => {
  const [products, setProducts] = useState([]);// Membuat state dengan empty array
  const [query, setQuery] = useState("");

  useEffect(() => {
    getProducts()
    // eslint-disable-next-line
  }, []);

  // mengambil semua data product dari backend
  const getProducts = async () => {
    const response = await axios.get("http://localhost:5000/api/v2/product");
    setProducts(response.data)
  }

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v2/product/${id}`)
      getProducts()
      alert("Data Berhasil Dihapus")
    } catch (error) {
      alert("Data Gagal Dihapus")
      console.log(error)
    }
  }

  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR"
    }).format(number);
  }

  return (
    <div className="main">
      <Link to="/tambah" className="btn btn-primary">Tambah Produk</Link>
      <div className="search">
        <input type="text" name="search" onChange={(e) => setQuery(e.target.value)} placeholder="Masukan kata kunci..." />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th className="text-right">Price</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.filter(n => n.name.toLowerCase().includes(query))
          .map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td className="text-right">{rupiah(product.price)}</td>
              <td className="text-center">
                <Link to={`/detail/${product._id}`} className="btn btn-sm btn-info">Detail</Link>
                <Link to={`/edit/${product._id}`} className="btn btn-sm btn-warning">Edit</Link>
                <Link to="#" onClick={() => deleteProduct(product._id)} className="btn btn-sm btn-danger">Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home;