# Project Title

A small utility tool to rename a bulk of files into "YYYY.MM.DD[X]" format using Node.js

## Getting Started

Just clone the repository and you're good to go.

## How to use:


The Tool takes 3 Arguments: 

```
-p /PATH/TO/FOLDER -f .filetype -s stucture
```
-s is optional and defines which format is used. You can choose from "1":YYYYMMDD, "2":YYYYDDMM, and "3": DDMMYYYY. (Default: YYYYMMDD)  
-f needs to be the filetype which should be renamed (.mp4,.tif,.html). This tool will only rename one type at a time. (Default: .mp4) 
-p the path to the folder in which the files to rename are located  (Default: ./ )
  
for testing you can run    

```
node rename.js -p ./example/ -f .txt -s DDMMYYYY
```

## License

This project is licensed under the CC License - see the [LICENSE.md](LICENSE.md) file for details


