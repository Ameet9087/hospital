import React, { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [links, setLinks] = useState([]);

  const showPopup = (links) => {
    setLinks(links);
    setIsOpen(true);
  };

  const hidePopup = () => {
    setIsOpen(false);
  };

  return (
    <PopupContext.Provider value={{ isOpen, links, showPopup, hidePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);
