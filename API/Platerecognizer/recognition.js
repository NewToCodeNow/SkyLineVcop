import axios from 'axios';
const recognizePlate = async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('upload', {
        uri: imageUri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
  
      const response = await axios.post(
        'https://api.platerecognizer.com/v1/plate-reader/',
        formData,
        {
          headers: {
            'Authorization': `Token 3a0effff73919f898b69ac65a32dc12347769564`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      return response.data;
    } catch (error) {
      console.error('Error recognizing plate:', error);
      throw error;
    }
  };

  export default recognizePlate;