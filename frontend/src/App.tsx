import { Outlet } from "react-router-dom";
import Navbar from "./components/common/navbar";

function App() {
  // // 요청 받은 정보를 담아줄 변수 선언
  // const [testStr, setTestStr] = useState("");

  // // 변수 초기화
  // function callBack(str: string) {
  //   setTestStr(str);
  // }

  // // 첫 번째 렌더링을 마친 후 실행
  // useEffect(() => {
  //   axios({
  //     url: "/api/test",
  //     method: "GET",
  //   }).then((res) => {
  //     callBack(res.data);
  //   });
  // }, []);

  return (
    <div className="">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;