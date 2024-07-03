// FileRead.js
import { useEffect } from "react";
import '../css/styles.css'; // CSS 파일 불러오기

function FileRead({ onDataLoad }) {
  useEffect(() => {
    fetch("/data/last_data.csv")
      .then((response) => response.text())
      .then((csv) => {
        const lines = csv.split('\r\n');
        const result = [];
        const headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].split(",");
          if (line.length === headers.length) {
            const item = {};
            headers.forEach((header, index) => {
              item[header] = line[index];
            });
            result.push(item);
          }
        }
        onDataLoad(result);
      });
  }, [onDataLoad]);

  
}

export default FileRead;
