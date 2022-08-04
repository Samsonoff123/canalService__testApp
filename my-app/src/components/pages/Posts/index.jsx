import React, { useState } from "react";
import classes from "./Posts.module.css";
import samplePhoto from "../../../images/sampl.png";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import { getPhotos } from "../../Utils/api";

export default function Posts() {
  const data = useSelector((state) => state.posts.posts.items);
  const user = useSelector((state) => state.auth.data);
  const [imageData, setImageData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [iteration, setIteration] = useState(6);
  let i = 0;
  const ref = useRef();

  let options = {
    root: ref.current,
    rootMargin: "0px",
    threshold: 0.5,
  };

  let callback = function (entries, observer) {
    i = i + 6;
    setIteration(i);
  };

  useEffect(() => {
    let observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    getPhotos().then((res) => {
      setImageData(res);
    });

    if (data) {
      setIsLoading(true);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <div className={classes.main}>
            {data.slice(0, iteration).map((el) => (
              <div key={el.id} className={classes.element}>
                <div className={classes.image__block}>
                  <img
                    src={imageData ? imageData[el.userId - 1].url : samplePhoto}
                    alt="postimg"
                  />
                  <div className={classes.discribtions}>
                    <span>Autor: {user[el.userId - 1].username}</span>
                    <span>Company: {user[el.userId - 1].company.name}</span>
                  </div>
                </div>
                <div className={classes.bottom__text}>
                  <span>{el.title}</span>
                  <span>{el.body}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
      <div className="here" ref={ref}></div>
    </>
  );
}
