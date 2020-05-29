//codigo de la REST API

class API {
    constructor(apikey) {
        this.apikey = apikey;
    }

    async obtenerMonedasAPI() {
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;
        //fetch a la API
        const urlObtenerMonedas = await fetch(url);
        //respuesta JSON
        const monedas = await urlObtenerMonedas.json();

        return { monedas };
    }

    async obtenerValores(moneda, criptomoneda) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apikey}`;

        //consultar en rest API
        const urlConveritr = await fetch(url);
        const resultado = await urlConveritr.json();
        return { resultado };
    }
}