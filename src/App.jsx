import React from "react";
import config from "./config/config";

const App = () => {
  console.log(config.APPWRITE_BUCKET_ID);
  return (
    <div>
      <h1>A Blog App With App Write</h1>
    </div>
  );
};

export default App;
