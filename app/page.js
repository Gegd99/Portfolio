"use client";
import Image from "next/image";
import project1 from "../public/1.png";
import project2 from "../public/1.png";
import project3 from "../public/1.png";
import project4 from "../public/1.png";
import project5 from "../public/1.png";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ProjectPresentation from "@/components/projectPresentation";

export default function Home() {
  const [mouseDownAt, setMouseDownAt] = useState(0);
  const [prevPercentage, setPrevPercentage] = useState(0);
  const [translatePercentage, setTranslatePercentage] = useState(0);

  const [projectPresentationVisibility, setProjectPresentationVisibility] =
    useState(false);
  const [projectPresentationSource, setProjectPresentationSource] =
    useState("");

  useEffect(() => {
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
  });

  const handleMouseDown = (e) => {
    setMouseDownAt(e.clientX);
    window.addEventListener("mousemove", handleMouseMove);
  };
  const handleMouseUp = () => {
    setMouseDownAt(0);
    setPrevPercentage(translatePercentage);
    window.removeEventListener("mousemove", handleMouseMove);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (mouseDownAt === 0) {
        return;
      }
      const mouseDelta = parseFloat(e.clientX - mouseDownAt);
      const maxDelta = window.innerWidth / 2;

      const nextPercentage = (mouseDelta / maxDelta) * 100 + prevPercentage;
      setTranslatePercentage(Math.max(Math.min(nextPercentage, 0), -100));
    },
    [mouseDownAt]
  );

  function openProjectPresentation(source) {
    setProjectPresentationSource(source);
    setProjectPresentationVisibility(true);
  }
  function closeProjectPresentation() {
    setProjectPresentationVisibility(false);
  }

  const projectVariants = {
    closed: { y: "50%", scale: 0.3 },
    open: { y: 50, scale: 1 },
    exit: { y: "50%", scale: 0.3, opacity: 0 },
  };

  return (
    <body>
      <h1
        className="font-medium absolute left-2/4 -translate-x-2/4 w-40 h-10 text-white py-12"
        style={{ fontSize: 20 }}
      >
        Work | About
      </h1>
      <motion.div
        id="image-track"
        style={{ x: "" + translatePercentage + "%", y: "-40%" }}
        className="image-track "
      >
        <Image
          className="project-cover"
          style={{ objectPosition: `${translatePercentage + 100}% 50%` }}
          src={project1}
          draggable="false"
          onClick={() => {
            openProjectPresentation(project1);
          }}
        />
        <Image
          className="project-cover"
          style={{ objectPosition: `${translatePercentage + 100}% 50%` }}
          src={project2}
          draggable="false"
          onClick={() => { 
            openProjectPresentation(project2);
          }}
        />
        <Image
          className="project-cover "
          style={{ objectPosition: `${translatePercentage + 100}% 50%` }}
          src={project3}
          draggable="false"
          onClick={() => {
            openProjectPresentation(project3);
          }}
        />
        <Image
          className="project-cover"
          style={{ objectPosition: `${translatePercentage + 100}% 50%` }}
          src={project4}
          draggable="false"
          onClick={() => {
            openProjectPresentation(project4);
          }}
        />
        <Image
          className="project-cover"
          style={{ objectPosition: `${translatePercentage + 100}% 50%` }}
          src={project5}
          draggable="false"
          onClick={() => {
            openProjectPresentation(project5);
          }}
        />
      </motion.div>
      <AnimatePresence>
        {projectPresentationVisibility ? (
          <motion.div
            variants={projectVariants}
            initial={"closed"}
            animate={"open"}
            exit={"exit"}
            transition={{ duration: 0.4 }}
            className="project-presentation"
          >
            <Image
              src={projectPresentationSource}
              draggable="false"
              onClick={() => closeProjectPresentation()}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </body>
  );
}

//<motion.div
//animate={projectPresentationVisibility ? "open" : "closed"}
//variants={projectVariants}
//transition={{ duration: 0.4 }}
//className="project-presentation"
//>
//<Image
//  src={projectPresentationSource}
//  draggable="false"
//  onClick={() => closeProjectPresentation()}
///>
//</motion.div>
