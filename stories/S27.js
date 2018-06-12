import React from "react";
import { storiesOf } from "@storybook/react";
import Board from "../src/S27/index.jsx";
import Game from "../src/S27/lib/S27.js";
import ReactGame from "react-gameboard/lib/component";

const TOH = ReactGame(Game);

storiesOf("Cipher Number (S27)", module) 
.add("Instruction", () => {
    return (
      <div className = "s14 note"> 
        <h1>Hướng dẫn chơi game Cipher Number</h1>
        <u font = "underline"> 1, Cốt truyện </u>
        <p>
          Mọi cư dân trên hành tinh Mễ Trì, ai ai cũng đều biết sự vĩ đại và kiệt xuất
          của vị vua anh Ming của đất nước 302. Tuy nhiên, ít ai biết rằng ông còn là một 
          ông bố rất yêu thương và chiều chuộc con. Hoàng tử Thảo Nguyên - con trai của vị vua, 
          là một người tài năng, một thiên tài nhỏ tuổi, hứa hẹn sẽ trở thành một người trị vì 
          anh minh, kế tục sự nghiệp mà cha cậu để lại.
        </p>
        <p>
          Tuy nhiên, đó là chuyện tương lai. Còn bây giờ, là mọt người có chỉ số thông minh ngoại hạng, 
          các trò chơi hiện này đều chỉ là "giải trí" đối với cậu. Lo sợ rằng cậu con trai sẽ cảm thấy chán
          và tìm đến những thứ như thuật toán cao cấp, cha cậu - vị vua anh Ming của chúng ta, đã nghĩ ra một 
          trò chơi mới. Ông cần bạn là người sẽ kiểm tra độ dễ của trò chơi ngày.
        </p>
        <p>
          Bạn được cho một bảng, trong đó mỗi hàng và cột là 1 phép tính. Ở cuối mỗi hàng và cột, sẽ có 1 dấu 
          bằng và kết quả của phép tính đó. Vị vua đã xóa đi các số trong phép tính, và nhiệm vụ của bạn bây 
          giờ là cần phải tìm lại những số và phép toán sao cho mọi phép tính trong các hàng và cột đều đúng.
        </p>
        <p>
          Bạn chỉ được phép sử dụng các chữ số từ 0 đến 9 và các phép toán cộng (+), trừ (-) và nhân (*). 
          Hàng đầu tiên đã được điền cho bạn.
        </p>
        <u style={{font:"underline"}}> 2, Các bước chơi</u>
        <p>
          Trò chơi gồm 1 bảng số.
          <center>
            <img src="https://i.imgur.com/s154KY9.png" alt = "Bangso"/><br/>
            <i className = "subscript">Bảng số</i><br/>
          </center>
        </p>
        <p>
          Đối với các ô cần chứa số, an có thể thay số các số trong ô trắng bằng cách bấm vào ô đó. Các ô sẽ nhảy dần từ
          trống rỗng lên 0, 1, 2, ... đến 9. Tương tự, với các ô cần phép toán, khi bạn bấm, ô sẽ chuyển dần thành cộng (+), trừ (-) và nhân (*)<br/>
          <center>
            <img src="https://i.imgur.com/UgJ8jtv.png" alt = "Move_num"/><br/>
            <i className = "subscript">Bấm vào ô cần số</i><br/>
          </center>
          <center>
            <img src="https://i.imgur.com/5cBKnBU.png" alt = "Move_ope"/><br/>
            <i className = "subscript">Bấm vào ô cần phép tính</i><br/>
          </center>
          Ngoài ra, bạn cũng luôn có thể sử dụng nút Reset để đặt lại toàn bộ bảng thành bảng rỗng ban đầu.
          Ở cuối mỗi hàng và cột sẽ có 2 chữ cái, là WA (Wrong Answer) nếu phép tính bạn điền không thỏa mãn.
          Ngược lại, nếu phép tính bạn điền là đúng, sẽ hiện ra AC (Accepted).<br/>
          Nếu tất cả các hàng và cột đều hiện chữ AC, trò chơi kết thúc.
        </p>
      </div>
    )})
    .add("Dễ", () => (
        <TOH height = {5} width = {5}>
            <Board />
        </TOH>
    ))
    .add("Trung bình", () => (
        <TOH height = {7} width = {7}>
            <Board />
        </TOH>
    ))
    .add("Khó", () => (
        <TOH height = {9} width = {9}>
            <Board />
        </TOH>
    ))