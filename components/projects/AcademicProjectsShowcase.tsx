"use client";

import { useEffect, useRef, useState } from "react";
import { AcademicProjectCard } from "@/components/projects/AcademicProjectCard";
import { AcademicProjectModal } from "@/components/projects/AcademicProjectModal";
import {
  academicProjectDetails,
  type AcademicProjectDetail,
} from "@/components/projects/AcademicProjectDetails";

export function AcademicProjectsShowcase() {
  const [activeProject, setActiveProject] = useState<AcademicProjectDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const closeTimerRef = useRef<number | null>(null);

  const handleOpenProject = (project: AcademicProjectDetail, trigger: HTMLElement) => {
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
        {academicProjectDetails.map((project, index) => (
          <AcademicProjectCard key={project.title} project={project} index={index} onOpen={handleOpenProject} />
        ))}
      </div>

      <AcademicProjectModal
        project={activeProject}
        open={isModalOpen}
        onClose={handleCloseProject}
      />
    </>
  );
}
