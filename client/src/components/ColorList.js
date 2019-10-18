import React, { useState } from "react";

import axiosWithAuth from "../axios/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    // console.log(colorToEdit);
    axiosWithAuth()
      .put(`http://localhost:5005/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        const filteredColors = colors.filter(
          item => item.id !== colorToEdit.id
        );
        const newColors = filteredColors.concat(colorToEdit);
        updateColors(newColors);
        setEditing(false);
      })
      .catch(err => console.log(err));
  };

  const addColor = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    // console.log(colorToEdit);
    axiosWithAuth()
      .post(`http://localhost:5005/api/colors/`, colorToEdit)
      .then(res => {
        const newColors = colors.concat(colorToEdit);
        updateColors(newColors);
        setEditing(false);
        setColorToEdit(initialColor);
      })
      .catch(err => console.log(err));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    // debugger;
    axiosWithAuth()
      .delete(`http://localhost:5005/api/colors/${color.id}`)
      .then(res => {
        // debugger;
        const deletedColors = colors.filter(item => item.id !== color.id);
        updateColors(deletedColors);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>

      <form
        onSubmit={e => {
          if (editing) {
            saveEdit(e);
          } else {
            addColor(e);
          }
        }}
      >
        <legend>{editing ? "edit" : "Add"} color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
            value={colorToEdit.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
            value={colorToEdit.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setColorToEdit(initialColor);
            }}
          >
            cancel
          </button>
        </div>
      </form>

      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      {/* {editing && (
        <form onSubmit={addColor}>
          <legend>add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">Add</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )} */}
    </div>
  );
};

export default ColorList;
