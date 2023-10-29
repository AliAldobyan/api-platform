import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { saveAs } from "file-saver";

import { convertKeyValueToObject } from "../../../utils/helpers";
import UrlEditor from "../../Panes/RequestUrl/UrlEditor";
import RequestTabGroup from "../../Tab-Groups/RequestTabGroup";

const keyPairInitState = [
  {
    id: uuidv4(),
    keyItem: "",
    valueItem: "",
  },
];

export default function Request({ setResponse, setLoading, loading }) {
  const [url, setUrl] = useState("");
  const [reqMethod, setReqMethod] = useState("GET");
  const [queryParams, setQueryParams] = useState(keyPairInitState);
  const [headers, setHeaders] = useState(keyPairInitState);
  const [body, setBody] = useState("{\n\t\n}");

  const handleOnInputSend = async (e) => {
    setLoading(true);

    e.preventDefault();
    const requestBody = body.toString();

    let data;
    try {
      data = JSON.parse(requestBody);
    } catch (e) {
      alert("Something is wrong with the JSON data.");
    }

    try {
      const response = await axios({
        url: url,
        method: reqMethod,
        params: convertKeyValueToObject(queryParams),
        headers: convertKeyValueToObject(headers),
        data,
        responseType: "arraybuffer",
      });
      // console.log(response.data);

      const content_type = response.headers["content-type"].split(";")[0];
      console.log(response.headers);
      if (content_type === "application/json") {
        const parsedJson = JSON.parse(new TextDecoder().decode(response.data));
        response.data = parsedJson;

        setResponse(response);
      } else if (content_type.split("/")[0] === "text") {
        const parsedTXT = new TextDecoder().decode(response.data);
        response.data = parsedTXT;
        setResponse(response);
      } else {
        const fileToDownload = new Blob([response.data], {
          type: content_type,
        });

        saveAs(fileToDownload, "download");
        setResponse(response);
      }
    } catch (e) {
      console.log(e);
      setResponse(e);
    }

    setLoading(false);
  };
  return (
    <>
      <UrlEditor
        url={url}
        setUrl={setUrl}
        reqMethod={reqMethod}
        setReqMethod={setReqMethod}
        onInputSend={handleOnInputSend}
        queryParams={queryParams}
      />
      <RequestTabGroup
        queryParams={queryParams}
        setQueryParams={setQueryParams}
        headers={headers}
        setHeaders={setHeaders}
        body={"{\n\t\n}"}
        setBody={setBody}
      />
    </>
  );
}
