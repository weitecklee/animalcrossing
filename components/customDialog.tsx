import { Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { CustomDialogProps } from "../types";

export default function CustomDialog({setOpen, hash, ...props} : CustomDialogProps) {

  const [openCustom, setOpenCustom] = useState(props.open);
  const originalOpen = props.open;
  const originalSetOpen = setOpen;

  useEffect(() => {
    const onHashChange = () => {
      setOpenCustom(window.location.hash === hash);
      originalSetOpen(window.location.hash === hash);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [originalSetOpen, hash]);

  useEffect(() => {
    if (originalOpen) {
      window.location.hash = hash;
    } else if (window.location.hash === hash) {
      window.history.back();
    }
  }, [originalOpen, hash]);

  return <Dialog
    {...props}
    open={openCustom}
  />
}