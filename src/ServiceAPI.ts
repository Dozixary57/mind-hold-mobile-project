import axios from 'axios';

export const DocAPI = 'https://dozixary57.github.io/hold-mind-documentation';

const ServiceAPI = {
  // AUTHORIZATION
  GoogleAuthorization: async () => {
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

// import axios from 'axios';
// import * as FileSystem from 'expo-file-system';

// export const DocAPI = 'https://dozixary57.github.io/hold-mind-documentation';

// const setupAxiosWithCertificate = async () => {
//   try {
//     const certificatePath = FileSystem.documentDirectory + 'certificate.pem';

//     console.log(FileSystem.documentDirectory);
//     console.log(FileSystem.bundleDirectory);

//     const assetCertificatePath = FileSystem.bundleDirectory + 'certificate.pem';
//     await FileSystem.copyAsync({
//       from: assetCertificatePath,
//       to: certificatePath,
//     });

//     const certificate = await FileSystem.readAsStringAsync(certificatePath);

//     // Axios supports custom certificates directly, so we can pass it to the httpsAgent
//     const secureAxios = axios.create({
//       baseURL: 'https://127.0.0.1:5055',
//       httpsAgent: {
//         ca: certificate, // Use the certificate here for SSL validation
//       },
//     });

//     return secureAxios;
//   } catch (error) {
//     console.error('Error setting up Axios with certificate:', error);
//     throw error;
//   }
// };

// const ServiceAPI = {
//   // AUTHORIZATION
//   // GoogleAuthorization: async () => {
//   //   // ...
//   // },
//   login: async (formData: any) => {
//     const secureAxios = await setupAxiosWithCertificate();
//     return secureAxios.post('/Auth', formData);
//   },

//   // DOCUMENTATION
//   getDocumentation: async (segment: string = '/Overview') => {
//     let markdownContent: string = '';
//     await axios.get(DocAPI + segment, { timeout: 5000 })
//       .then((res) => {
//         markdownContent = res.data || '';
//       })
//       .catch(error => {
//         console.log(error);
//       });
//     return markdownContent;
//   },
// };

// export default ServiceAPI;