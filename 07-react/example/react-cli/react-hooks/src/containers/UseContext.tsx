import { useContext } from "react"
import { UserContext } from "../App";

export default function UseContext() {
    const { userName, age } = useContext(UserContext);
    console.log(useContext(UserContext));

    return (
        <div>userName: {userName} - age: {age}</div>
    )
}
