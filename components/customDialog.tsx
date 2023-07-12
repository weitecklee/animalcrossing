import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomDialogProps } from "../types";

export default function CustomDialog({ hash, handleClose, ...props} : CustomDialogProps) {

  const { open } = props;
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      if (open && (window.location.hash === hash || window.location.hash === "#villagerDialog")) {
        setOpen2(true);
      } else {
        handleClose();
        setOpen2(false);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [hash, handleClose, open]);

  useEffect(() => {
    if (open) {
      window.location.hash = hash;
    } else if (window.location.hash === hash || window.location.hash === "#villagerDialog") {
      window.history.back();
    }
  }, [hash, open]);

  return <Dialog
    {...props}
    open={open2}
    onClose={handleClose}
  />
}