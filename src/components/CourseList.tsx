import CourseCard from './CourseCard';

interface Props {
  className: string;
  courses: Course[];
}

function CourseList(props: Props) {
  const { className, courses } = props;

  return (
    <section className={`${className} course-list`}>
      <h2 className="course-list__heading visually-hidden">Курсы</h2>

      {courses.length > 0 ? (
        <ul>
          {courses.map((course) => {
            return (
              <li key={course.id}>
                <CourseCard course={course} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>Нам не удалось ничего найти по вашему запросу</p>
      )}
    </section>
  );
}

export default CourseList;
