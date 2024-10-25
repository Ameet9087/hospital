// Akash Pawar Table Resizing Logic 14/24
export const startResizing = (tableRef, setColumnWidths) => (index) => (e) => {
    e.preventDefault();
  
    const startX = e.clientX;
    const startWidth = tableRef.current
      ? tableRef.current.querySelector(`th:nth-child(${index + 1})`).offsetWidth
      : 0;
  
    const onMouseMove = (e) => {
      const newWidth = startWidth + (e.clientX - startX);
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [index]: `${newWidth}px`,
      }));
    };
  
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };
  