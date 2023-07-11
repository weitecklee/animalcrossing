import { Dialog } from "@mui/material";
import { useState, useEffect } from "react";
import { CustomDialogProps } from "../types";

export default function CustomDialog(props: CustomDialogProps) {

  const [open, setOpen] = useState(props.open);
  const originalOpen = props.open;
  const originalSetOpen = props.setOpen;

  useEffect(() => {
    const onHashChange = () => {
      setOpen(window.location.hash === "#dialog");
      originalSetOpen(window.location.hash === "#dialog");
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [originalSetOpen]);

  useEffect(() => {
    if (originalOpen) {
      window.location.hash = "#dialog";
    } else if (window.location.hash === "#dialog") {
      window.history.back();
    }
  }, [originalOpen]);

  return <Dialog
    {...props}
    open={open}
  />
}