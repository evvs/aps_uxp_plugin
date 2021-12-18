import React, { useState, useEffect, useRef } from "react";

export default const Scroller = () => {
    state = {
      pixelRatio: 0,
      contentHeight: 0,
      wrapperHeight: 0,
    };
    el = {};
    mouse = {
      y: 0,
    };
  }

  useEffect(() =>
    setTimeout(() => {
      const contentHeight = el.content.offsetHeight;
      const wrapperHeight = el.wrapper.offsetHeight;
      setState({
        contentHeight,
        wrapperHeight,
        pixelRatio: wrapperHeight / contentHeight,
      });
    }, 100);
  })


  const onThumbMouseDown = (e) => {
    mouse.y = e.pageY;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e) => {
    const delta = e.pageY - mouse.y;
    mouse.y = e.pageY;
    const thumbTop = parseFloat(el.thumb.style.top || "0") + delta;
    const contentTop = parseFloat(el.content.style.top || "0") - delta / state.pixelRatio;
    if (contentTop >= -(state.contentHeight - state.wrapperHeight) && contentTop <= 0) {
      el.thumb.style.top = `${thumbTop}px`;
      el.content.style.top = `${contentTop}px`;
    }
  };

  const onMouseUp = (e) => {
    document.removeEventListener("mousemove", onMouseMove);
  };


return (
  <div
    className="scroll-wrapper"
    ref={(el) => (el.wrapper = el)}
    style={{ height: props.height || "100%" }}
  >
    <div className="scroll-content-area">
      <div className="scroll-content" ref={(el) => (el.content = el)}>
        {props.children}
      </div>
    </div>
    <div className={"scrollbar "}>
      <div
        className="scrollbar-thumb"
        style={{ height: state.pixelRatio * state.wrapperHeight }}
        onMouseDown={onThumbMouseDown}
        ref={(el) => (el.thumb = el)}
      ></div>
    </div>
  </div>
);
}
