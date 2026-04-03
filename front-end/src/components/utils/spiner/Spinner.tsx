import * as React from "react";

const Spinner: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-Green200 backdrop-blur-sm">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-Green400 border-t-transparent" />
    </div>
  );
};

export default Spinner;
