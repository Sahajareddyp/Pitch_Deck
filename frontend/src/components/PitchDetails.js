import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";

export default function PitchDetails(props) {
  const pitch = props.pitch;
  return (pitch &&
    <Dialog open={props.openDetail} onClose={props.closePitchDetailModal}>
      <DialogTitle>{pitch.idea_name}</DialogTitle>
      <DialogContent>
        <Typography>{pitch.long_description}</Typography>
      </DialogContent>
    </Dialog>
  );
}
