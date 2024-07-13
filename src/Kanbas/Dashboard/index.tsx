import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
    return (
        <div id="wd-dashboard">
            <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
            <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
            <div id="wd-dashboard-courses" className="row">
                <div className="row row-cols-1 row-cols-md-5 g-4">
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark"
                            href="#/Kanbas/Courses/1234/Home">
                                <img src="/images/reactjs.jpg" width="100%"/>
                                <div className="card-body">
                                <h5 className="wd-dashboard-course-title card-title">
                                CS1234 React JS
                                </h5>
                                <p className="card-text">
                                    Full Stack software developer
                                </p>
                                    <button className="btn btn-primary"> Go </button>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark" href="#/Kanbas/Courses/002/Home">
                                <img src="/images/python.jpg" width="100%" alt="python" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS002 Python</h5>
                                    <p className="card-text">Learn Python</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark" href="#/Kanbas/Courses/003/Home">
                                <img src="/images/datastructure.jpg" width="100%" alt="data structure" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS003 Data Structure</h5>
                                    <p className="card-text">Dive into basic data structure</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark" href="#/Kanbas/Courses/004/Home">
                                <img src="/images/algorithm.jpg" width="100%" alt="algorithm" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS004 Algorithm</h5>
                                    <p className="card-text">Algorithm</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark" href="#/Kanbas/Courses/005/Home">
                                <img src="/images/distributedsystem.jpg" width="100%" alt="distributed system" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS005 Distributed System</h5>
                                    <p className="card-text">Distributed computing system</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark" href="#/Kanbas/Courses/006/Home">
                                <img src="/images/math.jpg" width="100%" alt="math" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS006 Math</h5>
                                    <p className="card-text">Discrete structure in computer science</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark" href="#/Kanbas/Courses/007/Home">
                                <img src="/images/network.jpg" width="100%" alt="Computer network" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS007 Computer Network</h5>
                                    <p className="card-text">Computer networks from top to bottom</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="wd-dashboard-course col" style={{ width: "300px" }}>
                        <div className="card">
                            <a className="wd-dashboard-course-link text-decoration-none text-dark" href="#/Kanbas/Courses/008/Home">
                                <img src="/images/operatingsystem.jpg" width="100%" alt="operating system" />
                                <div className="card-body">
                                    <h5 className="wd-dashboard-course-title card-title">CS008 Operating System</h5>
                                    <p className="card-text">Develop operating system from scratch</p>
                                    <button className="btn btn-primary">Go</button>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
