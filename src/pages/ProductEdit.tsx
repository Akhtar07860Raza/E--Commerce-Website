import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { api } from "../services/api";

const ProductEdit = () => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userInfo } = useAuthStore();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
      return;
    }

    const fetchProduct = async () => {

      try {

        const data = await api.getProductDetails(id!);

        setName(data.name);
        setPrice(data.price);
        setImage(data.image);
        setBrand(data.brand);
        setCategory(data.category);
        setCountInStock(data.countInStock);
        setDescription(data.description);
        setSizes(data.sizes || []);

      } catch (err: any) {

        setError(err.message || "Error fetching product");

      } finally {

        setLoading(false);

      }

    };

    fetchProduct();

  }, [id, userInfo, navigate]);


  const submitHandler = async (e: React.FormEvent) => {

    e.preventDefault();
    setLoading(true);

    try {

      await api.updateProduct(id!, {
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
        sizes
      });

      navigate("/admin");

    } catch (err: any) {

      setError(err.message || "Error updating product");
      setLoading(false);

    }

  };


  const uploadFileHandler = async (e: any) => {

    const file = e.target.files[0];
    const formData = new FormData();

    formData.append("image", file);

    try {

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData
      });

      const data = await res.text();

      setImage(data);

    } catch (error) {

      console.error(error);

    }

  };


  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const value = e.target.value;
    setSizes(value.split(",").map((s) => s.trim()));

  };


  return (

    <div className="min-h-screen bg-zinc-50 py-12">

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <button
          onClick={() => navigate("/admin")}
          className="text-sm uppercase tracking-wider text-zinc-500 hover:text-gold mb-8"
        >
          ← Go Back
        </button>

        <div className="bg-white p-8 shadow-sm rounded">

          <h1 className="text-3xl font-serif mb-8">Edit Product</h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
              {error}
            </div>
          )}

          {loading ? (

            <div className="flex justify-center py-20">
              <div className="animate-spin h-12 w-12 border-b-2 border-gold"></div>
            </div>

          ) : (

            <form onSubmit={submitHandler} className="space-y-6">

              {/* Product Name */}
              <div>
                <label className="text-sm font-medium">Product Name</label>
                <input
                  type="text"
                  required
                  className="mt-1 w-full border rounded-md py-2 px-3"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>


              {/* Price + Stock */}
              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label>Price (₹)</label>
                  <input
                    type="number"
                    required
                    className="mt-1 w-full border rounded-md py-2 px-3"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label>Count In Stock</label>
                  <input
                    type="number"
                    required
                    className="mt-1 w-full border rounded-md py-2 px-3"
                    value={countInStock}
                    onChange={(e) => setCountInStock(Number(e.target.value))}
                  />
                </div>

              </div>


              {/* Image Upload */}
              <div>

                <label>Image Upload</label>

                <input
                  type="file"
                  onChange={uploadFileHandler}
                  className="mt-2"
                />

                {image && (
                  <img
                    src={image}
                    alt="Preview"
                    className="mt-4 h-40 rounded"
                  />
                )}

              </div>


              {/* Brand + Category */}
              <div className="grid md:grid-cols-2 gap-6">

                <div>
                  <label>Brand</label>
                  <input
                    type="text"
                    className="mt-1 w-full border rounded-md py-2 px-3"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>

                <div>
                  <label>Category</label>

                  <select
                    className="mt-1 w-full border rounded-md py-2 px-3"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >

                    <option value="">Select Category</option>

                    <option value="Women Kurtas">Women Kurtas</option>
                    <option value="Women Suits">Women Suits</option>
                    <option value="Women Abayas">Women Abayas</option>

                    <option value="Girls Frocks">Girls Frocks</option>
                    <option value="Girls Party Dresses">Girls Party Dresses</option>

                  </select>

                </div>

              </div>


              {/* Sizes */}
              <div>
                <label>Sizes</label>
                <input
                  type="text"
                  className="mt-1 w-full border rounded-md py-2 px-3"
                  value={sizes.join(", ")}
                  onChange={handleSizeChange}
                />
              </div>


              {/* Description */}
              <div>
                <label>Description</label>
                <textarea
                  rows={4}
                  className="mt-1 w-full border rounded-md py-2 px-3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>


              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-black text-white py-4 uppercase hover:bg-gold"
              >
                Update Product
              </button>

            </form>

          )}

        </div>

      </div>

    </div>

  );

};

export default ProductEdit;