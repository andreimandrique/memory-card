function Card(props) {
  return (
    <>
      <img className="card-image" src={props.imgUrl}></img>
      <h3>{props.title}</h3>
    </>
  );
}

export default Card;
