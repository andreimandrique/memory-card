function Card(props) {
  return (
    <>
      <img className="card-image" src={props.imgUrl}></img>
      <p>{props.title}</p>
    </>
  );
}

export default Card;
