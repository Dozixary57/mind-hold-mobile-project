import axios from 'axios';

export const DocAPI = 'https://dozixary57.github.io/hold-mind-documentation';

const ServiceAPI = {
  // AUTHORIZATION
  signup: async () => {
    // ...
  },
  login: async () => {
    // ...
  },

  // DOCUMENTATION
  getDocumentation: async (segment: string = '/Overview') => {
    let markdownContent: string = '';
    await axios.get(DocAPI + segment, { timeout: 5000 })
      .then((res) => {
        markdownContent = res.data || '';
      })
      .catch(error => {
        console.log(error);
      });
    return markdownContent;
  },

}

export default ServiceAPI;