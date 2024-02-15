import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";

const Test = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    accessLevel: "",
    checkboxes: {
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false,
      checkbox5: false,
      checkbox6: false,
      checkbox7: false,
      checkbox8: false,
    },
  });

  const handleChange = (field) => (e) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const handleCheckboxChange = (checkbox) => (e) => {
    setFormData({
      ...formData,
      checkboxes: {
        ...formData.checkboxes,
        [checkbox]: e.target.checked,
      },
    });
  };

  const handleSubmit = () => {
    // You can handle the form submission logic here
    console.log("Form Data:", formData);
  };

  return (
    <form>
      <Box>
        <InputLabel>First Name</InputLabel>
        <TextField
          variant="outlined"
          value={formData.firstName}
          onChange={handleChange("firstName")}
          fullWidth
          margin="normal"
        />
      </Box>
      <Box>
        <InputLabel>Last Name</InputLabel>
        <TextField
          variant="outlined"
          value={formData.lastName}
          onChange={handleChange("lastName")}
          fullWidth
          margin="normal"
        />
      </Box>
      <Box>
        <InputLabel>Access Level</InputLabel>
        <TextField
          variant="outlined"
          value={formData.accessLevel}
          onChange={handleChange("accessLevel")}
          fullWidth
          margin="normal"
        />
      </Box>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.checkboxes.checkbox1}
              onChange={handleCheckboxChange("checkbox1")}
            />
          }
          label="Checkbox 1"
        />
        {/* Repeat the pattern for the remaining checkboxes */}
        {/* ... */}
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.checkboxes.checkbox2}
              onChange={handleCheckboxChange("checkbox2")}
            />
          }
          label="Checkbox 2"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.checkboxes.checkbox3}
              onChange={handleCheckboxChange("checkbox3")}
            />
          }
          label="Checkbox 3"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.checkboxes.checkbox4}
              onChange={handleCheckboxChange("checkbox4")}
            />
          }
          label="Checkbox 4"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.checkboxes.checkbox5}
              onChange={handleCheckboxChange("checkbox5")}
            />
          }
          label="Checkbox 5"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.checkboxes.checkbox6}
              onChange={handleCheckboxChange("checkbox6")}
            />
          }
          label="Checkbox 6"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.checkboxes.checkbox7}
              onChange={handleCheckboxChange("checkbox7")}
            />
          }
          label="Checkbox 7"
        />
      </FormGroup>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </form>
  );
};

export default Test;
