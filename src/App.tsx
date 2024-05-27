import { useEffect, useMemo, useRef, useState } from 'react';

import Sidebar from './components/Sidebar';
import CourseList from './components/CourseList';

const URL = 'https://logiclike.com/docs/courses.json';
const DEFAULT_TAG = 'Все темы';

function App() {
  const [courses, setCourses] = useState<Course[]>([]);

  const [tags, setTags] = useState<string[]>([]);
  const [activeTag, setActiveTag] = useState<string>(DEFAULT_TAG);

  const [isLoading, setIsLoading] = useState(true);

  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let ignore = false;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!ignore) {
      setIsLoading(true);

      fetch(URL)
        .then((res) => res.json())
        .then((data: Course[]) => {
          setCourses(data);
          const tags = [DEFAULT_TAG, ...Array.from(new Set(data.flatMap((el) => el.tags)))];
          setTags(tags);
        })
        .catch((error: unknown) => {
          console.warn(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    return () => {
      ignore = true;
      setIsLoading(false);
    };
  }, []);

  useEffect(() => {
    if (mainRef.current !== null) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [activeTag]);

  const handleTagChange = (value: string) => {
    setActiveTag(value);
  };

  const filteredCourses = useMemo(() => {
    if (activeTag.toLowerCase() === DEFAULT_TAG.toLowerCase()) {
      return courses;
    }

    return courses.filter((course) => course.tags.includes(activeTag));
  }, [courses, activeTag]);

  return (
    <>
      <header className="header visually-hidden">
        <div className="header__container container">
          <h1 className="header__heading">Test Task LogicLike</h1>
        </div>
      </header>

      <main ref={mainRef} className="main">
        <div className="main__container container">
          {isLoading ? (
            <p>Пожалуйста, подождите...</p>
          ) : (
            <>
              <Sidebar
                className="main__sidebar"
                tags={tags}
                activeTag={activeTag}
                onChange={handleTagChange}
              />
              <CourseList className="main__course-list" courses={filteredCourses} />
            </>
          )}
        </div>
      </main>

      <footer className="footer visually-hidden">
        <div className="footer__container container">
          <h2 className="footer__heading">
            made by{' '}
            <a
              className="footer__link"
              href="https://github.com/thatverygeorge"
              target="_blank"
              rel="noopener noreferrer"
            >
              @thatverygeorge
            </a>
          </h2>
        </div>
      </footer>
    </>
  );
}

export default App;

