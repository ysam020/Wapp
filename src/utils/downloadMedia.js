export const downloadMedia = (photoUrl, fileName) => {
  fetch(photoUrl)
    .then((res) => res.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(new Blob([blob]));
      console.log(url);
      let downloadBtn = document.getElementById("downloadPhoto");
      let aTag = document.createElement("a");
      aTag.href = url;
      aTag.download = fileName;
      aTag.click();
      downloadBtn.appendChild(aTag);
      aTag.remove();
    });
};
