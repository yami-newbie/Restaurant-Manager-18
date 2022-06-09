import React, {useState} from 'react'
import {Card, CardContent, CardActions, IconButton, Divider, Typography, CardMedia, Skeleton} from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import AccDetail from './AccDetail';

function AccPreview(props) {
  const {acc} = props;
  const [imgSrc, setImgSrc] = useState();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () =>
  {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  }
  return (
    <div style={{
      position: "relative",
      width: "100%",
      display: "flex",
      justifyContent: "center",
    }}>
        <Card
            sx={{
                mx: 1,
                mt: 6,
                mb: 1,
                width: 200,
                borderRadius: "1.5rem",
        }}>
            <CardContent sx={{ mt: 6 }}>
            <Divider sx={{ mb: 1 }} />
                <Typography
                    sx={{ fontWeight: "bolder !important" }}
                    component="div"
                    variant="h6"
                >
                    {acc + " (Tên)"}
                </Typography>
                <Typography
                    sx={{ fontWeight: "bolder !important" }}
                    component="div"
                    variant="h7"
                >
                    {acc + " (Chức vụ)"}
                </Typography>
            </CardContent>
            <Divider variant="middle" />
            <CardActions sx={{ justifyContent: "space-between", ml: 1.5 }}>
                <IconButton onClick={handleClickOpen}>
                    <InfoIcon/>
                </IconButton>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </CardActions>
        </Card>
        {imgSrc ? (
        <CardMedia
          component="img"
          sx={{
            position: "absolute",
            width: 100,
            height: 100,
            borderRadius: "100px",
          }}
          image={imgSrc}
          alt="food"
        />
        ) : (
            <Skeleton
            variant="circular"
            sx={{
                position: "absolute",
                width: 100,
                height: 100,
                borderRadius: "100px",
            }}
            />
      )}
      <AccDetail onClose={handleClose} open={open} acc={acc}/>
    </div>
  )
}

export default AccPreview