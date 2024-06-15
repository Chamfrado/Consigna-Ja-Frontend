import axios from 'axios';

export const SearchCNPJ = axios.create({
    baseURL: 'https://api-publica.speedio.com.br/'
});

export const getCNPJData = (cnpj) => {
    return SearchCNPJ.get(`buscarcnpj?cnpj=${cnpj}`);
};
