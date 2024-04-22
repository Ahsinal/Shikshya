"use client";
import { Toaster } from "react-hot-toast";

const ToastProvider = () => {
  return <Toaster toastOptions={{ duration: 2500 }} />;
};

export default ToastProvider;
