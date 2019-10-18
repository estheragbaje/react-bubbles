import React, { useState, useEffect } from "react";
import axiosWithAuth from "../axios/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import { Flex } from "@chakra-ui/core";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5006/api/colors")
      .then(res => setColorList(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <Flex>
        <ColorList colors={colorList} updateColors={setColorList} />
        <Bubbles colors={colorList} />
      </Flex>
    </>
  );
};

export default BubblePage;
