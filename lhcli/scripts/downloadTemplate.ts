import download from "download-git-repo";

function downloadTemplate(url: string, projectName: string) {
  return new Promise((resolve, reject) => {
    download(url, projectName, { clone: true }, (err: any) => {
      err ? reject(err) : resolve("success");
    });
  });
}

export default downloadTemplate;
