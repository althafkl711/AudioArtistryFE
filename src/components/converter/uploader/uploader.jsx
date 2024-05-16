import React, { useRef, useState } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';
import './uploader.css';
import exifr from 'exifr';

export default function TemplateDemo() {
    const [image, setImage] = useState("");
    const [fileName, setFileName] = useState("No Selected File");
    const [isActive, setIsActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFileChange = ({ target: { files } }) => {
        if (files && files[0]) {
            setFileName(files[0].name);
            setImage(URL.createObjectURL(files[0]));

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
                setErrorMessage("Uploaded image doesn't have ocation information.");
            }
        } catch (error) {
            // Handle any errors that occur during EXIF parsing
            console.error('Error parsing EXIF data:', error);
            setIsActive(false);
            setErrorMessage("Error parsing EXIF data. Please try again.");
        }
    };

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
                    disabled={!isActive}
                >
                    {isActive ? 'Convert my pic to music' : 'Convert my pic to music'}
                </button>
            </div>
        </div>
    );
}
