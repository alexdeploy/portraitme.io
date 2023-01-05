import React, { useState } from "react";

export default function App() {

  const [img, setImg] = useState();
  const [imageToEdit, setImageToEdit] = useState();
  const [portrait, setPortait] = useState();


  async function onSubmit(event) {
    event.preventDefault();

    // Comprobar si se ha subido la imagen.

    const photoInput = img;
    console.log(imageToEdit)
    // generateImage
    try {
      const response = await fetch("/api/generateImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ photo: imageToEdit }),
      });

      const data = await response.json();

      console.log(data)
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

  } catch(error) {
    // Consider implementing your own error handling logic here
    console.error(error);
    alert(error.message);
  }
}
  const onImageChange = (e) => {

    // Get the file.
    const [file] = e.target.files;

    /*
    * Image validation.
    ? Consult the API image documentation -> https://beta.openai.com/docs/guides/images
    TODO: Check if is a single file and if is an image. If not, notify to user.
    TODO: Check if the image is not too big or too small.
    TODO: Maybe check the quality of the image and face position. If not is good quality, notify to user.
    */
    console.log(file);

    // Create an object URL for the file.
    setImg(URL.createObjectURL(file));
    setImageToEdit(file);

  };

  return (
    <div>
      <input type="file" onChange={onImageChange} accept="image/png, image/jpg" />
      <img src={img} alt="" />
      <form onSubmit={onSubmit}>
        <input type="submit" value="Portrait me!"/>
      </form>
    </div>
  );
}