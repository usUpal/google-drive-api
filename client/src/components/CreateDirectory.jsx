import React, { useState } from "react";
import axios from "axios";

const CreateDirectory = () => {
  const [directoryName, setDirectoryName] = useState("");
  const [response, setResponse] = useState(null);

  const createDirectory = async () => {
    try {
      const res = await axios.post("http://localhost:5000/create-dir", {
        directoryName,
      });
      setResponse(res.data);
      console.log("dir successfully created")
    } catch (error) {
      setResponse(error.message);
    }
  };

  return (
    <div>
      <input
        type='text'
        value={directoryName}
        onChange={(e) => setDirectoryName(e.target.value)}
        placeholder='Enter directory name'
      />
      <button onClick={createDirectory}>Create Directory</button>
      {response && <div>{JSON.stringify(response)}</div>}
    </div>
  );
};

export default CreateDirectory;
