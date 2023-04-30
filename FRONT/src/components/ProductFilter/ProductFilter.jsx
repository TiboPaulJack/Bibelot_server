import './productFilter.css'



export default function ProductFilter({ categories }) {

  return (
    <div className="productFilter">
      <select name="category" id="category">
        <option value="all">All</option>
        {
          categories.map((category) => (
          <option key={ category.id } value={ category.id }>{ category.name }</option>
          ))
        }
      </select>
      <select name="sort" id="sort">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="Most Liked">Most Liked</option>
        <option value="Most Viewed">Most Viewed</option>
      </select>
    </div>
  );
}
