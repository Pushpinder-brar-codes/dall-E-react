import { useState } from "react";



function App() {

  const [images, setImages] = useState(null);
  const [inputText, setInputText] = useState("");
  const randomText = ["Perry The platypus","John wick","Moose Wala"]

  const surpriseMe = () =>{
    const r = Math.floor(Math.random() * 3);
    setInputText(randomText[r]);
    getImages();
  }

  const getImages = async () => {
    if(!inputText) return
    console.log("clicked")
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: inputText,
        }),
        headers:{
          "Content-type": "application/json"
        }
      };
      const response = await fetch('http://localhost:8000/images',options)
      const data = await response.json();
      console.log(data);
      setImages(data);
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <div className="App">
     <section className="search-section">
       <p>Start with a detailed description
          <span onClick={surpriseMe} className="surprise">Surprise me</span>
       </p>
       <div className="input-container">
         <input
         value={inputText}
         onChange={(e)=>setInputText(e.target.value)}
          placeholder="An impression oil painting of a sunflower in a purple base"
         />
         <button onClick={getImages}>Generate</button>
       </div>
     </section>
     <section className="image-section">
    {images?.map((img,_index)=>{
      return (<img key={_index} src={img.url} alt="generated image" />)
    })}
     </section>
    </div>
  );
}

export default App;
