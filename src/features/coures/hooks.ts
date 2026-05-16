import { useEffect, useState } from "react";
import type { Course } from "./types";
import { fetchCurses } from "./api";
export const useCurses = () => {
	const [courses, setCourses] = useState<Course[]>([]);
	useEffect(() => {
		fetchCurses().then((c) => setCourses(c));
	}, []);
	return {
		courses,
		setCourses,
	};
};
