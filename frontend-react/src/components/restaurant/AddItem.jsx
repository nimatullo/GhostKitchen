import React, { useState, useContext } from "react";
import { TextField, Button, List } from "@material-ui/core";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { RestaurantContext } from "../contexts/RestaurantCreationContext";
import RegisterRestaurantItem from "../owner/RegisterRestaurantItem";

const AddItem = () => {
  const { items, addToItems } = useContext(RestaurantContext);
  const [price, setPrice] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);

  const addToMenu = () => {
    addToItems({
      picture: picture,
      name: name,
      description: description,
      price: price
    });
    const data = new FormData();
    data.append("picture", picture);
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    Axios.post(`http://localhost:3000/owner/restaurants/1/menu/add`, data, {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") },
      body: data
    });
  };

  const droppedFile = file => {
    const uploadFile = file[0];
    setPicture(uploadFile);
  };

  return (
    <div>
      <List>
        {items.map(menuItem => (
          <RegisterRestaurantItem item={menuItem} />
        ))}
      </List>

      <form>
        <div>
          <TextField
            label="Item Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Item Description"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Price"
            name="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
        <Dropzone onDrop={droppedFile}>
          {({ acceptedFiles, isDragActive, getRootProps, getInputProps }) => (
            <div
              style={{ height: "200px", backgroundColor: "lightgrey" }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && "Let go!"}
              {acceptedFiles.map(file => (
                <p>{file.name}</p>
              ))}
            </div>
          )}
        </Dropzone>
        <Button onClick={addToMenu}>Add To Items</Button>
      </form>
    </div>
  );
};

export default AddItem;
