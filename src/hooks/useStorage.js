import { useState, useEffect } from "react";

import { storage, timestamp } from "../firebase/index";

const useStorage = (file) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [createdAt, setCreatedAt] = useState();

  useEffect(() => {
    const storageRef = storage.ref(`/images/${file.name}`); // save image in storage  create images folder   images/toto_01022021
    storageRef.put(file).on('state_changed', (snapshot) => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(percentage);
    }, (err) => {
      setError(err);
    }, async () => {
      const url = await storageRef.getDownloadURL();  // get image url from storage
      const createdAt = timestamp();
      setUrl(url);
      setCreatedAt(createdAt);
    })
    
  }, [file]);
 
  return { url, progress,createdAt, error}
  
}

export default useStorage;