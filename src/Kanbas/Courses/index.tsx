import React from "react";
import CoursesNavigation from "./Navigation";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import Grades from './Grades';
import AssignmentEditor from "./Assignments/Editor";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import Quiz from "./Quiz";

import PeopleTable from "./People/Table";
import PeopleDetails from "./People/Details";
import QuizDetails from "./Quiz/detail";
import QuizEditor from "./Quiz/editor";
import QuestionIndex from "./Quiz/Question";
import MultipleChoiceEditor from './Quiz/Question/MultipleChoiceEditor';
import FillInBlankEditor from './Quiz/Question/FillInBlankEditor';
import TrueFalseEditor from './Quiz/Question/TrueFalseEditor';
import QuizPreview from './Quiz/Question/Preview';


export default function Courses({ courses }: { courses: any[]; }) {
    const { cid } = useParams<{ cid: string }>();
    const course = courses.find((course) => course._id === cid);
    const { pathname } = useLocation();

    const sectionName = pathname.split("/").pop();

    return (
        <div id="wd-courses">
            <h2 className="text-danger">
                <FaAlignJustify className="me-4 fs-4 mb-1" />
                {course && course.name} {sectionName && `> ${sectionName}`}
            </h2>
            <hr />
            <div className="d-flex">
                <div className="flex-shrink-0">
                    <CoursesNavigation />
                </div>
                <div className="flex-grow-1 ms-3">
                    <Routes>
                        <Route path="/" element={<Navigate to="Home" />} />
                        <Route path="Home" element={<Home />} />
                        <Route path="Modules" element={<Modules />} />
                        <Route path="Assignments" element={<Assignments />} />
                        <Route path="Assignments/New" element={<AssignmentEditor />} />
                        <Route path="Assignments/:aid" element={<AssignmentEditor />} />
                        <Route path="Grades" element={<Grades />} />
                        <Route path="People" element={<PeopleTable />} />
                        <Route path="People/:cid" element={<PeopleTable />} />
                        <Route path="Quiz" element={<Quiz />} />
                        <Route path="Quiz/:quizId/detail" element={<QuizDetails />} />
                        <Route path="Quiz/:quizId/editor" element={<QuizEditor />} />
                        <Route path="Quiz/:quizId/Question" element={<QuestionIndex />} />
                        <Route path="Quiz/:quizId/MultipleChoice" element={<MultipleChoiceEditor />} />
                        <Route path="Quiz/:quizId/FillInBlank" element={<FillInBlankEditor />} />
                        <Route path="Quiz/:quizId/TrueFalse" element={<TrueFalseEditor />} />
                        <Route path="Quiz/:quizId/Preview" element={<QuizPreview />} />
                        <Route path="Quiz/:quizId/MultipleChoice/:questionId?" element={<MultipleChoiceEditor />} />
                        <Route path="Quiz/:quizId/TrueFalse/:questionId?" element={<TrueFalseEditor />} />
                        <Route path="Quiz/:quizId/FillInBlank/:questionId?" element={<FillInBlankEditor />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}
