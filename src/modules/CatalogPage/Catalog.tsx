export const Catalog = ({ type }: { type: string }) => {
  return (
    <div className="catalog">
      <h1>{type.charAt(0).toUpperCase() + type.slice(1)}</h1>
    </div>
  );
};
