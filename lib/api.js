import axios from "axios";

const API_URL = "https://dummyjson.com";
export const getProducts = async (params = {}) => {
  try {
    const { page = 1, limit = 8, category = '' } = params;

    const skip = (page - 1) * limit;

    let url = `${API_URL}/products`

    if (category && category !== 'all') {
      url = `${API_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
    } else {
      url = `${API_URL}/products?limit=${limit}&skip=${skip}`;
    }

    const response = await axios.get(url);
    const data = response.data;


    return {
      products: response.data.products,
      total: response.data.total,
      totalPages: Math.ceil(response.data.total / limit)
    }
  } catch (error) {
    console.log('Error al cargar los productos', error);
    return {
      error: error
    }
  }
}

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/products/categories`)
    return {
      categories: response.data,
    }
  } catch (error) {
    console.log('Error al cargar los productos', error);
    return {
      error: error
    }
  }
}

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`)
    return response.data;

  } catch (error) {
    console.log('Error al cargar producto', error);
    return {
      error: error
    }
  }
}

export const getRelatedProducts = async (categoryName, productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${categoryName}`)
    const products = response.data.products;

    return products.filter(product => product.id !== parseInt(productId)).slice(0, 4)

  } catch (error) {
    console.log('Error al cargar los productos', error);
    return {
      error: error
    }
  }

}

export const getCart = async () => {
  if (typeof window === 'undefined') return { products: [], total: 0 }

  const cartData = localStorage.getItem('cart');
  return cartData ? JSON.parse(cartData) : { products: [], total: 0 }
}

export const updateCart = async (cartData) => {
  localStorage.setItem('cart', JSON.stringify(cartData))
  return cartData
}

export const login = async (credentials) => {

  try {

    const response = (await axios.post(`${API_URL}/auth/login`, { ...credentials, expiresInMins: 30, }, {
      headers: { 'Content-Type': 'application/json' }
    }));


    if (response.statusText!='OK') return new Error('Credenciales inválidas')

      
    return {
      token: response.data.accessToken,
      user: response.data
    };


  } catch (error) {
    console.log('Login fallido', error);
    return new Error(error)
  }
}

export const register = async (userData) => {
  try {
    const { name, email, password } = userData;

    const response = await axios.post(`${API_URL}/users/add`, {
      firstName: name.firstname,
      lastName: name.lastname,
      email: email,
      password: password,
      username: email
    })

    const data = response.data
    return {
      id: data.id,
      name: {
        firstname: data.firstName,
        lastname: data.lastName
      },
      email: data.email,
      ...data
    };
  } catch (error) {
    console.log('Registro fallido', error);
    return {
      error,
      id: Math.floor(Math.random() * 1000),
      ...userData
    };
  }
}