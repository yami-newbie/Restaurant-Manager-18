import { TextField } from "@mui/material";
import { styled } from "@mui/system";

export const TextFieldBorder = styled(TextField)(({ theme }) => ({
  "& fieldset": {
    borderRadius: "50px",
  },
}));
