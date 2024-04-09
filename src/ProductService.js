const API_BASE_URL = "https://localhost:7157/api/products"; // Assuming your API runs on localhost:5000

const ProductService = {
  getAllProducts: async () => {
    const response = await fetch(API_BASE_URL);
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return response.json();
  },
  addProduct: async (product) => {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    console.log(response)
    if (!response.ok) {
      throw new Error("Failed to add product");
    }
    return response.json();
  },
   
editProduct: async (id, product) => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error("Failed to edit product");
  }
  return response.json();
},
  deleteProduct: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Failed to delete product");
    }
  },
};

export default ProductService;
