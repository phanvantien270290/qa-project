import React from "react";
import Button from "@material-ui/core/Button";
import { SnackbarProvider, VariantType, useSnackbar } from "notistack";

function MyApp() {
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    enqueueSnackbar("I love snacks.");
  };

  const handleClickVariant = (variant: VariantType) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar(<div>hahahah<br/>adsadsd</div>, { variant });
  };

  return (
    <React.Fragment>
      <Button onClick={handleClick}>Show snackbar</Button>
      <Button onClick={handleClickVariant("success")}>
        Show success snackbar
      </Button>
    </React.Fragment>
  );
}

export default function SnackbarComponent() {
  return (
    <SnackbarProvider maxSnack={3} >
      <MyApp />
    </SnackbarProvider>
  );
}
