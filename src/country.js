class Country {
  constructor() {
    this.apiUrl = 'https://restcountries.com/v3.1/all';
  }

  /**
   * Return all the countries there is inside API, if not return NULL
   * 
   * @returns {Array}
   */
  async getAllCountries() {
    try {
      const countries = await fetch(this.apiUrl);
      const data = await countries.json();
      return data;
    } catch(error) {
      console.log(error.message);
      return null;
    }
  }
}

export default Country;