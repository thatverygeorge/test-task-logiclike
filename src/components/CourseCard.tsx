function CourseCard(props: { course: Course }) {
  const { course } = props;

  return (
    <article className="course-card">
      <div className="course-card__content-wrapper">
        <h3 className="course-card__heading">
          <a href="">{course.name}</a>
        </h3>
      </div>
      <div className="course-card__img-wrapper" style={{ backgroundColor: course.bgColor }}>
        <img
          width="144"
          height="144"
          loading="lazy"
          src={course.image}
          alt=""
          role="presentation"
        />
      </div>
    </article>
  );
}

export default CourseCard;
