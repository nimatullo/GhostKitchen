import React, { useState, useEffect } from "react";
import { List, TextField, Button } from "@material-ui/core";
import RegisterRestaurantItem from "./RegisterRestaurantItem";
import Dropzone from "react-dropzone";
import Axios from "axios";
import "./AddItem.css";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import CurrencyTextField from "@unicef/material-ui-currency-textfield/dist/CurrencyTextField";

const AddItem = ({ props }) => {
  const [restaurantId, setRestaurantId] = useState("");
  const [items, setItems] = useState([]);
  const [price, setPrice] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState(null);

  useEffect(() => {
    Axios.get("/MyRestaurant", {
      headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
    }).then(res => {
      setRestaurantId(res.data.id);
    });
  }, []);

  const addToMenu = () => {
    const item = {
      name: name,
      price: price
    };
    const data = new FormData();
    data.append("picture", picture);
    data.append("name", name);
    data.append("price", price);
    data.append("description", description);
    Axios.post(
      `http://localhost:3000/owner/restaurants/${restaurantId}/menu/add`,
      data,
      {
        headers: { Authorization: "Bearer " + localStorage.getItem("jwt") }
      }
    );
    setItems([...items, item]);
    setPrice("");
    setName("");
    setDescription("");
    setPicture(null);
  };

  const droppedFile = file => {
    const uploadFile = file[0];
    setPicture(uploadFile);
  };

  return (
    <div className="addItemForm">
      <h1>Add New Menu Item</h1>
      <div className="itemList">
        {items.length > 0 && <h3>Added Items</h3>}
        <List>
          {items.map(menuItem => (
            <RegisterRestaurantItem item={menuItem} />
          ))}
        </List>
      </div>

      <form>
        <div>
          <TextField
            variant="outlined"
            fullWidth
            label="Item Name"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div>
          <TextField
            variant="outlined"
            fullWidth
            label="Item Description"
            name="description"
            multiline={true}
            rowsMax={4}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div>
          <CurrencyTextField
            variant="outlined"
            textAlign="left"
            value={price}
            label="Price"
            decimalCharacter="."
            onChange={(event, value) => setPrice(value)}
          />
        </div>
        <Dropzone onDrop={droppedFile}>
          {({ acceptedFiles, isDragActive, getRootProps, getInputProps }) => (
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && (
                <div className="uploadPrompt">
                  <CloudUploadIcon />
                  <p>Click here or drag file to upload.</p>
                </div>
              )}
              {isDragActive && "Let go!"}
              {acceptedFiles.map(file => (
                <p>{file.name}</p>
              ))}
            </div>
          )}
        </Dropzone>
        <Button variant="contained" color="primary" onClick={addToMenu}>
          Add To Items
        </Button>
      </form>
    </div>
  );
};

export default AddItem;
