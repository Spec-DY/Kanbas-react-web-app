import Modules from "../Modules";
import CourseStatus from "./Status";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
    return (
        <table id="wd-home">
            <tr>
                <td valign="top">
                    <Modules />
                </td>
                <td valign="top">
                    <CourseStatus />
                </td>
            </tr>
        </table>
    );
}