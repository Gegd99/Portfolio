"use client"
import Image from "next/image";
import first from "../public/1.png"
import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ProjectPresentation(vis, src) {

    const visibility = vis;
  const [source, setPrevPercentage] = useState(src);
  const [translatePercentage, setTranslatePercentage] = useState(0);



  function translateTemplate() {
    return `translateX:((${translatePercentage*1.5}%)`;
  }

  return (
    <div style={{visibility: visibility}}>
        <Image className="project-cover" width={100} height={100} src="/../public/1.png" draggable="false" />
    </div>
  );
}
