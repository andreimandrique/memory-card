function CardList() {
  const items = [
    {
      id: 1,
      name: "john",
    },
    {
      id: 2,
      name: "andrei",
    },
    {
      id: 3,
      name: "gusion",
    },
  ];

  function handleItem(e) {
    console.log(e.target.id);
  }

  const listItems = items.map((item) => (
    <div className="card" key={item.id} id={item.id} onClick={handleItem}>
      {item.name}
    </div>
  ));

  return <>{listItems}</>;
}

export default CardList;
