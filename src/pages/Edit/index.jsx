import React, { useState, useEffect} from 'react';
import axios from "axios";
import { useHistory, useParams } from 'react-router-dom';
import Input from "../../components/Input";

const Edit = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [status, setStatus] = useState(true);
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");
  // const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() =>{
    getProductById();
    // eslint-disable-next-line
  },[])

  const loadImage = (e) => {
    const image = e.target.files[0];
    setImage(image);
    setPreview(URL.createObjectURL(image))
  }
  
  const updateProduct = async (e) => {
    e.preventDefault();   
    let formData = new FormData();
    formData.append("name", name)
    formData.append("price", price)
    formData.append("stock", stock)
    formData.append("status", status)
    formData.append("image", image)
     
    try {
      await axios.put(`https://backend-crud-m.herokuapp.com/api/v2/product/${id}`,
      formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Data Berhasil Dirubah");
      history.push("/")
    } catch (error) {
      alert("Data Gagal Dirubah");
      console.log(error)
    }
  }

  const getProductById = async () => {
    const response = await axios.get(`https://backend-crud-m.herokuapp.com/api/v2/product/${id}`);
    setName(response.data.name);
    setPrice(response.data.price);
    setStock(response.data.stock);
    setStatus(response.data.status);
    setPreview(response.data.image_url);
  }

  return (
    <div className="main">
      <div className="card">
        <h2>Edit Produk</h2>
        <br />
        <form onSubmit={updateProduct}>
          <Input name="name" label="Nama" type="text" placeholder="Nama Produk..." value={name} onChange={(e) => setName(e.target.value)}   />

          <Input name="price" type="number" placeholder="Harga Produk..." label="Harga" value={price} onChange={(e) => setPrice(e.target.value)}/>

          <Input name="Stock" type="number" placeholder="Stock Produk..." label="Stock" value={stock} onChange={(e) => setStock(e.target.value)}/>

          <Input type="file" className="file-input" onChange={loadImage}/>
          <br/>
          <span className="file-cta">
            <span className="file-label">Choose a file...</span>
          </span>
          <br/>
          {preview ? (
            <figure className='image 128x128'>
               { /* eslint-disable-next-line */ }
              <img src={preview} alt="Preview Image" width={200}/>
            </figure>
          ) : (
            ""
          )
          }

          <Input name="status" type="checkbox" label="Active" checked={status} onChange={e => setStatus(e.target.checked)}/>

          <br/>

          <button type="submit" className="btn btn-primary">Simpan</button>
        </form>
      </div>
    </div>
  )
}

export default Edit;
