import axios from 'axios'

async function uploadImage(uri) {
        const apiUrl = 'http://localhost:3000/upload';

        try {
            const response = await axios.post(apiUrl, { uri });
            return response.data; // should be the image URL
        } catch (error) {
        console.log('Upload failed:', error);
            return null;
        }
}

export default uploadImage