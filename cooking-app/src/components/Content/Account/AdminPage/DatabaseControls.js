import { Button, Divider, ListItemText, Paper } from "@mui/material";
import Ajv from "ajv";
import { addDoc, collection } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../../api/firebase";
import { UserDataContext } from "../../../../App";
import CustomizedSnackbar from "../../../../utils/CustomizedSnackbar";
import LinearProgressWithLabel from "../../../../utils/LinearProgressWithLabel";
import { JSONSchema } from "./JSONSchema";

const DatabaseControls = () => {
  const userData = useContext(UserDataContext);

  const [jsonData, setJsonData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [errorData, setErrorData] = useState({
    errorMessage: "",
    severity: "warning",
  });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(JSONSchema);

  useEffect(() => {
    const valid = validate(jsonData);
    console.log(valid);
  }, [jsonData]);

  const handleFileUpload = (e) => {
    const fileReader = new FileReader();

    if (e.target.files[0] !== undefined)
      fileReader.readAsText(e.target.files[0]);

    fileReader.onloadend = () => {
      try {
        setJsonData(JSON.parse(fileReader.result));
        setErrorData({ errorMessage: "File loaded", severity: "success" });
      } catch (e) {
        setErrorData({
          errorMessage: "** Not a valid JSON file!**",
          severity: "error",
        });
      } finally {
        e.target.value = null;
        setShowSnackbar(true);
      }
    };
  };

  const handleUpload = async () => {
    for (let [index, value] of Object.values(jsonData).entries()) {
      await addDoc(collection(db, "radekTesty"), {
        ...value,
        isApproved: true,
        author: userData.uid,
      })
        .then(() => {
          setProgress(
            parseInt((index / Object.keys(jsonData).length) * 100, 10)
          );
        })
        .catch((e) => {
          setErrorData({
            errorMessage: e.code,
            severity: "error",
          });
        });
    }
    setJsonData(null);
    setProgress(0);
    setErrorData({
      errorMessage: "Recipes uploaded",
      severity: "success",
    });
    setShowSnackbar(true);
  };

  return (
    <Paper
      sx={{
        px: 3,
        pt: 2.5,
        pb: 2.5,
        my: 2,
      }}
    >
      <Divider textAlign="left">
        <ListItemText
          primary="Recipes Database Control"
          primaryTypographyProps={{
            fontSize: 15,
            fontWeight: "bold",
            lineHeight: "20px",
            mb: "2px",
          }}
          sx={{ my: 1 }}
        />
      </Divider>

      <Button variant="outlined" component="label" onChange={handleFileUpload}>
        Load recipes (JSON)
        <input hidden type="file" accept=".json" />
      </Button>

      {jsonData !== null ? (
        <>
          <ListItemText
            primary={`Found ${Object.keys(jsonData).length} recipes`}
          />
          <Button variant="contained" onClick={handleUpload}>
            Upload
          </Button>
          {progress > 0 ? <LinearProgressWithLabel value={progress} /> : null}
        </>
      ) : null}

      <CustomizedSnackbar
        showSnackbar={showSnackbar}
        setShowSnackbar={setShowSnackbar}
        errorData={errorData.errorMessage}
        severity={errorData.severity}
      />
    </Paper>
  );
};

export default DatabaseControls;
