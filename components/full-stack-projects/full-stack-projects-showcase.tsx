"use client";

import { useEffect, useRef, useState } from "react";
import { FullStackProjectCard } from "@/components/full-stack-projects/full-stack-project-card";
import { FullStackProjectModal } from "@/components/full-stack-projects/FullStackProjectModal";
import {
  fullStackProjectContent,
  type FullStackProjectContent,
} from "@/components/full-stack-projects/FullStackProjectContent";

export function FullStackProjectsShowcase() {
  const [activeProject, setActiveProject] = useState<FullStackProjectContent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const handleOpenProject = (project: FullStackProjectContent, trigger: HTMLElement) => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }

    returnFocusRef.current = trigger;
    setActiveProject(project);
    setIsModalOpen(true);
  };

  const handleCloseProject = () => {
    setIsModalOpen(false);

    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = window.setTimeout(() => {
      setActiveProject(null);
      returnFocusRef.current?.focus();
      closeTimerRef.current = null;
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="grid gap-5">
        {fullStackProjectContent.map((project, index) => (
          <FullStackProjectCard key={project.title} project={project} index={index} onOpen={handleOpenProject} />
        ))}
      </div>

      <FullStackProjectModal project={activeProject} open={isModalOpen} onClose={handleCloseProject} />
    </>
  );
}
