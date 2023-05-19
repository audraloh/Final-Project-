import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

//promise and fetch
async function photofetch(photourl){
  const data = await fetch("http://localhost:3000/add/photo",{
    method: "POST",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({img:photourl}),
  }
  )
  return (data.json())
}

function Main(){
  const[images, setImages] = useState([]);
  const[imageURLs, setImagesURLs] = useState([]);

  function onImageChange(e){
    setImages([...e.target.files]);
    console.log ("hello")
  }

  useEffect (() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    //creating a url for uploading a image
    images.forEach(image=> newImageUrls.push(URL.createObjectURL(image)))
    //storing something new
    photofetch(newImageUrls[0]).then(updated => {console.log(updated)})
    setImagesURLs(newImageUrls);
    console.log ("hi")
  }, [images])

  return(
    <div>
      <Hello/>
      <Header/>
      <UploadImages images={images} imageURLs={imageURLs} onImageChange={onImageChange} />
      {images.length > 0 ? (<App />) : (<span/>)}
    </div>
    );
}

//title
function Hello(){
  return(
  <div className = "button">
    <h1>Welcome to Photolog!</h1> 
  </div>
    )
}

//header
function Header(){
  return(
  <div className = "header">
    <h2>This website allows you to view and upload images. You can comment on interact with other peoples posts worldwide!</h2>
    <h3>By: Audra Loh</h3>
  </div>
    )
}

export function UploadImages(props){
  return(
  <div>
    <input type = "file" multiple accept = "image/*" onChange={props.onImageChange}/>
    { props.imageURLs.map(imageSrc => <img src = {imageSrc}/>)}
    </div>
  );
}

//like counter
function App() {
  const [count, setCount] = useState(0);
  return (
  <>
    <div>{count}</div>
      <button 
        type="button"
        onClick={() => setCount(count + 1)} >
        Like!</button>
      </>
  );
}

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
export default (Main)
