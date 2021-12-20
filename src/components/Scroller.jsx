import React, { useState, useEffect, useRef } from "react";

const Scroller = (props) => {
  const el = useRef(null);

  const [mouse, setMouse] = useState({
    y: 0,
  });
  const [state, setState] = useState({
    pixelRatio: 0,
    contentHeight: 0,
    wrapperHeight: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      const contentHeight = el.current.content.offsetHeight;
      const wrapperHeight = el.current.wrapper.offsetHeight;
      setState({
        contentHeight,
        wrapperHeight,
        pixelRatio: wrapperHeight / contentHeight,
      });
    }, 100);
  });

  const onThumbMouseDown = (e) => {
    setMouse({ y: e.pageY });
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const delta = e.pageY - mouse.y;
    setMouse({ y: e.pageY });

    const thumbTop = parseFloat(el.current.thumb.style.top || "0") + delta;
    const contentTop = parseFloat(el.current.content.style.top || "0") - delta / state.pixelRatio;
    if (contentTop >= -(state.contentHeight - state.wrapperHeight) && contentTop <= 0) {
      el.current.thumb.style.top = `${thumbTop}px`;
      el.current.content.style.top = `${contentTop}px`;
    }
  };

  const onMouseUp = (e) => {
    document.removeEventListener("mousemove", onMouseMove);
  };

  return (
    <div
      className="scroll-wrapper"
      ref={(el) => (el.current.wrapper = el)}
      style={{ height: props.height || "100%" }}
    >
      <div className="scroll-content-area">
        <div className="scroll-content" ref={(el) => (el.current.content = el)}>
          {props.children}
        </div>
      </div>
      <div className={"scrollbar "}>
        <div
          className="scrollbar-thumb"
          style={{ height: state.pixelRatio * state.wrapperHeight }}
          onMouseDown={onThumbMouseDown}
          ref={(el) => (el.current.thumb = el)}
        ></div>
      </div>
    </div>
  );
};
export default Scroller;
