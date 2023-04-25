import './productFilter.css'


export default function ProductFilter() {

  return (
    <div className="productFilter">
      <select name="category" id="category">
        <option value="all">All</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
        <option value="category3">Category 3</option>
      </select>
      <select name="sort" id="sort">
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="Most Liked">Most Liked</option>
        <option value="Most Viewed">Most Viewed</option>
      </select>
    </div>

  )
}
