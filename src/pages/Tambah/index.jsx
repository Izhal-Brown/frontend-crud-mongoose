import React, { useState } from 'react';
import axios from 'axios';
import Input from '../../components/Input';
import './index.scss';
import { useHistory } from 'react-router-dom';

const Tambah = () => {
  const history = useHistory()
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [status, setStatus] = useState(false)
  const [image, setImage] = useState("")
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState([]);


  const ShowErrors = ({ errors }) => {
    return (
      <div style={{ margin: "10px 0px 10px 12px" }}>
        {
          Object.values(errors).map((error, i) => <ol key={i}> {error} </ol>)
        }
      </div>
    )
  }

  const loadImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setPreview(URL.createObjectURL(image))
  }

  const saveProduct = async (e) => {
    e.preventDefault();// agar tidak reload
    let formData = new FormData();
    let message = [];

    formData.append("name", name)
    formData.append("price", price)
    formData.append("stock", stock)
    formData.append("status", status)
    formData.append("image", image)

    try {
      if (name.length <= 3) {
        message = [...message, <li style={{ fontSize: "12px", color: "red" }}>nama produk kurang dari 3 huruf</li>]
      }

      if (price.length === 0) {
        message = [...message, <li style={{ fontSize: "12px", color: "red" }}>Harga produk tidak boleh Kosong</li>]
      }

      if (stock.length === 0) {
        message = [...message, <li style={{ fontSize: "12px", color: "red" }}>Stock produk tidak boleh Kosong</li>]
      }

      if (message.length > 0) {
        setErrors({
          errors: message
        });
      } else {
        setErrors({
          errors: []
        });
      }
      await axios.post('http://localhost:5000/api/v2/product',
        formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert(`
        Nama : ${name} 
        Price : ${price}
        Stock : ${stock}
        Status : ${status}
        \n
        Data Berhasil Ditambahkan
      `);
      history.push("/")
    } catch (error) {
      alert("Data Gagal Ditambahkan")
      console.log(error)
    }



  }
  return (
    <div className="main">
      <div className="card">
        <h2>Tambah Produk</h2>
        <br />
        {errors && <ShowErrors errors={errors} />}
        <form onSubmit={saveProduct}>
          <Input
            name="name"
            type="text"
            placeholder="Nama Produk..."
            label="Nama"
            // value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            name="price"
            type="number"
            placeholder="Harga Produk..."
            label="Harga"
            // value={price} 
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            name="stock"
            type="number"
            placeholder="Stock Produk..."
            label="Stock"
            // value={stock}
            onChange={(e) => setStock(e.target.value)}
          />

          <Input
            name="status"
            type="checkbox"
            label="Active"
            // value={status} 
            onChange={() => setStatus(!status)}
          />

          <Input
            name="image"
            type="file"
            className="file-input"
            onChange={loadImage}
          />

          <br />
          <span className="file-cta">
            <span className="file-label">Choose a file...</span>
          </span>
          <br />
          {preview ? (
            <figure>
              { /* eslint-disable-next-line */}
              <img src={preview} alt="Preview Image" width={200} />
            </figure>
          ) : (
            ""
          )
          }

          <button type="submit" value="Submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Tambah;