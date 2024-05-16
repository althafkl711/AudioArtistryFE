import './homepage.css'
import { useState } from 'react'
import image1 from '../../assets/image1.jpg'
import image2 from '../../assets/image2.jpg'
import image3 from '../../assets/image3.avif'
import image4 from '../../assets/image4.jpg'
import music1 from '../../assets/audio.wav'
import { Link } from 'react-router-dom'


function homepage() {
    const [count, setCount] = useState(0)

    return (
        <>

            <div className="section-head">
                <p className="heading">Lorem ipsum is a dummy test</p>
                <p className="title-discription">Lorem ipsum is a dummy test.
                    Lorem ipsum is a dummy test.Lorem ipsum is a dummy test.Lorem ipsum is a dummy test.Lorem ipsum is a dummy test
                    Lorem ipsum is a dummy test.Lorem ipsum is a dummy test.Lorem ipsum is a dummy test.Lorem ipsum is a dummy test
                </p>
                <div className="button-container">
                   <Link to='/converter'>
                   <button className="cta-button">
                        Generate Now
                    </button>
                   </Link> 
                </div>
            </div>
            <div className="section-library">
                <div className="section-title">
                    <p>Image to Music Library</p>
                </div>
                <div className="library-container">
                    <div className="library-card">
                        <div className="container-img">
                            <img src={image1} alt="paris" className='img-card' />
                        </div>
                        <div className="music-container">
                            <p>Paris</p>
                            <audio controls className='music-control'>
                                <source src={music1} type="audio/wav" />

                            </audio>

                        </div>
                    </div>
                    <div className="library-card">
                        <div className="container-img">
                            <img src={image2} alt="paris" className='img-card' />
                        </div>
                        <div className="music-container">
                            <p>Barcelona</p>
                            <audio controls className='music-control'>
                                <source src={music1} type="audio/wav" />

                            </audio>

                        </div>
                    </div>
                    <div className="library-card">
                        <div className="container-img">
                            <img src={image3} alt="paris" className='img-card' />
                        </div>
                        <div className="music-container">
                            <p>Delhi</p>
                            <audio controls className='music-control'>
                                <source src={music1} type="audio/wav" />

                            </audio>

                        </div>
                    </div>
                    <div className="library-card">
                        <div className="container-img">
                            <img src={image4} alt="paris" className='img-card' />
                        </div>
                        <div className="music-container">
                            <p>Dubai</p>
                            <audio controls className='music-control'>
                                <source src={music1} type="audio/wav" />

                            </audio>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default homepage