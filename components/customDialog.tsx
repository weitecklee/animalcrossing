import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomDialogProps } from "../types";

export default function CustomDialog({ hash, handleClose, ...props} : CustomDialogProps) {

  const { open } = props;

  useEffect(() => {
    const onHashChange = () => {
      if (window.location.hash !== hash && window.location.hash !== "#villagerDialog") {
        handleClose();
      };
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [hash, handleClose]);

  useEffect(() => {
    if (open) {
      window.location.hash = hash;
    } else if (window.location.hash === hash || window.location.hash === "#villagerDialog") {
      window.history.back();
    }
  }, [hash, open]);

  return <Dialog
    {...props}
    open={open}
    onClose={handleClose}
  />
}