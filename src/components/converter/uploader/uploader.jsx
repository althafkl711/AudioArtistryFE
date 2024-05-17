import React, { useRef, useState } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import './uploader.css';
import exifr from 'exifr';
import axios from '../../../api/axios';

export default function TemplateDemo() {
    const [image, setImage] = useState("");
    const [audioSrc, setAudioSrc] = useState(null);
    const [fileName, setFileName] = useState("No Selected File");
    const [isActive, setIsActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [uploading, setUploading] = useState(false);

    const handleFileChange = ({ target: { files } }) => {

        // console.log("***************",files[0]);
        if (files && files[0]) {
            setFileName(files[0].name);
            setImage(files[0]);

            // Check for GEO Location data in EXIF
            checkForGeoLocation(files[0]);
        }
    };

    const checkForGeoLocation = async (file) => {
        try {
            // Parse EXIF data from the file
            const exifData = await exifr.parse(file);
            
            // Check if the EXIF data contains GPS information
            if (exifData && exifData.latitude && exifData.longitude) {
                // If latitude and longitude are present, set isActive to true
                setIsActive(true);
                setErrorMessage("");
            } else {
                // If no GPS information is found, set isActive to false and show error message
                setIsActive(false);
                setErrorMessage("Uploaded image doesn't have location information.");
            }
        } catch (error) {
            // Handle any errors that occur during EXIF parsing
            console.error('Error parsing EXIF data:', error);
            setIsActive(false);
            setErrorMessage("Error parsing EXIF data. Please try again.");
        }
    };

    const handleSubmit = async () => {
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('image', image);
            // Assuming 'apiEndpoint' is your API endpoint
            const response = await axios.post('api/music/saveimage/',formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Adjust the content type based on your API's requirements  
                },responseType: 'blob', 
            });
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'audio/mpeg' }));
            setAudioSrc(url);

            console.log("-----------------",response);

            if (response) {
                // Handle success
                console.log('Image uploaded successfully');
            } else {
                // Handle error
                console.error('Image upload failed:', response.statusText);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error uploading image:', error);
        } finally {
            setUploading(false);
        }
    };
    console.log("&&&&",audioSrc);


    return (
        <div className="upload-container">
            <form action='' onClick={() => document.querySelector(".input-field").click()}>
                <input
                    type="file"
                    accept="image/*"
                    className="input-field"
                    hidden
                    onChange={handleFileChange}
                />
                {image ? (
                    <img src={image} className="uploded-image" alt="Uploaded" />
                ) : (
                    <>
                        <MdCloudUpload color="#1475cf" size={60} />
                        <p>Browse file to upload.</p>
                    </>
                )}
            </form>
            <div className="file-name-section">
                <div className="file-name-container">
                    <AiFillFileImage className="file-icon" />
                    <span className="file-name-container-rightbox">
                        {fileName}
                        <MdDelete
                            className="delete-icon"
                            onClick={() => {
                                setFileName("No selected file");
                                setImage(null);
                                setIsActive(false);
                                setErrorMessage("");
                            }}
                        />
                    </span>
                </div>
            </div>
            <div className="button-convert-container">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button
                    className="button-convert"
                    style={{ backgroundColor: isActive ? 'green' : 'gray', color: 'white', padding: '12px 20px', border: 'none', cursor: 'pointer' }}
                    disabled={!isActive || uploading}
                    onClick={handleSubmit}
                >
                    {uploading ? 'Uploading...' : 'Convert my pic to music'}
                </button>

                
                <audio controls>
                    <source src={audioSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
    
            </div>
        </div>
    );
}
