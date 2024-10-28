// import css from './TeacherCard.module.css'
function TeacherCard({
  name,
  surname,
  languages,
  levels,
  rating,
  price_per_hour,
  avatar_url,
}) {
  return (
    <div className="teacher-card">
      <img src={avatar_url} alt={`${name} ${surname}`} />
      <h2>
        {name} {surname}
      </h2>
      <p>Languages: {languages.join(', ')}</p>
      <p>Levels: {levels.join(', ')}</p>
      <p>Rating: {rating}</p>
      <p>Price per hour: ${price_per_hour}</p>
    </div>
  )
}

export default TeacherCard
