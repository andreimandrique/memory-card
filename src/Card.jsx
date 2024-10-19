function Card(props) {
  return (
    <div>
      <img className="card-image" src={props.imgUrl}></img>
      <h3>{props.title}</h3>
    </div>
  );
}

export default Card;
