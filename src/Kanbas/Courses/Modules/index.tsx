import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { BsGripVertical } from "react-icons/bs";
import { useParams } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from "react";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as client from "./client";

export default function Modules() {
    const { cid } = useParams();
    const [moduleName, setModuleName] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    const { modules } = useSelector((state: any) => state.modulesReducer);
    const currentUser = useSelector((state: any) => state.accountReducer.currentUser);
    const dispatch = useDispatch();

    const fetchModules = async () => {
        const modules = await client.findModulesForCourse(cid as string);
        dispatch(setModules(modules));
    };
    
    useEffect(() => {
        fetchModules();
    }, [cid]);

    const createModule = async (module: any) => {
        console.log("create module cid:", cid);
        
        // 等待从服务器创建的新模块
        const newModule = await client.createModule(cid as string, module);
        
        // 检查从服务器返回的模块对象
        console.log("create module returned newModule:", newModule);
        
        if (newModule._id) {
            console.log("create module module._id:", newModule._id);
            dispatch(addModule(newModule));
        } else {
            console.error("No _id found in the returned module:", newModule);
        }
    };
    

    const removeModule = async (moduleId: string) => {
        await client.deleteModule(cid as string, moduleId);
        dispatch(deleteModule(moduleId));
    };

    const saveModule = async (module: any) => {
        console.log("save module cid:", cid);
        console.log("savemodule module._id:", module._id);
        const status = await client.updateModule(cid as string, module);
        dispatch(updateModule(module));
    };

    return (
        <div id="wd-modules">
            {currentUser && currentUser.role === "FACULTY" && (
            <ModulesControls 
                setModuleName={setModuleName} 
                moduleName={moduleName} 
                addModule={() => {
                    createModule({ name: moduleName, course: cid });
                    setModuleName("");
                }}
                showModal={showModal}
                setShowModal={setShowModal}
            />
            )}
            <br /><br /><br /><br />
            <ul id="wd-modules" className="list-group rounded-0">
                {modules
                    .filter((module: any) => module.course === cid)
                    .map((module: any) => (
                        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray" key={module._id}>
                            <div className="wd-title p-3 ps-2 bg-secondary">
                                <BsGripVertical className="me-2 fs-3" />
                                {!module.editing && module.name}
                                {module.editing && (
                                    <input className="form-control w-50 d-inline-block"
                                        onChange={(e) => saveModule({ ...module, name: e.target.value }) }
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                saveModule({ ...module, editing: false });
                                            }
                                        }}
                                        value={module.name}/>
                                )}
                                {currentUser && currentUser.role === "FACULTY" && (
                                    <ModuleControlButtons 
                                        moduleId={module._id}
                                        deleteModule={() => { removeModule(module._id); }}
                                        editModule={() => dispatch(editModule(module._id))}
                                    />
                                )}
                            </div>
                            {module.lessons && (
                                <ul className="wd-lessons list-group rounded-0">
                                    {module.lessons.map((lesson: any) => (
                                        <li className="wd-lesson list-group-item p-3 ps-1" key={lesson.id}>
                                            <BsGripVertical className="me-2 fs-3" />
                                            {lesson.name}
                                            <LessonControlButtons />
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
            </ul>
        </div>
    );
}
