import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { cnpjFormatter } from "./Utility";
export const generateAndDownloadPDF = async (data, client) => {
  // Initialize totals
  let totalConsigned = 0;
  let totalSold = 0;

  // Iterate through productList to calculate totals
  data.productList.forEach((product) => {
    totalConsigned += product.valor * product.quantidade;
    totalSold += product.valor * product.quantidade_vendida;
  });

  const htmlContent = `
    <html>
      <head>
        <title>Consignado</title>
        <style>
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
          /* Center the image horizontally */
          .image-container {
            display: flex;
            justify-content: center;
          }
          .title {
            display: flex;
            justify-content: center;
          }
        </style>
      </head>
      <body>
        <!-- Wrap the image inside a container and apply flexbox properties -->
        <div class="image-container">
          <img src="https://pics.io/preview/66759a0fb6e4a0e6b2a3a7fc/thumbnail" alt="Logo" style="width: 200px; height: 200px;">
        </div>

        <div class="title">
          <h1>Comprovante</h1>
        </div>
        <h2>Consignado Nº ${data.id}</h2>
        <h4>Cliente: ${client.name}</h4>
        <p>CNPJ: ${cnpjFormatter(client.cnpj)}</p>
        <p>Telefone: ${client.phone}</p>
        <p>Endereço: ${client.logradouro}, ${client.cep}, ${client.uf}</p>

        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Consignado</th>
              <th>Vendido</th>
              <th>Sobra</th>
              <th>Valor Unitário</th>
              <th>Valor Total Item</th>
            </tr>
          </thead>
          <tbody>
            ${data.productList
              .map(
                (product) => `
              <tr>
                <td>${product.produto_nome}</td>
                <td>${product.quantidade}</td>
                <td>${product.quantidade_vendida}</td>
                <td>${product.quantidade - product.quantidade_vendida}</td>
                <td>${product.valor}</td>
                <td>${product.quantidade_vendida * product.valor}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <p>Total Consignado: ${totalConsigned}</p>
        <p>Total Vendido: ${totalSold}</p>
      </body>
    </html>
  `;

  const file = await Print.printToFileAsync({
    html: htmlContent,
    base64: false,
  });

  await Sharing.shareAsync(file.uri);
};
