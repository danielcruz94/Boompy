
import {MiniImage} from "../Cards.style"

const SmallImage = ({ photos }) => {
  return (
    <MiniImage>
      {!photos[0] ? (
        ""
      ) : (
        <img
          src={photos[0]}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            transform: "translate(-20px, 15px)",
            border: "2px solid #161439",
            filter: 'grayscale(1)'
          }}
          alt="imgPeque"
        />
      )}
      {!photos[1] ? (
        ""
      ) : (
        <img
          src={photos[1]}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            transform: "translate(20px, -70px)",
            border: "2px solid #161439",
          }}
          alt="imgPeque"
        />
      )}
      {!photos[2] ? (
        ""
      ) : (
        <img
          src={photos[2]}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            transform: "translate(75px, -130px)",
            border: "2px solid #161439",
          }}
          alt="imgPeque"
        />
      )}
    </MiniImage>
  );
};

export default SmallImage;