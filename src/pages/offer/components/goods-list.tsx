export type GoodsListProps = {
  goods: string[];
}

export function GoodsList({ goods }: GoodsListProps) {
  return (
    <ul className="offer__inside-list">
      {
        goods.map((good) => (
          <li className="offer__inside-item" key={good}>{good}</li>)
        )
      }
    </ul>
  );
}
