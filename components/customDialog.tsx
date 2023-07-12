import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomDialogProps } from "../types";

export default function CustomDialog({setOpen, hash, ...props} : CustomDialogProps) {

  const { open, onClose } = props;
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      if (open && (window.location.hash === hash || window.location.hash === "#villagerDialog")) {
        setOpen2(true);
      } else {
        setOpen2(false);
        onClose!({}, "escapeKeyDown");
      }
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [hash, onClose, open]);

  useEffect(() => {
    if (open) {
      window.location.hash = hash;
    } else if (window.location.hash === hash || window.location.hash === "#villagerDialog") {
      setOpen2(false);
      window.history.back();
    }
  }, [hash, open]);

  return <Dialog
    {...props}
    open={open2}
  />
}