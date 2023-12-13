import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import EditIcon from "@mui/icons-material/Edit";

const addItemSchema = yup.object().shape({
  name: yup.string().required("name required"),
  description: yup.string().required("description required"),
  rarity: yup.string().required("rarity required"),
  type: yup.string().required("type required"),
  image: yup.string().required("image required"),
  droprate: yup.number().required("droprate required"),
});

const initialValues = {
  name: "",
  description: "",
  rarity: "",
  type: "",
  image: "",
  droprate: "",
};

const AddItemForm = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addItem = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("image", values.image.name);

    const response = await fetch("http://localhost:3001/item/add", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const savedItem = await response.json();
    if (savedItem) {
      onSubmitProps.resetForm();
      window.location.reload();
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    addItem(values, onSubmitProps);
  };

  return (
    <>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={addItemSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          resetForm,
        }) => (
          <form
            onSubmit={handleSubmit}
            style={{
              padding: "20px",
            }}
          >
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <>
                <TextField
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={Boolean(touched.name) && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
              </>
              <TextField
                label="Description"
                type="text"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={
                  Boolean(touched.description) && Boolean(errors.description)
                }
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />

              <TextField
                label="Rarity"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.rarity}
                name="rarity"
                error={Boolean(touched.rarity) && Boolean(errors.rarity)}
                helperText={touched.rarity && errors.rarity}
                sx={{ gridColumn: "span 4" }}
                inputProps={{
                  min: 1,
                  max: 5,
                  step: 1,
                  style: { textAlign: "left" }, // Align text to the right
                }}
              />
              <TextField
                label="Type"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.type}
                name="type"
                error={Boolean(touched.type) && Boolean(errors.type)}
                helperText={touched.type && errors.type}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                label="Droprate"
                type="number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.droprate}
                name="droprate"
                error={Boolean(touched.droprate) && Boolean(errors.droprate)}
                helperText={touched.droprate && errors.droprate}
                sx={{ gridColumn: "span 4" }}
                inputProps={{
                  min: 1,
                  max: 100,
                  step: 1,
                  style: { textAlign: "left" }, // Align text to the right
                }}
              />
            </Box>
            <Box
              gridColumn="span 4"
              border={`1px solid ${palette.neutral.medium}`}
              borderRadius="5px"
              p="1rem"
              mt="2rem"
            >
              <Dropzone
                acceptedFiles=".jpg,.jpeg,.png"
                multiple={false}
                onDrop={(acceptedFiles) =>
                  setFieldValue("image", acceptedFiles[0])
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <Box
                    {...getRootProps()}
                    border={`2px dashed ${palette.primary.main}`}
                    p="1rem"
                    sx={{ "&:hover": { cursor: "pointer" } }}
                  >
                    <input {...getInputProps()} />
                    {!values.image ? (
                      <p>Add Picture Here</p>
                    ) : (
                      <Box display={"flex"} justifyContent={"space-between"}>
                        <Typography>{values.image.name}</Typography>
                        <EditIcon />
                      </Box>
                    )}
                  </Box>
                )}
              </Dropzone>
            </Box>

            {/* BUTTONS */}
            <Box>
              <Button
                fullWidth
                type="submit"
                sx={{
                  m: "2rem 0",
                  p: "1rem",
                  backgroundColor: palette.primary.main,
                  color: palette.background.alt,
                  "&:hover": { color: palette.primary.main },
                }}
              >
                Add Item
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddItemForm;
