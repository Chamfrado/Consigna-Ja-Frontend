import React, { createContext, useState, useContext } from "react";

// Import your JSON data
import consignadosData from "../data/consignado.json";
import clientsData from "../data/client.json";
import productsData from "../data/produto.json";

// Create the context
const DataContext = createContext();

export const useData = () => {
  return useContext(DataContext);
};

// Create the provider component
export const DataProvider = ({ children }) => {
  const [consignados, setConsignados] = useState(consignadosData);
  const [clients, setClients] = useState(clientsData);
  const [products, setProducts] = useState(productsData);

  // CRUD methods for consignados
  const addConsignado = (newConsignado) => {
    setConsignados([...consignados, newConsignado]);
  };

  const updateConsignado = (id, updatedConsignado) => {
    setConsignados(
      consignados.map((consignado) =>
        consignado.id === id ? updatedConsignado : consignado
      )
    );
  };

  const deleteConsignado = (id) => {
    setConsignados(consignados.filter((consignado) => consignado.id !== id));
  };

  // CRUD methods for clients
  const addClient = (newClient) => {
    setClients([...clients, newClient]);
  };

  const updateClient = (id, updatedClient) => {
    setClients(
      clients.map((client) => (client.id === id ? updatedClient : client))
    );
  };

  const deleteClient = (id) => {
    setClients(clients.filter((client) => client.id !== id));
  };

  // CRUD methods for products
  const addProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(
      products.map((product) => (product.id === id ? updatedProduct : product))
    );
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        consignados,
        addConsignado,
        updateConsignado,
        deleteConsignado,
        clients,
        addClient,
        updateClient,
        deleteClient,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
